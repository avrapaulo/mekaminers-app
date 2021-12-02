import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Header } from 'components/junkyard'

interface RobotsProps {
  id: number
  name: string
}

const Robots = ({ id, name }: RobotsProps) => {
  return (
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
}

export default Robots

const robots = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' }
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
