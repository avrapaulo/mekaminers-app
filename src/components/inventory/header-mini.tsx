import Link from 'next/link'
import { useRouter } from 'next/router'

interface MiniHeaderProps {
  menu: { name: string; url: string }[]
}

export const MiniHeader = ({ menu }: MiniHeaderProps) => {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-white">
      <div className="border-b border-gray-3 bg-gray-5 w-full">
        <div className="inline-flex space-x-4">
          {menu.map(({ name, url }) => (
            <Link href={url} key={name}>
              <a className="px-2 py-2 items-center cursor-pointer hover:text-blue-200 relative">
                <div className="font-bold">{name}</div>
                {router.pathname.includes(url) && (
                  <div className="absolute left-0 bottom-0 w-full h-1 bg-yellow-200" />
                )}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5">
        <div className="w-60"></div>
      </div>
    </div>
  )
}
