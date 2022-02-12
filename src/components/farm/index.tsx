import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { PuzzleIcon, StarIcon } from '@heroicons/react/solid'
import { useMoralisCloudFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { oreAtom } from 'recoil/atoms'
import { LandRobot } from 'components/3D'
import { classNames } from 'helpers/class-names'
import { Bag } from 'components/3D/bag'
import { Notification } from 'components/notification'
import { LandEmpty } from 'components/3D/land-empty'
import { shard } from 'constants/shards'
import { CounterReroll } from './counter-reroll'
import { CounterTotal } from './counter-total'
import { Collect } from 'icons'
import { LandNonNFTRobot } from 'components/3D/land-non-nft'

export interface FarmCardProps {
  rarity?: string
  piecesStatus?: { key: string; value: number; id: number; rarity: string }[]
  isNFT: boolean
  isPaused: boolean
  canReroll: boolean
  id: number | string
  mineralBonus: number
  mineralCapacity: number
  mineralTotalTime: number
  pet: string
  type: string
  startedAt: string
  mineralRarity: string
  fetchFarm: () => void
}

export const FarmCard = ({
  rarity,
  piecesStatus,
  isNFT,
  isPaused,
  canReroll,
  id,
  mineralBonus,
  mineralCapacity,
  mineralTotalTime,
  pet,
  type,
  startedAt,
  mineralRarity,
  fetchFarm
}: FarmCardProps) => {
  const [farmEnd, setFarmEnd] = useState(false)
  const [isCollectLoading, setIsCollectLoading] = useState(false)
  const setOresAtom = useSetRecoilState(oreAtom)
  const { fetch } = useMoralisCloudFunction(
    'collectFarm',
    { robotId: isNFT ? id : null, nonNftRobot: isNFT ? null : id },
    { autoFetch: false }
  )
  const { fetch: fetchOil } = useMoralisCloudFunction(
    'useOil',
    { robotId: isNFT ? id : null, nonNftRobot: isNFT ? null : id },
    { autoFetch: false }
  )

  return (
    <div className="col-span-1">
      <div className="flex flex-row space-x-1 mt-4 items-center justify-center">
        {!isPaused && (
          <CounterTotal
            time={mineralTotalTime}
            startedAt={startedAt}
            setFarmEnd={() => {
              if (!isPaused) setFarmEnd(true)
            }}
          />
        )}
        <div
          title="Mineral supply"
          className={classNames(
            'flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white'
          )}
        >
          <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
          {mineralCapacity}
          {mineralBonus > 0 && (
            <span className="ml-px text-xs text-green-500"> +{mineralBonus * 100}%</span>
          )}
        </div>
        <CounterReroll time={startedAt} fetchFarm={fetchFarm} id={id} canReroll={canReroll} />
        <button
          type="button"
          title="Collect"
          className={classNames(
            'flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white',
            farmEnd && !isPaused ? '' : 'cursor-not-allowed'
          )}
          onClick={() => {
            if (farmEnd && !isCollectLoading) {
              setIsCollectLoading(true)
              fetch({
                onError: () => setIsCollectLoading(false),
                onSuccess: (result: {
                  status: boolean
                  message: string
                  ores: number
                  bonus: number
                  hasBonus: boolean
                  drop: { shards: number; pieceType: string }
                }) => {
                  if (result?.status) {
                    fetchFarm()
                    setOresAtom(i => i + result.ores)
                    toast.custom(
                      t => (
                        <Notification
                          isShow={t.visible}
                          icon="success"
                          title={'Collect'}
                          description={
                            <div className="flex flex-row items-center">
                              <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                              <div className="text-green-500">{result.ores}</div>
                              {result.hasBonus && (
                                <div className="flex flex-row items-center">
                                  <StarIcon className="w-6 h-6 text-yellow-500" />+{result.bonus}%
                                </div>
                              )}
                              {result?.drop?.shards > 0 && (
                                <div className="flex flex-row items-center">
                                  <PuzzleIcon className="w-6 h-6" />
                                  {result.drop.shards}{' '}
                                  {shard[result.drop.pieceType] || result.drop.pieceType}
                                </div>
                              )}
                            </div>
                          }
                        />
                      ),
                      { duration: 3000 }
                    )
                  } else {
                    toast.custom(
                      t => (
                        <Notification
                          isShow={t.visible}
                          icon="error"
                          title="Collect"
                          description={
                            <div className="flex flex-row items-center">{result.message}</div>
                          }
                        />
                      ),
                      { duration: 3000 }
                    )
                  }
                }
              })
            }
          }}
        >
          <Collect
            className={classNames(
              'w-5 h-5',
              farmEnd && !isPaused ? 'text-tree-poppy' : 'text-gray-500'
            )}
          />
        </button>
      </div>
      <div className="h-80 lg:h-96 relative w-full aspect-square">
        {isPaused ? (
          <>
            <img
              onClick={() =>
                fetchOil({
                  onSuccess: ({ status, message }) => {
                    if (status) {
                      fetchFarm()
                      toast.custom(
                        t => (
                          <Notification
                            isShow={t.visible}
                            icon="success"
                            title="Oil"
                            description={
                              <div className="flex flex-row items-center">You can farm again!</div>
                            }
                          />
                        ),
                        { duration: 3000 }
                      )
                    } else {
                      toast.custom(
                        t => (
                          <Notification
                            isShow={t.visible}
                            icon="error"
                            title="Oil"
                            description={
                              <div className="flex flex-row items-center">{message}</div>
                            }
                          />
                        ),
                        { duration: 3000 }
                      )
                    }
                  }
                })
              }
              alt=""
              className="p-5 h-full w-full object-contain z-10 absolute"
              src="/oil-land.png"
            />
            <LandEmpty rarity={mineralRarity} />
          </>
        ) : farmEnd ? (
          <Bag />
        ) : isNFT ? (
          <LandRobot
            id={id}
            petName={pet}
            rarity={rarity}
            robotType={type}
            piecesStatus={piecesStatus}
            mineralRarity={mineralRarity}
          />
        ) : (
          <LandNonNFTRobot mineralRarity={mineralRarity} id={id} name={type} petName={pet} />
        )}
      </div>
    </div>
  )
}
