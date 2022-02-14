import { Fragment, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useMoralis, useMoralisCloudFunction, useWeb3ExecuteFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { AbiItem } from 'web3-utils'
import { Dialog, Transition, RadioGroup } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { slideAtom, slideDataAtom, walletAtom } from 'recoil/atoms'
import { abi } from 'contracts/MekaDeployer.json'
import { typeDescription } from 'constants/status'
import { Notification } from 'components/notification'
import { classNames } from 'helpers/class-names'
import { rarityInfo } from 'constants/rarity'
import { useMeka } from 'hooks'

interface PiecesForRobotProps {
  id: number
  value: number
  tokenId: number
  key: string
  rarity: string
  season: string
  title: string
}

const amountToApprove = 1000000

interface SlideProps {
  mode: number
  fetch: () => Promise<void>
}

export const Slide = ({ fetch, mode }: SlideProps) => {
  const { web3, Moralis } = useMoralis()
  const wallet = useRecoilValue(walletAtom)
  const [selected, setSelected] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useRecoilState(slideAtom)
  const { robotId, pieceType } = useRecoilValue(slideDataAtom)
  const { data, fetch: fetchPiecesForRobot } = useMoralisCloudFunction(
    'getPiecesForRobot',
    { robotId, pieceType },
    { autoFetch: false }
  )

  const mekaDeployer = new web3.eth.Contract(
    abi as AbiItem[],
    process.env.NEXT_PUBLIC_MEKADEPLOYER_ADDRESS
  )

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
  const { fetch: fetchMeka } = useWeb3ExecuteFunction({
    contractAddress: process.env.NEXT_PUBLIC_MEKADEPLOYER_ADDRESS,
    functionName: 'attachToRobot',
    abi
  })

  const { fetch: fetchSign } = useMoralisCloudFunction(
    'signAttach',
    { robotId, pieceId: selected, amount: Moralis.Units.ETH('5') },
    { autoFetch: false }
  )

  const { fetch: fetchIsAttaching } = useMoralisCloudFunction(
    'setIsAttaching',
    { robotId },
    { autoFetch: false }
  )

  useEffect(() => {
    fetchPiecesForRobot()
  }, [fetchPiecesForRobot])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden z-20" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                  <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-bold text-gray-900">
                          Select your {typeDescription[pieceType]}
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {data !== null && (data as [])?.length !== 0 ? (
                        <RadioGroup value={selected} onChange={setSelected}>
                          <RadioGroup.Label className="sr-only">Select our piece</RadioGroup.Label>
                          <div className="space-y-4">
                            {(data as PiecesForRobotProps[])?.map(
                              ({ title, rarity, value, season, tokenId }) => (
                                <RadioGroup.Option
                                  key={tokenId}
                                  value={tokenId}
                                  className={({ checked, active }) =>
                                    classNames(
                                      checked ? 'border-transparent' : 'border-gray-300',
                                      active ? `ring-2 ${rarityInfo[rarity].ring}` : '',
                                      rarityInfo[rarity].bg,
                                      'relative block border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                                    )
                                  }
                                >
                                  {({ checked }) => (
                                    <>
                                      <div className="flex items-center">
                                        <div className="text-sm">
                                          <RadioGroup.Label as="p" className="font-bold text-white">
                                            {title}
                                          </RadioGroup.Label>
                                          <RadioGroup.Description as="div" className="text-white">
                                            <p className="sm:inline">
                                              Rarity:
                                              <span className="font-extrabold ml-1">{rarity}</span>
                                            </p>
                                            <span
                                              className="hidden sm:inline sm:mx-1"
                                              aria-hidden="true"
                                            >
                                              &middot;
                                            </span>
                                            <p className="sm:inline">
                                              Bonus:
                                              <span className="font-extrabold ml-1">{value}%</span>
                                            </p>
                                          </RadioGroup.Description>
                                        </div>
                                      </div>
                                      <RadioGroup.Description
                                        as="div"
                                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                                      >
                                        <div className="font-semibold text-black">{season}</div>
                                      </RadioGroup.Description>
                                      <div
                                        className={classNames(
                                          checked ? 'border-black border-2' : 'border-transparent',
                                          'absolute -inset-px rounded-lg pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                      />
                                    </>
                                  )}
                                </RadioGroup.Option>
                              )
                            )}
                          </div>
                        </RadioGroup>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <div
                    className={classNames(
                      selected && !isLoading && mode !== 2 ? '' : 'cursor-not-allowed'
                    )}
                  >
                    <div
                      className={classNames(
                        'flex-shrink-0 px-4 py-4 flex justify-end',
                        selected && !isLoading && mode !== 2 ? '' : 'pointer-events-none'
                      )}
                    >
                      <button
                        onClick={async () => {
                          if (mode === 3) {
                            return toast.custom(
                              t => (
                                <Notification
                                  isShow={t.visible}
                                  icon="error"
                                  title="Attach"
                                  description={
                                    <div className="flex flex-row items-center">
                                      Your robot is farming
                                    </div>
                                  }
                                />
                              ),
                              { duration: 3000 }
                            )
                          }

                          setIsLoading(true)
                          fetchMekaAllowance({
                            onSuccess: async (result: string | number) => {
                              if (Moralis.Units.FromWei(result, 18) < 5) {
                                await fetchMekaApprove()
                              }
                              fetchSign({
                                onSuccess: async (result: any) => {
                                  await fetchMeka({
                                    params: {
                                      params: {
                                        _owner: wallet,
                                        _robotId: result.robotId,
                                        _pieceId: result.pieceId,
                                        _pieceType: result.pieceType,
                                        _amount: Moralis.Units.ETH(5),
                                        _nonce: result.nonce,
                                        _signature: result.signature
                                      }
                                    },
                                    onSuccess: async () => {
                                      await fetchIsAttaching()
                                      fetch()
                                      setOpen(false)
                                      setIsLoading(false)
                                      toast.custom(
                                        t => (
                                          <Notification
                                            isShow={t.visible}
                                            icon="success"
                                            title="Attach"
                                            description={
                                              <div className="flex flex-row items-center">
                                                In Progress
                                              </div>
                                            }
                                          />
                                        ),
                                        { duration: 3000 }
                                      )
                                    },
                                    onError: e => {
                                      setIsLoading(false)
                                      console.log(e)
                                    }
                                  })
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
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg w-full font-bold rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        Attach
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
