import { selector } from 'recoil'
import { mekaAtom, oreAtom } from '../atoms'

export const walletCoins = selector({
  key: 'walletSelector',
  get: ({ get }) => {
    const meka = Math.trunc(get(mekaAtom))
    const ore = Math.trunc(get(oreAtom))
    return { meka, ore }
  }
})
