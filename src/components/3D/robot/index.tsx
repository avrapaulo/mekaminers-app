import { CanvasContainer } from '../canvas-container'
import { RobotObjectProps, RobotObject } from './robot'

export const Robot = ({ rarity, robotType }: RobotObjectProps) => (
  <CanvasContainer camera={45}>
    <RobotObject rarity={rarity} robotType={robotType} />
  </CanvasContainer>
)
