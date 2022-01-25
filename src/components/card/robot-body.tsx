import { classNames } from 'helpers/class-names'
import { statusDescription } from 'constants/status'

interface RobotBodyProps {
  bonus: number
  robotStatus: { key: string; value: number }[]
  piecesStatus: { key: string; value: number }[]
}

export const RobotBody = ({ bonus, robotStatus, piecesStatus }: RobotBodyProps) => (
  <div className="flex-1 p-4 flex flex-col">
    <div className="grid grid-cols-2 sm:gap-x-6 gap-y-2 gap-x-1">
      {robotStatus.map(({ key, value }) => {
        switch (key) {
          case 'Capacity':
            return (
              <div
                key={value}
                className={classNames(
                  'flex justify-start border-2 rounded-md space-x-1 pl-1 bg-white text-black font-semibold items-center'
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase h-5 w-5">
                  <img
                    alt=""
                    className="h-full w-full object-contain"
                    src={`/icons-status/${key.toLowerCase()}.png`}
                  />
                </div>
                <div className="">{value}</div>
                <div className="text-xs flex justify-center items-center">
                  {piecesStatus && piecesStatus.some(({ key: pieceKey }) => key === pieceKey) ? (
                    <span className="text-green-500">
                      +
                      {(
                        (value * bonus) / 100 +
                        (value *
                          piecesStatus?.find(({ key: pieceKey }) => key === pieceKey).value) /
                          100
                      ).toFixed(2)}
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
                key={value}
                className={classNames(
                  'flex justify-start border-2 rounded-md space-x-1 pl-1 bg-white text-black font-semibold items-center'
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase h-5 w-5">
                  <img
                    alt=""
                    className="h-full w-full object-contain"
                    src={`/icons-status/${key.toLowerCase()}.png`}
                  />
                </div>
                <div className="">
                  {value}
                  {piecesStatus?.find(({ key: pieceKey }) => key === pieceKey) ? '' : 'm'}
                </div>
                <div className="text-xs flex justify-center items-center">
                  {piecesStatus && piecesStatus.some(({ key: pieceKey }) => key === pieceKey) && (
                    <span className="text-green-500">
                      -
                      {Math.floor(
                        (value * piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value) /
                          100
                      )}
                      :
                      {Math.round(
                        60 *
                          ((value *
                            piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value) /
                            100 -
                            Math.floor(
                              (value *
                                piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value) /
                                100
                            ))
                      )}
                      m
                    </span>
                  )}
                </div>
              </div>
            )
          case 'OilDecrease':
            return (
              <div
                key={value}
                className={classNames(
                  'flex justify-start border-2 rounded-md space-x-1 pl-1 bg-white text-black font-semibold items-center'
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase h-5 w-5">
                  <img
                    alt=""
                    className="h-full w-full object-contain"
                    src={`/icons-status/${key.toLowerCase()}.png`}
                  />
                </div>
                <div className="">{value}</div>
                <div className="text-xs flex justify-center items-center">
                  {piecesStatus && piecesStatus.some(({ key: pieceKey }) => key === pieceKey) && (
                    <span className="text-green-500">
                      + {piecesStatus.find(({ key: pieceKey }) => key === pieceKey).value}%
                    </span>
                  )}
                </div>
              </div>
            )
          case 'Stealthiness':
          case 'Speed':
            return (
              <div
                key={value}
                className={classNames(
                  'flex justify-start border-2 rounded-md space-x-1 pl-1 bg-white text-black font-semibold items-center'
                )}
                title={statusDescription[key]}
              >
                <div className="uppercase h-5 w-5">
                  <img
                    alt=""
                    className="h-full w-full object-contain"
                    src={`/icons-status/${key.toLowerCase()}.png`}
                  />
                </div>
                <div className="">{value}</div>
                <div className="text-xs flex justify-center items-center">
                  {piecesStatus && piecesStatus.some(({ key: pieceKey }) => key === pieceKey) && (
                    <span className="text-green-500">
                      +
                      {(
                        (value *
                          piecesStatus?.find(({ key: pieceKey }) => key === pieceKey)?.value) /
                        100
                      ).toFixed(2)}
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
