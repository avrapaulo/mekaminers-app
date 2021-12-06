import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { getTimeRemaining } from 'helpers/timer'

interface ItemProps {
  id: number
  units: number
  price: number
  items: string[]
  type: 'Robot' | 'Pieces'
  children: JSX.Element
}

export const Item = ({ id, units, items, price, type, children }: ItemProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearTimeout(timer)
  })

  return (
    <>
      <section className="relative" aria-labelledby="join-heading">
        <div className="relative max-w-4xl mx-10 xl:mx-auto flex items-center justify-between">
          <Link href="/junkyard/pre-sale">
            <a className="flex flex-row">
              <div className="w-6 h-6">
                <ChevronLeftIcon />
              </div>
              Go back
            </a>
          </Link>
          <div
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)' }}
            className="text-center font-semibold text-3xl bg-gray-600 pl-10 py-2 pr-10 rounded-tr-3xl rounded-tl-3xl"
          >
            {type} Package {id}
          </div>
        </div>
      </section>
      <section className="relative" aria-labelledby="join-heading">
        <div className="relative bg-blue-600 flex flex-col md:flex-row rounded-3xl p-10 max-w-4xl mx-10 xl:mx-auto space-x-0 md:space-x-4 rounded-tr-none">
          <div className="space-y-3">
            <div className="relative w-72 h-56 mx-auto">
              <Image
                alt="Logo Meka Miners"
                layout="fill"
                objectFit="contain"
                src="/gif/boxLvl1.gif"
              />
            </div>
            <div className="text-white text-xs flex justify-between">
              <div>Remaining time: {timeLeft}</div>
              <div>
                {units}/{units}
              </div>
            </div>
            <div className="text-xl justify-center items-center space-x-2 font-semibold flex py-1 px-2 uppercase text-purple-600 bg-purple-300 rounded-full bg-opacity-40">
              <div className="relative w-5 h-5">
                <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/bnb.png" />
              </div>
              <div>{price} BNB</div>
            </div>
            <div className="flex items-center justify-center">
              <button
                style={{
                  clipPath:
                    'polygon(8% 0, 86% 0, 100% 14%, 99% 57%, 90% 100%, 20% 100%, 0 88%, 1% 50%)'
                }}
                type="button"
                className="uppercase space-x-1 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                purchase
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            {children}
            <div className="w-full mt-5">
              <div className="text-center pb-3 font-semibold text-xl">Contains</div>
              <div className="bg-gray-200 rounded-md p-3">
                <div className="relative space-y-1">
                  <div className="">
                    {items.map((item, index) => (
                      <div key={index}>-{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
