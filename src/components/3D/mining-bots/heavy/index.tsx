import { CanvasContainer } from 'components/3D/canvas-container'
import { HeavyObject } from './heavy'

interface HeavyProps {
  animation?: boolean
}

export const Heavy = ({ animation }: HeavyProps) => (
  <CanvasContainer camera={{ fov: 70 }}>
    <HeavyObject animation={animation} position={[0, -2.1, 0]} />
  </CanvasContainer>
)
