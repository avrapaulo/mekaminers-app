import { selector } from 'recoil'
import { piecePackageCount, robotPackageCount } from 'recoil/atoms'

export const pieceCountSelector = selector({
  key: 'pieceCountSelector',
  get: ({ get }) => {
    const { pack1, pack2, pack3 } = get(piecePackageCount)

    return pack1 + pack2 + pack3
  }
})

export const robotCountSelector = selector({
  key: 'robotCountSelector',
  get: ({ get }) => {
    const { pack1, pack2, pack3 } = get(robotPackageCount)

    return pack1 + pack2 + pack3
  }
})
