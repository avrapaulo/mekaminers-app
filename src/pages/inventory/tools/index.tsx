import { useEffect } from 'react'
import { useMoralisCloudFunction, useMoralis } from 'react-moralis'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'

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
  const { fetch, data } = useMoralisCloudFunction('getUtilities')

  useEffect(() => {
    const fetchTools = async () => await fetch()
    if (isAuthenticated) fetchTools()
  }, [isAuthenticated, fetch])

  console.log(data)
  return (
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
  )
}

export default Tools
