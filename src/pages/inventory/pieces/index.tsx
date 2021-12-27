import Link from 'next/link'
import { Card } from 'components/card'
import { Layout } from 'components/inventory'
import { Mode } from 'components/card/mode'
import { PiecesBody } from 'components/card/piece-body'
const pieces = [
  {
    token: 1,
    rarityId: 5,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    piecesStatus: [{ key: 'c', value: 10 }],
    mode: 'sell'
  },
  {
    token: 1,
    rarityId: 1,
    title: 'Basic Tee',
    imageSrc: '/banner.png',
    piecesStatus: [{ key: 'c', value: 10 }]
  }
]

const PiecesPage = () => {
  return (
    <Layout>
      <>
        {pieces.map(({ token, title, imageSrc, rarityId = 'default', piecesStatus, mode }) => (
          <Link key={token} href={`/inventory/pieces/${token}`}>
            <a className="relative flex">
              <Mode modeId={mode} />
              <Card
                rarityId={rarityId}
                title={title}
                imageCard={<img alt="Logo Meka Miners" src={imageSrc} />}
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
