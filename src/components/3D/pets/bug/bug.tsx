import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
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
  const { nodes, materials, animations } = useGLTF('/3d/pets/Bug.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions?.Dig.play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Main} />
      <primitive object={nodes.HeadAim} />
      <skinnedMesh geometry={nodes.H.geometry} material={materials.H} skeleton={nodes.H.skeleton} />
      <skinnedMesh geometry={nodes.B.geometry} material={materials.B} skeleton={nodes.B.skeleton} />
      <skinnedMesh geometry={nodes.L.geometry} material={materials.L} skeleton={nodes.L.skeleton} />
      <skinnedMesh geometry={nodes.A.geometry} material={materials.A} skeleton={nodes.A.skeleton} />
    </group>
  )
}
