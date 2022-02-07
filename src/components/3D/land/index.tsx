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

const robotPosition = {
  tank: [0, 1, 1.25],
  basic: [0, 1, 1],
  stealth: [0, 1, 1]
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
    <CanvasContainer autoRotate={false} camera={{ position: [3, 5, 7.5] }}>
      <>
        <RobotObject
          key={id}
          animationCollect="Collect"
          rarity={rarity}
          robotType={robotType}
          piecesStatus={piecesStatus}
          position={robotPosition[robotType]}
        />
        <LandObject rarity={mineralRarity} position={[0, 1, 0]} />
        {petName === 'Frog' && <FrogObject position={[1.5, 1, 2]} />}
        {petName === 'Dog' && <DogObject position={[1.5, 1, 2]} />}
        {petName === 'Bug' && <BugObject position={[1.5, 1, 2]} />}
      </>
    </CanvasContainer>
  )
}
