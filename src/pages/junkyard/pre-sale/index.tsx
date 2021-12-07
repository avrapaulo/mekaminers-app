import { useEffect } from 'react'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon
} from '@heroicons/react/outline'
import { TopCard, Timer } from 'components/junkyard'
import { Header } from 'components/header'
import { Card } from 'components/pre-sale'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract } from 'react-moralis'
import { abi as pieceAbi } from 'contracts/PiecePackage.json'
import { abi as robotAbi } from 'contracts/RobotPackage.json'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  piecePackageCount,
  robotPackageCount,
  pieceCountSelector,
  robotCountSelector
} from 'recoil/atoms/packages'

const PreSale = () => {
  const { enableWeb3 } = useMoralis()

  const {
    data: pieceData,
    error: pieceError,
    isFetching: pieceIsFetching,
    isLoading: pieceIsLoading,
    fetch: pieceFetch
  } = useWeb3ExecuteFunction({
    abi: pieceAbi,
    contractAddress: process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS,
    functionName: 'getPackagesCount'
  })
  const {
    data: robotData,
    error: robotError,
    isFetching: robotIsFetching,
    isLoading: robotIsLoading,
    fetch: robotFetch
  } = useWeb3ExecuteFunction({
    abi: robotAbi,
    contractAddress: process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS,
    functionName: 'getPackagesCount'
  })
  const [piecePackageBought, setPiecePackageBought] = useRecoilState(piecePackageCount)
  const [robotPackageBought, setRobotPackageBought] = useRecoilState(robotPackageCount)

  const pieceCount = useRecoilValue(pieceCountSelector)
  const robotCount = useRecoilValue(robotCountSelector)
  const getPiecePackages = () => {
    pieceFetch({
      onSuccess: result => {
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
  const getRobotPackages = () => {
    robotFetch({
      onSuccess: result => {
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
  useEffect(() => {
    enableWeb3({
      onSuccess: () => {
        getPiecePackages()
        getRobotPackages()
      },
      onError: () => {
        console.log('deu merda')
      }
    })
  }, [enableWeb3])

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
      <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-y-0 space-x-1 md:space-x-4 px-1">
        <TopCard title="Available Pieces" description={`${pieceCount}/625`} img="piece" />
        <Timer title="Time Remaining" />
        <TopCard title="Available Robots" description={`${robotCount}/510`} img="wheel" />
      </div>
      <div className="text-5xl flex justify-center font-semibold py-6">Robots</div>
      <div className="mx-2 mt-2">
        <div className="md:grid md:grid-cols-3 md:gap-x-5 space-y-10 md:space-y-0">
          {robots.map(({ title, bought, total, price, type }) => (
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
      <div className="text-5xl flex justify-center font-semibold py-6">Pieces</div>
      <div className="mx-2 mt-2 mb-10">
        <div className="md:grid md:grid-cols-3 md:gap-x-5 space-y-10 md:space-y-0">
          {pieces.map(({ title, bought, total, price, type }) => (
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
    </>
  )
}

export default PreSale
