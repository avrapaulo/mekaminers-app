/* eslint-disable indent */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMoralisCloudFunction, useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { Piece } from 'components/3D'
import { classNames } from 'helpers/class-names'
import { walletAtom, priceModalAtom, mekaAtom } from 'recoil/atoms'
import { getEllipsisTxt } from 'helpers/formatters'
import { statusDescription } from 'constants/status'
import { rarityInfo } from 'constants/rarity'
import { ModalPrice } from 'components/modal'
import { abi as pieceMarketplaceAbi } from 'contracts/PieceMarketplace.json'
import { abi as pieceAbi } from 'contracts/PieceCore.json'
import { useMeka, UseBalanceOf } from 'hooks'
import { PiecesDetails } from 'constants/robots-pieces'
import { Notification } from 'components/notification'
import { Mode } from 'components/card/mode'

interface PiecesProps {
  piece: {
    bonus: number
    price: number
    mode: number
    title: string
    owner: string
    rarity: string
    type: string
    piecesStatus: any[]
  }
  isOwner: boolean
}

const amountToApprove = 1000000

export const PieceDetail = () => {
  const router = useRouter()
  const { id, market } = router.query
  const { web3, Moralis } = useMoralis()
  const { fetchBalanceOf } = UseBalanceOf()
  const wallet = useRecoilValue(walletAtom)
  const priceModal = useSetRecoilState(priceModalAtom)
  const setMekaAtom = useSetRecoilState(mekaAtom)

  const { data, fetch } = useMoralisCloudFunction(
    'getPieceDetail',
    { tokenId: +id },
    { autoFetch: false }
  )

  const pieceMarketplace = new web3.eth.Contract(
    pieceAbi as AbiItem[],
    process.env.NEXT_PUBLIC_PIECE_ADDRESS
  )

  const pieceCancelSale = new web3.eth.Contract(
    pieceMarketplaceAbi as AbiItem[],
    process.env.NEXT_PUBLIC_PIECE_MARKETPLACE
  )

  const { fetch: bidPiece } = useWeb3ExecuteFunction({
    contractAddress: process.env.NEXT_PUBLIC_PIECE_MARKETPLACE,
    functionName: 'bid',
    abi: pieceMarketplaceAbi
  })

  const { fetchMeka: fetchMekaAllowance } = useMeka({
    functionName: 'allowance',
    params: {
      spender: process.env.NEXT_PUBLIC_PIECE_MARKETPLACE,
      owner: wallet
    }
  })

  const { fetchMeka: fetchMekaApprove } = useMeka({
    functionName: 'approve',
    params: {
      spender: process.env.NEXT_PUBLIC_PIECE_MARKETPLACE,
      amount: Moralis.Units.ETH(amountToApprove)
    }
  })

  useEffect(() => {
    fetch()
  }, [fetch])

  const {
    piece: { title = ' ', owner, rarity, type, bonus, price, mode, piecesStatus },
    isOwner
  } = (data || { piece: {} }) as PiecesProps

  return (
    <>
      <ModalPrice
        callback={async number => {
          await pieceMarketplace.methods.createSale(+id, Moralis.Units.ETH(number)).send({
            from: wallet,
            value: Moralis.Units.ETH(0.005)
          })
          toast.custom(
            t => (
              <Notification
                isShow={t.visible}
                icon="success"
                title="Sell"
                description={
                  <div className="flex flex-row items-center">
                    Piece listed for {number}
                    <img alt="" className="h-6 w-6 object-contain" src="/meka.png" />
                  </div>
                }
              />
            ),
            { duration: 3000 }
          )
        }}
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-white w-full h-full">
        <div className="flex relative">
          <Link href={market ? '/marketplace/pieces' : '/inventory/pieces'}>
            <a className="flex flex-row text-white font-bold text-2xl justify-center items-center">
              <div className="w-8 h-8">
                <ChevronLeftIcon className="text-tree-poppy" />
              </div>
              Go back
            </a>
          </Link>
          <Mode modeId={mode} />
        </div>
        <div className="flex flex-col lg:grid overflow-hidden grid-cols-2 grid-rows-1 gap-2 w-full">
          <div className="box">
            <div className="flex items-center justify-center flex-col w-full h-full">
              <div className="text-5xl font-bold">{title}</div>
              <span className="text-sm font-semibold mt-1">{getEllipsisTxt(owner)}</span>
              <div className="w-full aspect-square">
                {rarity && type && (
                  <Piece
                    rarity={rarity}
                    robotType={type.toLowerCase()}
                    pieceId={piecesStatus[0]?.id}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="box col-start-2 col-span-2">
            <div className="flex-1 p-4 flex flex-col">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {piecesStatus && piecesStatus.length !== 0 && (
                  <>
                    <div className="relative rounded-3xl border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          alt=""
                          className="h-full w-full object-contain"
                          src={`/icons-status/${piecesStatus[0]?.key.toLowerCase()}.png`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-bold text-gray-900">
                          {statusDescription[piecesStatus[0]?.key]}
                        </p>
                        <div className="text-sm text-gray-500 truncate">
                          {piecesStatus[0]?.value}%
                        </div>
                      </div>
                    </div>
                    <div className="relative rounded-3xl border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          alt=""
                          className="h-full w-full object-contain"
                          src="/icons-status/season.png"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-extrabold text-black">
                          {piecesStatus[0]?.season}
                        </p>
                      </div>
                    </div>
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
                    <div
                      className={classNames(
                        'relative rounded-3xl border-2 px-6 py-5 shadow-sm flex items-center space-x-3 bg-white hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2'
                      )}
                    >
                      <div className="flex-1 min-w-0 text-center">
                        <p className="text-3xl font-extrabold text-black">{type}</p>
                      </div>
                    </div>
                    <div
                      className={classNames(
                        'relative col-span-2 rounded-3xl border-2 px-6 py-5 shadow-sm flex items-center space-x-3 bg-white hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2'
                      )}
                    >
                      <div className="flex-1 min-w-0 text-center">
                        <p className="text-xl font-extrabold text-black">
                          {PiecesDetails[piecesStatus[0].key]}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {piecesStatus && (mode === 2 || isOwner) && (
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
                    if (mode !== 4) {
                      if (isOwner) {
                        if (mode === 2) {
                          await pieceCancelSale.methods.cancelSale(+id).send({
                            from: wallet
                          })
                          toast.custom(
                            t => (
                              <Notification
                                isShow={t.visible}
                                icon="success"
                                title="Sell"
                                description={
                                  <div className="flex flex-row items-center">
                                    You remove your piece from market
                                  </div>
                                }
                              />
                            ),
                            { duration: 3000 }
                          )
                        } else {
                          priceModal(true)
                        }
                      } else {
                        if (mode === 2) {
                          fetchMekaAllowance({
                            onSuccess: async (result: string | number) => {
                              if (Moralis.Units.FromWei(result, 18) < price) {
                                await fetchMekaApprove()
                              }
                              bidPiece({
                                params: {
                                  params: { _amount: Moralis.Units.ETH(price), _tokenId: +id },
                                  msgValue: Moralis.Units.ETH(0.005)
                                } as any,
                                onSuccess: () => {
                                  fetchBalanceOf({
                                    onSuccess: result =>
                                      setMekaAtom(Math.floor(Moralis.Units.FromWei(+result, 18))),
                                    onError: e => console.log(e)
                                  })
                                  toast.custom(
                                    t => (
                                      <Notification
                                        isShow={t.visible}
                                        icon="success"
                                        title="Bought"
                                        description={
                                          <div className="flex flex-row items-center">
                                            Piece will be ready in few minutes
                                          </div>
                                        }
                                      />
                                    ),
                                    { duration: 3000 }
                                  )
                                }
                              })
                            }
                          })
                        }
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
        </div>
      </div>
    </>
  )
}
