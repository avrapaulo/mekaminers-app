export const getEllipsisTxt = (str, n = 4) => {
  if (str) {
    return `${str.substr(0, n + 2)}...${str.substr(str.length - n, str.length)}`
  }
  return ''
}
