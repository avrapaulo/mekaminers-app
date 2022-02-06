import { CanvasContainer } from 'components/3D/canvas-container'
import { BugObject } from './bug'

interface BugProps {
  position?: any
}

export const Bug = ({ position = [0, -0.45, 0] }: BugProps) => (
  <CanvasContainer camera={{ fov: 13 }}>
    <BugObject position={position} />
  </CanvasContainer>
)
