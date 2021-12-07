import { atom } from 'recoil'

export const piecePackageCount = atom({
  key: 'piecePackageCount',
  default: { pack1: 0, pack2: 0, pack3: 0 }
})

export const robotPackageCount = atom({
  key: 'robotPackageCount',
  default: { pack1: 0, pack2: 0, pack3: 0 }
})
