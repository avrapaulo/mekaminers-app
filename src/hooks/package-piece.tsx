import { useWeb3ExecuteFunction } from 'react-moralis'
import { abi } from 'contracts/PiecePackage.json'
import { addressType } from 'helpers/address'

interface packageProps {
  functionName: string
  gen?: number
  params?: { [key: string]: string | number }
}

export const packagePieceProps = (params, functionName: string, gen = 0) => ({
  abi,
  contractAddress: addressType('piece', gen),
  functionName,
  params
})

export const usePackagePiece = ({ params, functionName, gen }: packageProps) => {
  const { fetch: packagePieceFetch } = useWeb3ExecuteFunction(
    packagePieceProps(params, functionName, gen)
  )

  return { packagePieceFetch }
}
