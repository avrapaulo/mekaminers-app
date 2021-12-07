import { atom, selector } from 'recoil'

export const piecePackageCount = atom({
  key: 'piecePackageCount',
  default: { pack1: 0, pack2: 0, pack3: 0 }
})

export const robotPackageCount = atom({
  key: 'robotPackageCount',
  default: { pack1: 0, pack2: 0, pack3: 0 }
})

export const pieceCountSelector = selector({
  key: 'pieceCountSelector',
  get: ({ get }) => {
    const piece = get(piecePackageCount)

    return piece.pack1 + piece.pack2 + piece.pack3
  }
})

export const robotCountSelector = selector({
  key: 'robotCountSelector',
  get: ({ get }) => {
    const robot = get(robotPackageCount)

    return robot.pack1 + robot.pack2 + robot.pack3
  }
})
