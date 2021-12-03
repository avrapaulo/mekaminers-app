import Image from 'next/image'
import { classNames } from 'helpers/classNames'
import Link from 'next/link'

interface CardProps {
  total: number
  price: number
  title: string
  href: string
}

export const Card = ({ total, price, title, href }: CardProps) => (
  <div
    style={{
      background: 'rgba(7, 45, 151, 0.12)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(8.5px)'
    }}
    className={classNames('p-6 rounded-lg overflow-hidden shadow-xl')}
  >
    <div className="flex justify-center font-semibold text-lg">{title}</div>
    <div className="relative px-16">
      <Image
        alt="Logo Meka Miners"
        height="1920"
        width="1920"
        layout="responsive"
        src="/gif/boxLvl1.gif"
      />
    </div>
    <div className="flex mb-2 items-center justify-between">
      <span
        style={{
          clipPath: 'polygon(90% 100%, 20% 100%, 0 88%, 1% 50%, 8% 0, 86% 0, 100% 14%, 99% 57%)'
        }}
        className="text-xs font-semibold inline-block py-1 px-2 uppercase text-purple-600 bg-purple-300"
      >
        {total}/{total}
      </span>
      <div className="text-right">
        <span className="text-xs font-semibold inline-block text-purple-600">
          {(total / total) * 100}%
        </span>
      </div>
    </div>
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
      <div
        style={{ width: `${(total / total) * 100}%` }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-900"
      ></div>
    </div>
    <div className="mt-2 flex items-center justify-center">
      <Link href={href}>
        <a
          style={{
            clipPath: 'polygon(8% 0, 86% 0, 100% 14%, 99% 57%, 90% 100%, 20% 100%, 0 88%, 1% 50%)'
          }}
          type="button"
          className="space-x-1 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="relative w-5 h-5">
            <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/bnb.png" />
          </div>
          <div>{price} BNB</div>
        </a>
      </Link>
    </div>
  </div>
)
