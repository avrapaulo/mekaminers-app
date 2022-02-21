import { useState, useEffect } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import { useRecoilValue, useRecoilState } from 'recoil'
import { FarmCard } from 'components/farm'
import { SlideFarm } from 'components/farm/slide'
import { LandEmpty } from 'components/3D/land-empty'
import { userLandAtom, farmRobotsAtom } from 'recoil/atoms'
import { RobotsProps } from 'pages/inventory/robots'
import { Collect, Reroll, Timer } from 'icons'
import { SpendModel } from 'components/modal'
import { robotDefault } from 'components/3D/robot/robot'

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
  const { fetch, data } = useMoralisCloudFunction('getFarmingRobots', {})
  const [openSlideFarm, setOpenSlideFarm] = useState(false)
  const [openSpendLand, setOpenSpendLand] = useState(false)
  const [farmRobots, setFarmRobots] = useRecoilState(farmRobotsAtom)
  const totalLandAtom = useRecoilValue(userLandAtom)
  const date = new Date()
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

  useEffect(() => {
    fetch()
  }, [fetch, totalLandAtom])

  useEffect(() => {
    if (!data) return
    for (let robotCount = 0; robotCount < (data as any).length; robotCount = 1 + robotCount) {
      const time =
        +new Date(data[robotCount].startedAt) + data[robotCount].mineralTotalTime * 1000 - nowUtc <=
        0

      if (!data[robotCount]?.robot) {
        if (
          farmRobots.some(
            item =>
              item[data[robotCount]?.nonNFTRobot?.name] === data[robotCount].nonNFTRobot.nonNFT &&
              (time || data[robotCount].isPaused)
          )
        ) {
          setFarmRobots(farmRobots.filter(i => !i[data[robotCount]?.nonNFTRobot?.name]))
        }
      } else {
        const capacityStatus = data[robotCount].robot.piecesStatus?.find(
          ({ key }) => key === 'Capacity'
        )
        const capacity =
          capacityStatus?.id || robotDefault[data[robotCount].robot.type.toLowerCase()].Capacity

        if (
          farmRobots.some(
            item =>
              item[`${capacity}${data[robotCount].robot.rarity}`] ===
                data[robotCount].robot.token &&
              (time || data[robotCount].isPaused)
          )
        ) {
          setFarmRobots(farmRobots.filter(i => !i[`${capacity}${data[robotCount].robot.rarity}`]))
        }
      }
    }

    for (let robotCount = 0; robotCount < (data as any).length; robotCount = 1 + robotCount) {
      const time =
        +new Date(data[robotCount].startedAt) + data[robotCount].mineralTotalTime * 1000 - nowUtc <=
        0

      if (!data[robotCount]?.robot) {
        setFarmRobots(items => {
          if (
            !items?.some(i => i[data[robotCount]?.nonNFTRobot?.name]) &&
            !(time || data[robotCount].isPaused)
          ) {
            return [
              ...items,
              {
                [data[robotCount]?.nonNFTRobot?.name]: data[robotCount].nonNFTRobot.nonNFT
              }
            ]
          }
          return items
        })
      } else {
        const capacityStatus = data[robotCount].robot.piecesStatus?.find(
          ({ key }) => key === 'Capacity'
        )
        const capacity =
          capacityStatus?.id || robotDefault[data[robotCount].robot.type.toLowerCase()].Capacity

        setFarmRobots(items => {
          if (
            !items?.some(
              i => i[`${capacity}${capacityStatus?.rarity || data[robotCount].robot.rarity}`]
            ) &&
            !(time || data[robotCount].isPaused)
          ) {
            return [
              ...items,
              {
                [`${capacity}${capacityStatus?.rarity || data[robotCount].robot.rarity}`]:
                  data[robotCount].robot.token
              }
            ]
          }
          return items
        })
      }
    }
  }, [data, farmRobots, setFarmRobots, nowUtc])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-full lg:px-8 h-full">
      <SlideFarm fetchFarm={() => fetch()} open={openSlideFarm} setOpen={setOpenSlideFarm} />
      <SpendModel open={openSpendLand} setOpen={setOpenSpendLand} />
      {data && (Object.keys(data).length !== 0 || (data as FarmProps[]).length <= 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mb-5">
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
