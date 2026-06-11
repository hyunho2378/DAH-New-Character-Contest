import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScramble } from '../../hooks/useScramble.js'
import logoSrc from '../../assets/logo.svg'

function NavLink({ to, children, isActive }) {
  const { displayText, scramble } = useScramble(children)
  return (
    <Link
      to={to}
      onMouseEnter={scramble}
      style={{
        fontFamily: "'Pretendard', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(15px, 1.4vw, 14px)',
        color: isActive ? '#E27DA6' : '#999999',
        textDecoration: 'none',
        transition: 'color 150ms ease',
        letterSpacing: '0.03em',
      }}
    >
      {displayText}
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAboutActive = pathname === '/'
  const isContentActive = pathname === '/content' || pathname.startsWith('/poster/')
  const isAwardActive = pathname === '/award'

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '72px',
        background: scrolled ? 'rgba(10, 10, 10, 0.85)' : '#0A0A0A',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? '#333333' : '#2A2A2A'}`,
        transition: 'background 300ms ease, border-color 200ms ease',
      }}
    >
      <div className="container header-inner" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoSrc} alt="DIINYE" style={{ height: 'clamp(20px, 3vw, 28px)', width: 'auto' }} />
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.5vw, 32px)' }}>
          <NavLink to="/" isActive={isAboutActive}>About</NavLink>
          <NavLink to="/content" isActive={isContentActive}>Content</NavLink>
          <NavLink to="/award" isActive={isAwardActive}>Award</NavLink>
        </nav>
      </div>
    </header>
  )
}