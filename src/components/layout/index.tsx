import { useEffect, Fragment, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { NextSeo } from 'next-seo'
import { useMoralis } from 'react-moralis'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { walletCoins } from 'recoil/selector'
import { defaultWallet, walletAtom, disconnectAtom } from 'recoil/atoms'
import {
  ShoppingCartIcon,
  MenuAlt1Icon,
  TrendingUpIcon,
  XIcon,
  LibraryIcon,
  BriefcaseIcon
} from '@heroicons/react/outline'
import { getEllipsisTxt } from 'helpers/formatters'
import { Wallet } from 'icons/wallet/index'
import { DisconnectModel } from 'components/modal'
import { classNames } from 'helpers/classNames'

const navigation = [
  { name: 'Activity', href: '/', icon: TrendingUpIcon, disable: false },
  { name: 'Junkyard', href: '/junkyard/pre-sale', icon: ShoppingCartIcon, disable: false },
  { name: 'Marketplace', href: '#', icon: LibraryIcon, disable: true },
  { name: 'Inventory', href: '#', icon: BriefcaseIcon, disable: true }
]

const description =
  'MekaMiners starts as a play-to-earn strategic PVP/PVE blockchain passive farm game with NFT Robot characters, body parts, and item ownership. Merging the inspiration of games such PvU and Farmville with Tribal Wars and Lords Mobile we expect to build an amazing gameplay with very short time investment needs and good profitability.'
const title = 'MekaMiners'

interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  const { web3, user, isAuthenticated, authenticate } = useMoralis()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useRecoilState(walletAtom)
  const setDisconnect = useSetRecoilState(disconnectAtom)
  const { meka, ore } = useRecoilValue(walletCoins)
  const router = useRouter()

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
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
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
                <div className="flex-shrink-0 flex items-center px-4">
                  <div className="h-20 w-full relative">
                    <Image alt="Logo" layout="fill" objectFit="contain" src="/logo.png" />
                  </div>
                </div>
                <nav
                  className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="px-2 space-y-1">
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            router.pathname === item.href ||
                              (item.href.length > 1 && router.pathname.startsWith(item.href))
                              ? 'bg-cyan-800 text-white'
                              : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                          aria-current={
                            router.pathname === item.href ||
                            (item.href.length > 1 && router.pathname.startsWith(item.href))
                              ? 'page'
                              : undefined
                          }
                        >
                          <item.icon
                            className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1"></div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="h-20 w-full relative">
                <Image alt="Logo" layout="fill" objectFit="contain" src="/logo.png" />
              </div>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map(item => (
                  <div
                    key={item.name}
                    className={classNames(
                      item.disable ? 'cursor-not-allowed' : '',
                      'px-2 space-y-1'
                    )}
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
                          router.pathname === item.href ||
                            (item.href.length > 1 && router.pathname.startsWith(item.href))
                            ? 'bg-cyan-800 text-white'
                            : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          item.disable ? 'pointer-events-none' : '',
                          'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1"></div>
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex"></div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="space-x-2 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div className="h-6 w-6 relative">
                    <Image alt="Logo" layout="fill" objectFit="contain" src="/favicon.ico" />
                  </div>
                  <span>{meka}</span>
                </button>
                <button
                  type="button"
                  className="space-x-2 relative inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div className="h-8 w-8 relative">
                    <Image alt="Logo" layout="fill" objectFit="contain" src="/ore.png" />
                  </div>
                  <span>{ore}</span>
                </button>
                <button
                  type="button"
                  onClick={() => (isAuthenticated ? setDisconnect(true) : authenticate())}
                  className="space-x-1 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Wallet />
                  <span>{isAuthenticated ? getEllipsisTxt(walletAddress) : 'Connect Wallet'}</span>
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
