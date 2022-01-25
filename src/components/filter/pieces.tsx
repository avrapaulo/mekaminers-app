import { Fragment, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { pieceFilterAtom, defaultPieceFilters } from 'recoil/atoms'
import { classNames } from 'helpers/class-names'

const filtersOptions = [
  {
    id: 'rarity',
    name: 'Rarity',
    options: [
      { value: 'E', label: 'E' },
      { value: 'D', label: 'D' },
      { value: 'C', label: 'C' },
      { value: 'B', label: 'B' },
      { value: 'A', label: 'A' },
      { value: 'S', label: 'S' }
    ]
  },
  {
    id: 'robotType',
    name: 'Robot',
    options: [
      { value: 'Tank', label: 'Tank' },
      { value: 'Basic', label: 'Basic' },
      { value: 'Stealth', label: 'Stealth' }
    ]
  },
  {
    id: 'pieceType',
    name: 'Piece',
    options: [
      { value: 'Right Arm', label: 'Right Arm' },
      { value: 'Legs', label: 'Legs' },
      { value: 'Head', label: 'Head' },
      { value: 'Body', label: 'Body' },
      { value: 'Left Arm', label: 'Left Arm' }
    ]
  },
  {
    id: 'season',
    name: 'Season',
    options: [{ value: 'Presale', label: 'Presale' }]
  }
]

export const PiecesFilters = () => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useRecoilState(pieceFilterAtom)

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-black">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-zodiac-50"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filtersOptions.map(section => (
                  <Disclosure
                    as="div"
                    key={section.name}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-black">
                            <span className="font-medium text-black">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              <ChevronDownIcon
                                className={classNames(
                                  open ? '-rotate-180' : 'rotate-0',
                                  'h-5 w-5 transform'
                                )}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map(({ label, value }, optionIdx) => (
                              <div key={value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  checked={filters?.[section.id].some(item => item === value)}
                                  className="h-4 w-4 border-black rounded text-blue-zodiac-300 focus:ring-blue-zodiac-50"
                                  onChange={() => {
                                    let updatedList = [...filters?.[section.id]]
                                    if (!filters?.[section.id].some(item => item === value)) {
                                      updatedList = [...filters?.[section.id], value]
                                    } else {
                                      updatedList.splice(filters?.[section.id].indexOf(value), 1)
                                    }
                                    setFilters({ ...filters, [section.id]: updatedList })
                                  }}
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-black"
                                >
                                  {label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <section aria-labelledby="filter-heading" className="py-6">
        <h2 id="filter-heading" className="sr-only">
          Product filters
        </h2>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="text-white font-semibold"
            onClick={() => setFilters(defaultPieceFilters)}
          >
            Clear all
          </button>
          <button
            type="button"
            className="inline-block text-white font-semibold sm:hidden"
            onClick={() => setOpen(true)}
          >
            Filters
          </button>
          <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8 z-50">
            {filtersOptions.map(section => (
              <Popover
                as="div"
                key={section.name}
                id="desktop-menu"
                className="relative inline-block text-left"
              >
                <Popover.Button className="group inline-flex items-center justify-center text-sm text-white font-bold hover:text-gray-300">
                  <span>{section.name}</span>
                  {filters?.[section.id].length > 0 ? (
                    <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-white tabular-nums">
                      {filters?.[section.id].length}
                    </span>
                  ) : null}
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 font-semibold ring-black ring-opacity-5 focus:outline-none">
                    <form className="space-y-4">
                      {section.options.map(({ value, label }, optionIdx) => (
                        <div key={value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            checked={filters?.[section.id].some(item => item === value)}
                            className="h-4 w-4 border-black rounded text-blue-zodiac-300 focus:ring-blue-zodiac-50"
                            onChange={() => {
                              let updatedList = [...filters?.[section.id]]
                              if (!filters?.[section.id].some(item => item === value)) {
                                updatedList = [...filters?.[section.id], value]
                              } else {
                                updatedList.splice(filters?.[section.id].indexOf(value), 1)
                              }
                              setFilters({ ...filters, [section.id]: updatedList })
                            }}
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 pr-6 text-sm font-medium text-black whitespace-nowrap"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </form>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
          </Popover.Group>
        </div>
      </section>
    </div>
  )
}
