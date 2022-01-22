import { classNames } from 'helpers/class-names'
import { rarityInfo } from 'constants/rarity'

interface CardProps {
  rarity?: number | string
  title?: string
  description: string
  imageCard: JSX.Element
  children: JSX.Element
}

const Card = ({ rarity = 'default', title, description, imageCard, children }: CardProps) => (
  <div
    className={classNames(
      'group relative border rounded-2xl flex flex-col overflow-hidden w-60 bg-gray-500 bg-opacity-10',
      (rarityInfo[rarity] || rarityInfo.default).border
    )}
  >
    <div className="flex flex-row  py-2">
      <div className="flex flex-col flex-1 justify-center">
        {title && (
          <>
            <div className="flex justify-center font-bold">{title}</div>
            <div className=" border-t border-gray-300 mx-10" />
          </>
        )}
        <div className="flex justify-center font-bold">{description}</div>
      </div>
      {rarity !== 'default' && (
        <div className="absolute right-0">
          <div className="font-bold rotate-45 z-20 pr-3 ">
            {(rarityInfo[rarity] || rarityInfo.default).name}
            <div
              className={classNames(
                'w-20 h-9 -left-7 transform  bottom-0 absolute -z-10',
                (rarityInfo[rarity] || rarityInfo.default).bg
              )}
            />
          </div>
        </div>
      )}
    </div>
    <div className="px-1">
      <div className="group-hover:opacity-75 relative w-full h-52 flex justify-center items-center">
        {imageCard}
      </div>
    </div>
    {children}
  </div>
)

export { Card }
