import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    corpo: THREE.Mesh
    cabeca: THREE.Mesh
    mochila: THREE.Mesh
    pernas: THREE.Mesh
    bracos: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export const RustyObject = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/mining-bots/rusty.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.corpo.geometry}
        material={nodes.corpo.material}
        position={[0, 1.82, -0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cabeca.geometry}
        material={nodes.cabeca.material}
        position={[1.54, 4.47, 0.58]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mochila.geometry}
        material={nodes.mochila.material}
        position={[-0.72, 1.05, -3.7]}
        rotation={[-0.13, 0.19, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bracos.geometry}
        material={nodes.bracos.material}
        position={[4.63, 2.14, 4.42]}
        rotation={[0, 0, 1.84]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pernas.geometry}
        material={nodes.pernas.material}
        position={[2.11, -0.01, 1.77]}
        rotation={[-Math.PI, 0.72, -Math.PI]}
      />
    </group>
  )
}

useGLTF.preload('/3d/mining-bots/rusty.glb')
