import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Link from 'next/link'
import Image from 'next/image'
import { usePackagePiece } from 'hooks'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { getTimeRemaining } from 'helpers/timer'

interface ItemProps {
  id: number
  units: number
  price: number
  items: string[]
  type: 'Robot' | 'Pieces'
  onBuy: () => void
  children: JSX.Element
}

export const Item = ({ id, units, items, price, type, onBuy, children }: ItemProps) => {
  const { isWeb3Enabled } = useMoralis()
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())
  const [piecePackageBought, setPiecePackageBought] = useState({ pack1: 0, pack2: 0, pack3: 0 })
  const { pieceFetch } = usePackagePiece({ functionName: 'getPackagesCount' })

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isWeb3Enabled) {
      pieceFetch({
        onSuccess: (result: any) => {
          setPiecePackageBought({
            pack1: +result._firstPackageCount,
            pack2: +result._secondPackageCount,
            pack3: +result._thirdPackageCount
          })
        },
        onError: errorResult => {
          // console.log(data)
        }
      })
    }
  }, [isWeb3Enabled, pieceFetch, setPiecePackageBought])

  return (
    <section className="relative h-full" aria-labelledby="join-heading">
      <div className="hidden sm:flex pl-5 mt-5">
        <Link href="/junkyard/pre-sale">
          <a className="flex flex-row text-white font-bold text-2xl justify-center items-center">
            <div className="w-8 h-8">
              <ChevronLeftIcon className="text-tree-poppy" />
            </div>
            Go back
          </a>
        </Link>
      </div>
      <div className=" relative mx-10 rounded-2xl rounded-tl-none mb-10 flex flex-col lg:flex-row pb-10 xl:space-x-20 lg:px-38 2xl:mx-96 2xl:px-28">
        <div className="flex justify-center items-center flex-col">
          <div className="relative w-72 h-56 mx-auto">
            <Image
              alt="Logo Meka Miners"
              layout="fill"
              objectFit="contain"
              src={`/gif/boxLvl${id}-piece.gif`}
            />
          </div>
          <div className="text-3xl justify-center items-center space-x-2 font-extrabold flex text-white">
            <div className="relative w-5 h-5">
              <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/bnb.png" />
            </div>
            <div>{price} BNB</div>
          </div>
          <div className="text-white font-medium text-xs flex justify-center space-x-10 mx-5 my-5">
            <div>Remaining time: {timeLeft}</div>
            <div>
              {piecePackageBought[`pack${id}`]}/{units}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-20">
              <Image
                alt="Logo Meka Miners"
                layout="fill"
                objectFit="contain"
                src="/button-item.png"
              />
            </div>
            <button
              type="button"
              className="uppercase mt-2 absolute inline-flex items-center text-3xl font-bold text-white"
              onClick={() => onBuy()}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="mb-6">
            {children}
            <div className="py-2 text-center font-bold text-2xl text-white relative">Contains</div>
            <div className="rounded-md sm:py-2">
              <div className="relative space-y-1 text-lg font-semibold">
                <div className="">
                  {items.map(item => (
                    <div
                      key={item}
                      className="uppercase bg-athens-gray-500 my-0.5 p-1.5 font-semibold ml-0.5 mr-0.5 rounded-md text-center"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
