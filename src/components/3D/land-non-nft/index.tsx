import { useRecoilValue } from 'recoil'
import { farmRobotsAtom } from 'recoil/atoms'
import { FrogObject } from 'components/3D/pets/frog/frog'
import { DogObject } from 'components/3D/pets/dog/dog'
import { BugObject } from 'components/3D/pets/bug/bug'
import { FunctionalObject } from 'components/3D/mining-bots/functional/functional'
import { HeavyObject } from 'components/3D/mining-bots/heavy/heavy'
import { RustyObject } from 'components/3D/mining-bots/rusty/rusty'
import { LandObject } from './land'
import { CanvasContainer } from '../canvas-container'

interface LandNonNFTRobotProps {
  id: string | number
  name: string
  mineralRarity: string
  petName: string
}

export const LandNonNFTRobot = ({ id, name, mineralRarity, petName }: LandNonNFTRobotProps) => {
  const farmRobots = useRecoilValue(farmRobotsAtom)

  return (
    <CanvasContainer autoRotate={true} camera={{ position: [-15, 10, 0], zoom: 2.2 }}>
      <>
        {name === 'Functional' && (
          <FunctionalObject animation={true} farmRobots={farmRobots} nonNFTId={id} />
        )}
        {name === 'Heavy' && <HeavyObject animation={true} />}
        {name === 'Rusty' && <RustyObject animation={true} />}
        <LandObject rarity={mineralRarity} />
        {petName === 'Frog' && <FrogObject />}
        {petName === 'Dog' && <DogObject />}
        {petName === 'Bug' && <BugObject />}
      </>
    </CanvasContainer>
  )
}
