import Image from 'next/image'
import Link from 'next/link'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { State } from 'components/card/state'
import { PiecesBody } from 'components/card/piece-body'

const pieces = [
  {
    id: 1,
    rarityId: 5,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.3,
    piecesStatus: [{ key: 'c', value: 10 }],
    state: 'sell'
  },
  {
    id: 1,
    rarityId: 1,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    bonus: 0.3,
    piecesStatus: [{ key: 'c', value: 10 }]
  }
]

const PiecesPage = () => {
  return (
    <Layout>
      <>
        {pieces.map(({ id, title, imageSrc, rarityId = 'default', piecesStatus, state }) => (
          <Link key={id} href={`/inventory/pieces/${id}`}>
            <a className="relative flex">
              <State stateId={state} />
              <Card
                rarityId={rarityId}
                title={title}
                imageCard={
                  <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src={imageSrc} />
                }
              >
                <PiecesBody piecesStatus={piecesStatus} rarityId={rarityId} />
              </Card>
            </a>
          </Link>
        ))}
      </>
    </Layout>
  )
}

export default PiecesPage
