import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { CanvasContainer } from '../canvas-container'

type GLTFResult = GLTF & {
  nodes: {
    ['E-1']: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    ['E-1']: THREE.MeshStandardMaterial
  }
}

interface RobotProps {
  pieceId: number
  rarity: string
  robotType: string
}

export const Piece = ({ ...props }: RobotProps & JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { rarity, pieceId, robotType } = props
  const { nodes, materials } = useGLTF(
    `/3d/${robotType.toLowerCase()}/${rarity}-${pieceId}.glb`
  ) as GLTFResult
  return (
    <CanvasContainer camera={35}>
      <group ref={group} {...props} dispose={null} position={[0, -1.35, 0]}>
        <primitive object={nodes.Main} />
        <skinnedMesh
          geometry={nodes[`${rarity}-${pieceId}`].geometry}
          material={materials[`${rarity}-${pieceId}`]}
          skeleton={nodes[`${rarity}-${pieceId}`].skeleton}
        />
      </group>
    </CanvasContainer>
  )
}
