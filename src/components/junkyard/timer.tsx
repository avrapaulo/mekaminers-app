import { useEffect, useState } from 'react'
import { TopCard } from '.'

interface TimerProps {
  title: string
  children: JSX.Element
}

const getTimeRemaining = () => {
  const difference = +new Date('2021-12-10') - +new Date()

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`.slice(-2)
  const minutes = `0${Math.floor((difference / 1000 / 60) % 60)}`.slice(-2)
  const seconds = `0${Math.floor((difference / 1000) % 60)}`.slice(-2)

  if (difference > 0) {
    return `${days} days ${hours}:${minutes}:${seconds}`
  }

  return '-'
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
