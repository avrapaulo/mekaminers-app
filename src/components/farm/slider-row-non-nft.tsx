/* eslint-disable indent */
import { useState } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import { Transition, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import toast from 'react-hot-toast'
import { classNames } from 'helpers/class-names'
import { Notification } from 'components/notification'

export interface SliderRowNonNFTProps {
  capacity: number
  name: string
  nonNFT: number
  keyDisclosure: number
  setOpen: () => void
  fetchFarm: () => void
  utilities: { key: string; value: number }[]
  setKeyDisclosure: (token: number | undefined) => void
}

const pets = { Bug: 'Bug', Frog: 'Frog', Dog: 'Dog' }

export const SliderRowNonNFT = ({
  capacity,
  name,
  nonNFT,
  keyDisclosure,
  utilities,
  fetchFarm,
  setOpen,
  setKeyDisclosure
}: SliderRowNonNFTProps) => {
  const [mem, setMem] = useState<string>()
  const { fetch } = useMoralisCloudFunction(
    'startFarming',
    { nonNftRobot: nonNFT, pet: mem },
    { autoFetch: false }
  )

  const toolkit = utilities.filter(({ key }) => key === 'Toolkit')

  return (
    <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl" key={nonNFT}>
      <Disclosure>
        <div
          onClick={() => {
            if (keyDisclosure !== nonNFT) {
              setKeyDisclosure(nonNFT)
            } else {
              setKeyDisclosure(undefined)
            }
          }}
        >
          <Disclosure.Button
            className={classNames(
              'flex justify-between border-2 w-full px-4 py-2 text-sm font-bold text-left text-black border-black',
              'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-black',
              keyDisclosure === nonNFT ? 'rounded-t-lg' : 'rounded-lg'
            )}
          >
            <div className="flex flex-row flex-1">
              <div className="w-20">{name}</div>
              <div
                className={classNames(
                  'flex justify-start rounded-md space-x-1 pl-1 text-black font-semibold items-center w-28'
                )}
              >
                <div className="uppercase h-5 w-5 font-semibold">
                  <img
                    alt=""
                    className="h-full w-full object-contain"
                    src="/icons-status/capacity.png"
                  />
                </div>
                <div className="">{capacity}</div>
              </div>
            </div>
            <ChevronUpIcon
              className={`${
                keyDisclosure === nonNFT ? 'transform rotate-180' : ''
              } w-5 h-5 text-black`}
            />
          </Disclosure.Button>
        </div>
        <Transition
          show={keyDisclosure === nonNFT}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel
            className={classNames(
              'px-4 py-2 text-sm text-gray-500 rounded-b-lg border-black border-2 border-t-0'
            )}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-2 font-bold text-black justify-between w-full">
                <div className="flex space-x-1">
                  {utilities
                    .filter(({ key }) => pets[key])
                    .map(({ key, value }) => (
                      <button
                        onClick={() => {
                          if (mem !== key) {
                            setMem(key)
                          } else {
                            setMem(undefined)
                          }
                        }}
                        key={key}
                        value={key}
                        className={classNames(
                          value > 0
                            ? 'cursor-pointer focus:outline-none'
                            : 'opacity-25 cursor-not-allowed',
                          mem !== key
                            ? 'border-transparent text-black hover:border-gray-400'
                            : 'border-gray-200 text-white hover:bg-gray-50 bg-gray-200',
                          'border rounded-md px-2 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 border-black'
                        )}
                        disabled={value < 0}
                      >
                        <div className="flex flex-col">
                          <div className="text-xs text-black">{value}</div>
                          <img
                            alt=""
                            title={key}
                            className="h-6 w-6"
                            src={`/${key.toLowerCase()}.png`}
                          />
                        </div>
                      </button>
                    ))}
                  <div
                    className={classNames(
                      toolkit?.length > 0 ? 'focus:outline-none' : 'opacity-25 cursor-not-allowed',
                      toolkit[0]?.value ? 'border-gray-200 text-white bg-gray-200' : '',
                      'border rounded-md px-2 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 border-black'
                    )}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className={classNames(
                          'text-xs text-black -mb-1',
                          toolkit[0]?.value ? '' : 'text-red-500'
                        )}
                      >
                        {toolkit[0]?.value ?? 0}
                      </div>
                      <img alt="" className="h-8 w-6 -mb-1" src="/toolkit.png" />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2 border-black border py-2 text-lg text-black font-bold rounded-lg hover:bg-black hover:text-white"
                  onClick={() => {
                    fetch({
                      onSuccess: ({ status, message }) => {
                        if (status) {
                          setOpen()
                          setTimeout(() => {
                            fetchFarm()
                          }, 500)
                        } else {
                          toast.custom(
                            t => (
                              <Notification
                                onClickClose={() => toast.dismiss(t.id)}
                                isShow={t.visible}
                                icon="error"
                                title="Farm"
                                description={
                                  <div className="flex flex-row items-center">{message}</div>
                                }
                              />
                            ),
                            { duration: 3000 }
                          )
                        }
                      }
                    })
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  )
}
