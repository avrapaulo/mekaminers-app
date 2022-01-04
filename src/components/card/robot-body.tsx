import { classNames } from 'helpers/class-names'
import { rarityInfo } from 'constants/rarity'
import { statusDescription } from 'constants/status'

interface RobotBodyProps {
  rarity?: number | string
  bonus: number
  robotStatus: { key: string; value: number }[]
  piecesStatus: { key: string; value: number }[]
}

export const RobotBody = ({ rarity, bonus, robotStatus, piecesStatus }: RobotBodyProps) => (
  <div className="flex-1 p-4 flex flex-col">
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2 lg:grid-cols-2 lg:gap-x-1">
      {robotStatus.map(({ key, value }) => {
        switch (key) {
          case 'Capacity':
            return (
              <div
                className={classNames(
                  'flex justify-start border-2 rounded-md space-x-1 pl-1 bg-white text-black font-semibold items-center'
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase h-5 w-5">
                  <img
                    alt="Logo Meka Miners"
                    className="h-full w-full object-contain"
                    src={`/icons-status/${key.toLowerCase()}.png`}
                  />
                </div>
                <div className="">{value}</div>
                <div className="text-xs flex justify-center items-center">
                  {piecesStatus && piecesStatus?.length !== 0 ? (
                    <span className="text-green-900">
                      +
                      {(value * bonus) / 100 +
                        (value *
                          piecesStatus?.find(({ key: pieceKey }) => key === pieceKey).value) /
                          100}
                    </span>
                  ) : (
                    <span className="text-green-500">+{(value * bonus) / 100}</span>
                  )}
                </div>
              </div>
            )
          case 'Efficiency':
            return (
              <div
                className={classNames(
                  'flex justify-start border-2 rounded-md space-x-1 pl-1 bg-white text-black font-semibold items-center'
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase h-5 w-5">
                  <img
                    alt="Logo Meka Miners"
                    className="h-full w-full object-contain"
                    src={`/icons-status/${key.toLowerCase()}.png`}
                  />
                </div>
                <div className="">
                  {value}
                  {piecesStatus?.find(({ key: pieceKey }) => key === pieceKey) ? '' : 'm'}
                </div>
                <div className="text-xs flex justify-center items-center">
                  {piecesStatus && piecesStatus?.length !== 0 && (
                    <span className="text-green-500">
                      -{value * piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value}m
                    </span>
                  )}
                </div>
              </div>
            )
          case 'OilDecrease':
          case 'Stealthiness':
          case 'Speed':
            return (
              <div
                className={classNames(
                  'flex justify-start border-2 rounded-md space-x-1 pl-1 bg-white text-black font-semibold items-center'
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase h-5 w-5">
                  <img
                    alt="Logo Meka Miners"
                    className="h-full w-full object-contain"
                    src={`/icons-status/${key.toLowerCase()}.png`}
                  />
                </div>
                <div className="">{value}</div>
                <div className="text-xs flex justify-center items-center">
                  {piecesStatus && piecesStatus?.length !== 0 && (
                    <span className="text-green-500">
                      +{value * piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value}
                    </span>
                  )}
                </div>
              </div>
            )
          default:
            return <div></div>
        }
      })}
    </div>
  </div>
)
