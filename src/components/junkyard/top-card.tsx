import { classNames } from 'helpers/classNames'

interface TopCardProps {
  title: string
  description: string
  children: JSX.Element
}

export const TopCard = ({ children, title, description }: TopCardProps) => (
  <div className="flex filter drop-shadow rounded-md w-80 sm:w-56">
    <div
      className={classNames(
        'flex-shrink-0 flex items-center justify-center w-16 p-4 text-sm font-medium rounded-l-md border-t border-l border-b hover:text-gray-600'
      )}
    >
      {children}
    </div>
    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
      <div className="flex-1 px-4 py-2 text-sm truncate">
        <div className="text-gray-900 font-medium hover:text-gray-600">{title}</div>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  </div>
)
