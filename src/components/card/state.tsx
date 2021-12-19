import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { PickaxeIcon } from 'icons'

interface StateProps {
  stateId?: string
}

export const State = ({ stateId }: StateProps) => (
  <>
    {stateId === 'selling' && (
      <div
        title="On sale"
        className="absolute bg-green-600 bottom-2 -right-2.5 xl:-right-1 z-10 block rounded-full"
      >
        <CurrencyDollarIcon className="h-7 w-7 text-black" aria-hidden="true" />
      </div>
    )}
    {stateId === 'farm' && (
      <div
        title="Farm"
        className="absolute bg-black bottom-2 -right-2.5 xl:-right-1 z-10 block rounded-full ring-2 ring-pickled-bean-500"
      >
        <PickaxeIcon className="h-6 w-6 p-1.5 text-pickled-bean-300" aria-hidden="true" />
      </div>
    )}
  </>
)
