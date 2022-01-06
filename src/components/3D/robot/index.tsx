import { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { CanvasContainer } from '../canvas-container'

type GLTFResult = GLTF & {
  nodes: {
    ['E-1']: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    ['E-1']: THREE.MeshStandardMaterial
  }
}

interface RobotProps {
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

export const Robot = ({ ...props }: RobotProps & JSX.IntrinsicElements['group']) => {
  console.log(props.robotType)
  const group = useRef<THREE.Group>()
  const { nodes: nodeHead, materials: materialsHead } = useGLTF(
    `/3d/${props.robotType}/${props.rarity}-${robotDefault[props.robotType].Stealthiness}.glb`
  ) as GLTFResult
  const { nodes: nodeBody, materials: materialsBody } = useGLTF(
    `/3d/${props.robotType}/${props.rarity}-${robotDefault[props.robotType].OilDecrease}.glb`
  ) as GLTFResult
  const { nodes: nodeArmL, materials: materialsArmL } = useGLTF(
    `/3d/${props.robotType}/${props.rarity}-${robotDefault[props.robotType].Efficiency}.glb`
  ) as GLTFResult
  const { nodes: nodeArmR, materials: materialsArmR } = useGLTF(
    `/3d/${props.robotType}/${props.rarity}-${robotDefault[props.robotType].Capacity}.glb`
  ) as GLTFResult
  const { nodes: nodeLegs, materials: materialsLegs } = useGLTF(
    `/3d/${props.robotType}/${props.rarity}-${robotDefault[props.robotType].Speed}.glb`
  ) as GLTFResult
  // const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <CanvasContainer camera={45}>
      <group ref={group} {...props} dispose={null} position={[0, -1.35, 0]}>
        <primitive object={nodeArmR.Main} />
        <skinnedMesh
          geometry={
            nodeHead[`${props.rarity}-${robotDefault[props.robotType].Stealthiness}`].geometry
          }
          material={materialsHead[`${props.rarity}-${robotDefault[props.robotType].Stealthiness}`]}
          skeleton={nodeArmR[`${props.rarity}-${robotDefault[props.robotType].Capacity}`].skeleton}
        />
        <skinnedMesh
          geometry={
            nodeBody[`${props.rarity}-${robotDefault[props.robotType].OilDecrease}`].geometry
          }
          material={materialsBody[`${props.rarity}-${robotDefault[props.robotType].OilDecrease}`]}
          skeleton={nodeArmR[`${props.rarity}-${robotDefault[props.robotType].Capacity}`].skeleton}
        />
        <skinnedMesh
          geometry={
            nodeArmL[`${props.rarity}-${robotDefault[props.robotType].Efficiency}`].geometry
          }
          material={materialsArmL[`${props.rarity}-${robotDefault[props.robotType].Efficiency}`]}
          skeleton={nodeArmR[`${props.rarity}-${robotDefault[props.robotType].Capacity}`].skeleton}
        />
        <skinnedMesh
          geometry={nodeArmR[`${props.rarity}-${robotDefault[props.robotType].Capacity}`].geometry}
          material={materialsArmR[`${props.rarity}-${robotDefault[props.robotType].Capacity}`]}
          skeleton={nodeArmR[`${props.rarity}-${robotDefault[props.robotType].Capacity}`].skeleton}
        />
        <skinnedMesh
          geometry={nodeLegs[`${props.rarity}-${robotDefault[props.robotType].Speed}`].geometry}
          material={materialsLegs[`${props.rarity}-${robotDefault[props.robotType].Speed}`]}
          skeleton={nodeArmR[`${props.rarity}-${robotDefault[props.robotType].Capacity}`].skeleton}
        />
      </group>
    </CanvasContainer>
  )
}

// useGLTF.preload('/3d/stealth/A-1.glb')
