import { CanvasContainer } from '../canvas-container'
import { PieceObjectProps, PieceObject } from './piece'

export const Piece = ({ pieceId, rarity, robotType }: PieceObjectProps) => (
  <CanvasContainer camera={{ fov: 45 }}>
    <PieceObject pieceId={pieceId} rarity={rarity} robotType={robotType} />
  </CanvasContainer>
)
