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

const robots = [
  {
    type: 1,
    title: 'Package 1',
    total: 300,
    icon: ClockIcon,
    price: 0.2
  },
  {
    type: 2,
    title: 'Package 2',
    total: 120,
    icon: BadgeCheckIcon,
    price: 0.5
  },
  {
    type: 3,
    title: 'Package 3',
    total: 50,
    icon: UsersIcon,
    price: 0.9
  }
]

const pieces = [
  {
    type: 1,
    title: 'Package 1',
    total: 340,
    icon: CashIcon,
    price: 0.2
  },
  {
    type: 2,
    title: 'Package 2',
    total: 175,
    icon: ReceiptRefundIcon,
    price: 0.5
  },
  {
    type: 3,
    title: 'Package 3',
    total: 75,
    icon: AcademicCapIcon,
    price: 0.9
  }
]

const PreSale = () => (
  <>
    <Header type="junkyard" />
    <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-y-0 space-x-1 md:space-x-4 px-1">
      <TopCard title="Available Pieces" description="0/1000" img="piece" />
      <Timer title="Time Remaining" />
      <TopCard title="Available Robots" description="0/1000" img="wheel" />
    </div>
    <div className="text-5xl flex justify-center font-semibold py-6">Robots</div>
    <div className="mx-2 mt-2">
      <div className="sm:grid sm:grid-cols-3 sm:gap-x-5">
        {robots.map(({ title, total, price, type }) => (
          <Card
            title={title}
            total={total}
            price={price}
            key={type}
            href={`pre-sale/robot/${type}`}
          />
        ))}
      </div>
    </div>
    <div className="text-5xl flex justify-center font-semibold py-6">Pieces</div>
    <div className="mx-2 mt-2">
      <div className="sm:grid sm:grid-cols-3 sm:gap-x-5">
        {pieces.map(({ title, total, price, type }) => (
          <Card
            title={title}
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

export default PreSale
