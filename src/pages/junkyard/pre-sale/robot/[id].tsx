import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Header } from 'components/junkyard'

const Robots = () => (
  <>
    <Header />
    <Link href="/junkyard/pre-sale">
      <a className="flex flex-row">
        <div className="w-6 h-6">
          <ChevronLeftIcon />
        </div>
        Go back
      </a>
    </Link>
    Robots
  </>
)

export default Robots
