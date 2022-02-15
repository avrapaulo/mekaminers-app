import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMoralisCloudFunction, useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { walletAtom, defaultWallet, mekaAtom } from 'recoil/atoms'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { MiniHeader } from 'components/inventory/header-mini'
import { inventory } from 'constants/menu'
import { shard } from 'constants/shards'
import { toolDescription } from 'constants/tools'
import { useMeka, UseBalanceOf } from 'hooks'
import { abi } from 'contracts/MekaDeployer.json'
import { Notification } from 'components/notification'
import { classNames } from 'helpers/class-names'

interface ToolsProps {
  value: number
  key: string
}

const amountToApprove = 1000000

const Tools = () => {
  const { web3, isWeb3Enabled, isAuthenticated, Moralis } = useMoralis()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const wallet = useRecoilValue(walletAtom)
  const [isLoading, setIsLoading] = useState(false)
  const { fetchBalanceOf } = UseBalanceOf()
  const setMekaAtom = useSetRecoilState(mekaAtom)

  const { fetch, data } = useMoralisCloudFunction('getUtilities')
  const { fetchMeka: fetchMekaAllowance } = useMeka({
    functionName: 'allowance',
    params: {
      spender: process.env.NEXT_PUBLIC_PIECE_ADDRESS,
      owner: wallet
    }
  })
  const { fetchMeka: fetchMekaApprove } = useMeka({
    functionName: 'approve',
    params: {
      spender: process.env.NEXT_PUBLIC_PIECE_ADDRESS,
      amount: Moralis.Units.ETH(amountToApprove)
    }
  })

  const { fetch: fetchMintPieceFromFarm } = useMoralisCloudFunction(
    'mintPieceFromFarm',
    { amount: Moralis.Units.ETH('5') },
    { autoFetch: false }
  )

  const { fetch: createPiece } = useWeb3ExecuteFunction({
    contractAddress: process.env.NEXT_PUBLIC_MEKADEPLOYER_ADDRESS,
    functionName: 'createPiece',
    abi
  })

  useEffect(() => {
    const fetchTools = async () => {
      await fetch()
      setIsLoadingPage(false)
    }
    if (wallet !== defaultWallet && isWeb3Enabled && isAuthenticated) {
      fetchTools()
    } else {
      setIsLoadingPage(false)
    }
  }, [web3, isWeb3Enabled, wallet, isAuthenticated, fetch])

  return (
    <>
      <MiniHeader menu={inventory} />
      {data === null || (data as ToolsProps[])?.length === 0 ? (
        isLoadingPage || data === null ? (
          <div className="flex h-full justify-center items-center animation-y">
            <div className="h-40 w-40 relative">
              <img alt="" src={'/meka.png'} />
            </div>
          </div>
        ) : (
          <div className="uppercase flex justify-center items-center text-white font-bold -z-10">
            <img alt="" width="500" src="/empty.png" />
          </div>
        )
      ) : (
        <Layout>
          <>
            {(data as ToolsProps[])?.map(({ key, value }) => (
              <div key={key} className="flex justify-center">
                <Card
                  description={shard[key] || key}
                  imageCard={<img alt="" className="p-5" src={`/${key.toLowerCase()}.png`} />}
                >
                  <div className="flex-1 p-4 flex flex-col mt-5">
                    <div className="h-full flex justify-between flex-col">
                      <div className="space-y-1 flex flex-col items-center">
                        {key === 'PieceShards' && value >= 60 ? (
                          <div className={classNames(!isLoading ? '' : 'cursor-not-allowed')}>
                            <div
                              className={classNames(
                                'flex-shrink-0 px-4 py-4 flex justify-end',
                                !isLoading ? '' : 'pointer-events-none'
                              )}
                            >
                              <button
                                type="button"
                                className={
                                  'flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28'
                                }
                                onClick={() => {
                                  setIsLoading(true)
                                  fetchMekaAllowance({
                                    onSuccess: async (result: string | number) => {
                                      if (+Moralis.Units.FromWei(result, 18) < 5) {
                                        await fetchMekaApprove()
                                      }
                                      fetchMintPieceFromFarm({
                                        onSuccess: async (result: any) => {
                                          if (result.status) {
                                            await createPiece({
                                              params: {
                                                params: {
                                                  _fromFarm: 'false',
                                                  _amount: Moralis.Units.ETH(5),
                                                  _nonce: result.nonce,
                                                  _signature: result.signature
                                                }
                                              },
                                              onSuccess: async () => {
                                                toast.custom(
                                                  t => (
                                                    <Notification
                                                      isShow={t.visible}
                                                      icon="success"
                                                      title="Minted"
                                                      description={
                                                        <div className="flex flex-row items-center">
                                                          Your Piece will be send in few minutes
                                                        </div>
                                                      }
                                                    />
                                                  ),
                                                  { duration: 3000 }
                                                )
                                                fetch()
                                                setIsLoading(false)
                                                fetchBalanceOf({
                                                  onSuccess: result =>
                                                    setMekaAtom(
                                                      Math.floor(
                                                        +Moralis.Units.FromWei(+result, 18)
                                                      )
                                                    ),
                                                  onError: e => console.log(e)
                                                })
                                              },
                                              onError: e => {
                                                setIsLoading(false)
                                                console.log(e)
                                              }
                                            })
                                          } else {
                                            setIsLoading(false)
                                            toast.custom(
                                              t => (
                                                <Notification
                                                  isShow={t.visible}
                                                  icon="error"
                                                  title="Minted"
                                                  description={
                                                    <div className="flex flex-row items-center">
                                                      {result.message}
                                                    </div>
                                                  }
                                                />
                                              ),
                                              { duration: 3000 }
                                            )
                                          }
                                        },
                                        onError: e => {
                                          setIsLoading(false)
                                          console.log(e)
                                        }
                                      })
                                    },
                                    onError: () => setIsLoading(false)
                                  })
                                }}
                              >
                                Mint
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">{toolDescription[key]}</div>
                        )}
                      </div>
                      <div className="text-sm font-medium text-right">( x{value} )</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </>
        </Layout>
      )}
    </>
  )
}

export default Tools
