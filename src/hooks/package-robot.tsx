import { useWeb3ExecuteFunction } from 'react-moralis'
import { abi } from 'contracts/PiecePackage.json'

interface packageProps {
  functionName: string
}

export const usePackageRobot = ({ functionName }: packageProps) => {
  const { fetch: robotFetch } = useWeb3ExecuteFunction({
    abi,
    contractAddress: process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS,
    functionName
  })

  return { robotFetch }
}
