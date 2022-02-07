import { useEffect, useState } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import { useMoralisCloudFunction } from 'react-moralis'
import { classNames } from 'helpers/class-names'
import toast from 'react-hot-toast'
import { Notification } from 'components/notification'

interface CounterProps {
  time: string
  id: number
  fetchFarm: () => void
}
export const CounterReroll = ({ time, fetchFarm, id }: CounterProps) => {
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
      className={classNames(
        'flex justify-center items-center  border border-transparent text-lg font-semibold rounded-full shadow-sm text-white'
      )}
      onClick={() => {
        if (timeLeft > 0) {
          fetch({
            onSuccess: () => {
              fetchFarm()
              toast.custom(
                t => (
                  <Notification
                    isShow={t.visible}
                    icon="success"
                    title={'Reroll'}
                    description={'-25 ores'}
                    setShow={() => toast.dismiss(t.id)}
                  />
                ),
                { duration: 3000 }
              )
            }
          })
        }
      }}
    >
      {timeLeft > 0 ? (
        <>
          <RefreshIcon className="text-tree-poppy w-6 h-6" />
          {minutes}:{seconds}
        </>
      ) : (
        <RefreshIcon className="text-gray-500 w-6 h-6 cursor-not-allowed" />
      )}
    </button>
  )
}
