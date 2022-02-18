import { XCircleIcon, XIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'

interface NotificationProps {
  isShow: boolean
  title: string
  description?: JSX.Element
  icon: 'success' | 'error'
  onClickClose?: () => void
}

export const Notification = ({
  isShow = true,
  description,
  title,
  icon,
  onClickClose
}: NotificationProps) => (
  <div
    className={`${
      isShow ? 'animate-enter' : 'animate-leave'
    } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4 relative">
      <div className="flex justify-center items-center">
        <div className="flex-shrink-0 pt-0.5">
          {icon === 'success' && (
            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
          )}
          {icon === 'error' && <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          {description && (
            <div className="mt-1 text-sm text-gray-500 font-semibold">{description}</div>
          )}
        </div>
      </div>
    </div>
    {onClickClose && (
      <div className="absolute right-2 top-2">
        <button
          className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          onClick={onClickClose}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    )}
  </div>
)
