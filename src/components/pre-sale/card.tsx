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
        <div className="flex mx-5 items-center justify-between xl:mr-2 2xl:mx-7 z-10">
          <div className="text-right">
            <span className="text-sm md:text-xs xl:text-lg font-extrabold inline-block">
              {Math.floor((bought / total) * 100)}% Sold
            </span>
          </div>
          <span className="text-sm md:text-xs xl:text-lg font-extrabold inline-block mr-0 xl:mr-4 2xl:mr-0">
            {bought}/{total}
          </span>
        </div>
      </div>
    </div>
    <div className="mt-1 2xl:mt-4 flex items-center justify-center">
      <div className="relative w-64 h-20">
        <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/button-item.png" />
      </div>
      <Link href={href}>
        <a
          type="button"
          className="flex justify-center items-center uppercase mt-2 absolute text-3xl font-bold text-white space-x-1 w-64 h-20"
        >
          <div className="relative w-7 h-7 mr-1">
            <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/bnb.png" />
          </div>
          <div className="mb-1">{price}</div>
          <div className="mb-1">BNB</div>
        </a>
      </Link>
    </div>
  </div>
)
