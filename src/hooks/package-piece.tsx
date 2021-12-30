import { useWeb3ExecuteFunction } from 'react-moralis'
import { abi } from 'contracts/PiecePackage.json'

interface packageProps {
  functionName: string
  params?: { [key: string]: string | number }
}

export const packagePieceProps = (params, functionName) => ({
  abi,
  contractAddress: process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS,
  functionName,
  params
})

export const usePackagePiece = ({ params, functionName }: packageProps) => {
  const { fetch: packagePieceFetch } = useWeb3ExecuteFunction(
    packagePieceProps(params, functionName)
  )

  return { packagePieceFetch }
}
