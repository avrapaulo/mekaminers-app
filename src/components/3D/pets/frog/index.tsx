import { CanvasContainer } from 'components/3D/canvas-container'
import { FrogObject } from './frog'

export const Frog = () => (
  <CanvasContainer camera={13}>
    <FrogObject />
  </CanvasContainer>
)
