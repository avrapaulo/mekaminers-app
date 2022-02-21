/* eslint-disable camelcase */
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    L1: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    L1: THREE.MeshStandardMaterial
  }
}

interface FunctionalObjectProps {
  farmRobots?: any[]
  animation: boolean
  nonNFTId: number | string
}
const type = 'Functional'

export const FunctionalObject = (props: FunctionalObjectProps & JSX.IntrinsicElements['group']) => {
  const { nonNFTId, animation, farmRobots } = props
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/3d/mining-bots/functional.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (farmRobots?.some(i => i[type] === nonNFTId)) {
      if (animation) {
        actions?.Mining.play()
      }
    }
  }, [actions, animation, farmRobots, nonNFTId])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Main} />
      <skinnedMesh
        geometry={nodes.L1.geometry}
        material={materials.L1}
        skeleton={nodes.L1.skeleton}
      />
    </group>
  )
}

useGLTF.preload('/3d/mining-bots/functional.glb')
