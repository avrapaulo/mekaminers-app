import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { classNames } from 'helpers/class-names'
import { PickaxeIcon } from 'icons'

interface modeProps {
  isAbsolute?: boolean
  modeId?: number
}

// 1 - available
// 2 - selling
// 3 - farming

export const Mode = ({ modeId, isAbsolute = true }: modeProps) => (
  <>
    {modeId === 2 && (
      <div
        title="On sale"
        className={classNames(
          ' bg-green-600 z-10 block rounded-full',
          isAbsolute ? 'absolute bottom-2 -right-3' : 'p-2'
        )}
      >
        <CurrencyDollarIcon className="h-7 w-7 text-black" aria-hidden="true" />
      </div>
    )}
    {modeId === 3 && (
      <div
        title="Farm"
        className={classNames(
          'bg-black z-10 block rounded-full ring-2 ring-pickled-bean-500',
          isAbsolute ? 'absolute bottom-2 -right-3' : 'p-1'
        )}
      >
        <PickaxeIcon className="h-6 w-6 p-1.5 text-pickled-bean-300" aria-hidden="true" />
      </div>
    )}
  </>
)
