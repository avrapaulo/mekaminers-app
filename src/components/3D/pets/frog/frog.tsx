import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    L: THREE.SkinnedMesh
    H: THREE.SkinnedMesh
    B: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    L: THREE.MeshStandardMaterial
    H: THREE.MeshStandardMaterial
    B: THREE.MeshStandardMaterial
  }
}

export const FrogObject = ({ ...props }: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/pets/Frog.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null} position={[0, -0.45, 0]}>
      <primitive object={nodes.Main} />
      <skinnedMesh geometry={nodes.L.geometry} material={materials.L} skeleton={nodes.L.skeleton} />
      <skinnedMesh geometry={nodes.H.geometry} material={materials.H} skeleton={nodes.H.skeleton} />
      <skinnedMesh geometry={nodes.B.geometry} material={materials.B} skeleton={nodes.B.skeleton} />
    </group>
  )
}
