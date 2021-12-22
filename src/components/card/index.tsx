import { classNames } from 'helpers/class-names'
import { rarity } from 'constants/rarity'

interface CardProps {
  rarityId?: number | string
  title: string
  imageCard: JSX.Element
  children: JSX.Element
}

const Card = ({ rarityId = 'default', title, imageCard, children }: CardProps) => (
  <div
    className={classNames(
      'group relative border rounded-2xl flex flex-col overflow-hidden w-60 bg-gray-500 bg-opacity-10',
      rarity[rarityId].border
    )}
  >
    <div className="flex flex-row justify-end py-2">
      <div className="flex justify-center flex-1 my-1 font-bold">{title}</div>
      {rarityId !== 'default' && (
        <>
          <div className="font-bold rotate-45 pr-3 absolute z-10">{rarity[rarityId].name}</div>
          <div
            className={classNames(
              'absolute w-12 h-20 -rotate-45 transform origin-top-left top-0',
              rarity[rarityId].bg
            )}
          />
        </>
      )}
    </div>
    <div className="px-1">
      <div className="group-hover:opacity-75 relative w-full h-52">{imageCard}</div>
    </div>
    {children}
  </div>
)

export { Card }