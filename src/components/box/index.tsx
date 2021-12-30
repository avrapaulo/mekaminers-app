import { useState } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { useMoralis, useMoralisCloudFunction, useWeb3ExecuteFunction } from 'react-moralis'
import Confetti from 'react-dom-confetti'
import { walletAtom } from 'recoil/atoms'
import { useMeka, packagePieceProps, packageRobotProps } from 'hooks'
import { Card } from 'components/card'
import { classNames } from 'helpers/class-names'

interface BoxProps {
  id: number
  count: number[]
  type: string
}

const config = {
  angle: 140,
  spread: 360,
  startVelocity: 41,
  elementCount: 100,
  dragFriction: 0.21,
  duration: 2080,
  stagger: 5,
  width: '6px',
  height: '6px',
  perspective: '837px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
}

const animationDelay = 4000
const amountToApprove = 100000

const robotTest = [{ key: 'd' }, { key: 'e' }]

const later = async (delay = 1000) => {
  await new Promise(resolve => setTimeout(resolve, delay))
  return robotTest
}

// TODO add pieces also
const buttonText = (loading, unseenItems, isOpen, boxToOpen) => {
  if (loading) return '\u00A0'
  if (unseenItems !== 0) return 'Next'
  if (isOpen) return boxToOpen !== 0 ? 'Next Box' : 'My Robots'
  return 'Open'
}

export const Box = ({ id, count, type }: BoxProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { Moralis } = useMoralis()

  const { fetchMeka: fetchMekaAllowance } = useMeka({
    functionName: 'allowance',
    params: {
      spender:
        type === 'robot'
          ? process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS
          : process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS,
      owner: wallet
    }
  })

  const { fetchMeka: fetchMekaApprove } = useMeka({
    functionName: 'approve',
    params: {
      spender:
        type === 'robot'
          ? process.env.NEXT_PUBLIC_ROBOTPACKAGE_ADDRESS
          : process.env.NEXT_PUBLIC_PIECEPACKAGE_ADDRESS,
      amount: Moralis.Units.ETH(amountToApprove)
    }
  })

  const { fetch: packageFetch } = useWeb3ExecuteFunction()

  const { fetch: fetchUnpackedRobots } = useMoralisCloudFunction(
    'getUnpackedRobots',
    { packageType: +id },
    { autoFetch: false }
  )
  const { fetch: fetchUnpackedPieces } = useMoralisCloudFunction(
    'getUnpackedPieces',
    { packageType: +id },
    { autoFetch: false }
  )
  const router = useRouter()
  const [output, setOutput] = useState<string>()
  const [received, setReceived] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inactive, setInactive] = useState(false)
  const [boxNumbers, setBoxNumbers] = useState(count)
  const [displayConfetti, setDisplayConfetti] = useState(false)

  return (
    <Card
      // TODO add pieces also
      title={type === 'robot' ? `Package Robots ${id}` : `Package Pieces ${id}`}
      imageCard={
        loading ? (
          <div className="flex h-full justify-center items-center animation-y">
            <div className="h-20 w-20 relative">
              <img alt="Logo Meka Miners" src={'/meka.png'} />
            </div>
          </div>
        ) : (
          <img alt="Logo Meka Miners" src={isOpen ? output : `/gif/boxLvl${id}-${type}.gif`} />
        )
      }
    >
      <div className="flex-1 p-4 flex flex-col">
        <div className="h-full flex justify-between flex-col">
          <div className="flex justify-center items-center mb-6">
            <button
              type="button"
              className={classNames(
                'w-32 inline-flex justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded-md shadow-sm text-black bg-white hover:bg-gray-200',
                loading ? 'animate-pulse bg-gray-100' : '',
                inactive ? 'pointer-events-none' : ''
              )}
              onClick={async () => {
                setInactive(true)
                setLoading(true)
                setDisplayConfetti(false)
                fetchMekaAllowance({
                  onSuccess: async (result: string | number) => {
                    if (received.length === 0 && boxNumbers.length === 0) {
                      // TODO add pieces also
                      return router.push('/inventory/robots')
                    }

                    let resultFetch = received
                    if (!isOpen || (received?.length === 0 && boxNumbers.length > 0)) {
                      if (Moralis.Units.FromWei(result, 18) < 5) await fetchMekaApprove()

                      const robotParams = packageRobotProps(
                        { _amount: Moralis.Units.ETH(5), _tokenId: boxNumbers[0] },
                        'openPackage'
                      )
                      const pieceParams = packagePieceProps(
                        { _amount: Moralis.Units.ETH(5), _tokenId: boxNumbers[0] },
                        'openPackage'
                      )

                      await packageFetch({
                        params: type === 'robot' ? robotParams : pieceParams,
                        onSuccess: async () => {
                          resultFetch = null
                          while (!resultFetch || resultFetch?.length === 0) {
                            await later(3000)

                            const unpackedRobots = async () =>
                              await fetchUnpackedRobots({
                                onSuccess: async robotsResult => {
                                  resultFetch = robotsResult as any[]
                                }
                              })

                            const unpackedPieces = async () =>
                              await fetchUnpackedPieces({
                                onSuccess: async robotsResult => {
                                  resultFetch = robotsResult as any[]
                                }
                              })

                            type === 'robot' ? unpackedRobots() : unpackedPieces()
                          }

                          setLoading(false)
                          setOutput(
                            `/gif/${type}/${resultFetch[0].type}-${resultFetch[0].rarity}.gif`.toLowerCase()
                          )
                          setReceived(resultFetch.slice(1))
                          setTimeout(() => setInactive(false), animationDelay)
                          setIsOpen(true)
                          setBoxNumbers(boxNumbers.splice(1))
                          setDisplayConfetti(true)
                        },
                        onError: () => {
                          setInactive(false)
                          setLoading(false)
                        }
                      })
                    } else {
                      await later(2000)
                      setLoading(false)
                      setOutput(
                        `/gif/${type}/${resultFetch[0].type}-${resultFetch[0].rarity}.gif`.toLowerCase()
                      )
                      setReceived(resultFetch.slice(1))
                      setTimeout(() => setInactive(false), animationDelay)
                      setDisplayConfetti(true)
                    }
                  },
                  onError: () => {
                    setLoading(false)
                    setInactive(false)
                  }
                })
              }}
            >
              <Confetti active={displayConfetti} config={config} />
              {buttonText(loading, received.length, isOpen, boxNumbers.length)}
            </button>
          </div>
          <div className="text-sm font-medium text-right">( x{boxNumbers.length} )</div>
        </div>
      </div>
    </Card>
  )
}
