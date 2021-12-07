import { useEffect } from 'react'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon
} from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useMoralis } from 'react-moralis'
import Image from 'next/image'
import { TopCard, Timer } from 'components/junkyard'
import { Header } from 'components/tab-header'
import { Card } from 'components/pre-sale'
import { usePackagePiece, usePackageRobot } from 'hooks'
import { piecePackageCount, robotPackageCount } from 'recoil/atoms'
import { pieceCountSelector, robotCountSelector } from 'recoil/selector'

const PreSale = () => {
  const { isWeb3Enabled } = useMoralis()
  const { pieceFetch } = usePackagePiece({ functionName: 'getPackagesCount' })
  const { robotFetch } = usePackageRobot({ functionName: 'getPackagesCount' })

  const [piecePackageBought, setPiecePackageBought] = useRecoilState(piecePackageCount)
  const [robotPackageBought, setRobotPackageBought] = useRecoilState(robotPackageCount)

  const pieceCount = useRecoilValue(pieceCountSelector)
  const robotCount = useRecoilValue(robotCountSelector)

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
      robotFetch({
        onSuccess: (result: any) => {
          setRobotPackageBought({
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
  }, [isWeb3Enabled, pieceFetch, robotFetch, setRobotPackageBought, setPiecePackageBought])

  const robots = [
    {
      type: 1,
      title: 'Package 1',
      bought: robotPackageBought.pack1,
      total: 300,
      icon: ClockIcon,
      price: 0.2
    },
    {
      type: 2,
      title: 'Package 2',
      bought: robotPackageBought.pack2,
      total: 120,
      icon: BadgeCheckIcon,
      price: 0.5
    },
    {
      type: 3,
      title: 'Package 3',
      bought: robotPackageBought.pack3,
      total: 50,
      icon: UsersIcon,
      price: 0.9
    }
  ]

  const pieces = [
    {
      type: 1,
      title: 'Package 1',
      bought: piecePackageBought.pack1,
      total: 340,
      icon: CashIcon,
      price: 0.2
    },
    {
      type: 2,
      title: 'Package 2',
      bought: piecePackageBought.pack2,
      total: 175,
      icon: ReceiptRefundIcon,
      price: 0.5
    },
    {
      type: 3,
      title: 'Package 3',
      bought: piecePackageBought.pack3,
      total: 75,
      icon: AcademicCapIcon,
      price: 0.9
    }
  ]

  return (
    <>
      <Header type="junkyard" />
      <div className="bg-white -z-20 mx-10 rounded-2xl rounded-tl-none mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-7 sm:space-y-0 space-x-1 md:space-x-4 px-1">
          <TopCard title="Available Pieces" description={`${pieceCount}/625`} img="piece" />
          <Timer title="Time Remaining" />
          <TopCard title="Available Robots" description={`${robotCount}/510`} img="wheel" />
        </div>
        <div className="py-6 font-tech">
          <div className="text-lg sm:text-3xl xl:text-5xl flex justify-center font-semibold relative mx-10">
            <div className="absolute h-full w-full">
              <Image src="/title-pre-sale.png" layout="fill" objectFit="contain" alt="Logo" />
            </div>
            <div className="py-2">Robots</div>
          </div>
        </div>
        <div className="mx-2 mt-2">
          <div className="md:grid md:grid-cols-3 md:gap-x-5 space-y-10 md:space-y-0">
            {robots.map(({ title, total, bought, price, type }) => (
              <Card
                title={title}
                bought={bought}
                total={total}
                price={price}
                key={price}
                href={`pre-sale/robot/${type}`}
              />
            ))}
          </div>
        </div>
        <div className="py-6 font-tech">
          <div className="text-lg sm:text-3xl xl:text-5xl flex justify-center font-semibold relative mx-10">
            <div className="absolute h-full w-full">
              <Image src="/title-pre-sale.png" layout="fill" objectFit="contain" alt="Logo" />
            </div>
            <div className="py-2">Pieces</div>
          </div>
        </div>
        <div className="mx-2 mt-2 mb-10">
          <div className="md:grid md:grid-cols-3 md:gap-x-5 space-y-10 md:space-y-0">
            {pieces.map(({ title, total, bought, price, type }) => (
              <Card
                title={title}
                bought={bought}
                total={total}
                price={price}
                key={type}
                href={`pre-sale/piece/${type}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PreSale
