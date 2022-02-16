import { Suspense, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMoralis, useMoralisCloudFunction, useWeb3ExecuteFunction } from 'react-moralis'
import Confetti from 'react-dom-confetti'
import { walletAtom, mekaAtom } from 'recoil/atoms'
import { useMeka, packagePieceProps, packageRobotProps, UseBalanceOf } from 'hooks'
import { Card } from 'components/card'
import { classNames } from 'helpers/class-names'
import { addressType } from 'helpers/address'
import { Piece } from 'components/3D'

interface BoxProps {
  id: number
  gen: number
  type: string
  count: number[]
}

interface BoxResultProps {
  token: number
  rarity: string
  type: string
  piecesStatus?: { key: string; id: number }[]
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
const amountToApprove = 1000000

const robotTest = [{ key: 'd' }, { key: 'e' }]

const later = async (delay = 1000) => {
  await new Promise(resolve => setTimeout(resolve, delay))
  return robotTest
}

const buttonText = (loading, unseenItems, isOpen, boxToOpen, type) => {
  if (loading) return '\u00A0'
  if (unseenItems !== 0) return 'Next'
  if (isOpen) return boxToOpen !== 0 ? 'Next Box' : `My ${type[0].toUpperCase()}${type.slice(1)}s`
  return 'Open'
}

export const Box = ({ id, count, type, gen }: BoxProps) => {
  const wallet = useRecoilValue(walletAtom)
  const { Moralis } = useMoralis()

  const { fetchMeka: fetchMekaAllowance } = useMeka({
    functionName: 'allowance',
    params: {
      spender: addressType(type, gen),
      owner: wallet
    }
  })

  const { fetchMeka: fetchMekaApprove } = useMeka({
    functionName: 'approve',
    params: {
      spender: addressType(type, gen),
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
  const [output, setOutput] = useState<BoxResultProps>()
  const [received, setReceived] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inactive, setInactive] = useState(false)
  const [boxNumbers, setBoxNumbers] = useState(count)
  const [displayConfetti, setDisplayConfetti] = useState(false)
  const setMekaAtom = useSetRecoilState(mekaAtom)

  const { fetchBalanceOf } = UseBalanceOf()

  useEffect(() => {
    if (isOpen && type === 'piece') {
      const confettiPieces = async () => {
        await later(1000)
        setDisplayConfetti(true)
      }
      confettiPieces()
    }
  }, [isOpen, output, type])

  return (
    <Card
      description={`Package ${type[0].toUpperCase()}${type.slice(1)}s ${
        gen === 0 ? +id : +id - 3
      } - Gen ${gen}`}
      imageCard={
        loading ? (
          <div className="flex h-full justify-center items-center animation-y">
            <div className="h-20 w-20 relative">
              <img alt="" src={'/meka.png'} />
            </div>
          </div>
        ) : isOpen && type === 'piece' ? (
          <Suspense fallback={null}>
            <Piece
              pieceId={output.piecesStatus[0].id}
              rarity={output.rarity}
              robotType={output.type}
            />
          </Suspense>
        ) : (
          <img
            alt=""
            src={
              isOpen
                ? `/gif/${type}/${output.type}-${output.rarity}.gif`.toLowerCase()
                : `/gif/boxLvl${gen === 0 ? +id : +id - 3}-${type}.gif`
            }
          />
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
                try {
                  const mekaAllowanceResult: any = await fetchMekaAllowance()
                  if (+Moralis.Units.FromWei(mekaAllowanceResult, 18) < 5) {
                    const mekaApproveWait: any = await fetchMekaApprove()
                    await mekaApproveWait?.wait()
                  }

                  if (received.length === 0 && boxNumbers.length === 0) {
                    return router.push(`/inventory/${type}s`)
                  }

                  let resultFetch = received
                  if (!isOpen || (received?.length === 0 && boxNumbers.length > 0)) {
                    const robotParams = packageRobotProps(
                      { _amount: Moralis.Units.ETH(5), _tokenId: boxNumbers[0] },
                      'openPackage',
                      gen
                    )
                    const pieceParams = packagePieceProps(
                      { _amount: Moralis.Units.ETH(5), _tokenId: boxNumbers[0] },
                      'openPackage',
                      gen
                    )

                    const packageFetchWait: any = await packageFetch({
                      params: type === 'robot' ? robotParams : pieceParams
                    })
                    const packageFetchResult: any = await packageFetchWait?.wait()

                    if (packageFetchResult?.status === 1) {
                      resultFetch = null
                      while (!resultFetch || resultFetch?.length === 0) {
                        await later(10000)

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
                      if (type !== 'piece') setDisplayConfetti(true)
                      setLoading(false)
                      setOutput(resultFetch[0])
                      setReceived(resultFetch.slice(1))
                      setTimeout(() => setInactive(false), animationDelay)
                      setIsOpen(true)
                      setBoxNumbers(boxNumbers.splice(1))
                      const balanceOfResult: any = await fetchBalanceOf()
                      setMekaAtom(Math.floor(+Moralis.Units.FromWei(balanceOfResult, 18)))
                    } else {
                      setInactive(false)
                      setLoading(false)
                      const balanceOfResult: any = await fetchBalanceOf()
                      setMekaAtom(Math.floor(+Moralis.Units.FromWei(balanceOfResult, 18)))
                    }
                  } else {
                    await later(2000)
                    setLoading(false)
                    setOutput(resultFetch[0])
                    setReceived(resultFetch.slice(1))
                    setTimeout(() => setInactive(false), animationDelay)
                    if (type !== 'piece') setDisplayConfetti(true)
                  }
                } catch {
                  setLoading(false)
                  setInactive(false)
                }
              }}
            >
              <Confetti active={displayConfetti} config={config} />
              {buttonText(loading, received.length, isOpen, boxNumbers.length, type)}
            </button>
          </div>
          <div className="text-sm font-medium text-right">( x{boxNumbers.length} )</div>
        </div>
      </div>
    </Card>
  )
}
