import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  total: number
  price: number
  title: string
  href: string
}

export const Card = ({ total, price, title, href }: CardProps) => (
  <div className="relative w-80 md:w-60 xl:w-80 2xl:w-96 h-80 md:h-60 xl:h-80 2xl:h-96 mx-auto text-tory-blue-500">
    <div className="absolute w-full h-full -z-10">
      <Image src="/card-bg.png" layout="fill" objectFit="contain" alt="card pre sale" />
    </div>
    <div className="p-5 flex flex-col place-content-between h-full">
      <div className="pl-10 md:pl-5 xl:pl-10 flex justify-left font-extrabold text-3xl 2xl:text-4xl text-mariner-500">
        {title}
      </div>
      <div className="relative mx-auto h-28 md:h-10 xl:h-28 2xl:h-32 w-28 md:w-10 xl:w-28 2xl:w-32 mt-2 2xl:mt-5">
        <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/gif/boxLvl1.gif" />
      </div>
      <div className="flex space-x-1 justify-center items-center font-extrabold mt-2 text-2xl md:text-lg xl:text-3xl">
        <div className="relative w-5 h-5">
          <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/bnb.png" />
        </div>
        <div>{price}</div>
        <div>BNB</div>
      </div>
      <div className="mt-1 2xl:mt-4 flex items-center justify-center">
        <Link href={href}>
          <a
            style={{
              clipPath: 'polygon(8% 0, 86% 0, 100% 14%, 99% 57%, 90% 100%, 20% 100%, 0 88%, 1% 50%)'
            }}
            type="button"
            className="inline-flex items-center px-4 2xl:px-6 py-1 2xl:py-3 border border-transparent text-base 2xl:text-xl font-bold rounded-md text-white bg-tory-blue-500 shadow-sm hover:bg-tory-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tory-blue-400"
          >
            Buy now
          </a>
        </Link>
      </div>
      <div className="flex ml-2 md:ml-0 2xl:ml-4 items-center justify-between mr-2 xl:mr-2 2xl:mr-4">
        <div className="text-right">
          <span className="text-sm md:text-xs xl:text-lg font-extrabold inline-block">
            {(total / total) * 100}% Sold
          </span>
        </div>
        <span className="text-sm md:text-xs xl:text-lg  font-extrabold inline-block">
          {total}/{total}
        </span>
      </div>
    </div>
  </div>
)
