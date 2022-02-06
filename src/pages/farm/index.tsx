import { useState } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import { FarmCard } from 'components/farm'
import { SlideFarm } from 'components/farm/slide'
import { RobotsProps } from '../inventory/robots/index'

interface FarmProps {
  hasDrop: boolean
  isPaused: boolean
  startedAt: string
  mineralTotalTime: number
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
  console.log({ data })
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 w-full h-full">
      <SlideFarm fetchFarm={() => fetch()} open={openSlideFarm} setOpen={setOpenSlideFarm} />
      <div className="grid grid-cols-3">
        {(data as FarmProps[])?.map(
          ({
            robot: { token, piecesStatus, rarity, type },
            mineralStatus: {
              rarity: mineralRarity,
              bonus: mineralBonus,
              capacity: mineralCapacity
            },
            startedAt,
            mineralTotalTime,
            isPaused
          }) => (
            <FarmCard
              isPaused={isPaused}
              startedAt={startedAt}
              mineralTotalTime={mineralTotalTime}
              key={token}
              id={token}
              piecesStatus={piecesStatus}
              rarity={rarity}
              mineralRarity={mineralRarity}
              type={type?.toLowerCase()}
              mineralBonus={mineralBonus}
              mineralCapacity={mineralCapacity}
              fetchFarm={() => fetch()}
            />
          )
        )}
        {data &&
          [...Array(7 - (data as FarmProps[])?.length).keys()].map(id => (
            <div onClick={() => setOpenSlideFarm(true)} key={id}>
              {id}
            </div>
          ))}
      </div>
    </div>
  )
}

export default FarmPage
