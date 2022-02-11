import { useState, useEffect } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import { useRecoilValue } from 'recoil'
import { FarmCard } from 'components/farm'
import { SlideFarm } from 'components/farm/slide'
import { LandEmpty } from 'components/3D/land-empty'
import { userLandAtom } from 'recoil/atoms'
import { RobotsProps } from 'pages/inventory/robots'
import { Collect, Reroll, Timer } from 'icons'
import { SpendModel } from 'components/modal'

interface FarmProps {
  hasDrop: boolean
  isPaused: boolean
  canReroll: boolean
  mineralTotalTime: number
  pet: string
  startedAt: string
  mineralStatus: {
    rarity: string
    capacity: number
    bonus: number
  }
  robot: RobotsProps
  nonNFTRobot: {
    name: string
    nonNFT: string
  }
}

const FarmPage = () => {
  const { fetch, data } = useMoralisCloudFunction('getFarmingRobots')
  const [openSlideFarm, setOpenSlideFarm] = useState(false)
  const [openSpendLand, setOpenSpendLand] = useState(false)
  const totalLandAtom = useRecoilValue(userLandAtom)

  useEffect(() => {
    fetch()
  }, [fetch, totalLandAtom])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 h-full">
      <SlideFarm fetchFarm={() => fetch()} open={openSlideFarm} setOpen={setOpenSlideFarm} />
      <SpendModel open={openSpendLand} setOpen={setOpenSpendLand} />
      {data && (Object.keys(data).length !== 0 || (data as FarmProps[]).length <= 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {(data as FarmProps[])?.map(
            ({
              isPaused,
              mineralTotalTime,
              pet,
              startedAt,
              nonNFTRobot,
              robot,
              canReroll,
              mineralStatus: {
                rarity: mineralRarity,
                bonus: mineralBonus,
                capacity: mineralCapacity
              }
            }) => (
              <FarmCard
                rarity={robot?.rarity}
                piecesStatus={robot?.piecesStatus}
                isNFT={!nonNFTRobot}
                isPaused={isPaused}
                canReroll={canReroll}
                id={robot?.token || nonNFTRobot?.nonNFT}
                mineralBonus={mineralBonus}
                mineralCapacity={mineralCapacity}
                mineralTotalTime={mineralTotalTime}
                key={robot?.token || nonNFTRobot?.nonNFT}
                pet={pet}
                type={robot?.type?.toLowerCase() || nonNFTRobot.name}
                startedAt={startedAt}
                mineralRarity={mineralRarity}
                fetchFarm={() => fetch()}
              />
            )
          )}
          {data &&
            [
              ...Array(
                7 - (data as FarmProps[])?.length <= 0 ? 0 : 7 - (data as FarmProps[])?.length
              ).keys()
            ].map(id => (
              <div key={id}>
                <div className="flex flex-row space-x-1 mt-4 items-center justify-center cursor-not-allowed">
                  <div title="Remaining time">
                    <Timer className="text-gray-500 h-7 w-7" />
                  </div>
                  <div
                    title="Mineral supply"
                    className="
                    flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white cursor-not-allowed"
                  >
                    <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />0
                  </div>
                  <div title="Reroll">
                    <Reroll className="text-gray-500 w-6 h-6 cursor-not-allowed" />
                  </div>
                  <div
                    title="Collect"
                    className="flex justify-center items-center border border-transparent text-lg font-semibold rounded-full shadow-sm text-white cursor-not-allowed"
                  >
                    <Collect className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                <div
                  className="h-80 lg:h-96 relative w-full aspect-square cursor-pointer"
                  onClick={() => {
                    if (totalLandAtom >= (data as FarmProps[])?.length + id + 1) {
                      setOpenSlideFarm(true)
                    } else {
                      setOpenSpendLand(true)
                    }
                  }}
                >
                  {totalLandAtom >= (data as FarmProps[])?.length + id + 1 ? (
                    <img
                      alt=""
                      title="Add your Robot!"
                      className="p-2 lg:p-12 h-full w-full object-contain z-10 absolute"
                      src="/unknown-land.png"
                    />
                  ) : (
                    <img
                      alt=""
                      className="p-2 lg:p-10 h-full w-full object-contain z-10 absolute"
                      src="/lock-land.png"
                    />
                  )}
                  <LandEmpty />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex h-full justify-center items-center">
          {!totalLandAtom && <div className="text-white text-4xl font-bold">Connect Wallet</div>}
        </div>
      )}
    </div>
  )
}

export default FarmPage
