import { useEffect, useState } from 'react'

interface TimerStatusProps {
  time: string
  fetch: () => Promise<void>
}

export const TimerStatus = ({ time, fetch }: TimerStatusProps) => {
  const date = new Date()
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

  const [timeLeft, setTimeLeft] = useState(+new Date(time) + 181 * 1000 - nowUtc)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(+new Date(time) + 180 * 1000 - nowUtc)
    }, 1000)
    if (Math.floor(((+new Date(time) + 180 * 1000 - nowUtc) / 1000) % 60) === 0) fetch()

    return () => clearTimeout(timer)
  })

  const minutes = `0${Math.floor((timeLeft / 1000 / 60) % 60)}`.slice(-2)
  const seconds = `0${Math.floor((timeLeft / 1000) % 60)}`.slice(-2)

  if ((timeLeft / 1000) % 60 > 0) {
    return (
      <div>
        {minutes}:{seconds}
      </div>
    )
  }

  return <div className="text-center text-6xl">Still attaching...</div>
}
