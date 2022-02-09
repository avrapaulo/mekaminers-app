import { CanvasContainer } from 'components/3D/canvas-container'
import { FunctionalObject } from './functional'

export const Functional = () => (
  <CanvasContainer camera={{ fov: 13 }}>
    <FunctionalObject />
  </CanvasContainer>
)
