import { CanvasContainer } from '../canvas-container'
import { RobotObjectProps, RobotObject } from './robot'

export const Robot = ({ rarity, robotType, autoRotate, piecesStatus }: RobotObjectProps) => (
  <CanvasContainer camera={45} autoRotate={autoRotate}>
    <RobotObject rarity={rarity} robotType={robotType} piecesStatus={piecesStatus} />
  </CanvasContainer>
)
