/* eslint-disable indent */
import { Transition, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { useMoralisCloudFunction } from 'react-moralis'
import { classNames } from 'helpers/class-names'
import { statusDescription } from 'constants/status'
import { rarityInfo } from 'constants/rarity'
import { useState } from 'react'

interface SliderRowProps {
  bonus: number
  token: number
  rarity: string
  title: string
  robotStatus: { key: string; value: number; id: number }[]
  piecesStatus: { key: string; value: number; id: number; rarity: string }[]
  utilities: { key: string; value: number }[]
  keyDisclosure: number
  setOpen: () => void
  fetchFarm: () => void
  setKeyDisclosure: (token: number | undefined) => void
}

const pets = { Dog: 'Dog', Frog: 'Frog', Bug: 'Bug' }

export const SliderRowNFT = ({
  bonus,
  rarity,
  title,
  piecesStatus,
  robotStatus,
  token,
  utilities,
  keyDisclosure,
  setOpen,
  fetchFarm,
  setKeyDisclosure
}: SliderRowProps) => {
  const [mem, setMem] = useState<string>()
  const { fetch } = useMoralisCloudFunction(
    'startFarming',
    { robotId: token, pet: mem },
    { autoFetch: false }
  )

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
              rarityInfo[rarity].bgLight,
              rarityInfo[rarity].border,
              rarityInfo[rarity].bg,
              `focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:${rarityInfo[rarity].ring}`,
              keyDisclosure === token ? 'rounded-t-lg' : 'rounded-lg'
            )}
          >
            <div className="flex flex-row flex-1">
              <div className="w-20">{title}</div>
              {robotStatus.map(({ key, value }) => {
                switch (key) {
                  case 'Capacity':
                    return (
                      <div
                        key={key}
                        className={classNames(
                          'flex justify-start rounded-md space-x-1 pl-1 text-black font-semibold items-center w-28'
                        )}
                        title={statusDescription[key]}
                      >
                        <div className="uppercase h-5 w-5 font-semibold">
                          <img
                            alt=""
                            className="h-full w-full object-contain"
                            src={`/icons-status/${key.toLowerCase()}.png`}
                          />
                        </div>
                        <div className="">{value}</div>
                        <div className="text-xs flex justify-center items-center">
                          {piecesStatus &&
                          piecesStatus.some(({ key: pieceKey }) => key === pieceKey) ? (
                            <span className="text-green-300">
                              +
                              {(
                                (value * bonus) / 100 +
                                (value *
                                  piecesStatus?.find(({ key: pieceKey }) => key === pieceKey)
                                    .value) /
                                  100
                              ).toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-green-300">+{(value * bonus) / 100}</span>
                          )}
                        </div>
                      </div>
                    )
                  case 'Efficiency':
                    return (
                      <div
                        key={key}
                        className={classNames(
                          'flex justify-start rounded-md space-x-1 pl-1 text-black font-semibold items-center'
                        )}
                        title={statusDescription[key]}
                      >
                        <div className="uppercase h-5 w-5">
                          <img
                            alt=""
                            className="h-full w-full object-contain"
                            src={`/icons-status/${key.toLowerCase()}.png`}
                          />
                        </div>
                        <div className="">
                          {value}
                          {piecesStatus?.find(({ key: pieceKey }) => key === pieceKey) ? '' : 'm'}
                        </div>
                        <div className="text-xs flex justify-center items-center">
                          {piecesStatus &&
                            piecesStatus.some(({ key: pieceKey }) => key === pieceKey) && (
                              <span className="text-green-300">
                                -
                                {Math.floor(
                                  (value *
                                    piecesStatus.find(({ key: pieceKey }) => key === pieceKey)
                                      .value) /
                                    100
                                )}
                                :
                                {Math.round(
                                  60 *
                                    ((value *
                                      piecesStatus.find(({ key: pieceKey }) => key === pieceKey)
                                        .value) /
                                      100 -
                                      Math.floor(
                                        (value *
                                          piecesStatus.find(({ key: pieceKey }) => key === pieceKey)
                                            .value) /
                                          100
                                      ))
                                )}
                                m
                              </span>
                            )}
                        </div>
                      </div>
                    )
                  default:
                    return null
                }
              })}
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
            className={classNames(
              'px-4 pt-4 pb-2 text-sm text-gray-500 rounded-b-lg',
              rarityInfo[rarity].bg
            )}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-1">
                {robotStatus.map(({ key, value }) => {
                  switch (key) {
                    case 'OilDecrease':
                      return (
                        <div
                          key={value}
                          className={classNames(
                            'flex justify-start rounded-md space-x-1 pl-1 text-black font-semibold items-center'
                          )}
                          title={statusDescription[key]}
                        >
                          <div className="uppercase h-5 w-5">
                            <img
                              alt=""
                              className="h-full w-full object-contain"
                              src={`/icons-status/${key.toLowerCase()}.png`}
                            />
                          </div>
                          <div className="">{value}</div>
                          <div className="text-xs flex justify-center items-center">
                            {piecesStatus &&
                              piecesStatus.some(({ key: pieceKey }) => key === pieceKey) && (
                                <span className="text-green-500">
                                  +
                                  {piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value}
                                  %
                                </span>
                              )}
                          </div>
                        </div>
                      )
                    case 'Stealthiness':
                    case 'Speed':
                      return (
                        <div
                          key={value}
                          className={classNames(
                            'flex justify-start rounded-md space-x-1 pl-1 text-black font-semibold items-center'
                          )}
                          title={statusDescription[key]}
                        >
                          <div className="uppercase h-5 w-5">
                            <img
                              alt=""
                              className="h-full w-full object-contain"
                              src={`/icons-status/${key.toLowerCase()}.png`}
                            />
                          </div>
                          <div className="">{value}</div>
                          <div className="text-xs flex justify-center items-center">
                            {piecesStatus &&
                              piecesStatus.some(({ key: pieceKey }) => key === pieceKey) && (
                                <span className="text-green-500">
                                  +
                                  {(
                                    (value *
                                      piecesStatus?.find(({ key: pieceKey }) => key === pieceKey)
                                        ?.value) /
                                    100
                                  ).toFixed(2)}
                                </span>
                              )}
                          </div>
                        </div>
                      )
                    default:
                      return null
                  }
                })}
              </div>
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
                            ? `border-transparent text-white ${rarityInfo[rarity].bgLight}`
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
                onClick={() => {
                  fetch()
                  setOpen()
                  setTimeout(() => {
                    fetchFarm()
                  }, 500)
                }}
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
