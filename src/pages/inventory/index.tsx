import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useMoralis } from 'react-moralis'
import Image from 'next/image'
import { AbiItem } from 'web3-utils'
import { walletAtom, defaultWallet } from 'recoil/atoms'
import { abi as abiPiece } from 'contracts/PiecePackage.json'
import { abi as abiRobot } from 'contracts/RobotPackage.json'

const Inventory = () => {
  const wallet = useRecoilValue(walletAtom)
  const [myRobots, setMyRobots] = useState<{ id: number; count: number }[]>([])
  const [myPieces, setMyPieces] = useState<{ id: number; count: number }[]>([])
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
                  count: robotsId.filter(item => item.id === robotData[3])[0].count + 1
                }
              ]
            : [...robotsId, { id: robotData[3], count: 1 }]
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
                  count: piecesId.filter(item => item.id === pieceData[3])[0].count + 1
                }
              ]
            : [...piecesId, { id: pieceData[3], count: 1 }]
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
    <div>
      <div className="mx-2 my-8 ">
        <div className="md:grid md:grid-cols-3 md:gap-x-5">
          {myRobots
            ?.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
            .map(({ id, count }) => (
              <div key={id}>
                <div className="relative w-72 sm:w-80 md:w-52 xl:w-80 2xl:w-96 h-80 md:h-60 xl:h-80 2xl:h-96 mx-auto text-tory-blue-500">
                  <div className="p-3 pb-6 flex flex-col place-content-between h-full ">
                    <div className="relative mx-auto w-full h-full">
                      <Image
                        alt="Logo Meka Miners"
                        layout="fill"
                        objectFit="contain"
                        src={`/gif/boxLvl${id}-robot.gif`}
                      />
                      <div className="text-3xl text-center font-bold absolute top-0 right-0 bg-tory-blue-500 rounded-full block h-10 w-10">
                        <div className="text-white">{count}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative w-64 h-20">
                        <Image
                          alt="Logo Meka Miners"
                          layout="fill"
                          objectFit="contain"
                          src="/button-item-disabled.png"
                        />
                      </div>
                      <button
                        type="button"
                        className="cursor-not-allowed uppercase absolute justify-center inline-flex items-center text-3xl font-bold text-white w-64 h-20"
                      >
                        Open box
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {myPieces
            ?.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
            .map(({ id, count }) => (
              <div key={id}>
                <div className="relative w-72 sm:w-80 md:w-52 xl:w-80 2xl:w-96 h-80 md:h-60 xl:h-80 2xl:h-96 mx-auto text-tory-blue-500">
                  <div className="p-3 pb-6 flex flex-col place-content-between h-full ">
                    <div className="relative mx-auto w-full h-full">
                      <Image
                        alt="Logo Meka Miners"
                        layout="fill"
                        objectFit="contain"
                        src={`/gif/boxLvl${id}-piece.gif`}
                      />
                      <div className="text-3xl text-center font-bold absolute top-0 right-0 bg-tory-blue-500 rounded-full block h-10 w-10">
                        <div className="text-white">{count}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative w-64 h-20">
                        <Image
                          alt="Logo Meka Miners"
                          layout="fill"
                          objectFit="contain"
                          src="/button-item-disabled.png"
                        />
                      </div>
                      <button
                        type="button"
                        className="cursor-not-allowed uppercase absolute justify-center inline-flex items-center text-3xl font-bold text-white w-64 h-20"
                      >
                        Open box
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {myRobots.length === 0 && myPieces.length === 0 && (
          <div className="uppercase text-3xl flex justify-center items-center h-screen -mt-16 lg:-mt-28 text-white font-bold">
            empty
          </div>
        )}
      </div>
    </div>
  )
}

export default Inventory
