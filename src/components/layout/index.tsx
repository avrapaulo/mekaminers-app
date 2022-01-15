import { useEffect, Fragment, useState } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useMoralis } from 'react-moralis'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { walletCoins } from 'recoil/selector'
import { defaultWallet, walletAtom, disconnectAtom, screenAtom } from 'recoil/atoms'
import {
  ShoppingCartIcon,
  MenuAlt1Icon,
  TrendingUpIcon,
  XIcon,
  LibraryIcon,
  BriefcaseIcon
} from '@heroicons/react/outline'
import CountUp from 'react-countup'
import { getEllipsisTxt } from 'helpers/formatters'
import { Wallet } from 'icons/wallet'
import { DisconnectModel } from 'components/modal'
import { classNames } from 'helpers/class-names'

const navigation = [
  {
    name: 'Activity',
    defaultHref: '/',
    href: '/',
    icon: TrendingUpIcon,
    disable: true,
    layoutBig: false
  },
  {
    name: 'Junkyard',
    defaultHref: '/junkyard',
    href: '/junkyard/pre-sale',
    icon: ShoppingCartIcon,
    disable: false,
    layoutBig: false
  },
  {
    name: 'Marketplace',
    defaultHref: '/marketplace',
    href: '/marketplace',
    icon: LibraryIcon,
    disable: true,
    layoutBig: true
  },
  {
    name: 'Inventory',
    defaultHref: '/inventory',
    href: '/inventory/boxes',
    icon: BriefcaseIcon,
    disable: false,
    layoutBig: false
  }
]

const description =
  'MekaMiners starts as a play-to-earn strategic PVP/PVE blockchain passive farm game with NFT Robot characters, body parts, and item ownership. Merging the inspiration of games such PvU and Farmville with Tribal Wars and Lords Mobile we expect to build an amazing gameplay with very short time investment needs and good profitability.'
const title = 'MekaMiners'

interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  const { web3, user, isAuthenticated, authenticate, enableWeb3 } = useMoralis()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useRecoilState(walletAtom)
  const setDisconnect = useSetRecoilState(disconnectAtom)
  const screen = useRecoilValue(screenAtom)
  const { meka, ore } = useRecoilValue(walletCoins)
  const router = useRouter()

  useEffect(() => {
    enableWeb3()
  }, [enableWeb3])

  useEffect(() => {
    setWalletAddress(
      web3.givenProvider?.selectedAddress || user?.get('ethAddress') || defaultWallet
    )
  }, [web3, setWalletAddress, user])

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://app.mekaminers.com"
        openGraph={{
          type: 'website',
          locale: 'en-us',
          url: 'https://app.mekaminers.com',
          title,
          description
        }}
        nofollow
        twitter={{
          site: '@MekaMiners',
          cardType: 'summary_large_image'
        }}
      />
      <DisconnectModel />
      <div className="max-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden w-48"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-400 bg-opacity-75">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex items-center flex-shrink-0 px-4">
                  <div className="h-28 w-full relative">
                    <img alt="Logo" src="/logo.png" />
                  </div>
                </div>
                <nav className="mt-5 flex-1 flex flex-col overflow-y-auto" aria-label="Sidebar">
                  {navigation.map(item => (
                    <div
                      key={item.name}
                      className={classNames(item.disable ? 'cursor-not-allowed' : '', '')}
                    >
                      <Link
                        href={item.href}
                        aria-current={
                          router.pathname === item.href ||
                          (item.href.length > 1 && router.pathname.startsWith(item.href))
                            ? 'page'
                            : undefined
                        }
                      >
                        <a
                          className={classNames(
                            item.disable ? 'pointer-events-none' : '',
                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium relative'
                          )}
                        >
                          <div className="h-12 w-48 relative flex items-center">
                            {(router.pathname === item.defaultHref ||
                              (item.defaultHref.length > 1 &&
                                router.pathname.startsWith(item.defaultHref))) && (
                              <img alt="Logo" className="absolute left-0" src="/bar.png" />
                            )}
                            <div
                              className={classNames(
                                '-translate-x-3',
                                'bg-white rounded-full p-1 absolute right-1.5 transform'
                              )}
                            >
                              <item.icon
                                className="flex-shrink-0 h-8 w-8 text-black"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="relative pl-6">{item.name}</div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                  <button
                    type="button"
                    style={{
                      background: 'linear-gradient(142.02deg, #00CDE3 -0.22%, #124395 100.22%)'
                    }}
                    className="mt-16 mx-6 my-1 inline-flex space-x-1 relative items-center px-4 py-2  text-sm font-medium rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-zodiac-300"
                  >
                    <div className="h-6 w-6 relative">
                      <img alt="Logo" src="/favicon.ico" />
                    </div>
                    <span>{meka}</span>
                  </button>
                  <button
                    type="button"
                    style={{
                      background: 'linear-gradient(142.02deg, #00CDE3 -0.22%, #124395 100.22%)'
                    }}
                    className="mx-6 my-1 space-x-2 relative inline-flex items-center px-2 py-1 text-sm font-medium rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-zodiac-300"
                  >
                    <div className="h-8 w-8 relative">
                      <img alt="Logo" src="/ore.png" />
                    </div>
                    <span>{ore}</span>
                  </button>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        <div className={`flex flex-col flex-1 ${screen ? 'h-screen' : ''}`}>
          <div className="relative flex-shrink-0 flex h-16 lg:h-28 lg:border-none bg-gradient-to-t from-blue-zodiac-500 to-blue-zodiac-700">
            <button
              type="button"
              className="px-4 bg-mariner-500 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:mariner-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-2 xl:px-8 items-center text-white">
              <div className="hidden h-28 w-28 lg:block relative">
                <img alt="Logo" src="/logo-top.png" />
              </div>
              <div className="flex-1 flex lg:hidden"></div>
              <nav className="hidden lg:flex flex-row space-x-1" aria-label="Sidebar">
                {navigation.map(item => (
                  <div
                    key={item.name}
                    className={classNames(item.disable ? 'cursor-not-allowed' : '', '2xl:p-2.5')}
                  >
                    <Link
                      href={item.href}
                      aria-current={
                        router.pathname === item.href ||
                        (item.href.length > 1 && router.pathname.startsWith(item.href))
                          ? 'page'
                          : undefined
                      }
                    >
                      <a
                        className={classNames(
                          item.disable ? 'pointer-events-none' : '',
                          item.layoutBig ? 'w-36 xl:w-48' : 'w-28 xl:w-40',
                          'group flex items-center px-2 py-2 text-sm leading-6 font-medium relative',
                          'relative flex items-center h-11 xl:h-16'
                        )}
                      >
                        {(router.pathname === item.defaultHref ||
                          (item.defaultHref.length > 1 &&
                            router.pathname.startsWith(item.defaultHref))) && (
                          <img alt="Logo" className="absolute left-0" src="/bar.png" />
                        )}
                        <div className="relative xl:text-xl pl-0.5 xl:pl-1">{item.name}</div>
                        <div
                          className={classNames(
                            item.layoutBig
                              ? '-translate-x-3.5'
                              : '-translate-x-1 xl:-translate-x-2',
                            'bg-white rounded-full p-1 absolute right-1.5 transform'
                          )}
                        >
                          <item.icon
                            className="flex-shrink-0 h-5 xl:h-8 w-5 xl:w-8 text-black"
                            aria-hidden="true"
                          />
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </nav>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-white min-w-24 pl-6 mr-3 hidden sm:inline-flex relative items-center text-sm font-medium rounded-xl text-black shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-tundora-100"
                >
                  <div className="h-16 w-16 -left-8 absolute">
                    <img alt="Logo" src="/ore.png" />
                  </div>
                  <div className="flex justify-end w-full items-center font-semibold">
                    <CountUp end={ore} duration={5} />
                    <PlusCircleIcon className="h-7 w-7 text-black" aria-hidden="true" />
                  </div>
                </button>
                <button
                  type="button"
                  className="bg-white min-w-28 mr-3 pl-10 hidden sm:inline-flex relative items-center text-sm font-medium rounded-xl text-black shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-tundora-100"
                >
                  <div className="h-12 w-12 -left-2 -top-3 absolute">
                    <img alt="Logo" src="/favicon.ico" />
                  </div>
                  <span className="flex justify-end w-full  items-center font-semibold">
                    <CountUp end={meka} duration={5} />
                    <PlusCircleIcon className="h-7 w-7 text-black" aria-hidden="true" />
                  </span>
                </button>
                <button
                  type="button"
                  style={{
                    background: 'linear-gradient(142.02deg, #00CDE3 -0.22%, #124395 100.22%)'
                  }}
                  onClick={() =>
                    isAuthenticated
                      ? setDisconnect(true)
                      : authenticate({ signingMessage: 'Welcome to Mekaminers' })
                  }
                  className="flex-nowrap space-x-1 relative inline-flex items-center px-4 py-2 lg:py-2.5 xl:py-2 text-sm font-medium rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-zodiac-300"
                >
                  <div className="lg:hidden xl:block">
                    <Wallet />
                  </div>
                  <span className="truncate overflow-hidden">
                    {isAuthenticated ? getEllipsisTxt(walletAddress) : 'Connect Wallet'}
                  </span>
                </button>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
