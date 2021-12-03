import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Header } from 'components/header'
import { getTimeRemaining } from 'helpers/timer'

interface PiecesProps {
  id: number
  units: number
  price: number
  item: string[]
  classes: { class: string; chance: string }
}

const Pieces = ({ id, units, item, price, classes }: PiecesProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(getTimeRemaining())
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // })
  return (
    <>
      <Header type="junkyard" />
      <div className="flex flex-col">
        <Link href="/junkyard/pre-sale">
          <a className="flex flex-row">
            <div className="w-6 h-6">
              <ChevronLeftIcon />
            </div>
            Go back
          </a>
        </Link>
        <section className="relative" aria-labelledby="join-heading">
          <div className="relative bg-blue-600 flex flex-row lg:rounded-3xl p-10">
            <div className="space-y-3">
              <div className="relative w-60 h-52">
                <Image
                  alt="Logo Meka Miners"
                  height="1920"
                  width="1920"
                  layout="responsive"
                  src="/gif/boxLvl1.gif"
                />
              </div>
              <div className="text-white text-xs">Remaining time: {timeLeft}</div>
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
          </div>
        </section>
      </div>
    </>
  )
}

export default Pieces

const pieces = [
  {
    id: 1,
    units: 340,
    classes: [
      { class: 'e', chance: 50 },
      { class: 'd', chance: 20 },
      { class: 'c', chance: 15 },
      { class: 'b', chance: 10 },
      { class: 'a', chance: 4 },
      { class: 's', chance: 1 }
    ],
    price: 0.2,
    items: ['2 Random NFT Piece from']
  },
  {
    id: 2,
    units: 175,
    classes: [
      { class: 'c', chance: 70 },
      { class: 'b', chance: 20 },
      { class: 'a', chance: 7 },
      { class: 's', chance: 3 }
    ],
    price: 0.5,
    items: ['4 Random NFT Piece from']
  },
  {
    id: 3,
    units: 75,
    classes: [
      { class: 'b', chance: 65 },
      { class: 'a', chance: 29 },
      { class: 's', chance: 6 }
    ],
    price: 0.9,
    items: ['6 Random NFT Piece from']
  }
]

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = pieces.map(({ id }) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const piece = pieces.find(({ id }) => id === Number(params.id))
  return { props: { ...piece } }
}
