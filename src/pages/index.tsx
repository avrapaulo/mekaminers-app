import { useRecoilValue } from 'recoil'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { AbiItem } from 'web3-utils'
import { walletAtom } from 'recoil/atoms'
import { abi } from 'contracts/PiecePackage.json'

const Homepage = () => {
  const wallet = useRecoilValue(walletAtom)
  const { web3 } = useMoralis()

  const { fetch } = useWeb3ExecuteFunction()

  const getPackagesOwner = async () => {
    const robotPackage = new web3.eth.Contract(
      abi as AbiItem[],
      process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS
    )
    const tokens = await robotPackage.methods.tokenOfOwner(wallet).call()

    tokens.forEach(async element => {
      console.log(await robotPackage.methods.getPackage(element).call())
    })
  }

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0"></div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">name</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">amount</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Button text
            </button>
            <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => getPackagesOwner()}
            >
              get
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage
