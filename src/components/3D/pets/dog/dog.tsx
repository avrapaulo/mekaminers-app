import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    A: THREE.SkinnedMesh
    B: THREE.SkinnedMesh
    L: THREE.SkinnedMesh
    H: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    a: THREE.MeshStandardMaterial
    b: THREE.MeshStandardMaterial
    l: THREE.MeshStandardMaterial
    h: THREE.MeshStandardMaterial
  }
}

export const DogObject = ({ ...props }: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/pets/Dog.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Main} />
      <skinnedMesh geometry={nodes.A.geometry} material={materials.a} skeleton={nodes.A.skeleton} />
      <skinnedMesh geometry={nodes.B.geometry} material={materials.b} skeleton={nodes.B.skeleton} />
      <skinnedMesh geometry={nodes.L.geometry} material={materials.l} skeleton={nodes.L.skeleton} />
      <skinnedMesh geometry={nodes.H.geometry} material={materials.h} skeleton={nodes.H.skeleton} />
    </group>
  )
}
