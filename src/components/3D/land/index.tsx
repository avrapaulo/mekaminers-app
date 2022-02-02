import { CanvasContainer } from '../canvas-container'
import { LandObject } from './land'
import { RobotObject, RobotObjectProps } from '../robot/robot'
import { useRecoilValue } from 'recoil'
import { farmAtom } from 'recoil/atoms'

interface LandRobotProps extends RobotObjectProps {
  id: number
}

export const LandRobot = ({ rarity, robotType, autoRotate, piecesStatus, id }: LandRobotProps) => {
  const robotCount = useRecoilValue(farmAtom(id))

  return (
    <CanvasContainer autoRotate={false} camera={{ position: [2, 3, 7.5] }}>
      <>
        <RobotObject
          key={id}
          rarity={rarity}
          robotType={robotType}
          piecesStatus={piecesStatus}
          state={robotCount}
        />
        <LandObject />
      </>
    </CanvasContainer>
  )
}
