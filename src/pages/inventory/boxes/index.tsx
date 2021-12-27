import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useMoralis } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { abi as abiPiece } from 'contracts/PiecePackage.json'
import { abi as abiRobot } from 'contracts/RobotPackage.json'

interface MyPackages {
  id: number
  count: number
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

      robotPackageOwned.forEach(async element => {
        const robotData = await robotPackage.methods.getPackage(element).call()
        setMyRobots(robotsId =>
          robotsId.find(robot => robot.id === robotData[3])
            ? [
                ...robotsId.filter(item => item.id !== robotData[3]),
                {
                  id: robotData[3],
                  count: robotsId.filter(item => item.id === robotData[3])[0].count + 1,
                  type: 'robot'
                }
              ]
            : [...robotsId, { id: robotData[3], count: 1, type: 'robot' }]
        )
      })

      piecesPackageOwned.forEach(async element => {
        const pieceData = await piecesPackage.methods.getPackage(element).call()
        setMyPieces(piecesId =>
          piecesId.find(piece => piece.id === pieceData[3])
            ? [
                ...piecesId.filter(item => item.id !== pieceData[3]),
                {
                  id: pieceData[3],
                  count: piecesId.filter(item => item.id === pieceData[3])[0].count + 1,
                  type: 'piece'
                }
              ]
            : [...piecesId, { id: pieceData[3], count: 1, type: 'piece' }]
        )
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
                <Card
                  title={type === 'robot' ? `Package Robot ${id}` : `Package Pieces ${id}`}
                  key={id}
                  imageCard={<img alt="Logo Meka Miners" src={`/gif/boxLvl${id}-${type}.gif`} />}
                >
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="h-full flex justify-between flex-col">
                      <div className="flex justify-center items-center mb-6">
                        <button
                          type="button"
                          className="cursor-not-allowed inline-flex items-center px-4 py-2 border border-transparent text-lg font-semibold rounded-md shadow-sm text-black bg-white hover:bg-gray-200"
                        >
                          Open
                        </button>
                      </div>
                      <div className="text-sm font-medium text-right">( x{count} )</div>
                    </div>
                  </div>
                </Card>
              ))}
          </>
        </Layout>
      )}
    </>
  )
}

export default Boxes
