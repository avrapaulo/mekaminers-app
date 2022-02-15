import { Dispatch, Fragment, SetStateAction, useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useMoralisCloudFunction } from 'react-moralis'
import { Dialog, Transition } from '@headlessui/react'
import { classNames } from 'helpers/class-names'
import { RobotsProps } from 'pages/inventory/robots'
import { SliderRowNFT } from './slider-row-nft'
import { SliderRowNonNFTProps, SliderRowNonNFT } from './slider-row-non-nft'

const tabs = [{ name: 'MekaBots' }, { name: 'MiningBots' }]

interface SlideFarmProps {
  open: boolean
  fetchFarm: () => void
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const SlideFarm = ({ fetchFarm, open, setOpen }: SlideFarmProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name)
  const [keyDisclosure, setKeyDisclosure] = useState<number>()

  const { data, fetch } = useMoralisCloudFunction('getRobotToFarm')
  const { data: dataUtilities, fetch: fetchUtilities } = useMoralisCloudFunction('getUtilities')
  const { robots, nonNFTRobots } = (data as { robots: any; nonNFTRobots: any }) || {}

  useEffect(() => {
    fetch()
    fetchUtilities()
  }, [fetch, fetchUtilities, open])

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
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-bold text-gray-900">
                          Select your robot to Farm
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
                    <div className="border-b border-gray-200">
                      <div className="px-6">
                        <nav
                          className="-mb-px flex space-x-6 cursor-pointer"
                          x-descriptions="Tab component"
                        >
                          {tabs.map(({ name }) => (
                            <div
                              key={name}
                              onClick={() => setActiveTab(name)}
                              className={classNames(
                                activeTab === name
                                  ? 'border-black text-black'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap pb-4 px-1 border-b-2 text-sm font-bold'
                              )}
                            >
                              {name}
                            </div>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <div className="w-full px-4 pt-6">
                      {tabs[0].name === activeTab &&
                        (robots as RobotsProps[])?.map(
                          ({ bonus, rarity, title, piecesStatus, robotStatus, token }) => (
                            <SliderRowNFT
                              key={token}
                              bonus={bonus}
                              rarity={rarity}
                              title={title}
                              piecesStatus={piecesStatus}
                              robotStatus={robotStatus}
                              token={token}
                              keyDisclosure={keyDisclosure}
                              fetchFarm={() => {
                                fetchFarm()
                              }}
                              setOpen={() => setOpen(false)}
                              setKeyDisclosure={setKeyDisclosure}
                              utilities={(dataUtilities as { key: string; value: number }[]) || []}
                            />
                          )
                        )}
                      {tabs[1].name === activeTab &&
                        (nonNFTRobots as SliderRowNonNFTProps[])?.map(
                          ({ capacity, name, nonNFT }) => (
                            <SliderRowNonNFT
                              key={nonNFT}
                              capacity={capacity}
                              name={name}
                              nonNFT={nonNFT}
                              keyDisclosure={keyDisclosure}
                              setOpen={() => setOpen(false)}
                              fetchFarm={() => fetchFarm()}
                              setKeyDisclosure={setKeyDisclosure}
                              utilities={(dataUtilities as { key: string; value: number }[]) || []}
                            />
                          )
                        )}
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
