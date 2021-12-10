import { ClassProps } from 'models/class'

interface RobotsProps {
  bonus: { [key: string]: { min: number; max: number } }
  classes: ClassProps[]
}

export const RobotItem = ({ classes, bonus }: RobotsProps) => (
  <div className="w-full">
    <div className="text-center font-bold text-2xl relative text-white pb-2">Drop Detail</div>
    <div className="rounded-md">
      <div className="grid grid-cols-3 text-center text-sm font-medium">
        <div className="bg-tree-poppy mr-px rounded-sm">Rarity</div>
        <div className="bg-tree-poppy mr-px ml-px rounded-sm">Chance</div>
        <div className="bg-tree-poppy ml-px rounded-sm">Bonus</div>
      </div>
      {classes.map(({ chance, classType }) => (
        <div className="relative text-xs space-y-1" key={classType}>
          <div className="grid grid-cols-3 text-center ">
            <div className="uppercase bg-athens-gray-500 my-0.5 p-1.5 font-semibold mr-0.5 rounded-md">
              {classType}
            </div>
            <div className="uppercase bg-athens-gray-500 my-0.5 p-1.5 font-semibold ml-0.5 mr-0.5 rounded-md">
              {chance}%
            </div>
            <div className="uppercase bg-athens-gray-500 my-0.5 p-1.5 font-semibold ml-0.5 rounded-md">
              {bonus[classType].min}% -{bonus[classType].max}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
