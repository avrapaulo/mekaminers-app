import { CanvasContainer } from 'components/3D/canvas-container'
import { FunctionalObject } from './functional'

interface FunctionalProps {
  animation?: boolean
}

export const Functional = ({ animation }: FunctionalProps) => (
  <CanvasContainer camera={{ fov: 45 }}>
    <FunctionalObject animation={animation} position={[0, -1.35, 0]} />
  </CanvasContainer>
)
