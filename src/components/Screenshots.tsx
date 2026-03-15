import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', img: '/images/dashboard.png', alt: 'Axiom Dashboard' },
  { id: 'agents', label: 'Agents', img: '/images/agents.png', alt: 'Axiom Agents Panel' },
  { id: 'agent-detail', label: 'Agent Detail', img: '/images/agent-detail.png', alt: 'Agent Detail View' },
  { id: 'tasks', label: 'Task Board', img: '/images/tasks.png', alt: 'Axiom Task Board' },
  { id: 'messages', label: 'Messages', img: '/images/messages.png', alt: 'Axiom Messages' },
  { id: 'memory', label: 'Memory', img: '/images/memory.png', alt: 'Axiom Memory Viewer' },
  { id: 'logs', label: 'Logs', img: '/images/logs.png', alt: 'Axiom Log Viewer' },
]

export default function Screenshots() {
  const [active, setActive] = useState(0)
  const { ref, isInView } = useInView()

  return (
    <section id="screenshots" style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 12,
          }}>Interface</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: 16 }}>
            A desktop GUI built for operators
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 560, margin: '0 auto' }}>
            Every view designed for clarity and control. Dark theme, real-time sync, zero clutter.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: 40,
          }}
          className="screenshot-tabs"
        >
          {TABS.map((tab, i) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? 'rgba(20, 184, 166, 0.08)' : 'var(--surface)',
                border: `1px solid ${active === i ? 'rgba(20, 184, 166, 0.3)' : 'var(--border)'}`,
                color: active === i ? 'var(--accent-light)' : 'var(--text-dim)',
                padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ maxWidth: 1100, margin: '0 auto' }}
        >
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border-light)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(20,184,166,0.05)',
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={TABS[active].id}
                src={TABS[active].img}
                alt={TABS[active].alt}
                loading="lazy"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .screenshot-tabs {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 8px;
          }
          .screenshot-tabs::-webkit-scrollbar { display: none; }
          .screenshot-tabs button { white-space: nowrap; flex-shrink: 0; }
        }
      `}</style>
    </section>
  )
}
