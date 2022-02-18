import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useMoralisCloudFunction, useWeb3ExecuteFunction, useMoralis } from 'react-moralis'
import toast from 'react-hot-toast'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline'
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
  const [first, setFirst] = useState<number | string>()
  const [second, setSecond] = useState<number | string>()
  const { meka, ore } = useRecoilValue(walletCoins)
  const { fee: feeAtom, lastWithdraw } = useRecoilValue(currentFeeAtom)
  const setMekaAtom = useSetRecoilState(mekaAtom)
  const { fetchBalanceOf } = UseBalanceOf()
  const [isLoading, setIsLoading] = useState(false)

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
  }, [open])

  const conversionFeeWithPercentage = isOres ? 1 - 300 / (300 * (1 + feeAtom)) : 0
  const conversionFeeWithoutPercentage = isOres ? feeAtom : 0
  const conversionRate = isOres ? 300 : 60

  const calcTrade = ({ type, value }: { type: 'ore' | 'meka'; value: number }) => {
    if (type === 'ore') {
      return +((+value * (1 - conversionFeeWithPercentage)) / conversionRate).toFixed(5)
    }
    if (type === 'meka') {
      return +(+value * (1 + conversionFeeWithoutPercentage) * conversionRate).toFixed(5)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
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
              <div className="w-full relative flex flex-col items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 lg:pb-2">
                <div className="absolute top-1 left-1 text-xs text-red-600">
                  {isOres
                    ? '*If you cancel or reject the transaction you will not be able to use Ores for 10 min'
                    : '*If you cancel or reject the transaction will have to wait 10 min to try again'}
                </div>
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
                        type="text"
                        className="block w-full font-semibold pl-10 text-md text-right border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        value={first}
                        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                          if (value === '') {
                            setFirst('')
                            setSecond(0)
                            return
                          }
                          if (/^(\d*\.)?\d+$/.test(value)) {
                            setFirst(+value)
                            setSecond(calcTrade({ type: isOres ? 'ore' : 'meka', value: +value }))
                          }
                        }}
                      />
                    </div>
                  </section>
                  <div className="flex items-center justify-center">
                    <div
                      className="group mx-auto cursor-pointer"
                      onClick={() => {
                        setSecond(0)
                        setFirst(0)
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
                        type="text"
                        className="block w-full pl-10 font-semibold text-md text-right border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        value={second}
                        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                          if (value === '') {
                            setFirst(0)
                            setSecond('')
                            return
                          }
                          if (/^(\d*\.)?\d+$/.test(value)) {
                            setFirst(
                              calcTrade({
                                type: !isOres ? 'ore' : 'meka',
                                value: +value
                              })
                            )
                            setSecond(+value)
                          }
                        }}
                      />
                    </div>
                  </section>
                  <div className="flex items-center justify-center mt-5">
                    <button
                      type="button"
                      className={classNames(
                        'flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-white bg-black hover:bg-gray-800 w-24',
                        isLoading ? 'animate-pulse bg-gray-100 pointer-events-none' : ''
                      )}
                      onClick={async () => {
                        setIsLoading(true)
                        if (!isOres) {
                          if (first > meka) {
                            setIsLoading(false)
                            return toast.custom(
                              t => (
                                <Notification
                                  onClickClose={() => toast.dismiss(t.id)}
                                  isShow={t.visible}
                                  icon="error"
                                  title="Swap"
                                  description={
                                    <div className="flex flex-row items-center">
                                      You need more
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
                          if (first < 10) {
                            setIsLoading(false)
                            return toast.custom(
                              t => (
                                <Notification
                                  onClickClose={() => toast.dismiss(t.id)}
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

                          try {
                            const mekaAllowanceResult: any = await fetchMekaAllowance()
                            if (+Moralis.Units.FromWei(mekaAllowanceResult, 18) < first) {
                              const mekaApproveWait: any = await fetchMekaApprove()
                              await mekaApproveWait?.wait()
                            }

                            await fetchSignatureFromMeka({
                              params: { amount: Moralis.Units.ETH(first) },
                              onError: () => setIsLoading(false),
                              onSuccess: async (result: any) => {
                                if (!result.status) {
                                  setIsLoading(false)
                                  return toast.custom(
                                    t => (
                                      <Notification
                                        onClickClose={() => toast.dismiss(t.id)}
                                        isShow={t.visible}
                                        icon="error"
                                        title="Swap"
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
                                try {
                                  const convertWait: any = await fetchConvert({
                                    params: {
                                      params: {
                                        _amount: Moralis.Units.ETH(first),
                                        _nonce: result.nonce,
                                        _signature: result.signature
                                      }
                                    }
                                  })
                                  const convertResult: any = await convertWait?.wait()
                                  if (convertResult?.status === 1) {
                                    const balanceOfResult: any = await fetchBalanceOf()
                                    setMekaAtom(
                                      Math.floor(+Moralis.Units.FromWei(balanceOfResult, 18))
                                    )
                                    toast.custom(
                                      t => (
                                        <Notification
                                          onClickClose={() => toast.dismiss(t.id)}
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
                                              It may take some time!!
                                            </div>
                                          }
                                        />
                                      ),
                                      { duration: 3000 }
                                    )
                                    setOpen(false)
                                  }
                                } catch {}
                                setIsLoading(false)
                              }
                            })
                          } catch {
                            return setIsLoading(false)
                          }
                        } else {
                          if (first > ore) {
                            setIsLoading(false)
                            return toast.custom(
                              t => (
                                <Notification
                                  onClickClose={() => toast.dismiss(t.id)}
                                  isShow={t.visible}
                                  icon="error"
                                  title="Swap"
                                  description={
                                    <div className="flex flex-row items-center">
                                      You need more
                                      <img
                                        alt=""
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
                          if (first <= 0) {
                            setIsLoading(false)
                            return toast.custom(
                              t => (
                                <Notification
                                  onClickClose={() => toast.dismiss(t.id)}
                                  isShow={t.visible}
                                  icon="error"
                                  title="Swap"
                                  description={
                                    <div className="flex flex-row items-center">
                                      Increase your
                                      <img
                                        alt=""
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
                          fetchSignatureToMeka({
                            params: { amount: first },
                            onError: () => setIsLoading(false),
                            onSuccess: async (result: any) => {
                              if (result.status) {
                                const convertWait: any = await fetchConvert({
                                  params: {
                                    params: {
                                      _amount: result.amount,
                                      _nonce: result.nonce,
                                      _signature: result.signature,
                                      _receiver: wallet
                                    }
                                  }
                                })

                                const convertResult: any = await convertWait?.wait()

                                if (convertResult?.status === 1) {
                                  toast.custom(
                                    t => (
                                      <Notification
                                        onClickClose={() => toast.dismiss(t.id)}
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
                                            It may take some time!!
                                          </div>
                                        }
                                      />
                                    ),
                                    { duration: 3000 }
                                  )
                                  setOpen(false)
                                }
                              } else {
                                toast.custom(
                                  t => (
                                    <Notification
                                      onClickClose={() => toast.dismiss(t.id)}
                                      isShow={t.visible}
                                      icon="error"
                                      title="Swap"
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
                            }
                          })
                        }
                      }}
                    >
                      {isLoading ? '\u00A0' : 'Swap'}
                    </button>
                  </div>
                </div>
                <div className="mt-8 text-sm text-gray-500 flex justify-between w-full">
                  <div className="flex flex-row">
                    <div className="text-black font-bold mr-1">Conversion:</div>
                    <div>{isOres ? conversionRate * (1 + conversionFeeWithoutPercentage) : 1}</div>
                    <ArrowNarrowRightIcon className="h-5 w-6" aria-hidden="true" />
                    <div>{!isOres ? conversionRate * (1 + conversionFeeWithoutPercentage) : 1}</div>
                  </div>
                  {isOres && (
                    <>
                      {lastWithdraw && (
                        <div className="flex space-x-1">
                          <div className="text-black font-bold"> Last withdraw:</div>
                          <div> {lastWithdraw?.toLocaleString()}</div>
                        </div>
                      )}
                      <div className="flex space-x-1">
                        <div className="text-black font-bold">Fee:</div>
                        <div>{feeAtom * 100}%</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
