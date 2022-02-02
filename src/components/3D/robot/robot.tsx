import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type ActionName = 'Greeting1' | 'Greeting2' | 'Greeting3' | 'Idle' | 'Tank_Collect' | 'Tank_Stuck'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    ['E-1']: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    ['E-1']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export interface RobotObjectProps {
  autoRotate?: boolean
  state?: boolean
  piecesStatus?: { id: number; key: string; rarity: string }[]
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

export const RobotObject = ({ ...props }: RobotObjectProps & JSX.IntrinsicElements['group']) => {
  const { robotType, rarity, piecesStatus = [], state } = props

  const stealthinessStatus = piecesStatus?.find(({ key }) => key === 'Stealthiness')
  const oilDecreaseStatus = piecesStatus?.find(({ key }) => key === 'OilDecrease')
  const efficiencyStatus = piecesStatus?.find(({ key }) => key === 'Efficiency')
  const capacityStatus = piecesStatus?.find(({ key }) => key === 'Capacity')
  const speedStatus = piecesStatus?.find(({ key }) => key === 'Speed')

  const stealthiness = stealthinessStatus?.id || robotDefault[robotType].Stealthiness
  const oilDecrease = oilDecreaseStatus?.id || robotDefault[robotType].OilDecrease
  const efficiency = efficiencyStatus?.id || robotDefault[robotType].Efficiency
  const capacity = capacityStatus?.id || robotDefault[robotType].Capacity
  const speed = speedStatus?.id || robotDefault[robotType].Speed

  const group = useRef<THREE.Group>()
  const { nodes: nodeHead, materials: materialsHead } = useGLTF(
    `/3d/${robotType}/${stealthinessStatus?.rarity || rarity}-${stealthiness}.glb`
  ) as GLTFResult
  const { nodes: nodeBody, materials: materialsBody } = useGLTF(
    `/3d/${robotType}/${oilDecreaseStatus?.rarity || rarity}-${oilDecrease}.glb`
  ) as GLTFResult
  const { nodes: nodeArmL, materials: materialsArmL } = useGLTF(
    `/3d/${robotType}/${efficiencyStatus?.rarity || rarity}-${efficiency}.glb`
  ) as GLTFResult
  const {
    nodes: nodeArmR,
    materials: materialsArmR,
    animations
  } = useGLTF(`/3d/${robotType}/${capacityStatus?.rarity || rarity}-${capacity}.glb`) as GLTFResult
  const { nodes: nodeLegs, materials: materialsLegs } = useGLTF(
    `/3d/${robotType}/${speedStatus?.rarity || rarity}-${speed}.glb`
  ) as GLTFResult

  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (state) {
      // eslint-disable-next-line dot-notation
      actions['Tank_Collect'].play()
    }
  }, [actions, state])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodeArmR.Main} dispose={null} />
      <skinnedMesh
        geometry={nodeHead[`${stealthinessStatus?.rarity || rarity}-${stealthiness}`].geometry}
        material={materialsHead[`${stealthinessStatus?.rarity || rarity}-${stealthiness}`]}
        skeleton={nodeArmR[`${capacityStatus?.rarity || rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeBody[`${oilDecreaseStatus?.rarity || rarity}-${oilDecrease}`].geometry}
        material={materialsBody[`${oilDecreaseStatus?.rarity || rarity}-${oilDecrease}`]}
        skeleton={nodeArmR[`${capacityStatus?.rarity || rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeArmL[`${efficiencyStatus?.rarity || rarity}-${efficiency}`].geometry}
        material={materialsArmL[`${efficiencyStatus?.rarity || rarity}-${efficiency}`]}
        skeleton={nodeArmR[`${capacityStatus?.rarity || rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeArmR[`${capacityStatus?.rarity || rarity}-${capacity}`].geometry}
        material={materialsArmR[`${capacityStatus?.rarity || rarity}-${capacity}`]}
        skeleton={nodeArmR[`${capacityStatus?.rarity || rarity}-${capacity}`].skeleton}
      />
      <skinnedMesh
        geometry={nodeLegs[`${speedStatus?.rarity || rarity}-${speed}`].geometry}
        material={materialsLegs[`${speedStatus?.rarity || rarity}-${speed}`]}
        skeleton={nodeArmR[`${capacityStatus?.rarity || rarity}-${capacity}`].skeleton}
      />
    </group>
  )
}

// useGLTF.preload('/3d/stealth/A-1.glb')
