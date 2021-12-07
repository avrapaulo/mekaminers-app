import { GetStaticProps, GetStaticPaths } from 'next'
import { useMoralis } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { useRecoilValue } from 'recoil'
import { walletAtom } from 'recoil/atoms'
import { Header } from 'components/tab-header'
import { Item, PiecesItem } from 'components/pre-sale'
import { ClassProps } from 'models/class'
import { classBonusPieces } from 'constants/class-bonus'
import { abi } from 'contracts/PiecePackage.json'
import { useEffect } from 'react'

interface PiecesProps {
  id: number
  units: number
  price: number
  items: string[]
  classes: ClassProps[]
}

const Pieces = ({ id, units, items, price, classes }: PiecesProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { web3, Moralis, enableWeb3 } = useMoralis()

  useEffect(() => {
    enableWeb3()
  }, [enableWeb3])

  const buyPackage = async (id: number, amount: number) => {
    const piecePackage = new web3.eth.Contract(
      abi as AbiItem[],
      process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS
    )

    await piecePackage.methods
      .createPackage(wallet, Moralis.Units.ETH(amount.toString()), id)
      .send({ from: wallet, value: Moralis.Units.ETH(amount.toString()) })
  }

  return (
    <>
      <Header type="junkyard" />
      <Item
        type="Pieces"
        id={id}
        units={units}
        items={items}
        price={price}
        onBuy={() => buyPackage(id, price)}
      >
        <PiecesItem classes={classes} bonus={classBonusPieces} />
      </Item>
    </>
  )
}

export default Pieces

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
    items: ['2 Random NFT Piece from']
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
    items: ['4 Random NFT Piece from']
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
    items: ['6 Random NFT Piece from']
  }
]

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
