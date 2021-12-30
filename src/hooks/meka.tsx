import { useWeb3ExecuteFunction } from 'react-moralis'
import { abi } from 'contracts/MekaMiners.json'

interface mekaProps {
  functionName: string
  params?: { [key: string]: string | number }
}

export const useMeka = ({ functionName, params }: mekaProps) => {
  const { fetch: fetchMeka } = useWeb3ExecuteFunction({
    contractAddress: process.env.NEXT_PUBLIC_MEKA_ADDRESS,
    functionName,
    abi,
    params
  })
  return { fetchMeka }
}
