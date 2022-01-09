import { Card } from 'components/card'
import { Layout } from 'components/inventory'

const items = [
  {
    id: 1,
    title: 'oil',
    quantity: 158,
    description: 'scrambled it to make a type scrambled it',
    imageSrc: '/banner.png'
  },
  {
    id: 1,
    title: 'Toolkit',
    quantity: 158,
    description: 'scrambled it to make a type scrambled it',
    imageSrc: '/banner.png'
  }
]

const Tools = () => {
  return (
    <Layout>
      <>
        {items.map(({ id, title, imageSrc, quantity, description }) => (
          <Card
            description={title}
            key={id}
            imageCard={<img alt="Logo Meka Miners" src={imageSrc} />}
          >
            <div className="flex-1 p-4 flex flex-col">
              <div className="h-full flex justify-between flex-col">
                <div className="space-y-1 flex flex-col">
                  <div className="text-center">{description}</div>
                </div>
                <div className="text-sm font-medium text-right">( x{quantity} )</div>
              </div>
            </div>
          </Card>
        ))}
      </>
    </Layout>
  )
}

export default Tools
