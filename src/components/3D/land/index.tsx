import { RobotObject, RobotObjectProps } from 'components/3D/robot/robot'
import { FrogObject } from 'components/3D/pets/frog/frog'
import { DogObject } from 'components/3D/pets/dog/dog'
import { BugObject } from 'components/3D/pets/bug/bug'
import { LandObject } from './land'
import { CanvasContainer } from '../canvas-container'

interface LandRobotProps extends RobotObjectProps {
  id: number
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
  return (
    <CanvasContainer autoRotate={false} camera={{ position: [-15, 10, 0], zoom: 2.2 }}>
      <>
        <RobotObject
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
