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
  tank: [0, 0, 1.25],
  basic: [0, 0, 1],
  stealth: [0, 0, 0]
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
    <CanvasContainer autoRotate={false} camera={{ position: [2, 3, 8] }}>
      <>
        <RobotObject
          key={id}
          animationCollect="Collect"
          rarity={rarity}
          robotType={robotType}
          piecesStatus={piecesStatus}
          position={robotPosition[robotType]}
        />
        <LandObject rarity={mineralRarity} />
        {petName === 'Frog' && <FrogObject position={[1.5, 0, 2]} />}
        {petName === 'Dog' && <DogObject position={[1.5, 0, 2]} />}
        {petName === 'Bug' && <BugObject position={[1.5, 0, 2]} />}
      </>
    </CanvasContainer>
  )
}
