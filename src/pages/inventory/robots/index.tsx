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
      {(data as RobotsProps[])?.length === 0 ? (
        isLoadingPage || isLoading || isFetching ? (
          <div className="flex h-full justify-center items-center animation-y">
            <div className="h-40 w-40 relative">
              <img alt="Logo Meka Miners" src={'/meka.png'} />
            </div>
          </div>
        ) : (
          <div className="uppercase flex justify-center items-center text-white font-bold -z-10">
            <img alt="Logo Meka Miners" width="500" src="/empty.png" />
          </div>
        )
      ) : (
        <Layout>
          <>
            {(data as RobotsProps[])?.map(
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
                        robotStatus={robotStatus}
                      />
                    </Card>
                  </a>
                </Link>
              )
            )}
          </>
        </Layout>
      )}
    </>
  )
}

export default RobotsPage
