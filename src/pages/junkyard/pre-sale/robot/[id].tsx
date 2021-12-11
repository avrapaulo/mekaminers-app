import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { useRecoilValue } from 'recoil'
import { AbiItem } from 'web3-utils'
import { walletAtom } from 'recoil/atoms'
import { usePackageRobot } from 'hooks'
import { Item, RobotItem } from 'components/pre-sale'
import { ClassProps } from 'models/class'
import { classBonusRobots } from 'constants/class-bonus'
import { abi } from 'contracts/RobotPackage.json'
import { Notification } from 'components/notification'

interface RobotsProps {
  id: number
  units: number
  price: number
  items: string[]
  classes: ClassProps[]
}

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
    items: ['2x NFT Robots', '20x oil', '10x Toolkit', '2x medium maintainer']
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
      '3x NFT Robots',
      '150x oil',
      '20x Toolkit',
      '3x heavy maintainer',
      'right of 1 free land upgrade'
    ]
  }
]

const Robots = ({ id, units, items, price, classes }: RobotsProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { Moralis, isWeb3Enabled, isAuthenticated, web3 } = useMoralis()
  const [robotPackageBought, setRobotPackageBought] = useState({ pack1: 0, pack2: 0, pack3: 0 })
  const { robotFetch } = usePackageRobot({ functionName: 'getPackagesCount' })
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const robotPackage = new web3.eth.Contract(
    abi as AbiItem[],
    process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS
  )

  const { fetch, isLoading } = useWeb3ExecuteFunction()

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
      robotFetch({
        onSuccess: async (result: any) => {
          if (
            (id === 1 && result._firstPackageCount >= robots[0].units) ||
            (id === 2 && result._secondPackageCount >= robots[1].units) ||
            (id === 3 && result._thirdPackageCount >= robots[2].units)
          ) {
            setShow(true)
            setMessage('Sold out!')
          } else if ((await robotPackage.methods.tokenOfOwner(wallet).call()).length === 2) {
            setShow(true)
            setMessage('You only can buy 2 packages of robots')
          } else {
            const options = {
              abi,
              contractAddress: process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS,
              functionName: 'createPackage',
              msgValue: Moralis.Units.ETH(amount.toString()),
              params: {
                _packageType: id,
                _isPresale: true
              }
            }

            await fetch({ params: options })
          }
        }
      })
    }
  }

  return (
    <>
      <Notification isShow={show} setShow={setShow} message={message} />
      <Item
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
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
