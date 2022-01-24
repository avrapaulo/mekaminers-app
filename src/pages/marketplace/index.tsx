import { useState } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { walletAtom, filterAtom } from 'recoil/atoms'
import { Card } from 'components/card'
import { Mode } from 'components/card/mode'
import { RobotBody } from 'components/card/robot-body'
import { Robot } from 'components/3D'
import { Gen0, Gen1 } from 'icons'
import { Pagination } from 'components/pagination'
import { Filters } from 'components/filter'

interface RobotsProps {
  bonus: number
  mode: number
  token: number
  gen: number
  price: number
  rarity: string
  title: string
  type: string
  robotStatus: { key: string; value: number; id: number }[]
  piecesStatus: { key: string; value: number; id: number; rarity: string }[]
}

interface MarketplaceRobotsProps {
  isOwned: boolean
  totalPages: number
  totalRobots: number
  page: number
  robots: RobotsProps[]
}

const MarketPlace = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const { gen, rarity, type, withPieces } = useRecoilValue(filterAtom)
  console.log(gen, rarity, type, { withPieces })
  const { data, fetch } = useMoralisCloudFunction(
    'getMarketplaceRobots',
    {
      filter: {
        withPieces: withPieces.some(pi => pi === '1'),
        withoutPieces: withPieces.some(pi => pi === '2'),
        type,
        rarity,
        gen
      },
      page: 1
    },
    { autoFetch: true }
  )
  const { robots, totalPages, page } = (data || {
    robots: []
  }) as MarketplaceRobotsProps

  return (
    <>
      <div className="max-w-2xl mx-auto lg:max-w-7xl h-40">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          <div className="w-60"></div>
        </div>
        <Filters />
      </div>
      {robots === null || (robots as RobotsProps[])?.length === 0 ? (
        isLoadingPage || robots === null ? (
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
        <div className="max-w-2xl mx-auto pb-5 px-4 sm:pb-10 sm:px-6 lg:max-w-7xl lg:px-8 h-full text-white">
          <div className="h-full flex flex-col">
            <div className="flex-grow">
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5">
                {(robots as RobotsProps[])?.map(
                  ({
                    token,
                    price,
                    title,
                    rarity = 'default',
                    robotStatus,
                    piecesStatus,
                    bonus,
                    mode,
                    type,
                    gen
                  }) => (
                    <Link key={token} href={`/inventory/robots/details?id=${token}&market=true`}>
                      <a className="relative flex justify-center">
                        {gen !== undefined && (
                          <div className="font-bold absolute z-10 -left-5">
                            {gen === 0 && <Gen0 className="h-12 w-12" aria-hidden="true" />}
                            {gen === 1 && <Gen1 className="h-12 w-12" aria-hidden="true" />}
                          </div>
                        )}

                        <Card
                          rarity={rarity}
                          description={title}
                          price={price}
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
              </div>
            </div>
            <Pagination pages={totalPages} page={page} />
          </div>
        </div>
      )}
    </>
  )
}

export default MarketPlace
