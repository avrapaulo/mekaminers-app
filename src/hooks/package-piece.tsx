import { useWeb3ExecuteFunction } from 'react-moralis'
import { abi } from 'contracts/RobotPackage.json'

interface packageProps {
  functionName: string
}

export const usePackagePiece = ({ functionName }: packageProps) => {
  const { fetch: pieceFetch } = useWeb3ExecuteFunction({
    abi,
    contractAddress: process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS,
    functionName
  })

  return { pieceFetch }
}
