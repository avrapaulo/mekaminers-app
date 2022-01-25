import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { classNames } from 'helpers/class-names'

interface PaginationProps {
  page: number
  pages: number
  selectedPage: (num: number) => void
}

export const Pagination = ({ pages, page, selectedPage }: PaginationProps) => {
  const arrayPages = [...Array(pages).keys()]

  return (
    <nav className="border-t border-gray-200 mx-4 flex items-center justify-between sm:px-0 my-5">
      <div className="-mt-px w-0 flex-1 flex">
        <div
          onClick={() => {
            if (page !== 1) selectedPage(page - 1)
          }}
          className={classNames(
            'border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm text-white font-bold hover:text-gray-300 cursor-pointer',
            page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <ArrowNarrowLeftIcon className="mr-3 mt-px h-5 w-5" aria-hidden="true" />
          Previous
        </div>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {arrayPages
          .slice(page - 5 <= 0 ? 0 : page - 5, pages > page + 5 ? page + 4 : pages)
          .map(number => (
            <div
              key={number}
              onClick={() => selectedPage(number + 1)}
              className={classNames(
                'border-transparent text-white  border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ',
                number + 1 === page
                  ? 'border-indigo-500 text-indigo-600 pointer-events-none'
                  : 'hover:text-gray-700 hover:border-gray-300 cursor-pointer'
              )}
            >
              {number + 1}
            </div>
          ))}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <div
          onClick={() => {
            if (page !== pages) selectedPage(page + 1)
          }}
          className={classNames(
            'border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm text-white font-bold hover:text-gray-300 justify-center',
            page === pages ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          Next
          <ArrowNarrowRightIcon className="ml-3 mt-px h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </nav>
  )
}
