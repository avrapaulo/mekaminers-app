import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useMoralisCloudFunction, useWeb3ExecuteFunction, useMoralis } from 'react-moralis'
import toast from 'react-hot-toast'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ArrowDownIcon, SwitchVerticalIcon } from '@heroicons/react/solid'
import { walletCoins } from 'recoil/selector'
import { currentFeeAtom, walletAtom, mekaAtom, swapAtom, isOresAtom } from 'recoil/atoms'
import { classNames } from 'helpers/class-names'
import { Notification } from 'components/notification'
import { abi } from 'contracts/MekaDeployer.json'
import { useMeka, UseBalanceOf } from 'hooks'

const amountToApprove = 10000

export const SwapModal = () => {
  const { Moralis } = useMoralis()
  const wallet = useRecoilValue(walletAtom)
  const [open, setOpen] = useRecoilState(swapAtom)
  const [isOres, setIsOres] = useRecoilState(isOresAtom)
  const [first, setFirst] = useState<number>(0)
  const [second, setSecond] = useState<number>(0)
  const { meka, ore } = useRecoilValue(walletCoins)
  const feeAtom = useRecoilValue(currentFeeAtom)
  const setMekaAtom = useSetRecoilState(mekaAtom)
  const { fetchBalanceOf } = UseBalanceOf()

  const { fetch: fetchSignatureFromMeka } = useMoralisCloudFunction(
    'convertFromMeka',
    {},
    { autoFetch: false }
  )
  const { fetch: fetchSignatureToMeka } = useMoralisCloudFunction(
    'convertToMeka',
    {},
    { autoFetch: false }
  )

  const { fetch: fetchConvert } = useWeb3ExecuteFunction({
    contractAddress: process.env.NEXT_PUBLIC_MEKADEPLOYER_ADDRESS,
    functionName: !isOres ? 'convertFromMeka' : 'convertToMeka',
    abi
  })

  const { fetchMeka: fetchMekaAllowance } = useMeka({
    functionName: 'allowance',
    params: {
      spender: process.env.NEXT_PUBLIC_MEKADEPLOYER_ADDRESS,
      owner: wallet
    }
  })

  const { fetchMeka: fetchMekaApprove } = useMeka({
    functionName: 'approve',
    params: {
      spender: process.env.NEXT_PUBLIC_MEKADEPLOYER_ADDRESS,
      amount: Moralis.Units.ETH(amountToApprove)
    }
  })

  useEffect(() => {
    setFirst(0)
    setSecond(0)
  }, [isOres])

  const calcTrade = ({
    isOres,
    type,
    value
  }: {
    isOres: boolean
    type: 'ore' | 'meka'
    value: number
  }) => {
    console.log(feeAtom)
    const conversionFeeWithPercentage = isOres ? 1 - 300 / (300 * (1 + feeAtom)) : 0
    const conversionFeeWithoutPercentage = isOres ? feeAtom : 0
    const conversionRate = isOres ? 300 : 60

    if (type === 'ore') {
      return +((+value * (1 - conversionFeeWithPercentage)) / conversionRate).toFixed(5)
    }
    if (type === 'meka') {
      return +(+value * (1 + conversionFeeWithoutPercentage) * conversionRate).toFixed(5)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-xl md:px-4 md:my-8 md:align-middle lg:max-w-2xl">
              <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 focus:outline-none focus:ring-black focus:border-black"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="mx-auto">
                  <h2 className="text-2xl font-extrabold text-gray-900 text-center">Swap</h2>

                  <section aria-labelledby="options-heading" className="my-6">
                    <div className="flex justify-end cursor-pointer">
                      <span
                        className="text-sm text-gray-500"
                        onClick={() => {
                          setFirst(isOres ? ore : meka)
                          setSecond(
                            calcTrade({
                              isOres,
                              type: isOres ? 'ore' : 'meka',
                              value: isOres ? ore : meka
                            })
                          )
                        }}
                      >
                        Max
                      </span>
                    </div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {isOres ? (
                          <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                        ) : (
                          <img alt="" className="h-6 w-6 object-contain" src="/meka.png" />
                        )}
                      </div>
                      <input
                        type="number"
                        className="block w-full font-semibold pl-10 text-md text-right border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        placeholder="0.0"
                        value={first}
                        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                          setFirst(+value)
                          setSecond(
                            calcTrade({ isOres, type: isOres ? 'ore' : 'meka', value: +value })
                          )
                        }}
                      />
                    </div>
                  </section>
                  <div className="flex items-center justify-center">
                    <div
                      className="group mx-auto cursor-pointer"
                      onClick={() => {
                        setSecond(first)
                        setFirst(
                          calcTrade({
                            isOres: !isOres,
                            type: isOres ? 'ore' : 'meka',
                            value: first
                          })
                        )
                        setIsOres(!isOres)
                      }}
                    >
                      <ArrowDownIcon className="h-6 w-6 group-hover:hidden" aria-hidden="true" />
                      <SwitchVerticalIcon
                        className="h-6 w-6 hidden group-hover:block"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <section aria-labelledby="options-heading" className="mt-6">
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {isOres ? (
                          <img alt="" className="h-6 w-6 object-contain" src="/meka.png" />
                        ) : (
                          <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                        )}
                      </div>
                      <input
                        type="number"
                        className="block w-full pl-10 font-semibold text-md text-right border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        placeholder="0.0"
                        value={second}
                        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                          setFirst(
                            calcTrade({
                              isOres,
                              type: !isOres ? 'ore' : 'meka',
                              value: +value
                            })
                          )
                          setSecond(+value)
                        }}
                      />
                    </div>
                  </section>
                  <div className="flex items-center justify-center mt-5">
                    <button
                      type="button"
                      className={classNames(
                        'flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-white bg-black hover:bg-gray-800 w-24'
                      )}
                      onClick={() => {
                        if (!isOres) {
                          if (first < 10) {
                            return toast.custom(
                              t => (
                                <Notification
                                  isShow={t.visible}
                                  icon="error"
                                  title="Swap"
                                  description={
                                    <div className="flex flex-row items-center">
                                      Minimum amount required 10
                                      <img
                                        alt=""
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
                          fetchMekaAllowance({
                            onSuccess: async (result: string | number) => {
                              if (Moralis.Units.FromWei(result, 18) < first) {
                                await fetchMekaApprove()
                              }
                              fetchSignatureFromMeka({
                                params: { amount: Moralis.Units.ETH(first) },
                                onSuccess: async (result: any) => {
                                  await fetchConvert({
                                    params: {
                                      params: {
                                        _amount: Moralis.Units.ETH(first),
                                        _nonce: result.nonce,
                                        _signature: result.signature
                                      }
                                    },
                                    onSuccess: () => {
                                      fetchBalanceOf({
                                        onSuccess: result =>
                                          setMekaAtom(
                                            Math.floor(Moralis.Units.FromWei(+result, 18))
                                          ),
                                        onError: e => console.log(e)
                                      })
                                      toast.custom(
                                        t => (
                                          <Notification
                                            isShow={t.visible}
                                            icon="success"
                                            title="Swap"
                                            description={
                                              <div className="flex flex-row items-center">
                                                <img
                                                  alt=""
                                                  className="h-6 w-6 object-contain"
                                                  src="/ore.png"
                                                />
                                                It make take some time!!
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
                          })
                        } else {
                          fetchSignatureToMeka({
                            params: { amount: first },
                            onSuccess: (result: any) => {
                              if (result) {
                                fetchConvert({
                                  params: {
                                    params: {
                                      _amount: result.amount,
                                      _nonce: result.nonce,
                                      _signature: result.signature,
                                      _receiver: wallet
                                    }
                                  },
                                  onSuccess: () =>
                                    toast.custom(
                                      t => (
                                        <Notification
                                          isShow={t.visible}
                                          icon="success"
                                          title="Swap"
                                          description={
                                            <div className="flex flex-row items-center">
                                              <img
                                                alt=""
                                                className="h-6 w-6 object-contain"
                                                src="/meka.png"
                                              />
                                              It make take some time!!
                                            </div>
                                          }
                                        />
                                      ),
                                      { duration: 3000 }
                                    )
                                })
                              } else {
                                toast.custom(
                                  t => (
                                    <Notification
                                      isShow={t.visible}
                                      icon="error"
                                      title="Swap"
                                      description={
                                        <div className="flex flex-row items-center">Try later!</div>
                                      }
                                    />
                                  ),
                                  { duration: 3000 }
                                )
                              }
                            }
                          })
                        }
                      }}
                    >
                      Swap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
