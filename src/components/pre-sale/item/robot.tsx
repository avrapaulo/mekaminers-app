import { ClassProps } from 'models/class'

interface RobotsProps {
  bonus: { [key: string]: { min: number; max: number } }
  classes: ClassProps[]
}

export const RobotItem = ({ classes, bonus }: RobotsProps) => (
  <div className="w-full mt-5 md:mt-0 ">
    <div className="text-center pb-3 font-semibold text-xl">Drop Detail</div>
    <div className="bg-gray-200 rounded-md p-3">
      <div className="grid grid-cols-3 text-center text-sm font-medium">
        <div>Rarity</div>
        <div>Chance</div>
        <div>Bonus</div>
      </div>
      {classes.map(({ chance, classType }) => (
        <div className="relative text-xs space-y-1" key={classType}>
          <div className="inset-0 flex items-center pt-1" aria-hidden="true">
            <div className="w-full border-t border-gray-400" />
          </div>
          <div className="grid grid-cols-3 text-center ">
            <div className="uppercase">{classType}</div>
            <div>{chance}%</div>
            <div>
              {bonus[classType].min}% -{bonus[classType].max}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
