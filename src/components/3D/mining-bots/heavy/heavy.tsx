/* eslint-disable camelcase */
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    braco: THREE.SkinnedMesh
    comandante: THREE.SkinnedMesh
    corpo_brutamonte: THREE.SkinnedMesh
    mochila: THREE.SkinnedMesh
    perna: THREE.SkinnedMesh
    Main: THREE.Bone
    smoke: THREE.Bone
    smoke001: THREE.Bone
    smoke002: THREE.Bone
    smoke003: THREE.Bone
  }
  materials: {
    H1: THREE.MeshStandardMaterial
  }
}

interface HeavyObjectProps {
  animation: boolean
}

export const HeavyObject = (props: HeavyObjectProps & JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/3d/mining-bots/heavy.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (props.animation) {
      actions?.Dig.play()
    }
  }, [actions, props])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Main} />
      <primitive object={nodes.smoke} />
      <primitive object={nodes.smoke001} />
      <primitive object={nodes.smoke002} />
      <primitive object={nodes.smoke003} />
      <skinnedMesh
        geometry={nodes.braco.geometry}
        material={nodes.braco.material}
        skeleton={nodes.braco.skeleton}
      />
      <skinnedMesh
        geometry={nodes.comandante.geometry}
        material={nodes.comandante.material}
        skeleton={nodes.comandante.skeleton}
      />
      <skinnedMesh
        geometry={nodes.corpo_brutamonte.geometry}
        material={nodes.corpo_brutamonte.material}
        skeleton={nodes.corpo_brutamonte.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mochila.geometry}
        material={nodes.mochila.material}
        skeleton={nodes.mochila.skeleton}
      />
      <skinnedMesh
        geometry={nodes.perna.geometry}
        material={nodes.perna.material}
        skeleton={nodes.perna.skeleton}
      />
    </group>
  )
}

useGLTF.preload('/3d/mining-bots/heavy.glb')
