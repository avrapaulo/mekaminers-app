import { LandObject } from './land'
import { CanvasContainer } from '../canvas-container'

export const LandEmpty = () => {
  return (
    <CanvasContainer autoRotate={false} camera={{ position: [3, 5, 7.5] }}>
      <LandObject rarity="S" position={[0, 1, 0]} />
    </CanvasContainer>
  )
}
