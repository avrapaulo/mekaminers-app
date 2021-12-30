import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useMoralis } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { Box } from 'components/box'
import { Layout } from 'components/inventory'
import { abi as abiPiece } from 'contracts/PiecePackage.json'
import { abi as abiRobot } from 'contracts/RobotPackage.json'

interface MyPackages {
  id: number
  count: number[]
  type: 'robot' | 'piece'
}

const Boxes = () => {
  const wallet = useRecoilValue(walletAtom)
  const [myRobots, setMyRobots] = useState<MyPackages[]>([])
  const [myPieces, setMyPieces] = useState<MyPackages[]>([])
  const { web3, isWeb3Enabled, isAuthenticated } = useMoralis()

  useEffect(() => {
    const result = async () => {
      const piecesPackage = new web3.eth.Contract(
        abiPiece as AbiItem[],
        process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS
      )
      const robotPackage = new web3.eth.Contract(
        abiRobot as AbiItem[],
        process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS
      )

      const [robotPackageOwned, piecesPackageOwned] = await Promise.all([
        robotPackage.methods.tokenOfOwner(wallet).call(),
        piecesPackage.methods.tokenOfOwner(wallet).call()
      ])

      let myRobots = []
      robotPackageOwned.forEach(async (element, index, array) => {
        const robotData = await robotPackage.methods.getPackage(element).call()

        myRobots = myRobots.find(robot => robot.id === robotData[3])
          ? [
              ...myRobots.filter(item => item.id !== robotData[3]),
              {
                id: robotData[3],
                count: [
                  ...myRobots.filter(item => item.id === robotData[3])[0].count,
                  robotData[1]
                ],
                type: 'robot'
              }
            ]
          : [...myRobots, { id: robotData[3], count: [robotData[1]], type: 'robot' }]

        if (index + 1 === array.length) setMyRobots(myRobots)
      })

      let myPieces = []
      piecesPackageOwned.forEach(async (element, index, array) => {
        const pieceData = await piecesPackage.methods.getPackage(element).call()
        myPieces = myPieces.find(piece => piece.id === pieceData[3])
          ? [
              ...myPieces.filter(item => item.id !== pieceData[3]),
              {
                id: pieceData[3],
                count: [
                  ...myPieces.filter(item => item.id === pieceData[3])[0].count,
                  pieceData[1]
                ],
                type: 'piece'
              }
            ]
          : [...myPieces, { id: pieceData[3], count: [pieceData[1]], type: 'piece' }]

        if (index + 1 === array.length) setMyPieces(myPieces)
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
              .map(({ id, count, type }) => (
                <Box key={`${id}${type}`} count={count} id={id} type={type} />
              ))}
          </>
        </Layout>
      )}
    </>
  )
}

export default Boxes
