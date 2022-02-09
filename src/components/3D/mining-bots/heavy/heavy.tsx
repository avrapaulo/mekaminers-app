/* eslint-disable camelcase */
import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    corpo_brutamonte: THREE.Mesh
    mochila: THREE.Mesh
    perna: THREE.Mesh
    braco: THREE.Mesh
    comandante: THREE.Mesh
    corpo_brutamonte001: THREE.Mesh
    braco001: THREE.Mesh
    braco002: THREE.Mesh
    corpo_brutamonte002: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export const HeavyObject = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/mining-bots/heavy.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.corpo_brutamonte.geometry}
        material={nodes.corpo_brutamonte.material}
        position={[1.03, 3.49, 0.17]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mochila.geometry}
        material={nodes.mochila.material}
        position={[0, 3.88, -2.63]}
        rotation={[-0.01, 0, 0]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.perna.geometry}
        material={nodes.perna.material}
        position={[1.43, 0.86, 0.83]}
        rotation={[0.11, 0.26, 0]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.comandante.geometry}
        material={nodes.comandante.material}
        position={[-0.02, 7.17, 0.68]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.braco002.geometry}
        material={nodes.braco002.material}
        position={[-0.02, 3.93, 2.41]}
        rotation={[2.19, 1.29, -0.89]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.corpo_brutamonte002.geometry}
        material={nodes.corpo_brutamonte002.material}
        position={[1.03, 3.49, 0.17]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.corpo_brutamonte001.geometry}
        material={nodes.corpo_brutamonte001.material}
        position={[1.03, 3.49, 0.17]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.braco.geometry}
        material={nodes.braco.material}
        position={[3.58, 4.82, 0.62]}
        rotation={[-2.82, 1.39, 2.95]}
        scale={[0.39, 0.39, 0.39]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.braco001.geometry}
        material={nodes.braco001.material}
        position={[3.58, 4.82, 0.62]}
        rotation={[-2.82, 1.39, 2.95]}
        scale={[0.39, 0.39, 0.39]}
      />
    </group>
  )
}

useGLTF.preload('/3d/mining-bots/heavy.glb')
