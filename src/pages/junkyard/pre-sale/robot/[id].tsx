import { GetStaticProps, GetStaticPaths } from 'next'
import { Header } from 'components/header'
import { ClassProps } from 'models/class'
import { Item, RobotItem } from 'components/pre-sale'
import { classBonusRobots } from 'constants/classBonus'

interface RobotsProps {
  id: number
  units: number
  price: number
  items: string[]
  classes: ClassProps[]
}

const Robots = ({ id, units, items, price, classes }: RobotsProps) => {
  return (
    <>
      <Header type="junkyard" />
      <Item id={id} units={units} items={items} price={price}>
        <RobotItem classes={classes} bonus={classBonusRobots} />
      </Item>
    </>
  )
}

export default Robots

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
    items: ['1x NFT Robot', '20x oil', '4x Toolkit', '1x light maintainer']
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
    items: ['2x NFT Robot', '20x oil', '10x Toolkit', '2x medium maintainer']
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
      '3 NFT Robot',
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
