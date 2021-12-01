import { useRouter } from 'next/router'
import Link from 'next/link'
import { classNames } from 'helpers/classNames'

const tabs = [
  { name: 'Pre Sale', href: '/junkyard/pre-sale', current: false },
  { name: 'Utilities', href: '/junkyard', current: true },
  { name: 'Robots', href: '/junkyard/robots', current: false },
  { name: 'Box', href: '/junkyard/box', current: false }
]

export const Header = () => {
  const router = useRouter()

  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find(tab => router.pathname === tab.href).name}
        >
          {tabs.map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map(tab => (
              <Link key={tab.name} href={tab.href}>
                <a
                  className={classNames(
                    router.pathname === tab.href
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-1/4 py-4 px-1 text-center border-t-2 font-medium text-sm'
                  )}
                  aria-current={router.pathname === tab.href ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
