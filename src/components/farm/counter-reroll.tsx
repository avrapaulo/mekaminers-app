import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useMoralisCloudFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { classNames } from 'helpers/class-names'
import { Notification } from 'components/notification'
import { oreAtom } from 'recoil/atoms'
import { Reroll } from 'icons'

interface CounterProps {
  canReroll: boolean
  time: string
  id: string | number
  fetchFarm: () => void
}
export const CounterReroll = ({ time, fetchFarm, id, canReroll }: CounterProps) => {
  const { fetch } = useMoralisCloudFunction('rerollFarm', { robotId: id }, { autoFetch: false })
  const date = new Date()
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
  const [oresAtom, setOresAtom] = useRecoilState(oreAtom)
  const [timeLeft, setTimeLeft] = useState(+new Date(time) + 1 * 59999 - nowUtc)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(+new Date(time) + 1 * 60000 - nowUtc)
    }, 1000)

    return () => clearTimeout(timer)
  })

  const minutes = `0${Math.floor((timeLeft / 1000 / 60) % 60)}`.slice(-2)
  const seconds = `0${Math.floor((timeLeft / 1000) % 60)}`.slice(-2)

  return (
    <button
      type="button"
      title="Reroll"
      className={classNames(
        'flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white'
      )}
      onClick={() => {
        if (timeLeft > 0 && canReroll) {
          if (oresAtom <= 25) {
            return toast.custom(
              t => (
                <Notification
                  isShow={t.visible}
                  icon="error"
                  title={'Reroll'}
                  description={
                    <div className="flex flex-row items-center">
                      You need more
                      <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                    </div>
                  }
                />
              ),
              { duration: 3000 }
            )
          }
          fetch({
            onSuccess: ({ status, message }) => {
              if (status) {
                fetchFarm()
                setOresAtom(i => i - 25)
                toast.custom(
                  t => (
                    <Notification
                      isShow={t.visible}
                      icon="success"
                      title={'Reroll'}
                      description={
                        <div className="flex flex-row items-center">
                          <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                          <div className="text-red-500">-25</div>
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
                      title="Reroll"
                      description={<div className="flex flex-row items-center">{message}</div>}
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
      {timeLeft > 0 && canReroll ? (
        <>
          <Reroll className="text-tree-poppy w-6 h-6" />
          {minutes}:{seconds}
        </>
      ) : (
        <Reroll className="text-gray-500 w-6 h-6 cursor-not-allowed" />
      )}
    </button>
  )
}
