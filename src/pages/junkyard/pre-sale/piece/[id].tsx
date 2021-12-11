import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useMoralis } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { useRecoilValue } from 'recoil'
import { walletAtom } from 'recoil/atoms'
import { Item, PiecesItem } from 'components/pre-sale'
import { ClassProps } from 'models/class'
import { classBonusPieces } from 'constants/class-bonus'
import { abi } from 'contracts/PiecePackage.json'
import { usePackagePiece } from 'hooks'

interface PiecesProps {
  id: number
  units: number
  price: number
  items: string[]
  classes: ClassProps[]
}

const pieces = [
  {
    id: 1,
    units: 340,
    classes: [
      { classType: 'e', chance: 50 },
      { classType: 'd', chance: 20 },
      { classType: 'c', chance: 15 },
      { classType: 'b', chance: 10 },
      { classType: 'a', chance: 4 },
      { classType: 's', chance: 1 }
    ],
    price: 0.2,
    items: ['2 Random NFT Piece from E to S']
  },
  {
    id: 2,
    units: 175,
    classes: [
      { classType: 'e', chance: 0 },
      { classType: 'd', chance: 0 },
      { classType: 'c', chance: 70 },
      { classType: 'b', chance: 20 },
      { classType: 'a', chance: 7 },
      { classType: 's', chance: 3 }
    ],
    price: 0.5,
    items: ['4 Random NFT Piece from C to S']
  },
  {
    id: 3,
    units: 75,
    classes: [
      { classType: 'e', chance: 0 },
      { classType: 'd', chance: 0 },
      { classType: 'c', chance: 0 },
      { classType: 'b', chance: 65 },
      { classType: 'a', chance: 29 },
      { classType: 's', chance: 6 }
    ],
    price: 0.9,
    items: ['6 Random NFT Piece from B to S']
  }
]

const Pieces = ({ id, units, items, price, classes }: PiecesProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { web3, Moralis, isWeb3Enabled, isAuthenticated } = useMoralis()
  const [piecePackageBought, setPiecePackageBought] = useState({ pack1: 0, pack2: 0, pack3: 0 })
  const { pieceFetch } = usePackagePiece({ functionName: 'getPackagesCount' })

  useEffect(() => {
    if (isWeb3Enabled) {
      pieceFetch({
        onSuccess: (result: any) => {
          setPiecePackageBought({
            pack1: +result._firstPackageCount,
            pack2: +result._secondPackageCount,
            pack3: +result._thirdPackageCount
          })
        },
        onError: errorResult => {
          // console.log(data)
        }
      })
    }
  }, [isWeb3Enabled, pieceFetch, setPiecePackageBought])

  const buyPackage = async (id: number, amount: number) => {
    if (isAuthenticated) {
      const piecePackage = new web3.eth.Contract(
        abi as AbiItem[],
        process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS
      )

      pieceFetch({
        onSuccess: (result: any) => {
          if (
            (id === 1 && result._firstPackageCount >= pieces[0].units) ||
            (id === 2 && result._secondPackageCount >= pieces[1].units) ||
            (id === 3 && result._thirdPackageCount >= pieces[2].units)
          ) {
            alert('sold out')
          } else {
            piecePackage.methods
              .createPackage(wallet, Moralis.Units.ETH(amount.toString()), id)
              .send({ from: wallet, value: Moralis.Units.ETH(amount.toString()) })
          }
        }
      })
    }
  }

  return (
    <>
      <Item
        isAuthenticated={isAuthenticated}
        type="piece"
        id={id}
        units={units}
        items={items}
        price={price}
        packageBought={piecePackageBought[`pack${id}`]}
        onBuy={() => buyPackage(id, price)}
      >
        <PiecesItem classes={classes} bonus={classBonusPieces} />
      </Item>
    </>
  )
}

export default Pieces

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = pieces.map(({ id }) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const piece = pieces.find(({ id }) => id === Number(params.id))
  return { props: { ...piece } }
}
