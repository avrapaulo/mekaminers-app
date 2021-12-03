import { useEffect, useState } from 'react'
import { getTimeRemaining } from 'helpers/timer'
import { TopCard } from '.'

interface TimerProps {
  title: string
  children: JSX.Element
}

export const Timer = ({ title, children }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearTimeout(timer)
  })
  return (
    <TopCard title={title} description={timeLeft}>
      {children}
    </TopCard>
  )
}
