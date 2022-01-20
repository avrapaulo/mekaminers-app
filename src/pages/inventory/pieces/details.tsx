/* eslint-disable indent */
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useMoralisCloudFunction } from 'react-moralis'
import { Piece } from 'components/3D'
import { classNames } from 'helpers/class-names'
import { defaultWallet } from 'recoil/atoms'
import { getEllipsisTxt } from 'helpers/formatters'
import { statusDescription } from 'constants/status'
import { rarityInfo } from 'constants/rarity'
import { useEffect } from 'react'

interface PiecesProps {
  bonus: number
  title: string
  owner: string
  rarity: string
  type: string
  robotStatus: { key: string; value: number }[]
  piecesStatus: any[]
}

const PiecesDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, fetch } = useMoralisCloudFunction(
    'getMintedPieces',
    { tokenIds: [+id] },
    { autoFetch: false }
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  const {
    title = ' ',
    owner,
    rarity,
    type,
    piecesStatus = []
  } = ((data && data[0]) as PiecesProps) || ({ owner: defaultWallet } as PiecesProps)

  return (
    <div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-white w-full h-full">
        <div className="flex">
          <Link href="/inventory/pieces">
            <a className="flex flex-row text-white font-bold text-2xl justify-center items-center">
              <div className="w-8 h-8">
                <ChevronLeftIcon className="text-tree-poppy" />
              </div>
              Go back
            </a>
          </Link>
        </div>
        <div className="flex flex-col lg:grid overflow-hidden grid-cols-2 grid-rows-1 gap-2 w-full h-full">
          <div className="box">
            <div className="flex items-center justify-center flex-col w-full h-full">
              <div className="text-5xl font-bold">{title}</div>
              <span className="text-sm font-semibold">{getEllipsisTxt(owner)}</span>
              <div className="w-full aspect-square">
                {rarity && type && (
                  <Piece
                    rarity={rarity}
                    robotType={type.toLowerCase()}
                    pieceId={piecesStatus[0]?.id}
                  />
                )}
              </div>
              <button
                type="button"
                className={classNames(
                  'w-32 mb-10 inline-flex justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded-full shadow-sm text-black bg-white hover:bg-gray-200',
                  'cursor-not-allowed'
                )}
              >
                Sell
              </button>
            </div>
          </div>
          <div className="box col-start-2 col-span-2">
            <div className="flex-1 p-4 flex flex-col">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {piecesStatus && piecesStatus.length !== 0 && (
                  <>
                    <div className="relative rounded-3xl border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          alt="Logo Meka Miners"
                          className="h-full w-full object-contain"
                          src={`/icons-status/${piecesStatus[0]?.key.toLowerCase()}.png`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-bold text-gray-900">
                          {statusDescription[piecesStatus[0]?.key]}
                        </p>
                        <div className="text-sm text-gray-500 truncate">
                          {piecesStatus[0]?.value}%
                        </div>
                      </div>
                    </div>
                    <div className="relative rounded-3xl border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          alt="Logo Meka Miners"
                          className="h-full w-full object-contain"
                          src="/icons-status/season.png"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-extrabold text-black">
                          {piecesStatus[0]?.season}
                        </p>
                      </div>
                    </div>
                    <div
                      className={classNames(
                        'relative rounded-3xl border-2 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2',
                        (rarityInfo[rarity] || rarityInfo.default).bg
                      )}
                    >
                      <div className="flex-1 min-w-0 text-center">
                        <p className="text-3xl font-extrabold text-white">{rarity}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PiecesDetail
