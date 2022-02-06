import { DownloadIcon } from '@heroicons/react/outline'
import { useMoralisCloudFunction } from 'react-moralis'
import { LandRobot } from 'components/3D'
import { classNames } from 'helpers/class-names'
import { CounterReroll } from './counter-reroll'
import { CounterTotal } from './counter-total'

export interface FarmCardProps {
  isPaused: boolean
  id: number
  mineralBonus: number
  mineralCapacity: number
  mineralTotalTime: number
  type: string
  rarity: string
  startedAt: string
  mineralRarity: string
  fetchFarm: () => void
  piecesStatus: { key: string; value: number; id: number; rarity: string }[]
}

export const FarmCard = ({
  isPaused,
  id,
  mineralBonus,
  mineralCapacity,
  mineralTotalTime,
  type,
  rarity,
  startedAt,
  piecesStatus,
  mineralRarity,
  fetchFarm
}: FarmCardProps) => {
  const date = new Date()
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
  const { fetch } = useMoralisCloudFunction('collectFarm', { robotId: id }, { autoFetch: false })
  const { fetch: fetchOil } = useMoralisCloudFunction('oil', { robotId: id }, { autoFetch: false })

  return (
    <div className="col-span-1">
      <div className="flex flex-row space-x-1 mt-4 items-center justify-center">
        <CounterTotal time={mineralTotalTime} startedAt={startedAt} />
        <button
          type="button"
          className={classNames(
            'flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white'
          )}
        >
          <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
          {mineralCapacity}
          {mineralBonus > 0 && (
            <span className="ml-px text-xs text-green-500"> +{mineralBonus}%</span>
          )}
        </button>
        <CounterReroll time={startedAt} fetchFarm={fetchFarm} id={id} />
        <button
          type="button"
          className={classNames(
            'flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white',
            +new Date(startedAt) + mineralTotalTime * 59999 - nowUtc < 0 ? '' : 'cursor-not-allowed'
          )}
          onClick={() => {
            if (+new Date(startedAt) + mineralTotalTime * 59999 - nowUtc < 0) {
              fetch({
                onSuccess: result => {
                  if (result) fetchFarm()
                }
              })
            }
          }}
        >
          <DownloadIcon
            className={classNames(
              'w-6 h-6',
              +new Date(startedAt) + mineralTotalTime * 59999 - nowUtc < 0
                ? 'text-tree-poppy'
                : 'text-gray-500'
            )}
          />
        </button>
      </div>
      <div className="h-60">
        {isPaused ? (
          <img
            onClick={() => fetchOil({ onSuccess: () => fetchFarm() })}
            alt=""
            className="h-full w-full object-contain"
            src="/icons-status/oildecrease.png"
          />
        ) : (
          <LandRobot
            id={id}
            rarity={rarity}
            robotType={type}
            piecesStatus={piecesStatus}
            mineralRarity={mineralRarity}
          />
        )}
      </div>
    </div>
  )
}
