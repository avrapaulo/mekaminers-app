import { CanvasContainer } from 'components/3D/canvas-container'
import { BugObject } from './bug'

export const Bug = () => (
  <CanvasContainer camera={13}>
    <BugObject />
  </CanvasContainer>
)
