import { useEffect, useState } from 'react'
import { getTimeRemaining } from 'helpers/timer'
import { TopCard } from '.'

interface TimerProps {
  title: string
}

export const Timer = ({ title }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(getTimeRemaining())
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // })
  return <TopCard img="warning" title={title} description={timeLeft} />
}
