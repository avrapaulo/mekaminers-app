interface TopCardProps {
  title: string
  description: string
  img: 'warning' | 'wheel' | 'piece'
}

export const TopCard = ({ img, title, description }: TopCardProps) => (
  <div className="relative flex justify-center items-center flex-col w-56 lg:w-72">
    <div className="absolute w-full h-full">
      <img src={`/card/bg/${img}.png`} width="367" height="172" alt="Card Top" />
    </div>
    <div className="relative items-center justify-center w-6 md:w-6 xl:w-10 h-6 md:h-6 xl:h-10 mt-4 sm:mt-4 md:mt-4 lg:mt-5">
      <img src={`/card/icon/${img}.png`} alt="Icon" />
    </div>
    <div className="flex-1 flex items-center justify-between">
      <div className="flex-1 px-4 py-0.5 md:py-1 lg:py-2 text-sm md:text-base truncate">
        <div className="text-white font-medium hover:text-gray-600 text-center">{title}</div>
        <p className="text-white text-center font-bold">{description}</p>
      </div>
    </div>
  </div>
)
