import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#works' },
  { label: 'Process', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <LogoButton />

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setActive(link.label)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
              active === link.label
                ? 'text-text-primary bg-stroke/50'
                : 'text-muted hover:text-text-primary hover:bg-stroke/50'
            }`}
          >
            {link.label}
          </a>
        ))}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Get a Quote button */}
        <QuoteButton />
      </div>
    </nav>
  )
}

function LogoButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 mr-1"
      style={{
        background: hovered
          ? 'linear-gradient(270deg, #F26522 0%, #D4561A 100%)'
          : 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)',
        padding: '2px',
      }}
    >
      <span className="w-full h-full rounded-full bg-bg flex items-center justify-center">
        <span className="font-display italic text-[13px] text-text-primary">SB</span>
      </span>
    </button>
  )
}

function QuoteButton() {
  return (
    <div className="relative group ml-1">
      <span
        className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, #F26522 0%, #D4561A 100%)' }}
      />
      <a
        href="mailto:info@sourcebuildaustralia.com.au"
        className="relative z-10 flex items-center gap-1 bg-surface rounded-full backdrop-blur-md text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary transition-colors duration-200"
      >
        Get a Quote <span>&#8599;</span>
      </a>
    </div>
  )
}
