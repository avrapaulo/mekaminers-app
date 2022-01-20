import { useRecoilValue } from 'recoil'
import { walletAtom } from 'recoil/atoms'
import { useMeka } from './meka'

export const UseBalanceOf = () => {
  const walletAddress = useRecoilValue(walletAtom)
  const { fetchMeka: fetchBalanceOf } = useMeka({
    functionName: 'balanceOf',
    params: { account: walletAddress }
  })
  return { fetchBalanceOf }
}
