import { LandObject } from './land'
import { CanvasContainer } from '../canvas-container'

interface LandEmptyProps {
  rarity?: string
}

export const LandEmpty = ({ rarity = 'S' }: LandEmptyProps) => {
  return (
    <CanvasContainer autoRotate={false} camera={{ position: [3, 5, 7.5] }}>
      <LandObject rarity={rarity} position={[0, 0, 0]} />
    </CanvasContainer>
  )
}
