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
  autoRotate?: boolean
  piecesStatus?: { id: number; key: string }[]
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
  const { robotType, rarity, piecesStatus = [] } = props

  const stealthiness =
    piecesStatus?.find(({ key }) => key === 'Stealthiness')?.id ||
    robotDefault[robotType].Stealthiness

  const oilDecrease =
    piecesStatus?.find(({ key }) => key === 'OilDecrease')?.id ||
    robotDefault[robotType].OilDecrease

  const efficiency =
    piecesStatus?.find(({ key }) => key === 'Efficiency')?.id || robotDefault[robotType].Efficiency

  const capacity =
    piecesStatus?.find(({ key }) => key === 'Capacity')?.id || robotDefault[robotType].Capacity

  const speed =
    piecesStatus?.find(({ key }) => key === 'Speed')?.id || robotDefault[robotType].Speed

  const group = useRef<THREE.Group>()
  const { nodes: nodeHead, materials: materialsHead } = useGLTF(
    `/3d/${robotType}/${rarity}-${stealthiness}.glb`
  ) as GLTFResult
  const { nodes: nodeBody, materials: materialsBody } = useGLTF(
    `/3d/${robotType}/${rarity}-${oilDecrease}.glb`
  ) as GLTFResult
  const { nodes: nodeArmL, materials: materialsArmL } = useGLTF(
    `/3d/${robotType}/${rarity}-${efficiency}.glb`
  ) as GLTFResult
  const { nodes: nodeArmR, materials: materialsArmR } = useGLTF(
    `/3d/${robotType}/${rarity}-${capacity}.glb`
  ) as GLTFResult
  const { nodes: nodeLegs, materials: materialsLegs } = useGLTF(
    `/3d/${robotType}/${rarity}-${speed}.glb`
  ) as GLTFResult
  // const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null} position={[0, -1.35, 0]}>
      <primitive object={nodeArmR.Main} />
      <skinnedMesh
        geometry={nodeHead[`${rarity}-${stealthiness}`].geometry}
        material={materialsHead[`${rarity}-${stealthiness}`]}
        skeleton={nodeArmR[`${rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeBody[`${rarity}-${oilDecrease}`].geometry}
        material={materialsBody[`${rarity}-${oilDecrease}`]}
        skeleton={nodeArmR[`${rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeArmL[`${rarity}-${efficiency}`].geometry}
        material={materialsArmL[`${rarity}-${efficiency}`]}
        skeleton={nodeArmR[`${rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeArmR[`${rarity}-${capacity}`].geometry}
        material={materialsArmR[`${rarity}-${capacity}`]}
        skeleton={nodeArmR[`${rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeLegs[`${rarity}-${speed}`].geometry}
        material={materialsLegs[`${rarity}-${speed}`]}
        skeleton={nodeArmR[`${rarity}-${capacity}`].skeleton}
      />
    </group>
  )
}

// useGLTF.preload('/3d/stealth/A-1.glb')
