import { MiniHeader } from 'components/inventory/header-mini'
import { junkyard } from 'constants/menu'
import { classNames } from 'helpers/class-names'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { hasNftAtom, walletAtom, mekaAtom, oreAtom } from 'recoil/atoms'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useMoralisCloudFunction, useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { useMeka, UseBalanceOf } from 'hooks'
import { abi } from 'contracts/MekaDeployer.json'
import { Notification } from 'components/notification'

const amountToApprove = 1000000
const oresPrice = 10000
const robotMax = 10

const Boxes = () => {
  const { Moralis } = useMoralis()
  const wallet = useRecoilValue(walletAtom)
  const [isLoading, setIsLoading] = useState(false)
  const { fetchBalanceOf } = UseBalanceOf()
  const [meka, setMekaAtom] = useRecoilState(mekaAtom)
  const ore = useRecoilValue(oreAtom)
  const [hasNft, setHasNft] = useRecoilState(hasNftAtom)

  const { fetchMeka: fetchMekaAllowance } = useMeka({
    functionName: 'allowance',
    params: {
      spender: process.env.NEXT_PUBLIC_ROBOT_ADDRESS,
      owner: wallet
    }
  })
  const { fetchMeka: fetchMekaApprove } = useMeka({
    functionName: 'approve',
    params: {
      spender: process.env.NEXT_PUBLIC_ROBOT_ADDRESS,
      amount: Moralis.Units.ETH(amountToApprove)
    }
  })

  const { fetch: fetchMintRobotFromBox } = useMoralisCloudFunction(
    'mintRobotFromBox',
    {},
    { autoFetch: false }
  )

  const { fetch: createRobot } = useWeb3ExecuteFunction({
    contractAddress: process.env.NEXT_PUBLIC_MEKADEPLOYER_ADDRESS,
    functionName: 'createRobot',
    abi
  })

  return (
    <>
      <MiniHeader menu={junkyard} />
      <Layout>
        <>
          <Card description={''} imageCard={<img alt="" src="/box-ore.png" />}>
            <>
              <div className="text-center px-4">
                An exclusive chance for beginners to buy a mighty Mekabot for a cheap price.
              </div>
              <div className="flex-1 px-4 pt-4 pb-1 flex flex-col">
                <div className="h-full flex justify-between flex-col">
                  <div className="flex justify-center items-center mb-1">
                    <div className={classNames(hasNft === 0 ? '' : 'cursor-not-allowed')}>
                      <button
                        type="button"
                        onClick={async () => {
                          if (ore < oresPrice) {
                            return toast.custom(
                              t => (
                                <Notification
                                  onClickClose={() => toast.dismiss(t.id)}
                                  isShow={t.visible}
                                  icon="error"
                                  title="Box"
                                  description={
                                    <div className="flex flex-row items-center">
                                      You need more
                                      <img
                                        alt="Logo"
                                        className="h-6 w-6 object-contain"
                                        src="/ore.png"
                                      />
                                    </div>
                                  }
                                />
                              ),
                              { duration: 3000 }
                            )
                          }

                          setIsLoading(true)
                          try {
                            const mekaAllowanceResult: any = await fetchMekaAllowance()
                            if (+Moralis.Units.FromWei(mekaAllowanceResult, 18) < 5) {
                              const mekaApproveWait: any = await fetchMekaApprove()
                              await mekaApproveWait?.wait()
                            }
                            await fetchMintRobotFromBox({
                              params: { withOres: true, amount: Moralis.Units.ETH('5') },
                              onSuccess: async (result: any) => {
                                if (result.status) {
                                  const createRobotWait: any = await createRobot({
                                    params: {
                                      params: {
                                        _withOre: true,
                                        _amount: Moralis.Units.ETH(5),
                                        _nonce: result.nonce,
                                        _signature: result.signature
                                      }
                                    }
                                  })
                                  const createRobotResult: any = await createRobotWait?.wait()
                                  if (createRobotResult?.status === 1) {
                                    toast.custom(
                                      t => (
                                        <Notification
                                          onClickClose={() => toast.dismiss(t.id)}
                                          isShow={t.visible}
                                          icon="success"
                                          title="Minted"
                                          description={
                                            <div className="flex flex-row items-center">
                                              Your Robot will be sent in few seconds
                                            </div>
                                          }
                                        />
                                      ),
                                      { duration: 3000 }
                                    )
                                    setHasNft(1)
                                  }
                                } else {
                                  toast.custom(
                                    t => (
                                      <Notification
                                        onClickClose={() => toast.dismiss(t.id)}
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
                                setIsLoading(false)
                              },
                              onError: e => {
                                setIsLoading(false)
                                console.log(e)
                              }
                            })
                          } catch (error) {}
                        }}
                        className={classNames(
                          'w-32 inline-flex justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded-md shadow-sm text-black bg-white hover:bg-gray-200',
                          isLoading ? 'animate-pulse bg-gray-100 pointer-events-none' : '',
                          hasNft !== 0 ? 'pointer-events-none bg-gray-500' : ''
                        )}
                      >
                        10000 <img alt="Logo" className="h-6 w-6 object-contain" src="/ore.png" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm px-4 pb-3 font-bold">(One-time purchase)</div>
            </>
          </Card>
          <Card description={''} imageCard={<img alt="" src="/box-meka.png" />}>
            <>
              <div className="text-center px-4">
                Here lies a mighty Mekabot! Do you have what it takes to activate it?
              </div>
              <div className="flex-1 px-4 pt-4 pb-1 flex flex-col">
                <div className="h-full flex justify-between flex-col">
                  <div className="flex justify-center items-center mb-1">
                    <div className={classNames(hasNft >= robotMax ? 'cursor-not-allowed' : '')}>
                      <button
                        type="button"
                        className={classNames(
                          'w-32 inline-flex justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded-md shadow-sm text-black bg-white hover:bg-gray-200',
                          isLoading ? 'animate-pulse bg-gray-100 pointer-events-none' : '',
                          hasNft < robotMax ? '' : 'pointer-events-none bg-gray-500'
                        )}
                        onClick={async () => {
                          if (meka < 65) {
                            return toast.custom(
                              t => (
                                <Notification
                                  onClickClose={() => toast.dismiss(t.id)}
                                  isShow={t.visible}
                                  icon="error"
                                  title="Box"
                                  description={
                                    <div className="flex flex-row items-center">
                                      You need to have 65
                                      <img
                                        alt="Logo"
                                        className="h-6 w-6 object-contain"
                                        src="/meka.png"
                                      />
                                    </div>
                                  }
                                />
                              ),
                              { duration: 3000 }
                            )
                          }
                          setIsLoading(true)
                          try {
                            const mekaAllowanceResult: any = await fetchMekaAllowance()
                            if (+Moralis.Units.FromWei(mekaAllowanceResult, 18) < 5) {
                              const mekaApproveWait: any = await fetchMekaApprove()
                              await mekaApproveWait?.wait()
                            }
                            await fetchMintRobotFromBox({
                              params: { withOres: false, amount: Moralis.Units.ETH('65') },
                              onSuccess: async (result: any) => {
                                if (result.status) {
                                  const createRobotWait: any = await createRobot({
                                    params: {
                                      params: {
                                        _withOre: false,
                                        _amount: Moralis.Units.ETH(65),
                                        _nonce: result.nonce,
                                        _signature: result.signature
                                      }
                                    }
                                  })
                                  const createRobotResult: any = await createRobotWait?.wait()
                                  if (createRobotResult?.status === 1) {
                                    toast.custom(
                                      t => (
                                        <Notification
                                          onClickClose={() => toast.dismiss(t.id)}
                                          isShow={t.visible}
                                          icon="success"
                                          title="Minted"
                                          description={
                                            <div className="flex flex-row items-center">
                                              Your Robot will be sent in few seconds
                                            </div>
                                          }
                                        />
                                      ),
                                      { duration: 3000 }
                                    )
                                    const balanceOfResult: any = await fetchBalanceOf()
                                    setMekaAtom(
                                      Math.floor(+Moralis.Units.FromWei(balanceOfResult, 18))
                                    )
                                    setHasNft(hasNft + 1)
                                  }
                                } else {
                                  toast.custom(
                                    t => (
                                      <Notification
                                        onClickClose={() => toast.dismiss(t.id)}
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
                                setIsLoading(false)
                              },
                              onError: e => {
                                setIsLoading(false)
                                console.log(e)
                              }
                            })
                          } catch (error) {}
                        }}
                      >
                        65 <img alt="Logo" className="h-6 w-6 object-contain" src="/meka.png" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </Card>
        </>
      </Layout>
    </>
  )
}

export default Boxes