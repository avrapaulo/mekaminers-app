import { CanvasContainer } from 'components/3D/canvas-container'
import { FrogObject } from './frog'

interface FrogProps {
  position?: any
}

export const Frog = ({ position = [0, -0.45, 0] }: FrogProps) => (
  <CanvasContainer camera={{ fov: 13 }}>
    <FrogObject position={position} />
  </CanvasContainer>
)
