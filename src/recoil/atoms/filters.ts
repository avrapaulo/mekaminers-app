import { atom } from 'recoil'

export const defaultRobotFilters = { rarity: [], type: [], gen: [], withPieces: [] }
export const robotFilterAtom = atom({
  key: 'robotFilterAtom',
  default: defaultRobotFilters
})

export const defaultPieceFilters = { robotType: [], pieceType: [], rarity: [], season: [] }
export const pieceFilterAtom = atom({
  key: 'pieceFilterAtom',
  default: defaultPieceFilters
})
