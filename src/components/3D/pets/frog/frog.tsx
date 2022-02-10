import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
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
  const { nodes, materials, animations } = useGLTF('/3d/pets/Frog.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions.Dig.play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Main} />
      <skinnedMesh geometry={nodes.L.geometry} material={materials.L} skeleton={nodes.L.skeleton} />
      <skinnedMesh geometry={nodes.H.geometry} material={materials.H} skeleton={nodes.H.skeleton} />
      <skinnedMesh geometry={nodes.B.geometry} material={materials.B} skeleton={nodes.B.skeleton} />
    </group>
  )
}
