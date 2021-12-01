import { useEffect, useState } from 'react'
import { Header } from 'components/junkyard'
import { Card } from 'components/pre-sale'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  BriefcaseIcon
} from '@heroicons/react/outline'
import { classNames } from 'helpers/classNames'

const robots = [
  {
    title: 'Package 1',
    total: 300,
    icon: ClockIcon,
    price: 0.2
  },
  {
    title: 'Package 2',
    total: 120,
    icon: BadgeCheckIcon,
    price: 0.5
  },
  {
    title: 'Package 3',
    total: 50,
    icon: UsersIcon,
    price: 0.9
  }
]

const pieces = [
  {
    title: 'Package 1',
    total: 340,
    icon: CashIcon,
    price: 0.2
  },
  {
    title: 'Package 2',
    total: 175,
    icon: ReceiptRefundIcon,
    price: 0.5
  },
  {
    title: 'Package 3',
    total: 75,
    icon: AcademicCapIcon,
    price: 0.9
  }
]

const getTimeRemaining = () => {
  const difference = +new Date('2021-12-10') - +new Date()

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`.slice(-2)
  const minutes = `0${Math.floor((difference / 1000 / 60) % 60)}`.slice(-2)
  const seconds = `0${Math.floor((difference / 1000) % 60)}`.slice(-2)

  if (difference > 0) {
    return `${days} days ${hours}:${minutes}:${seconds}`
  }

  return '-'
}

const PreSale = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearTimeout(timer)
  })

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex filter drop-shadow rounded-md w-80 sm:w-56">
          <div
            className={classNames(
              'flex-shrink-0 flex items-center justify-center w-16 p-4 text-sm font-medium rounded-l-md border-t border-l border-b hover:text-gray-600'
            )}
          >
            <BriefcaseIcon />
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <div className="text-gray-900 font-medium hover:text-gray-600">Available Pieces</div>
              <p className="text-gray-500">0/1000</p>
            </div>
          </div>
        </div>
        <div className="flex filter drop-shadow rounded-md w-80 sm:w-56">
          <div
            className={classNames(
              'flex-shrink-0 flex items-center justify-center w-16 p-4 text-sm font-medium rounded-l-md border-t border-l border-b hover:text-gray-600'
            )}
          >
            <ClockIcon />
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <div className="text-gray-900 font-medium hover:text-gray-600">Time Remaining</div>
              <p className="text-gray-500">{timeLeft}</p>
            </div>
          </div>
        </div>
        <div className="flex filter drop-shadow rounded-md w-80 sm:w-56">
          <div
            className={classNames(
              'flex-shrink-0 flex items-center justify-center w-16 p-4 text-sm font-medium rounded-l-md border-t border-l border-b hover:text-gray-600'
            )}
          >
            <BriefcaseIcon />
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <div className="text-gray-900 font-medium hover:text-gray-600">Available Robots</div>
              <p className="text-gray-500">0/1000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-5xl flex justify-center font-semibold py-6">Robots</div>
      <div className="mx-2 mt-2">
        <div className="sm:grid sm:grid-cols-3 sm:gap-x-5">
          {robots.map(({ title, total, price }, actionIdx) => (
            <Card title={title} total={total} price={price} key={actionIdx} />
          ))}
        </div>
      </div>
      <div className="text-5xl flex justify-center font-semibold py-6">Pieces</div>
      <div className="mx-2 mt-2">
        <div className="sm:grid sm:grid-cols-3 sm:gap-x-5">
          {pieces.map(({ title, total, price }, actionIdx) => (
            <Card title={title} total={total} price={price} key={actionIdx} />
          ))}
        </div>
      </div>
    </>
  )
}

export default PreSale
