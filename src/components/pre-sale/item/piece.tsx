import { ClassProps } from 'models/class'

interface RobotsProps {
  bonus: {
    [key: string]: { ll: { min: number; max: number }; hrc: { min: number; max: number } }
  }
  classes: ClassProps[]
}

export const PiecesItem = ({ classes, bonus }: RobotsProps) => (
  <div className="relative">
    <div className="text-center font-bold text-2xl relative text-white pb-5">Drop Detail</div>
    <div className="grid lg:grid-cols-2 gap-3">
      <div className="relative">
        <div className="font-medium text-center pb-1 bg-tree-poppy mb-4 rounded-md">
          Head, Right Arm and Chest
        </div>
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
                {bonus[classType].hrc.min}% -{bonus[classType].hrc.max}%
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="font-medium text-center pb-1 bg-tree-poppy mb-4 rounded-md">
          Left Arm and Legs
        </div>
        <div className="grid grid-cols-3 text-center text-sm font-medium">
          <div className="bg-tree-poppy mr-px rounded-sm">Rarity</div>
          <div className="bg-tree-poppy mr-px ml-px rounded-sm">Chance</div>
          <div className="bg-tree-poppy ml-px rounded-sm">Bonus</div>
        </div>
        {classes.map(({ chance, classType }) => (
          <div className="relative text-xs space-y-1" key={classType}>
            <div className="grid grid-cols-3 text-center">
              <div className="uppercase bg-athens-gray-500 my-0.5 p-1.5 font-semibold mr-0.5 rounded-md">
                {classType}
              </div>
              <div className="uppercase bg-athens-gray-500 my-0.5 p-1.5 font-semibold ml-0.5 mr-0.5 rounded-md">
                {chance}%
              </div>
              <div className="uppercase bg-athens-gray-500 my-0.5 p-1.5 font-semibold ml-0.5 rounded-md">
                {bonus[classType].ll.min}% -{bonus[classType].ll.max}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
