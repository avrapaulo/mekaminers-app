/* eslint-disable indent */
import { Transition, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { classNames } from 'helpers/class-names'
import { useState } from 'react'

export interface SliderRowNonNFTProps {
  capacity: number
  name: string
  token: number
  keyDisclosure: number
  utilities: { key: string; value: number }[]
  setKeyDisclosure: (token: number | undefined) => void
}

const pets = { Dog: 'Dog', Frog: 'Frog', Bug: 'Bug' }

export const SliderRowNonNFT = ({
  capacity,
  name,
  token,
  keyDisclosure,
  utilities,
  setKeyDisclosure
}: SliderRowNonNFTProps) => {
  const [mem, setMem] = useState<string>()
  return (
    <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl" key={token}>
      <Disclosure>
        <div
          onClick={() => {
            if (keyDisclosure !== token) {
              setKeyDisclosure(token)
            } else {
              setKeyDisclosure(undefined)
            }
          }}
        >
          <Disclosure.Button
            className={classNames(
              'flex justify-between border-2 w-full px-4 py-2 text-sm font-bold text-left text-white',
              'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-black',
              keyDisclosure === token ? 'rounded-t-lg' : 'rounded-lg'
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
                keyDisclosure === token ? 'transform rotate-180' : ''
              } w-5 h-5 text-white`}
            />
          </Disclosure.Button>
        </div>
        <Transition
          show={keyDisclosure === token}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel
            className={classNames('px-4 pt-4 pb-2 text-sm text-gray-500 rounded-b-lg')}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-2 font-bold text-black">
                <div className="flex">
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
                            ? 'border-transparent text-white hover:border-gray-400'
                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                          'border rounded-md p-1 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                        )}
                        disabled={value < 0}
                      >
                        {key}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="px-2 border-gray-200 py-2 text-lg text-white font-bold rounded-tr rounded-tl"
                onClick={() => console.log(mem)}
              >
                Select
              </button>
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  )
}
