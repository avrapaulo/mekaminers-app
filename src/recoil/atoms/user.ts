import { atom } from 'recoil'

export const userLandAtom = atom({ key: 'userLandAtom', default: 4 })
export const currentFeeAtom = atom({
  key: 'currentFeeAtom',
  default: { fee: 0.03, lastWithdraw: null }
})

export const hasNftAtom = atom({
  key: 'hasNftAtom',
  default: 0
})
