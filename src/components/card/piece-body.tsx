import { classNames } from 'helpers/class-names'
import { rarityInfo } from 'constants/rarity'
import { statusDescription } from 'constants/status'

interface PiecesBodyProps {
  rarity?: number | string
  piecesStatus: { key: string; value: number }[]
}

export const PiecesBody = ({ piecesStatus, rarity }: PiecesBodyProps) => (
  <div className="flex-1 p-4 flex flex-col">
    <div className="flex justify-center items-center flex-1">
      {piecesStatus.map(({ key, value }) => (
        <div
          key={key}
          className={classNames(
            'flex space-x-1 justify-center border-2 bg-white text-black rounded-md px-2 py-1 items-center'
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
          <div className="font-bold">{value}%</div>
        </div>
      ))}
    </div>
  </div>
)
