import { atom } from 'recoil'

export const robotFilterAtom = atom({
  key: 'robotFilterAtom',
  default: { rarity: [], type: [], gen: [], withPieces: [] }
})

export const pieceFilterAtom = atom({
  key: 'pieceFilterAtom',
  default: { robotType: [], pieceType: [], rarity: [], season: [] }
})
