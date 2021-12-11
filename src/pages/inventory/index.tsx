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
  const [myRobots, setMyRobots] = useState<number[]>([])
  const [myPieces, setMyPieces] = useState<number[]>([])
  const { web3, isWeb3Enabled } = useMoralis()

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
        const id = await robotPackage.methods.getPackage(element).call()
        setMyRobots(robotId => [...robotId, id[2]])
      })

      piecesPackageOwned.forEach(async element => {
        const id = await piecesPackage.methods.getPackage(element).call()
        setMyPieces(piecesId => [...piecesId, id[2]])
      })
    }
    if (wallet !== defaultWallet && isWeb3Enabled) result()
  }, [web3, isWeb3Enabled, wallet])

  return (
    <div>
      <div className="mx-2 my-8 ">
        <div className="md:grid md:grid-cols-3 md:gap-x-5">
          {myRobots?.sort().map(id => (
            <div key={id}>
              <div className="relative w-72 sm:w-80 md:w-52 xl:w-80 2xl:w-96 h-80 md:h-60 xl:h-80 2xl:h-96 mx-auto text-tory-blue-500">
                <div className="absolute w-full h-full">
                  <Image
                    src="/card-bg-robot.png"
                    layout="fill"
                    objectFit="contain"
                    alt="card presale"
                  />
                </div>
                <div className="p-3 pb-6 flex flex-col place-content-between h-full ">
                  <div className="relative mx-auto w-full h-full">
                    <Image
                      alt="Logo Meka Miners"
                      layout="fill"
                      objectFit="contain"
                      src={`/gif/boxLvl${id}-robot.gif`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {myPieces?.sort().map(id => (
            <div key={id}>
              <div className="relative w-72 sm:w-80 md:w-52 xl:w-80 2xl:w-96 h-80 md:h-60 xl:h-80 2xl:h-96 mx-auto text-tory-blue-500">
                <div className="absolute w-full h-full">
                  <Image
                    src="/card-bg-piece.png"
                    layout="fill"
                    objectFit="contain"
                    alt="card presale"
                  />
                </div>
                <div className="p-3 pb-6 flex flex-col place-content-between h-full ">
                  <div className="relative mx-auto w-full h-full">
                    <Image
                      alt="Logo Meka Miners"
                      layout="fill"
                      objectFit="contain"
                      src={`/gif/boxLvl${id}-piece.gif`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Inventory
