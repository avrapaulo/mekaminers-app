import { useWeb3ExecuteFunction } from 'react-moralis'
import { abi } from 'contracts/RobotPackage.json'
import { addressType } from 'helpers/address'

interface packageProps {
  functionName: string
  gen?: number
  params?: { [key: string]: string | number }
}

export const packageRobotProps = (params, functionName: string, gen = 0) => ({
  abi,
  contractAddress: addressType('robot', gen),
  functionName,
  params
})

export const usePackageRobot = ({ functionName, params, gen }: packageProps) => {
  const { fetch: packageRobotFetch } = useWeb3ExecuteFunction(
    packageRobotProps(params, functionName, gen)
  )

  return { packageRobotFetch }
}
