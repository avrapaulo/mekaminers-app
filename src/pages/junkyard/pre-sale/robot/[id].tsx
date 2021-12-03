import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Header } from 'components/header'
import { getTimeRemaining } from 'helpers/timer'

interface ClassProps {
  classType: string
  chance: string
}
interface RobotsProps {
  id: number
  units: number
  price: number
  items: string[]
  classes: ClassProps[]
}

const Robots = ({ id, units, items, price, classes }: RobotsProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearTimeout(timer)
  })

  return (
    <>
      <Header type="junkyard" />
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
            Package {id}
          </div>
        </div>
      </section>
      <section className="relative" aria-labelledby="join-heading">
        <div className="relative bg-blue-600 flex flex-col md:flex-row rounded-3xl p-10 max-w-4xl mx-10 xl:mx-auto space-x-0 md:space-x-4 rounded-tr-none">
          <div className="space-y-3">
            <div className="relative w-72 h-56 mx-auto">
              <Image
                alt="Logo Meka Miners"
                height="1920"
                width="1920"
                layout="responsive"
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
            <div className="w-full mt-5 md:mt-0 ">
              <div className="text-center pb-3 font-semibold text-xl">Drop Detail</div>
              <div className="bg-gray-200 rounded-md p-3">
                <div className="grid grid-cols-3 text-center text-sm font-medium">
                  <div>Rarity</div>
                  <div>Chance</div>
                  <div>Bonus</div>
                </div>
                {classes.map(({ chance, classType }) => (
                  <div className="relative text-xs space-y-1" key={classType}>
                    <div className="inset-0 flex items-center pt-1" aria-hidden="true">
                      <div className="w-full border-t border-gray-400" />
                    </div>
                    <div className="grid grid-cols-3 text-center ">
                      <div className="uppercase">{classType}</div>
                      <div>{chance}%</div>
                      <div>
                        {classBonus[classType].min}% -{classBonus[classType].max}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default Robots

const classBonus = {
  e: { min: 10, max: 20 },
  d: { min: 21, max: 30 },
  c: { min: 31, max: 40 },
  b: { min: 41, max: 60 },
  a: { min: 61, max: 80 },
  s: { min: 80, max: 100 }
}

const robots = [
  {
    id: 1,
    units: 300,
    classes: [
      { classType: 'e', chance: 50 },
      { classType: 'd', chance: 20 },
      { classType: 'c', chance: 15 },
      { classType: 'b', chance: 10 },
      { classType: 'a', chance: 4 },
      { classType: 's', chance: 1 }
    ],
    price: 0.2,
    items: ['1x Random NFT Robot', '20x oil', '4x Toolkit', '1x light maintainer']
  },
  {
    id: 2,
    units: 120,
    classes: [
      { classType: 'e', chance: 0 },
      { classType: 'd', chance: 0 },
      { classType: 'c', chance: 70 },
      { classType: 'b', chance: 20 },
      { classType: 'a', chance: 7 },
      { classType: 's', chance: 3 }
    ],
    price: 0.5,
    items: ['2x Random NFT Robot', '20x oil', '10x Toolkit', '2x medium maintainer']
  },
  {
    id: 3,
    units: 50,
    classes: [
      { classType: 'e', chance: 0 },
      { classType: 'd', chance: 0 },
      { classType: 'c', chance: 0 },
      { classType: 'b', chance: 65 },
      { classType: 'a', chance: 29 },
      { classType: 's', chance: 6 }
    ],
    price: 0.9,
    items: [
      '3 Random NFT Robot',
      '150x oil',
      '20x Toolkit',
      '3 heavy maintainer',
      'right of 1 free land upgrade.'
    ]
  }
]

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = robots.map(({ id }) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const robot = robots.find(({ id }) => id === Number(params.id))
  return { props: { ...robot } }
}
