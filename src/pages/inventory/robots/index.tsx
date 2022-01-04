import { useEffect } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { abi } from 'contracts/RobotCore.json'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { Mode } from 'components/card/mode'
import { RobotBody } from 'components/card/robot-body'

const robots = [
  {
    token: 1,
    title: 'robot asd asd asd asd ',
    imageSrc: '/banner.png',
    bonus: 0.2,
    mode: 'selling',
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ]
  },
  {
    token: 2,
    rarityId: 2,
    title: 'robot asd asd asd asd ',
    imageSrc: '/banner.png',
    bonus: 0.2,
    mode: 'selling',
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  },
  {
    token: 3,
    rarityId: 3,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.2,
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  },
  {
    token: 4,
    rarityId: 4,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.2,
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  },
  {
    token: 5,
    rarityId: 5,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.2,
    mode: 'farm',
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: []
  },
  {
    token: 6,
    rarityId: 5,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.5,
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  }
]

interface RobotsProps {
  bonus: number
  mode: number
  token: number
  rarity: string
  title: string
  robotStatus: { key: string; value: number }[]
  piecesStatus: { key: string; value: number }[]
}

const RobotsPage = () => {
  const { web3, isWeb3Enabled, isAuthenticated } = useMoralis()
  const wallet = useRecoilValue(walletAtom)
  const { fetch, data } = useMoralisCloudFunction('getMintedRobots ', {}, { autoFetch: false })
  console.log(data)
  useEffect(() => {
    const robots1 = new web3.eth.Contract(abi as AbiItem[], process.env.NEXT_PUBLIC_ROBOT_ADDRESS)
    const result = async () => {
      const tokenIds = await robots1.methods.tokenOfOwner(wallet).call()
      fetch({ params: { tokenIds: tokenIds.map((token: string) => +token) } })
    }
    try {
      if (wallet !== defaultWallet && isWeb3Enabled && isAuthenticated) result()
    } catch (error) {
      console.log(error)
    }
  }, [web3, isWeb3Enabled, wallet, isAuthenticated, fetch])

  return (
    <Layout>
      <>
        {(data as RobotsProps[])?.map(
          ({ token, title, rarity = 'default', robotStatus, piecesStatus, bonus, mode }) => (
            <Link key={token} href={`/inventory/robots/${token}`}>
              <a className="relative flex">
                <Mode modeId={mode} />
                <Card
                  rarity={rarity}
                  title={title}
                  imageCard={<img alt="Logo Meka Miners" src="/banner.png" />}
                >
                  <RobotBody
                    bonus={bonus}
                    piecesStatus={piecesStatus}
                    rarity={rarity}
                    robotStatus={robotStatus}
                  />
                </Card>
              </a>
            </Link>
          )
        )}
      </>
    </Layout>
  )
}

export default RobotsPage
