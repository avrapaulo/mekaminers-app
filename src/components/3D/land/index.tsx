import { CanvasContainer } from '../canvas-container'
import { LandObject } from './land'
import { RobotObject, RobotObjectProps } from '../robot/robot'

interface LandRobotProps extends RobotObjectProps {
  id: number
  mineralRarity: string
}

const robotPosition = {
  tank: [0, 0, 1.25],
  basic: [0, 0, 1],
  stealth: [0, 0, 0]
}

export const LandRobot = ({
  rarity,
  robotType,
  piecesStatus,
  id,
  mineralRarity
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
      </>
    </CanvasContainer>
  )
}
