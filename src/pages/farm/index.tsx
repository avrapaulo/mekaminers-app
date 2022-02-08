import { useState } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import { useRecoilValue } from 'recoil'
import { FarmCard } from 'components/farm'
import { SlideFarm } from 'components/farm/slide'
import { LandEmpty } from 'components/3D/land-empty'
import { userLandAtom } from 'recoil/atoms'
import { RobotsProps } from 'pages/inventory/robots'
import { Collect, Reroll, Timer } from 'icons'

interface FarmProps {
  hasDrop: boolean
  isPaused: boolean
  mineralTotalTime: number
  pet: string
  startedAt: string
  mineralStatus: {
    rarity: string
    capacity: number
    bonus: number
  }
  robot: RobotsProps
}

const FarmPage = () => {
  const { fetch, data } = useMoralisCloudFunction('getFarmingRobots')
  const [openSlideFarm, setOpenSlideFarm] = useState(false)
  const totalLandAtom = useRecoilValue(userLandAtom)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <SlideFarm fetchFarm={() => fetch()} open={openSlideFarm} setOpen={setOpenSlideFarm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {(data as FarmProps[])?.map(
          ({
            isPaused,
            mineralTotalTime,
            pet,
            startedAt,
            robot: { token, piecesStatus, rarity, type },
            mineralStatus: { rarity: mineralRarity, bonus: mineralBonus, capacity: mineralCapacity }
          }) => (
            <FarmCard
              isPaused={isPaused}
              id={token}
              mineralBonus={mineralBonus}
              mineralCapacity={mineralCapacity}
              mineralTotalTime={mineralTotalTime}
              key={token}
              pet={pet}
              type={type?.toLowerCase()}
              rarity={rarity}
              startedAt={startedAt}
              mineralRarity={mineralRarity}
              fetchFarm={() => fetch()}
              piecesStatus={piecesStatus}
            />
          )
        )}
        {data &&
          [...Array(7 - (data as FarmProps[])?.length).keys()].map(id => (
            <div key={id}>
              <div className="flex flex-row space-x-1 mt-4 items-center justify-center cursor-not-allowed">
                <Timer className="text-gray-500 h-7 w-7" />
                <div
                  className="
                    flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white cursor-not-allowed"
                >
                  <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />0
                </div>
                <Reroll className="text-gray-500 w-6 h-6 cursor-not-allowed" />
                <button className="flex justify-center items-center border border-transparent text-lg font-semibold rounded-full shadow-sm text-white cursor-not-allowed">
                  <Collect className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div
                className="h-72 relative cursor-pointer"
                onClick={() => {
                  if (totalLandAtom >= (data as FarmProps[])?.length + id + 1) {
                    setOpenSlideFarm(true)
                  }
                }}
              >
                {totalLandAtom >= (data as FarmProps[])?.length + id + 1 ? (
                  <img
                    alt=""
                    className="p-5 h-full w-full object-contain z-10 absolute"
                    src="/unknown-land.png"
                  />
                ) : (
                  <img
                    alt=""
                    className="p-5 h-full w-full object-contain z-10 absolute"
                    src="/lock-land.png"
                  />
                )}
                <LandEmpty />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default FarmPage
