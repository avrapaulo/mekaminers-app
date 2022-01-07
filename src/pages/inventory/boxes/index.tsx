import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useMoralis } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { Box } from 'components/box'
import { Layout } from 'components/inventory'
import { abi as abiPiece } from 'contracts/PiecePackage.json'
import { abi as abiPieceGen1 } from 'contracts/PiecePackageGen1.json'
import { abi as abiRobot } from 'contracts/RobotPackage.json'
import { abi as abiRobotGen1 } from 'contracts/RobotPackageGen1.json'
import { addressType } from 'helpers/address'

interface MyPackages {
  type: 'robot' | 'piece'
  id: number
  gen: number
  count: number[]
}

const Boxes = () => {
  const wallet = useRecoilValue(walletAtom)
  const [myRobots, setMyRobots] = useState<MyPackages[]>([])
  const [myPieces, setMyPieces] = useState<MyPackages[]>([])
  const { web3, isWeb3Enabled, isAuthenticated } = useMoralis()

  useEffect(() => {
    const result = async () => {
      const robotPackage = new web3.eth.Contract(abiRobot as AbiItem[], addressType('robot', 0))
      const piecesPackage = new web3.eth.Contract(abiPiece as AbiItem[], addressType('piece', 0))

      const robotPackageGen1 = new web3.eth.Contract(
        abiRobotGen1 as AbiItem[],
        addressType('robot', 1)
      )
      const piecesPackageGen1 = new web3.eth.Contract(
        abiPieceGen1 as AbiItem[],
        addressType('piece', 1)
      )

      const [robotPackageOwned, piecesPackageOwned, robotPackageOwnedGen1, piecesPackageOwnedGen1] =
        await Promise.all([
          robotPackage.methods.tokenOfOwner(wallet).call(),
          piecesPackage.methods.tokenOfOwner(wallet).call(),
          robotPackageGen1.methods.tokenOfOwner(wallet).call(),
          piecesPackageGen1.methods.tokenOfOwner(wallet).call()
        ])

      let myRobotsSave = []
      robotPackageOwned.forEach(async (element, index, array) => {
        const robotData = await robotPackage.methods.getPackage(element).call()

        myRobotsSave = myRobotsSave.find(robot => robot.id === robotData[3])
          ? [
              ...myRobotsSave.filter(item => item.id !== robotData[3]),
              {
                id: robotData[3],
                count: [
                  ...myRobotsSave.filter(item => item.id === robotData[3])[0].count,
                  robotData[1]
                ],
                type: 'robot',
                gen: 0
              }
            ]
          : [...myRobotsSave, { id: robotData[3], count: [robotData[1]], type: 'robot', gen: 0 }]

        if (index + 1 === array.length) setMyRobots(myRobotsSave)
      })

      robotPackageOwnedGen1.forEach(async (element, index, array) => {
        const robotData = await robotPackageGen1.methods.getPackage(element).call()

        myRobotsSave = myRobotsSave.find(robot => robot.id === robotData[3])
          ? [
              ...myRobotsSave.filter(item => item.id !== robotData[3]),
              {
                id: robotData[3],
                count: [
                  ...myRobotsSave.filter(item => item.id === robotData[3])[0].count,
                  robotData[1]
                ],
                type: 'robot',
                gen: 1
              }
            ]
          : [...myRobotsSave, { id: robotData[3], count: [robotData[1]], type: 'robot', gen: 1 }]

        if (index + 1 === array.length) setMyRobots(myRobotsSave)
      })

      let myPiecesSave = []
      piecesPackageOwned.forEach(async (element, index, array) => {
        const pieceData = await piecesPackage.methods.getPackage(element).call()

        myPiecesSave = myPiecesSave.find(piece => piece.id === pieceData[3])
          ? [
              ...myPiecesSave.filter(item => item.id !== pieceData[3]),
              {
                id: pieceData[3],
                count: [
                  ...myPiecesSave.filter(item => item.id === pieceData[3])[0].count,
                  pieceData[1]
                ],
                type: 'piece',
                gen: 0
              }
            ]
          : [...myPiecesSave, { id: pieceData[3], count: [pieceData[1]], type: 'piece', gen: 0 }]

        if (index + 1 === array.length) setMyPieces(myPiecesSave)
      })

      piecesPackageOwnedGen1.forEach(async (element, index, array) => {
        const pieceData = await piecesPackageGen1.methods.getPackage(element).call()

        myPiecesSave = myPiecesSave.find(piece => piece.id === +pieceData[3] + 3)
          ? [
              ...myPiecesSave.filter(item => item.id !== +pieceData[3] + 3),
              {
                id: +pieceData[3] + 3,
                count: [
                  ...myPiecesSave.filter(item => item.id === +pieceData[3] + 3)[0].count,
                  pieceData[1]
                ],
                type: 'piece',
                gen: 1
              }
            ]
          : [
              ...myPiecesSave,
              { id: +pieceData[3] + 3, count: [pieceData[1]], type: 'piece', gen: 1 }
            ]

        if (index + 1 === array.length) setMyPieces(myPiecesSave)
      })
    }
    try {
      if (wallet !== defaultWallet && isWeb3Enabled && isAuthenticated) result()
    } catch (error) {
      console.log(error)
    }

    if (!isAuthenticated) {
      setMyRobots([])
      setMyPieces([])
    }
  }, [web3, isWeb3Enabled, wallet, isAuthenticated])

  return (
    <>
      {myRobots.length === 0 && myPieces.length === 0 ? (
        <div className="uppercase flex justify-center items-center h-screen -mt-16 lg:-mt-28 text-white font-bold -z-10">
          <img alt="Logo Meka Miners" width="500" src="/empty.png" />
        </div>
      ) : (
        <Layout>
          <>
            {[...myRobots, ...myPieces]
              ?.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
              .map(({ id, count, type, gen }) => (
                <Box key={`${id}${type}${gen}`} count={count} id={id} type={type} gen={gen} />
              ))}
          </>
        </Layout>
      )}
    </>
  )
}

export default Boxes
