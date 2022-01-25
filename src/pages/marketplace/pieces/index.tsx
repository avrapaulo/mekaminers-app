import { useState } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { useMoralisCloudFunction } from 'react-moralis'
import { pieceFilterAtom } from 'recoil/atoms'
import { Card } from 'components/card'
import { Piece } from 'components/3D'
import { Pagination } from 'components/pagination'
import { PiecesFilters } from 'components/filter'
import { MiniHeader } from 'components/inventory/header-mini'
import { PiecesBody } from 'components/card/piece-body'
import { marketplace } from 'constants/menu'

interface PiecesProps {
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

interface MarketplacePiecesProps {
  isOwned: boolean
  totalPages: number
  totalRobots: number
  page: number
  pieces: PiecesProps[]
}

const MarketPlace = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [selectedPage, setSelectedPage] = useState(1)
  const { robotType, pieceType, rarity, season } = useRecoilValue(pieceFilterAtom)

  const { data, fetch } = useMoralisCloudFunction(
    'getMarketplacePieces',
    {
      filter: {
        robotType,
        pieceType,
        rarity,
        season
      },
      page: selectedPage
    },
    { autoFetch: true }
  )

  const { pieces, totalPages, page } = (data || {
    robots: []
  }) as MarketplacePiecesProps

  return (
    <>
      <MiniHeader menu={marketplace} />
      <div className="max-w-2xl mx-auto lg:max-w-7xl h-40">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          <div className="w-60"></div>
        </div>
        <PiecesFilters />
      </div>
      {pieces === null || (pieces as PiecesProps[])?.length === 0 ? (
        isLoadingPage || pieces === null ? (
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
        <div className="max-w-2xl mx-auto pb-5 px-4 sm:pb-10 sm:px-6 lg:max-w-7xl lg:px-8 h-full text-white">
          <div className="flex flex-col">
            <div className="flex-grow">
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5">
                {(pieces as PiecesProps[])?.map(
                  ({
                    token,
                    price,
                    title,
                    rarity = 'default',
                    robotStatus,
                    piecesStatus,
                    bonus,
                    type
                  }) => (
                    <Link key={token} href={`/inventory/pieces/details?id=${token}&market=true`}>
                      <a className="relative flex justify-center">
                        <Card
                          rarity={rarity}
                          description={title}
                          title={type}
                          imageCard={
                            <Piece
                              rarity={rarity}
                              robotType={type.toLowerCase()}
                              pieceId={piecesStatus[0].id}
                            />
                          }
                        >
                          <PiecesBody piecesStatus={piecesStatus} rarity={rarity} />
                        </Card>
                      </a>
                    </Link>
                  )
                )}
              </div>
            </div>
            {(pieces as PiecesProps[])?.length > 0 && (
              <Pagination
                pages={totalPages}
                page={page}
                selectedPage={num => setSelectedPage(num)}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MarketPlace
