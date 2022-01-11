import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { abi } from 'contracts/PieceCore.json'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { Mode } from 'components/card/mode'
import { PiecesBody } from 'components/card/piece-body'
import { Piece } from 'components/3D'

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
  const wallet = useRecoilValue(walletAtom)
  const { fetch, data } = useMoralisCloudFunction('getMintedPieces', {}, { autoFetch: false })

  useEffect(() => {
    const pieces = new web3.eth.Contract(abi as AbiItem[], process.env.NEXT_PUBLIC_PIECE_ADDRESS)
    const result = async () => {
      const tokenIds = await pieces.methods.tokenOfOwner(wallet).call()
      fetch({ params: { tokenIds: tokenIds.map((token: string) => +token) } })
    }
    try {
      if (wallet !== defaultWallet && isWeb3Enabled && isAuthenticated) result()
    } catch (error) {
      console.log(error)
    }
  }, [web3, isWeb3Enabled, wallet, isAuthenticated, fetch])

  return (
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
  )
}

export default PiecesPage
