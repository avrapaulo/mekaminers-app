export const addressType = (type: string, gen: number) => {
  if (type === 'robot') {
    if (gen === 0) return process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS
    if (gen === 1) return process.env.NEXT_PUBLIC_ROBOTPACKAGEGEN1_ADDRESS
  }
  if (type === 'piece') {
    if (gen === 0) return process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS
    if (gen === 1) return process.env.NEXT_PUBLIC_PIECEPACKAGEGEN1_ADDRESS
  }
}
