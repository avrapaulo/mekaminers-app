import { CanvasContainer } from 'components/3D/canvas-container'
import { DogObject } from './dog'

interface DogProps {
  position?: any
}

export const Dog = ({ position = [0, -0.45, 0] }: DogProps) => (
  <CanvasContainer camera={{ fov: 13 }}>
    <DogObject position={position} />
  </CanvasContainer>
)
