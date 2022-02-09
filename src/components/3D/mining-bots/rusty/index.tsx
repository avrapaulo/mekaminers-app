import { CanvasContainer } from 'components/3D/canvas-container'
import { RustyObject } from './rusty'

export const Rusty = () => (
  <CanvasContainer camera={{ fov: 13 }}>
    <RustyObject />
  </CanvasContainer>
)
