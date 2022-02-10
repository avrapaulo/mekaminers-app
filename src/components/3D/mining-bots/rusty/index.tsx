import { CanvasContainer } from 'components/3D/canvas-container'
import { RustyObject } from './rusty'

interface RustyProps {
  animation?: boolean
}

export const Rusty = ({ animation }: RustyProps) => (
  <CanvasContainer camera={{ fov: 55 }}>
    <RustyObject animation={animation} position={[0, -1.35, 0]} />
  </CanvasContainer>
)
