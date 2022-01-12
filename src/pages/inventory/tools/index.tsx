import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useMoralisCloudFunction, useMoralis } from 'react-moralis'
import { screenAtom } from 'recoil/atoms'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { MiniHeader } from 'components/inventory/header-mini'

interface ToolsProps {
  value: number
  key: string
}

const toolDescription = {
  Toolkit: 'Used to activate mining bot operational systems',
  Oil: 'Used to ensure robots gears do not become stuck, causing impact in the farm efficiency.'
}

const Tools = () => {
  const { isAuthenticated } = useMoralis()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const setScreen = useSetRecoilState(screenAtom)
  const { fetch, data, isLoading, isFetching } = useMoralisCloudFunction('getUtilities')
  setScreen(isLoadingPage || isLoading || isFetching || data === null)

  useEffect(() => {
    const fetchTools = async () => {
      await fetch()
      setIsLoadingPage(false)
    }
    if (isAuthenticated) fetchTools()
  }, [isAuthenticated, fetch, setIsLoadingPage])

  return (
    <>
      <MiniHeader />
      {data === null ? (
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
            {(data as ToolsProps[])?.map(({ key, value }) => (
              <div key={key} className="flex justify-center">
                <Card
                  description={key}
                  imageCard={
                    <img alt="Logo Meka Miners" className="p-5" src={`/${key.toLowerCase()}.png`} />
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
