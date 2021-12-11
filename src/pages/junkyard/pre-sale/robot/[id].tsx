import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useMoralis } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { useRecoilValue } from 'recoil'
import { walletAtom } from 'recoil/atoms'
import { usePackageRobot } from 'hooks'
import { Item, RobotItem } from 'components/pre-sale'
import { ClassProps } from 'models/class'
import { classBonusRobots } from 'constants/class-bonus'
import { abi } from 'contracts/PiecePackage.json'

interface RobotsProps {
  id: number
  units: number
  price: number
  items: string[]
  classes: ClassProps[]
}

const Robots = ({ id, units, items, price, classes }: RobotsProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { web3, Moralis, isWeb3Enabled, isAuthenticated } = useMoralis()
  const [robotPackageBought, setRobotPackageBought] = useState({ pack1: 0, pack2: 0, pack3: 0 })
  const { robotFetch } = usePackageRobot({ functionName: 'getPackagesCount' })

  useEffect(() => {
    if (isWeb3Enabled) {
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
  }, [isWeb3Enabled, robotFetch, setRobotPackageBought])

  const buyPackage = async (id: number, amount: number) => {
    if (isAuthenticated) {
      const robotPackage = new web3.eth.Contract(
        abi as AbiItem[],
        process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS
      )

      await robotPackage.methods
        .createPackage(id, true)
        .send({ from: wallet, value: Moralis.Units.ETH(amount.toString()) })
    }
  }

  return (
    <>
      <Item
        isAuthenticated={isAuthenticated}
        type="robot"
        id={id}
        units={units}
        items={items}
        price={price}
        packageBought={robotPackageBought[`pack${id}`]}
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
