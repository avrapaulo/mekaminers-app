import { useRecoilState } from 'recoil'
import { LandRobot } from 'components/3D'
import { farmAtom } from 'recoil/atoms'

const robot = {
  1: {
    robot: {
      owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
      token: 100,
      title: 'Tank',
      type: 'Tank',
      rarity: 'C',
      bonus: 40,
      gen: 2,
      price: '7575',
      robotStatus: [
        {
          key: 'Capacity',
          value: 14
        },
        {
          key: 'Stealthiness',
          value: 8
        },
        {
          key: 'Efficiency',
          value: 60
        },
        {
          key: 'Speed',
          value: 5
        },
        {
          key: 'OilDecrease',
          value: 0
        }
      ],
      piecesStatus: [],
      mode: 2
    }
  },
  2: {
    robot: {
      owner: '0xba6df131a1a10f560a62e8c2564d38f66b4c927b',
      token: 100,
      title: 'Tank',
      type: 'Tank',
      rarity: 'E',
      bonus: 40,
      gen: 2,
      price: '7575',
      robotStatus: [
        {
          key: 'Capacity',
          value: 14
        },
        {
          key: 'Stealthiness',
          value: 8
        },
        {
          key: 'Efficiency',
          value: 60
        },
        {
          key: 'Speed',
          value: 5
        },
        {
          key: 'OilDecrease',
          value: 0
        }
      ],
      piecesStatus: [],
      mode: 2
    }
  }
}

interface FarmCardProps {
  id: number
}

export const FarmCard = ({ id }: FarmCardProps) => {
  const [farm, setFarm] = useRecoilState(farmAtom(id))
  return (
    <div
      className="col-span-1 h-52"
      onClick={() => {
        setFarm(!farm)
      }}
    >
      <LandRobot
        id={id}
        rarity={robot[id].robot.rarity}
        robotType={robot[id].robot.type.toLowerCase()}
        piecesStatus={robot[id].robot.piecesStatus}
      />
    </div>
  )
}
