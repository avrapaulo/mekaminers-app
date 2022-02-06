import { CanvasContainer } from '../canvas-container'
import { RobotObjectProps, RobotObject } from './robot'

export const Robot = ({
  rarity,
  robotType,
  autoRotate,
  piecesStatus,
  animation
}: RobotObjectProps) => (
  <CanvasContainer autoRotate={autoRotate} camera={{ fov: 45 }}>
    <RobotObject
      animation={animation}
      rarity={rarity}
      robotType={robotType}
      piecesStatus={piecesStatus}
      position={[0, -1.35, 0]}
    />
  </CanvasContainer>
)
