import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    H: THREE.SkinnedMesh
    B: THREE.SkinnedMesh
    L: THREE.SkinnedMesh
    A: THREE.SkinnedMesh
    Main: THREE.Bone
    HeadAim: THREE.Bone
  }
  materials: {
    H: THREE.MeshStandardMaterial
    B: THREE.MeshStandardMaterial
    L: THREE.MeshStandardMaterial
    A: THREE.MeshStandardMaterial
  }
}

export const BugObject = ({ ...props }: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/pets/Bug.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null} position={[0, -0.45, 0]}>
      <primitive object={nodes.Main} />
      <primitive object={nodes.HeadAim} />
      <skinnedMesh geometry={nodes.H.geometry} material={materials.H} skeleton={nodes.H.skeleton} />
      <skinnedMesh geometry={nodes.B.geometry} material={materials.B} skeleton={nodes.B.skeleton} />
      <skinnedMesh geometry={nodes.L.geometry} material={materials.L} skeleton={nodes.L.skeleton} />
      <skinnedMesh geometry={nodes.A.geometry} material={materials.A} skeleton={nodes.A.skeleton} />
    </group>
  )
}
