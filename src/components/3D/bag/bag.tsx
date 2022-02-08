/* eslint-disable camelcase */
import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    loot_bag: THREE.Mesh
  }
  materials: {
    loot_bag: THREE.MeshStandardMaterial
  }
}

export const BagObject = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/bag.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.loot_bag.geometry}
        material={materials.loot_bag}
      />
    </group>
  )
}

useGLTF.preload('/3d/bag.glb')
