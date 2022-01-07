import { classNames } from 'helpers/class-names'
import { rarityInfo } from 'constants/rarity'
import { statusDescription } from 'constants/status'

interface PiecesBodyProps {
  rarityId?: number | string
  piecesStatus: { key: string; value: number }[]
}

export const PiecesBody = ({ piecesStatus, rarityId }: PiecesBodyProps) => (
  <div className="flex-1 p-4 flex flex-col">
    <div className="flex justify-center items-center flex-1">
      {piecesStatus.map(({ key, value }) => (
        <div
          key={key}
          className={classNames(
            'flex space-x-1 justify-center border-2 rounded-md px-2 py-1',
            (rarityInfo[rarityId] || rarityInfo.default).border
          )}
          title={statusDescription[key]}
        >
          <div className="uppercase">{key}:</div>
          <div className="">{value}</div>
        </div>
      ))}
    </div>
  </div>
)
