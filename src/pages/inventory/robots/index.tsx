import Link from 'next/link'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { Mode } from 'components/card/mode'
import { RobotBody } from 'components/card/robot-body'

const robots = [
  {
    token: 1,
    title: 'robot asd asd asd asd ',
    imageSrc: '/banner.png',
    bonus: 0.2,
    mode: 'selling',
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ]
  },
  {
    token: 2,
    rarityId: 2,
    title: 'robot asd asd asd asd ',
    imageSrc: '/banner.png',
    bonus: 0.2,
    mode: 'selling',
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  },
  {
    token: 3,
    rarityId: 3,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.2,
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  },
  {
    token: 4,
    rarityId: 4,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.2,
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  },
  {
    token: 5,
    rarityId: 5,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.2,
    mode: 'farm',
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: []
  },
  {
    token: 6,
    rarityId: 5,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.5,
    robotStatus: [
      { key: 'c', value: 10 },
      { key: 'e', value: 60 },
      { key: 'o', value: 50 },
      { key: 'st', value: 2 },
      { key: 'sp', value: 3 }
    ],
    piecesStatus: [
      { key: 'c', value: 0.5 },
      { key: 'e', value: 0.25 },
      { key: 'o', value: 0.5 },
      { key: 'st', value: 0.5 },
      { key: 'sp', value: 0.5 }
    ]
  }
]

const RobotsPage = () => {
  return (
    <Layout>
      <>
        {robots.map(
          ({
            token,
            title,
            imageSrc,
            rarityId = 'default',
            robotStatus,
            piecesStatus,
            bonus,
            mode
          }) => (
            <Link key={token} href={`/inventory/robots/${token}`}>
              <a className="relative flex">
                <Mode modeId={mode} />
                <Card
                  rarityId={rarityId}
                  title={title}
                  imageCard={<img alt="Logo Meka Miners" src={imageSrc} />}
                >
                  <RobotBody
                    bonus={bonus}
                    piecesStatus={piecesStatus}
                    rarityId={rarityId}
                    robotStatus={robotStatus}
                  />
                </Card>
              </a>
            </Link>
          )
        )}
      </>
    </Layout>
  )
}

export default RobotsPage
