import { FarmCard } from 'components/farm'
import { SlideFarm } from 'components/farm/slide'

const FarmPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 w-full h-full">
      <SlideFarm />
      <div className="grid grid-cols-3">
        <FarmCard id={1} />
        <FarmCard id={2} />
      </div>
    </div>
  )
}

export default FarmPage
