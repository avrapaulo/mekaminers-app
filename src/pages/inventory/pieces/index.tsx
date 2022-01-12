import { useEffect, Suspense, useState } from 'react'
import Link from 'next/link'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet, screenAtom } from 'recoil/atoms'
import { abi } from 'contracts/PieceCore.json'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { Mode } from 'components/card/mode'
import { PiecesBody } from 'components/card/piece-body'
import { Piece } from 'components/3D'
import { MiniHeader } from 'components/inventory/header-mini'

interface PiecesProps {
  bonus: number
  mode: number
  token: number
  rarity: string
  title: string
  type: string
  piecesStatus: { key: string; value: number; id: number }[]
}

const PiecesPage = () => {
  const { web3, isWeb3Enabled, isAuthenticated } = useMoralis()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const wallet = useRecoilValue(walletAtom)
  const setScreen = useSetRecoilState(screenAtom)
  const { fetch, data, isLoading, isFetching } = useMoralisCloudFunction(
    'getMintedPieces',
    {},
    { autoFetch: false }
  )
  setScreen(isLoadingPage || isLoading || isFetching || data === null)

  useEffect(() => {
    const pieces = new web3.eth.Contract(abi as AbiItem[], process.env.NEXT_PUBLIC_PIECE_ADDRESS)
    const result = async () => {
      const tokenIds = await pieces.methods.tokenOfOwner(wallet).call()
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
            {(data as PiecesProps[])?.map(
              ({ token, title, rarity = 'default', piecesStatus, mode, type }) => (
                <Link key={token} href={`/inventory/pieces/${token}`}>
                  <a className="relative flex justify-center">
                    <Mode modeId={mode} />
                    <Card
                      rarity={rarity}
                      description={title}
                      title={type}
                      imageCard={
                        <Suspense fallback={null}>
                          <Piece
                            rarity={rarity}
                            robotType={type.toLowerCase()}
                            pieceId={piecesStatus[0].id}
                          />
                        </Suspense>
                      }
                    >
                      <PiecesBody piecesStatus={piecesStatus} rarity={rarity} />
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

export default PiecesPage
