import { useEffect, useState } from 'react'
import { ClockIcon } from '@heroicons/react/outline'
import { classNames } from 'helpers/class-names'

interface CounterProps {
  time: number
  startedAt: string
  setFarmEnd: () => void
}
export const CounterTotal = ({ time, startedAt, setFarmEnd }: CounterProps) => {
  const date = new Date()
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

  const [timeLeft, setTimeLeft] = useState(+new Date(startedAt) + time * 999 - nowUtc)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(+new Date(startedAt) + time * 1000 - nowUtc)
    }, 1000)

    if (timeLeft < 0) setFarmEnd()
    return () => clearTimeout(timer)
  })

  const hours = `0${Math.floor(timeLeft / (1000 * 60 * 60))}`.slice(-2)
  const minutes = `0${Math.floor((timeLeft / 1000 / 60) % 60)}`.slice(-2)
  const seconds = `0${Math.floor((timeLeft / 1000) % 60)}`.slice(-2)

  return (
    <button
      type="button"
      className={classNames(
        'flex justify-center items-center border border-transparent text-lg font-semibold rounded-full shadow-sm text-white'
      )}
    >
      {timeLeft > 0 ? (
        <>
          <ClockIcon className="text-tree-poppy w-6 h-6" />
          {hours}:{minutes}
        </>
      ) : (
        <>
          <ClockIcon className="text-tree-poppy w-6 h-6" />
          00:00
        </>
      )}
    </button>
  )
}
