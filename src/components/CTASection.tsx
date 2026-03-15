import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'

export default function CTASection() {
  const { ref, isInView } = useInView()

  return (
    <section style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 20, padding: '64px 40px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 400,
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, position: 'relative' }}>
            Ready to orchestrate?
          </h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 32, fontSize: 16, position: 'relative' }}>
            Start coordinating AI agents in your project today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}
            className="cta-buttons"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)' }}
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
                Read the Docs
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
              Star on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-buttons { flex-direction: column !important; }
          .cta-buttons > * { width: 100%; justify-content: center; text-align: center; }
        }
      `}</style>
    </section>
  )
}
