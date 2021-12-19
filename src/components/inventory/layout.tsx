import Link from 'next/link'

interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 text-white">
    <Link href="/inventory/robots">
      <a>robots</a>
    </Link>
    <Link href="/inventory/boxes">
      <a> boxes</a>
    </Link>
    <Link href="/inventory/tools">
      <a> tools</a>
    </Link>
    <Link href="/inventory/pieces">
      <a> pieces</a>
    </Link>
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5 mt-10">
      {children}
    </div>
  </div>
)
