import { CanvasContainer } from 'components/3D/canvas-container'
import { BagObject } from './bag'

interface BugProps {
  position?: any
}

export const Bag = ({ position = [0, -1, 0] }: BugProps) => (
  <CanvasContainer camera={{ fov: 45 }}>
    <BagObject position={position} />
  </CanvasContainer>
)
