import {
  TankLegs,
  TankHead,
  TankBody,
  TankRArm,
  TankLArm,
  BasicLegs,
  BasicHead,
  BasicBody,
  BasicRArm,
  BasicLArm,
  StealthLegs,
  StealthHead,
  StealthBody,
  StealthRArm,
  StealthLArm
} from 'icons'

export const piecesDefault = [
  {
    // HEAD
    key: 'Stealthiness',
    isDefault: true,
    icons: {
      tank: props => <TankHead {...props} />,
      basic: props => <BasicHead {...props} />,
      stealth: props => <StealthHead {...props} />
    }
  },
  {
    // RIGHT ARM
    key: 'Capacity',
    isDefault: true,
    icons: {
      tank: props => <TankRArm {...props} />,
      basic: props => <BasicRArm {...props} />,
      stealth: props => <StealthRArm {...props} />
    }
  },

  {
    // BODY
    key: 'OilDecrease',
    isDefault: true,
    icons: {
      tank: props => <TankBody {...props} />,
      basic: props => <BasicBody {...props} />,
      stealth: props => <StealthBody {...props} />
    }
  },
  {
    // LEFT ARM
    key: 'Efficiency',
    isDefault: true,
    icons: {
      tank: props => <TankLArm {...props} />,
      basic: props => <BasicLArm {...props} />,
      stealth: props => <StealthLArm {...props} />
    }
  },
  {
    // LEGS
    key: 'Speed',
    isDefault: true,
    icons: {
      tank: props => <TankLegs {...props} />,
      basic: props => <BasicLegs {...props} />,
      stealth: props => <StealthLegs {...props} />
    }
  }
]

export const PiecesDetails = {
  // eslint-disable-next-line quotes
  Capacity: "Increases your robot's base capacity",
  Efficiency: 'Increases mining speed.',
  OilDecrease: 'Decreases the chance of the robot getting stuck.',
  Stealthiness:
    'Increases the chance of a successful attack. Add a 10% chance when finishing a cycle to receive a bonus equal to the % of your piece.',
  Speed:
    'Decreases your troop time to target. Add a chance to find a Piece Fragment at the end of each cycle based on the % of your piece.'
}
