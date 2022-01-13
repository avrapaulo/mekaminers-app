import { useEffect, Suspense, useState } from 'react'
import Link from 'next/link'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet, screenAtom } from 'recoil/atoms'
import { abi } from 'contracts/RobotCore.json'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { Mode } from 'components/card/mode'
import { RobotBody } from 'components/card/robot-body'
import { Robot } from 'components/3D'
import { MiniHeader } from 'components/inventory/header-mini'

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
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const wallet = useRecoilValue(walletAtom)
  const setScreen = useSetRecoilState(screenAtom)
  const { fetch, data, isLoading, isFetching } = useMoralisCloudFunction(
    'getMintedRobots',
    {},
    { autoFetch: false }
  )
  setScreen(isLoadingPage || isLoading || isFetching || data === null)

  useEffect(() => {
    const robots = new web3.eth.Contract(abi as AbiItem[], process.env.NEXT_PUBLIC_ROBOT_ADDRESS)
    const result = async () => {
      const tokenIds = await robots.methods.tokenOfOwner(wallet).call()
      fetch({ params: { tokenIds: tokenIds.map((token: string) => +token) } })
      setIsLoadingPage(false)
    }
    try {
      if (wallet !== defaultWallet && isWeb3Enabled && isAuthenticated) result()
    } catch (error) {
      console.log(error)
    }
  }, [web3, isWeb3Enabled, wallet, isAuthenticated, fetch])

  return (
    <>
      <MiniHeader />

      <Layout>
        <>
          {[
            {
              owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
              token: 235,
              title: 'Basic',
              type: 'Basic',
              rarity: 'E',
              bonus: 13,
              robotStatus: [
                {
                  key: 'Capacity',
                  value: 28
                },
                {
                  key: 'Stealthiness',
                  value: 6
                },
                {
                  key: 'Efficiency',
                  value: 60
                },
                {
                  key: 'Speed',
                  value: 7
                },
                {
                  key: 'OilDecrease',
                  value: 0
                }
              ],
              piecesStatus: [],
              mode: 1
            },
            {
              owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
              token: 237,
              title: 'Stealth',
              type: 'Stealth',
              rarity: 'E',
              bonus: 10,
              robotStatus: [
                {
                  key: 'Capacity',
                  value: 26
                },
                {
                  key: 'Stealthiness',
                  value: 8
                },
                {
                  key: 'Efficiency',
                  value: 60
                },
                {
                  key: 'Speed',
                  value: 5
                },
                {
                  key: 'OilDecrease',
                  value: 0
                }
              ],
              piecesStatus: [],
              mode: 1
            },
            {
              owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
              token: 238,
              title: 'Tank',
              type: 'Tank',
              rarity: 'B',
              bonus: 42,
              robotStatus: [
                {
                  key: 'Capacity',
                  value: 22
                },
                {
                  key: 'Stealthiness',
                  value: 5
                },
                {
                  key: 'Efficiency',
                  value: 60
                },
                {
                  key: 'Speed',
                  value: 3
                },
                {
                  key: 'OilDecrease',
                  value: 0
                }
              ],
              piecesStatus: [],
              mode: 1
            },
            {
              owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
              token: 239,
              title: 'Basic',
              type: 'Basic',
              rarity: 'E',
              bonus: 15,
              robotStatus: [
                {
                  key: 'Capacity',
                  value: 30
                },
                {
                  key: 'Stealthiness',
                  value: 6
                },
                {
                  key: 'Efficiency',
                  value: 60
                },
                {
                  key: 'Speed',
                  value: 7
                },
                {
                  key: 'OilDecrease',
                  value: 0
                }
              ],
              piecesStatus: [],
              mode: 1
            },
            {
              owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
              token: 241,
              title: 'Tank',
              type: 'Tank',
              rarity: 'E',
              bonus: 16,
              robotStatus: [
                {
                  key: 'Capacity',
                  value: 20
                },
                {
                  key: 'Stealthiness',
                  value: 5
                },
                {
                  key: 'Efficiency',
                  value: 60
                },
                {
                  key: 'Speed',
                  value: 3
                },
                {
                  key: 'OilDecrease',
                  value: 0
                }
              ],
              piecesStatus: [],
              mode: 1
            },
            {
              owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
              token: 242,
              title: 'Tank',
              type: 'Tank',
              rarity: 'D',
              bonus: 24,
              robotStatus: [
                {
                  key: 'Capacity',
                  value: 20
                },
                {
                  key: 'Stealthiness',
                  value: 5
                },
                {
                  key: 'Efficiency',
                  value: 60
                },
                {
                  key: 'Speed',
                  value: 3
                },
                {
                  key: 'OilDecrease',
                  value: 0
                }
              ],
              piecesStatus: [],
              mode: 1
            },
            {
              owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
              token: 245,
              title: 'Tank',
              type: 'Tank',
              rarity: 'E',
              bonus: 14,
              robotStatus: [
                {
                  key: 'Capacity',
                  value: 20
                },
                {
                  key: 'Stealthiness',
                  value: 5
                },
                {
                  key: 'Efficiency',
                  value: 60
                },
                {
                  key: 'Speed',
                  value: 3
                },
                {
                  key: 'OilDecrease',
                  value: 0
                }
              ],
              piecesStatus: [],
              mode: 1
            }
          ]?.map(
            ({
              token,
              title,
              rarity = 'default',
              robotStatus,
              piecesStatus,
              bonus,
              mode,
              type
            }) => (
              <Link key={token} href={`/inventory/robots/${token}`}>
                <a className="relative flex justify-center">
                  <Mode modeId={mode} />

                  <Card
                    rarity={rarity}
                    description={title}
                    imageCard={<Robot rarity={rarity} robotType={type.toLowerCase()} />}
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
    </>
  )
}

export default RobotsPage
