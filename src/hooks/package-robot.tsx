import { useWeb3ExecuteFunction } from 'react-moralis'
import { abi } from 'contracts/RobotPackage.json'

interface packageProps {
  functionName: string
  params?: { [key: string]: string | number }
}

export const packageRobotProps = (params, functionName) => ({
  abi,
  contractAddress: process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS,
  functionName,
  params
})

export const usePackageRobot = ({ functionName, params }: packageProps) => {
  const { fetch: packageRobotFetch } = useWeb3ExecuteFunction(
    packageRobotProps(params, functionName)
  )

  return { packageRobotFetch }
}
