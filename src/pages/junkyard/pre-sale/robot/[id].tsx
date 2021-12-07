import { GetStaticProps, GetStaticPaths } from 'next'
import { useMoralis } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { useRecoilValue } from 'recoil'
import { walletAtom } from 'recoil/atoms'
import { Header } from 'components/tab-header'
import { Item, RobotItem } from 'components/pre-sale'
import { ClassProps } from 'models/class'
import { classBonusRobots } from 'constants/classBonus'
import { abi } from 'contracts/PiecePackage.json'
import { useEffect } from 'react'

interface RobotsProps {
  id: number
  units: number
  price: number
  items: string[]
  classes: ClassProps[]
}

const Robots = ({ id, units, items, price, classes }: RobotsProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { web3, Moralis, enableWeb3 } = useMoralis()

  useEffect(() => {
    enableWeb3()
  }, [enableWeb3])

  const buyPackage = async (id: number, amount: number) => {
    const robotPackage = new web3.eth.Contract(
      abi as AbiItem[],
      process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS
    )

    await robotPackage.methods
      .createPackage(wallet, Moralis.Units.ETH(amount.toString()), id)
      .send({ from: wallet, value: Moralis.Units.ETH(amount.toString()) })
  }

  return (
    <>
      <Header type="junkyard" />
      <Item
        type="Robot"
        id={id}
        units={units}
        items={items}
        price={price}
        onBuy={() => buyPackage(id, price)}
      >
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
