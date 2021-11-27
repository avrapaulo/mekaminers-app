import { atom } from 'recoil'

export const defaultWallet = '0x00000000000000000000000'

export const walletAtom = atom({
  key: 'walletAtom',
  default: defaultWallet
})
