import { CanvasContainer } from 'components/3D/canvas-container'
import { HeavyObject } from './heavy'

export const Heavy = () => (
  <CanvasContainer camera={{ fov: 13 }}>
    <HeavyObject />
  </CanvasContainer>
)
