import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Land: THREE.Mesh
  }
  materials: {
    Land: THREE.MeshStandardMaterial
  }
}

interface LandObjectProps {
  rarity: string
}

export const LandObject = (props: LandObjectProps & JSX.IntrinsicElements['group']) => {
  const { rarity } = props
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(`/3d/land/land-${rarity}.glb`) as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Land.geometry} material={materials.Land} />
    </group>
  )
}
