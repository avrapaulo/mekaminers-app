import { atom } from 'recoil'

export const slideAtom = atom({
  key: 'slideAtom',
  default: false
})

export const slideDataAtom = atom({
  key: 'slideDataAtom',
  default: { robotId: null, pieceType: null }
})
