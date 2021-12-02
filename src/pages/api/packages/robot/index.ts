// import { NextApiRequest, NextApiResponse } from 'next'
// import Moralis from 'moralis/node'
// import robotPackageABI from 'contracts/RobotPackage.json'

// const robotPackage = async (req: NextApiRequest, res: NextApiResponse) => {
//   const package2amount = 0.5
//   // await Moralis.initialize(process.env.APPLICATION_ID)
//   // Moralis.serverURL = process.env.SERVER_URL
//   await Moralis.start({
//     serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
//     appId: process.env.NEXT_PUBLIC_APPLICATION_ID
//   })
//   if (req.method === 'POST') {
//     try {
//       const { wallet, packageType } = req.body
//       const options = {
//         contractAddress: process.env.ROBOTPACKAGE_ADDRESS,
//         functionName: 'createPackage',
//         abi: robotPackageABI,
//         msgValue: Moralis.Units.ETH(package2amount.toString()),
//         params: {
//           _owner: wallet,
//           _amount: Moralis.Units.ETH(package2amount.toString()),
//           _packageType: packageType
//         }
//       }

//       // Moralis.Cloud.getUserData(wallet)

//       console.log(robotPackageABI)
//     } catch (err) {
//       res.status(500).json({ statusCode: 500, message: err.message })
//     }
//   } else {
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }

// export default robotPackage

export {}
