import { CanvasContainer } from 'components/3D/canvas-container'
import { DogObject } from './dog'

export const Dog = () => (
  <CanvasContainer camera={45}>
    <DogObject />
  </CanvasContainer>
)
