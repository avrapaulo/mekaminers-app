export const getTimeRemaining = () => {
  const date = new Date()
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

  const difference = +new Date(Date.UTC(2022, 0, 15, 17, 0, 0)) - nowUtc

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`.slice(-2)
  const minutes = `0${Math.floor((difference / 1000 / 60) % 60)}`.slice(-2)
  const seconds = `0${Math.floor((difference / 1000) % 60)}`.slice(-2)

  if (difference > 0) {
    return `${days}D ${hours}:${minutes}:${seconds}`
  }

  return 'End'
}
