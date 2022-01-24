import { atom } from 'recoil'

export const filterAtom = atom({
  key: 'filterAtom',
  default: { rarity: [], type: [], gen: [], withPieces: [] }
})
