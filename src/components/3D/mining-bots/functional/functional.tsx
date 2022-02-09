/* eslint-disable camelcase */
import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    cabeca001: THREE.Mesh
    cabelo: THREE.Mesh
    lanterna_cabeca: THREE.Mesh
    cabelo_detalhe001: THREE.Mesh
    base: THREE.Mesh
    tela: THREE.Mesh
    ombro_suporte001: THREE.Mesh
    cotovelo: THREE.Mesh
    antebraco: THREE.Mesh
    mao_esq: THREE.Mesh
    queixo: THREE.Mesh
    braco001: THREE.Mesh
    mao_dir: THREE.Mesh
    mochila001: THREE.Mesh
    ombro001: THREE.Mesh
    cabeca_faixa: THREE.Mesh
    botao_cabeca: THREE.Mesh
    botoes001: THREE.Mesh
    botoes002: THREE.Mesh
    botoes003: THREE.Mesh
    fans002: THREE.Mesh
    fans003: THREE.Mesh
    gradil: THREE.Mesh
    botoes004: THREE.Mesh
    botoes005: THREE.Mesh
    botoes006: THREE.Mesh
    botoes007: THREE.Mesh
    Cylinder001: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export const FunctionalObject = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/mining-bots/functional.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cabeca001.geometry}
        material={nodes.cabeca001.material}
        position={[0, 2.2, 0.08]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cabelo.geometry}
        material={nodes.cabelo.material}
        position={[0, 3.63, 0.39]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lanterna_cabeca.geometry}
        material={nodes.lanterna_cabeca.material}
        position={[0, 3.89, 1.09]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tela.geometry}
        material={nodes.tela.material}
        position={[1.05, 1.78, -0.4]}
        rotation={[0, 0, -0.12]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ombro_suporte001.geometry}
        material={nodes.ombro_suporte001.material}
        position={[1.2, 2.44, 0.68]}
        rotation={[Math.PI / 2, -0.02, -Math.PI / 2]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.antebraco.geometry}
        material={nodes.antebraco.material}
        position={[2.21, 2.44, 1.07]}
        rotation={[-0.82, 0, -0.16]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mao_esq.geometry}
        material={nodes.mao_esq.material}
        position={[2.2, 3.02, 1.66]}
        rotation={[-0.8, 0, -0.16]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.braco001.geometry}
        material={nodes.braco001.material}
        position={[1.79, 2.19, 0.67]}
        rotation={[0, 0, Math.PI / 3]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ombro001.geometry}
        material={nodes.ombro001.material}
        position={[1.39, 2.43, 0.67]}
        rotation={[0, 0, Math.PI / 3]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botao_cabeca.geometry}
        material={nodes.botao_cabeca.material}
        position={[0.59, 3.24, 0.68]}
        rotation={[0, -0.6, -Math.PI / 2]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botoes001.geometry}
        material={nodes.botoes001.material}
        position={[1.14, 1.95, -0.87]}
        rotation={[0, 0, -1.69]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botoes002.geometry}
        material={nodes.botoes002.material}
        position={[1.13, 1.88, -0.86]}
        rotation={[0, 0, -1.69]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botoes003.geometry}
        material={nodes.botoes003.material}
        position={[1.12, 1.8, -0.86]}
        rotation={[0, 0, -1.69]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fans002.geometry}
        material={nodes.fans002.material}
        position={[-1.06, 1.62, 0.05]}
        rotation={[0, 0, 0.2]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.gradil.geometry}
        material={nodes.gradil.material}
        position={[1.17, 2.6, -0.44]}
        rotation={[0, 0.01, -0.07]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cotovelo.geometry}
        material={nodes.cotovelo.material}
        position={[2.01, 2.06, 0.67]}
        rotation={[0, 0, Math.PI / 3]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cabelo_detalhe001.geometry}
        material={nodes.cabelo_detalhe001.material}
        position={[0, 4.01, 0.72]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.base.geometry}
        material={nodes.base.material}
        position={[0, 1.31, 0]}
        rotation={[-Math.PI, 0, 0]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.queixo.geometry}
        material={nodes.queixo.material}
        position={[0, 1.39, 1.07]}
        rotation={[0.07, 0, 0]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mao_dir.geometry}
        material={nodes.mao_dir.material}
        position={[-2.19, 3.02, 1.66]}
        rotation={[-0.8, 0, 0.15]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cabeca_faixa.geometry}
        material={nodes.cabeca_faixa.material}
        position={[0.35, 3.28, 0.21]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mochila001.geometry}
        material={nodes.mochila001.material}
        position={[0, 1.62, -1.64]}
        rotation={[-0.05, 0, 0]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fans003.geometry}
        material={nodes.fans003.material}
        position={[1.14, 2.3, -0.45]}
        rotation={[0, 0.02, 0]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botoes004.geometry}
        material={nodes.botoes004.material}
        position={[1.11, 2.91, -0.1]}
        rotation={[0, 0, -1.32]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botoes005.geometry}
        material={nodes.botoes005.material}
        position={[1.11, 2.91, -0.32]}
        rotation={[0, 0, -1.32]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botoes006.geometry}
        material={nodes.botoes006.material}
        position={[1.11, 2.91, -0.54]}
        rotation={[0, 0, -1.32]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botoes007.geometry}
        material={nodes.botoes007.material}
        position={[1.11, 2.91, -0.77]}
        rotation={[0, 0, -1.32]}
        scale={[1, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={nodes.Cylinder001.material}
        position={[0.59, 3.35, -0.91]}
        scale={[1, 1, 1]}
      />
    </group>
  )
}

useGLTF.preload('/3d/mining-bots/functional.glb')
