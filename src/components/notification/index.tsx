import { XCircleIcon } from '@heroicons/react/outline'
import { XIcon, CheckCircleIcon } from '@heroicons/react/solid'

interface NotificationProps {
  isShow: boolean
  title: string
  description?: string
  icon: 'success' | 'error'
  setShow: (show: boolean) => void
}

export const Notification = ({
  isShow = true,
  setShow,
  description,
  title,
  icon
}: NotificationProps) => (
  <div
    className={`${
      isShow ? 'animate-enter' : 'animate-leave'
    } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex justify-center items-center">
        <div className="flex-shrink-0 pt-0.5">
          {icon === 'success' && (
            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
          )}
          {icon === 'error' && <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      </div>
    </div>
    <div className="flex">
      {/* <button
        onClick={() => setShow(true)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex text-sm font-medium"
      >
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button> */}
    </div>
  </div>
)
