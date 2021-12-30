import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { getTimeRemaining } from 'helpers/timer'
import { classNames } from '../../../helpers/class-names'

interface ItemProps {
  isAuthenticated: boolean
  isLoading: boolean
  id: number
  units: number
  price: number
  packageBought: number
  items: string[]
  type: 'robot' | 'piece'
  onBuy: () => void
  children: JSX.Element
}

export const Item = ({
  isLoading = true,
  isAuthenticated,
  id,
  units,
  items,
  price,
  type,
  packageBought,
  onBuy,
  children
}: ItemProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearTimeout(timer)
  })

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
      <div className=" relative mx-10 rounded-2xl rounded-tl-none mb-10 flex flex-col lg:flex-row pb-10 xl:space-x-20 xl:mx-[200px] 2xl:mx-[350px] desktop:mx-[500px]">
        <div className="flex justify-center items-center flex-col">
          <div className="relative w-72 h-56 mx-auto flex justify-center items-center">
            <img alt="Logo Meka Miners" className="h-full" src={`/gif/boxLvl${id}-${type}.gif`} />
          </div>
          <div className="text-3xl justify-center items-center space-x-2 font-extrabold flex text-white">
            <div className="relative w-5 h-5">
              <img alt="Logo Meka Miners" src="/bnb.png" />
            </div>
            <div>{price} BNB</div>
          </div>
          <div className="text-white font-bold text-xs flex justify-center space-x-10 mx-5 my-5">
            <div>Remaining time: {timeLeft}</div>
            <div>
              {packageBought}/{units}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-20">
              <img
                alt="Logo Meka Miners"
                src={`/button-item${isAuthenticated && !isLoading ? '' : '-disabled'}.png`}
              />
            </div>
            <div
              className={classNames(
                isAuthenticated && !isLoading ? '' : 'cursor-not-allowed',
                'absolute'
              )}
            >
              <button
                type="button"
                className={classNames(
                  isAuthenticated && !isLoading ? '' : 'pointer-events-none',
                  'uppercase justify-center inline-flex items-center text-3xl font-bold text-white w-64 h-20'
                )}
                onClick={() => onBuy()}
              >
                {isLoading ? (
                  <div
                    style={{ borderTopColor: 'transparent' }}
                    className="h-6 w-6 mt-3 border-4 border-white border-solid rounded-full animate-spin"
                  />
                ) : (
                  'Buy Now'
                )}
              </button>
            </div>
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
