export const getTimeRemaining = () => {
  const difference = +new Date('2021-12-10') - +new Date()

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`.slice(-2)
  const minutes = `0${Math.floor((difference / 1000 / 60) % 60)}`.slice(-2)
  const seconds = `0${Math.floor((difference / 1000) % 60)}`.slice(-2)

  if (difference > 0) {
    return `${days}D ${hours}:${minutes}:${seconds}`
  }

  return '-'
}
