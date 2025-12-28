import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search', label: 'Search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart', label: 'Favorites' },
  { src: '/assets/icons/user.svg', alt: 'user', label: 'Profile' },
]

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 z-50">
      <nav className="nav ">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-purple rounded-10 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
          </div>
          
          <div>
            <p className="nav-logo">
              Price<span className="bg-gradient-to-r from-primary to-primary-purple bg-clip-text text-transparent">Pulse</span>
            </p>
            <p className="text-xs text-dark-muted">Real-time price tracking</p>
          </div>
        </Link>

       
      </nav>
    </header>
  )
}

export default Navbar