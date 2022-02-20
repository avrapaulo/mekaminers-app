import { useRecoilValue } from 'recoil'
import { farmRobotsAtom } from 'recoil/atoms'
import { RobotObject, RobotObjectProps } from 'components/3D/robot/robot'
import { FrogObject } from 'components/3D/pets/frog/frog'
import { DogObject } from 'components/3D/pets/dog/dog'
import { BugObject } from 'components/3D/pets/bug/bug'
import { LandObject } from './land'
import { CanvasContainer } from '../canvas-container'

interface LandRobotProps extends RobotObjectProps {
  id: string | number
  mineralRarity: string
  petName: string
}

export const LandRobot = ({
  id,
  rarity,
  robotType,
  piecesStatus,
  mineralRarity,
  petName
}: LandRobotProps) => {
  const farmRobots = useRecoilValue(farmRobotsAtom)

  return (
    <CanvasContainer autoRotate={true} camera={{ position: [-15, 10, 0], zoom: 2.2 }}>
      <>
        <RobotObject
          robotId={+id}
          farmRobots={farmRobots}
          key={id}
          animationCollect="Collect"
          rarity={rarity}
          robotType={robotType}
          piecesStatus={piecesStatus}
        />
        <LandObject rarity={mineralRarity} />
        {petName === 'Frog' && <FrogObject />}
        {petName === 'Dog' && <DogObject />}
        {petName === 'Bug' && <BugObject />}
      </>
    </CanvasContainer>
  )
}
