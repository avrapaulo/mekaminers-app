import { useEffect, useState, Fragment } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { useRecoilValue } from 'recoil'
import { AbiItem } from 'web3-utils'
import { walletAtom } from 'recoil/atoms'
import { Item, PiecesItem } from 'components/pre-sale'
import { ClassProps } from 'models/class'
import { classBonusPieces } from 'constants/class-bonus'
import { abi } from 'contracts/PiecePackage.json'
import { usePackagePiece } from 'hooks'
import { Notification } from 'components/notification'
import { addressType } from 'helpers/address'

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
    items: ['2 Random NFT Pieces from E to S']
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
    items: ['4 Random NFT Pieces from C to S']
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
    items: ['6 Random NFT Pieces from B to S']
  }
]

const Pieces = ({ id, units, items, price, classes }: PiecesProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { Moralis, isWeb3Enabled, isAuthenticated, web3 } = useMoralis()
  const [piecePackageBought, setPiecePackageBought] = useState({ pack1: 0, pack2: 0, pack3: 0 })
  const { packagePieceFetch } = usePackagePiece({ functionName: 'getPackagesCount', gen: 1 })
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const piecesPackage = new web3.eth.Contract(abi as AbiItem[], addressType('piece', 1))

  const { fetch, isLoading } = useWeb3ExecuteFunction()

  useEffect(() => {
    if (isWeb3Enabled) {
      packagePieceFetch({
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
  }, [isWeb3Enabled, packagePieceFetch, setPiecePackageBought])

  const buyPackage = async (id: number, amount: number) => {
    if (isAuthenticated) {
      packagePieceFetch({
        onSuccess: async (result: any) => {
          if (
            (id === 1 && result._firstPackageCount >= pieces[0].units) ||
            (id === 2 && result._secondPackageCount >= pieces[1].units) ||
            (id === 3 && result._thirdPackageCount >= pieces[2].units)
          ) {
            setShow(true)
            setMessage('Sold out!')
          } else {
            const options = {
              abi,
              contractAddress: addressType('piece', 1),
              functionName: 'createPackage',
              msgValue: Moralis.Units.ETH(amount.toString()),
              params: {
                _packageType: id + 3,
                _isPresale: true
              }
            }
            await fetch({ params: options })
          }
        }
      })
    }
  }

  return (
    <>
      <Notification isShow={show} setShow={setShow} message={message} />
      <Item
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
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
