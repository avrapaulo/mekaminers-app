import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['E-1']: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    ['E-1']: THREE.MeshStandardMaterial
  }
}

export interface RobotObjectProps {
  rarity: string
  robotType: string
}

const robotDefault = {
  stealth: {
    Stealthiness: 1,
    OilDecrease: 2,
    Efficiency: 3,
    Capacity: 4,
    Speed: 5
  },
  tank: {
    Stealthiness: 6,
    OilDecrease: 7,
    Efficiency: 8,
    Capacity: 9,
    Speed: 10
  },
  basic: {
    Stealthiness: 11,
    OilDecrease: 12,
    Efficiency: 13,
    Capacity: 14,
    Speed: 15
  }
}

type ActionName = 'Click'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export const RobotObject = ({ ...props }: RobotObjectProps & JSX.IntrinsicElements['group']) => {
  const { robotType, rarity } = props
  const group = useRef<THREE.Group>()
  const { nodes: nodeHead, materials: materialsHead } = useGLTF(
    `/3d/${robotType}/${rarity}-${robotDefault[robotType].Stealthiness}.glb`
  ) as GLTFResult
  const { nodes: nodeBody, materials: materialsBody } = useGLTF(
    `/3d/${robotType}/${rarity}-${robotDefault[robotType].OilDecrease}.glb`
  ) as GLTFResult
  const { nodes: nodeArmL, materials: materialsArmL } = useGLTF(
    `/3d/${robotType}/${rarity}-${robotDefault[robotType].Efficiency}.glb`
  ) as GLTFResult
  const { nodes: nodeArmR, materials: materialsArmR } = useGLTF(
    `/3d/${robotType}/${rarity}-${robotDefault[robotType].Capacity}.glb`
  ) as GLTFResult
  const { nodes: nodeLegs, materials: materialsLegs } = useGLTF(
    `/3d/${robotType}/${rarity}-${robotDefault[robotType].Speed}.glb`
  ) as GLTFResult
  // const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null} position={[0, -1.35, 0]}>
      <primitive object={nodeArmR.Main} />
      <skinnedMesh
        geometry={nodeHead[`${rarity}-${robotDefault[robotType].Stealthiness}`].geometry}
        material={materialsHead[`${rarity}-${robotDefault[robotType].Stealthiness}`]}
        skeleton={nodeArmR[`${rarity}-${robotDefault[robotType].Capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeBody[`${rarity}-${robotDefault[robotType].OilDecrease}`].geometry}
        material={materialsBody[`${rarity}-${robotDefault[robotType].OilDecrease}`]}
        skeleton={nodeArmR[`${rarity}-${robotDefault[robotType].Capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeArmL[`${rarity}-${robotDefault[robotType].Efficiency}`].geometry}
        material={materialsArmL[`${rarity}-${robotDefault[robotType].Efficiency}`]}
        skeleton={nodeArmR[`${rarity}-${robotDefault[robotType].Capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeArmR[`${rarity}-${robotDefault[robotType].Capacity}`].geometry}
        material={materialsArmR[`${rarity}-${robotDefault[robotType].Capacity}`]}
        skeleton={nodeArmR[`${rarity}-${robotDefault[robotType].Capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeLegs[`${rarity}-${robotDefault[robotType].Speed}`].geometry}
        material={materialsLegs[`${rarity}-${robotDefault[robotType].Speed}`]}
        skeleton={nodeArmR[`${rarity}-${robotDefault[robotType].Capacity}`].skeleton}
      />
    </group>
  )
}

// useGLTF.preload('/3d/stealth/A-1.glb')
