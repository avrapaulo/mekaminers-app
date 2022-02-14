import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    bracos: THREE.SkinnedMesh
    bracos001: THREE.SkinnedMesh
    bracos002: THREE.SkinnedMesh
    cabeca: THREE.SkinnedMesh
    corpo: THREE.SkinnedMesh
    mochila: THREE.SkinnedMesh
    pernas: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

interface RustyObjectProps {
  animation: boolean
}

export const RustyObject = (props: RustyObjectProps & JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/3d/mining-bots/rusty.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (props.animation) {
      actions?.Dig.play()
    }
  }, [actions, props])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Main} />
      <skinnedMesh
        geometry={nodes.mochila.geometry}
        material={nodes.mochila.material}
        skeleton={nodes.mochila.skeleton}
      />
      <skinnedMesh
        geometry={nodes.pernas.geometry}
        material={nodes.pernas.material}
        skeleton={nodes.pernas.skeleton}
      />
      <skinnedMesh
        geometry={nodes.bracos.geometry}
        material={nodes.bracos.material}
        skeleton={nodes.bracos.skeleton}
      />
      <skinnedMesh
        geometry={nodes.cabeca.geometry}
        material={nodes.cabeca.material}
        skeleton={nodes.cabeca.skeleton}
      />
      <skinnedMesh
        geometry={nodes.corpo.geometry}
        material={nodes.corpo.material}
        skeleton={nodes.corpo.skeleton}
      />
    </group>
  )
}

useGLTF.preload('/3d/mining-bots/rusty.glb')
