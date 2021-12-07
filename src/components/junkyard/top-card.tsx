import Image from 'next/image'

interface TopCardProps {
  title: string
  description: string
  img: 'warning' | 'wheel' | 'piece'
}

export const TopCard = ({ img, title, description }: TopCardProps) => (
  <div className="relative flex justify-center items-center flex-col w-56">
    <div className="absolute w-full h-full">
      <Image
        src={`/card/bg/${img}.png`}
        layout="responsive"
        width="367"
        height="172"
        alt="Card Top"
      />
    </div>
    <div className="relative items-center justify-center w-6 h-6 mt-4 sm:mt-3 md:mt-4">
      <Image src={`/card/icon/${img}.png`} layout="fill" objectFit="contain" alt="Icon" />
    </div>
    <div className="flex-1 flex items-center justify-between">
      <div className="flex-1 px-4 py-0.5 md:py-2 text-sm truncate">
        <div className="text-gray-900 font-medium hover:text-gray-600">{title}</div>
        <p className="text-gray-800 text-center font-bold">{description}</p>
      </div>
    </div>
  </div>
)
