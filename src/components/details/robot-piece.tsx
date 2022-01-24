import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { AnimatePresence, motion } from 'framer-motion'
import { Piece } from 'components/3D'
import { slideAtom, slideDataAtom } from 'recoil/atoms'

interface RobotPieceProps {
  canAttach?: boolean
  isDefault: boolean
  value: number
  pieceId: number
  robotId: number
  rarity: string
  robotType: string
  robotTypeStatus: string
  name: string
  season: string
  IconPiece: any
}

export const RobotPiece = ({
  canAttach = false,
  robotId,
  value,
  pieceId,
  rarity,
  robotType,
  robotTypeStatus,
  name,
  season,
  isDefault,
  IconPiece
}: RobotPieceProps) => {
  const [isVisible, setVisible] = useState(true)
  const setSlide = useSetRecoilState(slideAtom)
  const setSlideData = useSetRecoilState(slideDataAtom)

  return (
    <motion.div
      className="flex-shrink-0 h-40 w-40 relative bg-gray-700 bg-opacity-70 rounded-md cursor-pointer"
      // onHoverStart={() => setVisible(false)}
      // onHoverEnd={() => setVisible(true)}
      onTap={() => setVisible(!isVisible)}
    >
      {isDefault ? (
        <div
          className="flex justify-center items-center h-full"
          onClick={async () => {
            if (canAttach) {
              setSlideData({ robotId, pieceType: robotTypeStatus })
              setSlide(true)
            }
          }}
        >
          <IconPiece className="h-24 w-24 p-1.5 " />
        </div>
      ) : (
        <AnimatePresence exitBeforeEnter>
          {isVisible && (
            <motion.div
              key={`piece${isVisible}`}
              className="h-full w-full rounded-md bg-white"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0
              }}
            >
              <Piece
                key={`piece${isVisible}`}
                pieceId={pieceId}
                rarity={rarity}
                robotType={robotType}
              />
            </motion.div>
          )}
          {!isVisible && (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key="data"
                className="flex flex-col justify-center items-center h-full w-full space-y-2"
                initial={{ y: -10, opacity: 0, scale: 0.75 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div className="text-sm font-bold text-white text-center mb-0.5">{name}</div>
                <div className="flex flex-row justify-center items-center space-x-2 text-black border-gray-300 bg-white px-1 py-1 rounded-md">
                  <div className="flex-shrink-0 h-5 w-5 ">
                    <img
                      alt="Logo Meka Miners"
                      className="h-full w-full object-contain"
                      src={`/icons-status/${robotTypeStatus.toLowerCase()}.png`}
                    />
                  </div>
                  <div>{value}%</div>
                </div>
                <div className="flex flex-row justify-center items-center space-x-2 text-black border-gray-300 bg-white px-1 py-1 rounded-md">
                  <div className="flex-shrink-0 h-5 w-5 ">
                    <img
                      alt="Logo Meka Miners"
                      className="h-full w-full object-contain"
                      src="/icons-status/season.png"
                    />
                  </div>
                  <div className="flex flex-row justify-center items-center">{season}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
