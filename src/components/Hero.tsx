import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ParticleField from './ParticleField'
import TerminalTyper from './TerminalTyper'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const installCmd = 'curl -fsSL https://github.com/ethan03805/axiom4.0_experimental/releases/latest/download/install.sh | sh'

  const copy = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      paddingTop: 64, position: 'relative', overflow: 'hidden',
    }}>
      <ParticleField />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.2)',
              color: 'var(--accent-light)', padding: '6px 16px', borderRadius: 100,
              fontSize: 13, fontWeight: 500, marginBottom: 32,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block',
              boxShadow: '0 0 8px var(--accent)', animation: 'pulse 2s infinite' }} />
            v4.1.0 — Now with cross-platform GUI
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.05,
              marginBottom: 20, letterSpacing: -2,
            }}
          >
            Orchestrate AI agents<br />
            with{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-light), var(--accent), var(--purple))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              precision
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 18, color: 'var(--text-dim)', marginBottom: 40,
              maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7,
            }}
          >
            Multi-agent platform with a visual canvas, managed runtimes, and task orchestration.
          </motion.p>

          {/* Install command */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-install-cmd"
            style={{
              background: 'var(--surface)', border: '1px solid var(--border-light)',
              borderRadius: 12, padding: '16px 24px', display: 'inline-flex',
              alignItems: 'center', gap: 16, marginBottom: 32, maxWidth: '100%',
            }}
          >
            <code style={{
              fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--accent-light)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {installCmd}
            </code>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copy}
              style={{
                background: copied ? 'var(--accent)' : 'var(--border-light)',
                border: 'none', color: copied ? '#000' : 'var(--text-dim)',
                padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                whiteSpace: 'nowrap', fontFamily: 'var(--font)',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            className="hero-buttons"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(20, 184, 166, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              href="#install"
              onClick={(e) => { e.preventDefault(); document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px',
                borderRadius: 8, fontSize: 15, fontWeight: 600, background: 'var(--accent)',
                color: '#000', border: 'none', cursor: 'pointer',
              }}
            >
              Install Axiom
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/docs" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
                borderRadius: 8, fontSize: 15, fontWeight: 600, background: 'transparent',
                color: 'var(--text)', border: '1px solid var(--border-light)',
              }}>
                View Docs
              </Link>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/ethan03805/axiom4.0_experimental"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
                borderRadius: 8, fontSize: 15, fontWeight: 600, background: 'transparent',
                color: 'var(--text)', border: '1px solid var(--border-light)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </motion.a>
          </motion.div>

          {/* Terminal preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: 60 }}
          >
            <TerminalTyper />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .hero-install-cmd { display: none !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons > * { width: 100%; justify-content: center; text-align: center; }
        }
      `}</style>
    </section>
  )
}
