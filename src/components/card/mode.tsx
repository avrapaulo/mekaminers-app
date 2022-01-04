import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { PickaxeIcon } from 'icons'

interface modeProps {
  modeId?: number
}

// 1 - available
// 2 - selling
// 3 - farming

export const Mode = ({ modeId }: modeProps) => (
  <>
    {modeId === 2 && (
      <div
        title="On sale"
        className="absolute bg-green-600 bottom-2 -right-3 z-10 block rounded-full"
      >
        <CurrencyDollarIcon className="h-7 w-7 text-black" aria-hidden="true" />
      </div>
    )}
    {modeId === 3 && (
      <div
        title="Farm"
        className="absolute bg-black bottom-2 -right-3 z-10 block rounded-full ring-2 ring-pickled-bean-500"
      >
        <PickaxeIcon className="h-6 w-6 p-1.5 text-pickled-bean-300" aria-hidden="true" />
      </div>
    )}
  </>
)
