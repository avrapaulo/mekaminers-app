import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useMoralisCloudFunction, useMoralis } from 'react-moralis'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { MiniHeader } from 'components/inventory/header-mini'
import { Bug, Dog, Frog } from 'components/3D'

interface ToolsProps {
  value: number
  key: string
}

const toolDescription = {
  Toolkit: 'Used to activate mining bot operational systems',
  Oil: 'Used to ensure robots gears do not become stuck, causing impact in the farm efficiency.',
  Bug: 'Automates oil application and 1% chance of finding 30 Shards of a NFT Piece',
  Frog: 'Automates oil application and 3% chance of finding 30 Shards of a NFT Piece',
  Dog: 'Automates oil application and 5% chance of finding 30 Shards of a NFT Piece'
}

const pets = { Bug: <Bug />, Frog: <Frog />, Dog: <Dog /> }

const Tools = () => {
  const { web3, isWeb3Enabled, isAuthenticated } = useMoralis()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const wallet = useRecoilValue(walletAtom)
  const { fetch, data } = useMoralisCloudFunction('getUtilities')

  useEffect(() => {
    const fetchTools = async () => {
      await fetch()
      setIsLoadingPage(false)
    }
    if (wallet !== defaultWallet && isWeb3Enabled && isAuthenticated) {
      fetchTools()
    } else {
      setIsLoadingPage(false)
    }
  }, [web3, isWeb3Enabled, wallet, isAuthenticated, fetch])
  console.log(data)
  return (
    <>
      <MiniHeader />
      {data === null || (data as ToolsProps[])?.length === 0 ? (
        isLoadingPage || data === null ? (
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
            {(data as ToolsProps[])?.map(({ key, value }) => (
              <div key={key} className="flex justify-center">
                <Card
                  description={key}
                  imageCard={
                    pets[key] ? (
                      pets[key]
                    ) : (
                      <img
                        alt="Logo Meka Miners"
                        className="p-5"
                        src={`/${key.toLowerCase()}.png`}
                      />
                    )
                  }
                >
                  <div className="flex-1 p-4 flex flex-col mt-5">
                    <div className="h-full flex justify-between flex-col">
                      <div className="space-y-1 flex flex-col">
                        <div className="text-center">{toolDescription[key]}</div>
                      </div>
                      <div className="text-sm font-medium text-right">( x{value} )</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </>
        </Layout>
      )}
    </>
  )
}

export default Tools
