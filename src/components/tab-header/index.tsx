import { useRouter } from 'next/router'
import Image from 'next/image'
import { classNames } from 'helpers/class-names'

const junkyardType = 'junkyard'
const inventoryType = 'inventory'

interface HeaderProps {
  type: typeof junkyardType | typeof inventoryType
}

const tabs = {
  [junkyardType]: [
    { name: 'Presale', href: '/junkyard/pre-sale' },
    { name: 'Utilities', href: '/junkyard' },
    { name: 'Robots', href: '/junkyard/robots' },
    { name: 'Box', href: '/junkyard/box' }
  ],
  [inventoryType]: [{ name: '1', href: '/inventory' }]
}

export const Header = ({ type }: HeaderProps) => {
  const router = useRouter()

  return (
    <>
      {type === junkyardType && (
        <div className="mx-10 my-5 md:my-0">
          <div className="relative h-52 md:h-96 w-full">
            <Image src="/banner.png" layout="fill" objectFit="contain" alt="Banner" />
          </div>
        </div>
      )}
      <div className="mx-10">
        <div className="border-gray-200">
          <nav className="flex space-x-2" aria-label="Tabs">
            {tabs[type].map(tab => (
              <button
                style={{
                  background:
                    router.pathname === tab.href ||
                    (tab.href !== tabs[type][1].href && router.pathname.startsWith(tab.href))
                      ? 'linear-gradient(142.02deg, #00CDE3 -0.22%, #124395 100.22%)'
                      : 'linear-gradient(142.02deg, #fdd318 -0.22%, #fac92a 100.22%)'
                }}
                onClick={() => router.push(tab.href)}
                type="button"
                className={classNames(
                  router.pathname === tab.href ||
                    (tab.href !== tabs[type][1].href && router.pathname.startsWith(tab.href))
                    ? ''
                    : 'mt-2',
                  'px-4 border-gray-200 py-2 text-lg text-white focus:outline-none focus:ring-2 focus:ring-inset focus:mariner-500 font-bold rounded-tr rounded-tl'
                )}
                key={tab.name}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
