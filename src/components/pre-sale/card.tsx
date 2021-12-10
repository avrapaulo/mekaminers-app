import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  type: 'robot' | 'piece'
  id: number
  total: number
  bought: number
  price: number
  title: string
  href: string
}

export const Card = ({ total, bought, price, type, href, id }: CardProps) => (
  <div>
    <div className="relative w-72 sm:w-80 md:w-52 xl:w-80 2xl:w-96 h-80 md:h-60 xl:h-80 2xl:h-96 mx-auto text-tory-blue-500">
      <div className="absolute w-full h-full ">
        <Image src={`/card-bg-${type}.png`} layout="fill" objectFit="contain" alt="card presale" />
      </div>
      <div className="p-3 pb-6 flex flex-col place-content-between h-full ">
        <div className="relative mx-auto w-full h-full">
          <Image
            alt="Logo Meka Miners"
            layout="fill"
            objectFit="contain"
            src={`/gif/boxLvl${id}-${type}.gif`}
          />
        </div>
        <div className="flex space-x-1 justify-center items-center font-extrabold mt-2 text-2xl md:text-lg xl:text-3xl z-10">
          <div className="relative w-5 h-5">
            <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/bnb.png" />
          </div>
          <div>{price}</div>
          <div>BNB</div>
        </div>

        <div className="flex mx-5 items-center justify-between xl:mr-2 2xl:mx-7 z-10">
          <div className="text-right">
            <span className="text-sm md:text-xs xl:text-lg font-extrabold inline-block">
              {Math.floor((bought / total) * 100)}% Sold
            </span>
          </div>
          <span className="text-sm md:text-xs xl:text-lg  font-extrabold inline-block">
            {bought}/{total}
          </span>
        </div>
      </div>
    </div>
    <div className="mt-1 2xl:mt-4 flex items-center justify-center">
      <Link href={href}>
        <a
          style={{
            clipPath: 'polygon(8% 0, 86% 0, 100% 14%, 99% 57%, 90% 100%, 20% 100%, 0 88%, 1% 50%)'
          }}
          type="button"
          className="inline-flex items-center px-4 2xl:px-10 py-1 2xl:py-3 border border-transparent text-base 2xl:text-xl font-bold rounded-md text-white bg-tory-blue-500 shadow-sm hover:bg-tory-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tory-blue-400"
        >
          Buy now
        </a>
      </Link>
    </div>
  </div>
)
