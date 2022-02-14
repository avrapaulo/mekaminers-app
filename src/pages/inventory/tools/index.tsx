import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useMoralisCloudFunction, useMoralis } from 'react-moralis'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { MiniHeader } from 'components/inventory/header-mini'
import { inventory } from 'constants/menu'
import { shard } from 'constants/shards'
import { toolDescription } from 'constants/tools'

interface ToolsProps {
  value: number
  key: string
}

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

  return (
    <>
      <MiniHeader menu={inventory} />
      {data === null || (data as ToolsProps[])?.length === 0 ? (
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
            {(data as ToolsProps[])?.map(({ key, value }) => (
              <div key={key} className="flex justify-center">
                <Card
                  description={shard[key] || key}
                  imageCard={<img alt="" className="p-5" src={`/${key.toLowerCase()}.png`} />}
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
