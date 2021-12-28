import Link from 'next/link'

interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 text-white">
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5 mt-10">
      {children}
    </div>
  </div>
)
