import { useEffect, Suspense } from 'react'
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
import { Robot } from 'components/3D'

interface RobotsProps {
  bonus: number
  mode: number
  token: number
  rarity: string
  title: string
  type: string
  robotStatus: { key: string; value: number; id: number }[]
  piecesStatus: { key: string; value: number }[]
}

const RobotsPage = () => {
  const { web3, isWeb3Enabled, isAuthenticated } = useMoralis()
  const wallet = useRecoilValue(walletAtom)
  const { fetch, data } = useMoralisCloudFunction('getMintedRobots', {}, { autoFetch: false })

  useEffect(() => {
    const robots = new web3.eth.Contract(abi as AbiItem[], process.env.NEXT_PUBLIC_ROBOT_ADDRESS)
    const result = async () => {
      const tokenIds = await robots.methods.tokenOfOwner(wallet).call()
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
          ({ token, title, rarity = 'default', robotStatus, piecesStatus, bonus, mode, type }) => (
            <Link key={token} href={`/inventory/robots/${token}`}>
              <a className="relative flex">
                <Mode modeId={mode} />

                <Card
                  rarity={rarity}
                  description={title}
                  imageCard={
                    <Suspense fallback={null}>
                      <Robot rarity={rarity} robotType={type.toLowerCase()} />
                    </Suspense>
                  }
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
