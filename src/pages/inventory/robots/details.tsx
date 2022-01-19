/* eslint-disable indent */
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useMoralisCloudFunction } from 'react-moralis'
import { Robot } from 'components/3D'
import { classNames } from 'helpers/class-names'
import { defaultWallet } from 'recoil/atoms'
import { getEllipsisTxt } from 'helpers/formatters'
import { statusDescription } from 'constants/status'
import { rarityInfo } from 'constants/rarity'
import { RobotPiece } from 'components/details/robot-piece'
import { piecesDefault } from 'constants/robots-pieces'
import { Slide } from 'components/details/slide'
import { useEffect } from 'react'

interface RobotProps {
  bonus: number
  title: string
  owner: string
  rarity: string
  type: string
  robotStatus: { key: string; value: number }[]
  piecesStatus: any[]
}

const RobotsDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, fetch } = useMoralisCloudFunction(
    'getMintedRobots',
    { tokenIds: [+id] },
    { autoFetch: false }
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  const {
    title = ' ',
    owner,
    rarity,
    type,
    robotStatus,
    bonus,
    piecesStatus = []
  } = ((data && data[0]) as RobotProps) || ({ owner: defaultWallet } as RobotProps)

  return (
    <>
      <Slide />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-white w-full h-full">
        <div className="flex">
          <Link href="/inventory/robots">
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
              <div className="text-5xl font-bold">{title}</div>
              <span className="text-sm font-semibold">{getEllipsisTxt(owner)}</span>
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
              <button
                type="button"
                className={classNames(
                  'w-32 mb-10 inline-flex justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded-full shadow-sm text-black bg-white hover:bg-gray-200',
                  'cursor-not-allowed'
                )}
              >
                Sell
              </button>
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
                                              {(value *
                                                piecesStatus.find(
                                                  ({ key: pieceKey }) => key === pieceKey
                                                ).value) /
                                                100}
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
            <div className="flex-1 p-4 flex flex-col h-full w-full">
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
                          robotId={+id}
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
      </div>
    </>
  )
}

export default RobotsDetail
