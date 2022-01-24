import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'

interface PaginationProps {
  page: number
  pages: number
}

export const Pagination = ({ pages, page }: PaginationProps) => {
  return (
    <nav className="border-t border-gray-200 mx-4 flex items-center justify-between sm:px-0 my-5">
      <div className="-mt-px w-0 flex-1 flex">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm text-white font-bold hover:text-gray-300"
        >
          <ArrowNarrowLeftIcon className="mr-3 mt-px h-5 w-5" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        <span className="border-transparent text-white font-bold border-t-2 pt-4 px-4 inline-flex items-center text-sm">
          Page {page} of {pages}
        </span>
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm text-white font-bold hover:text-gray-300 justify-center"
        >
          Next
          <ArrowNarrowRightIcon className="ml-3 mt-px h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </nav>
  )
}
