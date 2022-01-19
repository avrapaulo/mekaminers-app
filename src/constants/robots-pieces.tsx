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
    // LEGS
    key: 'Speed',
    isDefault: true,
    icons: {
      tank: props => <TankLegs {...props} />,
      basic: props => <BasicLegs {...props} />,
      stealth: props => <StealthLegs {...props} />
    }
  },
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
  }
]
