import Link from 'next/link'

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center h-screen -mt-16 space-y-8">
    <div className="text-2xl font-bold">Whoops... this page is not available</div>
    <Link href="/">
      <a
        type="button"
        className="space-x-2 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span>Back to Homepage</span>
      </a>
    </Link>
  </div>
)

export default ErrorPage
