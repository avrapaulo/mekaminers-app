/* eslint-disable indent */
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useRecoilValue } from 'recoil'
import { useMoralisCloudFunction, useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { Robot } from 'components/3D'
import { classNames } from 'helpers/class-names'
import { getEllipsisTxt } from 'helpers/formatters'
import { statusDescription } from 'constants/status'
import { rarityInfo } from 'constants/rarity'
import { RobotPiece } from 'components/details/robot-piece'
import { piecesDefault } from 'constants/robots-pieces'
import { Slide } from 'components/details/slide'
import { useEffect } from 'react'
import { TimerStatus } from 'components/details/timer'
import { Gen0, Gen1 } from 'icons'
import { abi as robotAbi } from 'contracts/RobotCore.json'
import { abi as robotMarketplaceAbi } from 'contracts/RobotMarketplace.json'
import { walletAtom } from 'recoil/atoms'
import { useMeka } from 'hooks'

interface RobotProps {
  robot: {
    bonus: number
    gen: number
    price: number
    mode: number
    title: string
    owner: string
    rarity: string
    type: string
    lastAttachDate: string
    robotStatus: { key: string; value: number }[]
    piecesStatus: any[]
  }
  isOwner: boolean
}

const amountToApprove = 10000

const RobotsDetail = () => {
  const router = useRouter()
  const { web3, Moralis } = useMoralis()
  const wallet = useRecoilValue(walletAtom)
  const { id: robotId, market } = router.query
  const { data, fetch } = useMoralisCloudFunction(
    'getRobotDetail',
    { tokenId: +robotId },
    { autoFetch: false }
  )

  const robotMarketplace = new web3.eth.Contract(
    robotAbi as AbiItem[],
    process.env.NEXT_PUBLIC_ROBOT_ADDRESS
  )
  const robotCancelSale = new web3.eth.Contract(
    robotMarketplaceAbi as AbiItem[],
    process.env.NEXT_PUBLIC_ROBOT_MARKETPLACE
  )

  const { fetch: fetchMeka } = useWeb3ExecuteFunction({
    contractAddress: process.env.NEXT_PUBLIC_ROBOT_MARKETPLACE,
    functionName: 'cancelSale',
    abi: robotMarketplaceAbi
  })

  const { fetchMeka: fetchMekaAllowance } = useMeka({
    functionName: 'allowance',
    params: {
      spender: process.env.NEXT_PUBLIC_ROBOT_MARKETPLACE,
      owner: wallet
    }
  })

  const { fetchMeka: fetchMekaApprove } = useMeka({
    functionName: 'approve',
    params: {
      spender: process.env.NEXT_PUBLIC_ROBOT_MARKETPLACE,
      amount: Moralis.Units.ETH(amountToApprove)
    }
  })

  useEffect(() => {
    fetch()
  }, [fetch])

  const {
    robot: {
      title = ' ',
      owner,
      rarity,
      gen,
      type,
      robotStatus,
      bonus,
      mode,
      lastAttachDate,
      piecesStatus = [],
      price
    },
    isOwner
  } = (data || { robot: {} }) as RobotProps

  return (
    <>
      <Slide fetch={fetch} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 w-full h-full">
        <div className="flex">
          <Link href={market ? '/marketplace' : '/inventory/robots'}>
            <a className="flex flex-row text-white font-bold text-2xl justify-center items-center">
              <div className="w-8 h-8">
                <ChevronLeftIcon className="text-tree-poppy" />
              </div>
              Go back
            </a>
          </Link>
        </div>
        <div className="flex flex-col lg:grid overflow-hidden grid-cols-2 grid-rows-1 gap-2 w-full h-full">
          <div className="box">
            <div className="flex items-center justify-center flex-col w-full h-full">
              <div className="text-5xl font-bold flex justify-center items-center text-white">
                <div>{title}</div>
                {gen !== undefined && (
                  <div>
                    {gen === 0 && <Gen0 className="h-12 w-12" aria-hidden="true" />}
                    {gen === 1 && <Gen1 className="h-12 w-12" aria-hidden="true" />}
                  </div>
                )}
              </div>
              <span className="text-sm font-semibold text-white">{getEllipsisTxt(owner)}</span>
              <div className="w-full aspect-square">
                {rarity && type && (
                  <Robot
                    rarity={rarity}
                    robotType={type.toLowerCase()}
                    autoRotate={false}
                    piecesStatus={piecesStatus}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="box col-start-2 col-span-2">
            <div className="flex-1 p-4 flex flex-col">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {robotStatus && (
                  <>
                    {robotStatus?.map(({ key, value }) => (
                      <div
                        key={key}
                        className="relative rounded-3xl border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                      >
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            alt="Logo Meka Miners"
                            className="h-full w-full object-contain"
                            src={`/icons-status/${key.toLowerCase()}.png`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="absolute inset-0" aria-hidden="true" />
                          <p className="text-sm font-bold text-gray-900">
                            {statusDescription[key]}
                          </p>
                          <div className="text-sm text-gray-500 truncate">
                            {(() => {
                              switch (key) {
                                case 'Capacity':
                                  return (
                                    <>
                                      {value}
                                      <span>
                                        {piecesStatus &&
                                        piecesStatus.some(
                                          ({ key: pieceKey }) => key === pieceKey
                                        ) ? (
                                          <span className="text-green-500">
                                            +
                                            {(
                                              (value * bonus) / 100 +
                                              (value *
                                                piecesStatus?.find(
                                                  ({ key: pieceKey }) => key === pieceKey
                                                ).value) /
                                                100
                                            ).toFixed(2)}
                                          </span>
                                        ) : (
                                          <span className="text-green-500">
                                            +{((value * bonus) / 100).toFixed(2)}
                                          </span>
                                        )}
                                      </span>
                                    </>
                                  )
                                case 'Efficiency':
                                  return (
                                    <>
                                      <span className="">
                                        {value}
                                        {piecesStatus?.find(({ key: pieceKey }) => key === pieceKey)
                                          ? ''
                                          : 'm'}
                                      </span>
                                      <span className="">
                                        {piecesStatus &&
                                          piecesStatus.some(
                                            ({ key: pieceKey }) => key === pieceKey
                                          ) && (
                                            <span className="text-green-500">
                                              -
                                              {Math.floor(
                                                (value *
                                                  piecesStatus.find(
                                                    ({ key: pieceKey }) => key === pieceKey
                                                  ).value) /
                                                  100
                                              )}
                                              :
                                              {Math.round(
                                                60 *
                                                  ((value *
                                                    piecesStatus.find(
                                                      ({ key: pieceKey }) => key === pieceKey
                                                    ).value) /
                                                    100 -
                                                    Math.floor(
                                                      (value *
                                                        piecesStatus.find(
                                                          ({ key: pieceKey }) => key === pieceKey
                                                        ).value) /
                                                        100
                                                    ))
                                              )}
                                              m
                                            </span>
                                          )}
                                      </span>
                                    </>
                                  )
                                case 'OilDecrease':
                                  return (
                                    <>
                                      <span>{value}</span>
                                      <span className="">
                                        {piecesStatus &&
                                          piecesStatus.some(
                                            ({ key: pieceKey }) => key === pieceKey
                                          ) && (
                                            <span className="text-green-500">
                                              +
                                              {
                                                piecesStatus.find(
                                                  ({ key: pieceKey }) => key === pieceKey
                                                ).value
                                              }
                                              %
                                            </span>
                                          )}
                                      </span>
                                    </>
                                  )
                                case 'Stealthiness':
                                case 'Speed':
                                  return (
                                    <>
                                      {value}
                                      <span>
                                        {piecesStatus &&
                                          piecesStatus.some(
                                            ({ key: pieceKey }) => key === pieceKey
                                          ) && (
                                            <span className="text-green-500">
                                              +
                                              {(
                                                +(
                                                  value *
                                                  piecesStatus?.find(
                                                    ({ key: pieceKey }) => key === pieceKey
                                                  )?.value
                                                ) / 100
                                              ).toFixed(2)}
                                            </span>
                                          )}
                                      </span>
                                    </>
                                  )
                                default:
                                  return <div></div>
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={classNames(
                        'relative rounded-3xl border-2 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2',
                        (rarityInfo[rarity] || rarityInfo.default).bg
                      )}
                    >
                      <div className="flex-1 min-w-0 text-center">
                        <p className="text-3xl font-extrabold text-white">{rarity}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col relative">
              {mode === 4 && (
                <div className="bg-black absolute h-full w-full inset-0 z-10 bg-opacity-50">
                  <div className="flex justify-center items-center h-full w-full text-8xl">
                    <TimerStatus key="timerStatus" time={lastAttachDate} fetch={fetch} />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {type &&
                  piecesDefault
                    .map(item =>
                      piecesStatus?.some(piece => piece.key === item.key)
                        ? piecesStatus?.find(piece => piece.key === item.key)
                        : item
                    )
                    .map(
                      ({
                        key,
                        value,
                        title,
                        season,
                        isDefault,
                        icons = [],
                        id,
                        rarity: rarityPiece
                      }) => (
                        <RobotPiece
                          canAttach={isOwner}
                          robotId={+robotId}
                          robotTypeStatus={key}
                          robotType={type}
                          key={key}
                          value={value}
                          season={season}
                          name={title}
                          isDefault={isDefault}
                          rarity={rarityPiece}
                          pieceId={id}
                          IconPiece={icons[type?.toLowerCase()]}
                        />
                      )
                    )}
              </div>
            </div>
          </div>
        </div>
        {robotStatus && (
          <div className="flex flex-col items-center">
            {price && (
              <div className="mb-3 flex justify-center items-center text-3xl font-semibold text-white">
                {price}
                <img alt="price" className="h-10 w-10 object-contain ml-1" src="/meka.png" />
              </div>
            )}
            <button
              type="button"
              className={classNames(
                'mb-10 flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-full shadow-sm text-black bg-white hover:bg-gray-200 w-24'
              )}
              onClick={async () => {
                if (isOwner) {
                  if (mode === 2) {
                    await robotCancelSale.methods.cancelSale(+robotId).send({
                      from: wallet
                    })
                    // await fetchMeka({
                    //   params: {
                    //     params: {
                    //       _tokenId: robotId
                    //     }
                    //   }
                    // })
                  } else {
                    await robotMarketplace.methods
                      .createSale(+robotId, Moralis.Units.ETH(400))
                      .send({
                        from: wallet,
                        value: Moralis.Units.ETH(0.005)
                      })
                  }
                } else {
                  if (mode === 2) {
                    fetchMekaAllowance({
                      onSuccess: async (result: string | number) => {
                        if (Moralis.Units.FromWei(result, 18) < 5) await fetchMekaApprove()
                        await robotCancelSale.methods.bid(+robotId, Moralis.Units.ETH(price)).send({
                          from: wallet,
                          value: Moralis.Units.ETH(0.005)
                        })
                      }
                    })
                  }
                }
              }}
            >
              {!isOwner && 'Buy'}
              {isOwner && (mode === 2 ? 'Cancel' : 'Sell')}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default RobotsDetail
