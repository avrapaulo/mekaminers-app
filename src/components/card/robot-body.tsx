import { classNames } from 'helpers/class-names'
import { rarity } from 'constants/rarity'
import { statusDescription } from 'constants/status'

interface RobotBodyProps {
  rarityId?: number | string
  bonus: number
  robotStatus: { key: string; value: number }[]
  piecesStatus: { key: string; value: number }[]
}

export const RobotBody = ({ rarityId, bonus, robotStatus, piecesStatus }: RobotBodyProps) => (
  <div className="flex-1 p-4 flex flex-col">
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2 lg:grid-cols-2 lg:gap-x-1">
      {robotStatus.map(({ key, value }) => {
        switch (key) {
          case 'c':
            return (
              <div
                className={classNames(
                  'flex space-x-1 justify-center border-2 rounded-md',
                  rarity[rarityId].border
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase">{key}:</div>
                <div className="">{value}</div>
                <div className="text-xs">
                  {piecesStatus && piecesStatus?.length !== 0 && (
                    <span className="text-green-500">
                      +
                      {value * bonus +
                        value * piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value}
                    </span>
                  )}
                </div>
              </div>
            )
          case 'e':
            return (
              <div
                className={classNames(
                  'flex space-x-1 justify-center border-2 rounded-md',
                  rarity[rarityId].border
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase">{key}:</div>
                <div className="">
                  {value}
                  {piecesStatus?.find(({ key: pieceKey }) => key === pieceKey) ? '' : 'm'}
                </div>
                <div className="text-xs">
                  {piecesStatus && piecesStatus?.length !== 0 && (
                    <span className="text-green-500">
                      -{value * piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value}m
                    </span>
                  )}
                </div>
              </div>
            )
          case 'o':
          case 'st':
          case 'sp':
            return (
              <div
                className={classNames(
                  'flex space-x-1 justify-center border-2 rounded-md',
                  rarity[rarityId].border
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase">{key}:</div>
                <div className="">{value}</div>
                <div className="text-xs">
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
