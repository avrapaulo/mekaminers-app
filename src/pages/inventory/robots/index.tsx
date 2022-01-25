import { useEffect, useState } from 'react'
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
import { MiniHeader } from 'components/inventory/header-mini'
import { Gen0, Gen1 } from 'icons'

interface RobotsProps {
  bonus: number
  mode: number
  token: number
  gen: number
  rarity: string
  title: string
  type: string
  robotStatus: { key: string; value: number; id: number }[]
  piecesStatus: { key: string; value: number; id: number; rarity: string }[]
}

const RobotsPage = () => {
  const { web3, isWeb3Enabled, isAuthenticated } = useMoralis()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const wallet = useRecoilValue(walletAtom)
  const { fetch, data } = useMoralisCloudFunction('getMintedRobots', {}, { autoFetch: false })

  useEffect(() => {
    const robots = new web3.eth.Contract(abi as AbiItem[], process.env.NEXT_PUBLIC_ROBOT_ADDRESS)
    const result = async () => {
      const tokenIds = await robots.methods.tokenOfOwner(wallet).call()
      fetch({
        params: { tokenIds: tokenIds.map((token: string) => +token) }
      })
      setIsLoadingPage(false)
    }

    try {
      if (wallet !== defaultWallet && isWeb3Enabled && isAuthenticated) {
        result()
      } else {
        setIsLoadingPage(false)
      }
    } catch (error) {
      console.log(error)
    }
  }, [web3, isWeb3Enabled, wallet, isAuthenticated, fetch])

  return (
    <>
      <MiniHeader />
      {data === null || (data as RobotsProps[])?.length === 0 ? (
        isLoadingPage || data === null ? (
          <div className="flex h-full justify-center items-center animation-y">
            <div className="h-40 w-40 relative">
              <img alt="" src={'/meka.png'} />
            </div>
          </div>
        ) : (
          <div className="uppercase flex justify-center items-center text-white font-bold -z-10">
            <img alt="" width="500" src="/empty.png" />
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
                type,
                gen
              }) => (
                <Link key={token} href={`/inventory/robots/details?id=${token}`}>
                  <a className="relative flex justify-center">
                    <Mode modeId={mode} />
                    {gen !== undefined && (
                      <div className="font-bold absolute z-10 -left-5">
                        {gen === 0 && <Gen0 className="h-12 w-12" aria-hidden="true" />}
                        {gen === 1 && <Gen1 className="h-12 w-12" aria-hidden="true" />}
                      </div>
                    )}
                    <Card
                      rarity={rarity}
                      description={title}
                      imageCard={
                        <Robot
                          rarity={rarity}
                          robotType={type.toLowerCase()}
                          piecesStatus={piecesStatus}
                        />
                      }
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
