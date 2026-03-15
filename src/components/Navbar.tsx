import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'rgba(10, 10, 10, 0.5)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${scrolled ? 'var(--border-light)' : 'transparent'}`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          fontWeight: 700, fontSize: 18, letterSpacing: 3, color: 'var(--text)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            AXIOM
          </motion.span>
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none',
        }} className="nav-desktop">
          <li>
            <a onClick={() => scrollToSection('screenshots')} style={{
              color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>Screenshots</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('install')} style={{
              color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>Install</a>
          </li>
          <li>
            <Link to="/docs" style={{
              color: location.pathname === '/docs' ? 'var(--accent-light)' : 'var(--text-dim)',
              fontSize: 14, fontWeight: 500,
            }}>Docs</Link>
          </li>
          <li>
            <a href="https://github.com/ethan03805/axiom4.0_experimental" target="_blank" rel="noreferrer" style={{
              color: 'var(--text-dim)', fontSize: 14, fontWeight: 500,
            }}>GitHub</a>
          </li>
          <li>
            <motion.a
              onClick={() => scrollToSection('install')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'var(--accent)', color: '#000', padding: '8px 20px',
                borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                display: 'inline-block',
              }}
            >
              Get Started
            </motion.a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-mobile-toggle"
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--text)', fontSize: 24, cursor: 'pointer',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--bg)', borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
            }}
            className="nav-mobile-menu"
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a onClick={() => { scrollToSection('screenshots'); setMobileOpen(false) }}
                style={{ color: 'var(--text-dim)', fontSize: 15, padding: '8px 0', cursor: 'pointer' }}>Screenshots</a>
              <a onClick={() => { scrollToSection('install'); setMobileOpen(false) }}
                style={{ color: 'var(--text-dim)', fontSize: 15, padding: '8px 0', cursor: 'pointer' }}>Install</a>
              <Link to="/docs" style={{ color: 'var(--text-dim)', fontSize: 15, padding: '8px 0' }}>Docs</Link>
              <a href="https://github.com/ethan03805/axiom4.0_experimental" target="_blank" rel="noreferrer"
                style={{ color: 'var(--text-dim)', fontSize: 15, padding: '8px 0' }}>GitHub</a>
              <a onClick={() => { scrollToSection('install'); setMobileOpen(false) }}
                style={{
                  background: 'var(--accent)', color: '#000', padding: '10px 20px',
                  borderRadius: 6, fontWeight: 600, fontSize: 14, textAlign: 'center',
                  cursor: 'pointer', marginTop: 4,
                }}>Get Started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
