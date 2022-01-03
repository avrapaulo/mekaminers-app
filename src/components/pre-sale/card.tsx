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
      <img className="absolute" src={`/card-bg-${type}.png`} height="250" alt="card presale" />
      <div className="p-3 pb-6 flex flex-col h-full">
        <div className="relative flex justify-center">
          <img
            alt="Logo Meka Miners"
            className="h-full -mb-10"
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
      <img alt="Logo Meka Miners" width="256" height="80" src="/button-item.png" />
      <Link href={href}>
        <a
          type="button"
          className="flex justify-center items-center uppercase mt-2 absolute text-3xl font-bold text-white space-x-1 w-64 h-20"
        >
          <img alt="Logo Meka Miners" width="28" height="28" src="/bnb.png" />
          <div className="mb-1">{price}</div>
          <div className="mb-1">BNB</div>
        </a>
      </Link>
    </div>
  </div>
)
