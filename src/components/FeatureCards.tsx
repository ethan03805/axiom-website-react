import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const FEATURES = [
  {
    icon: '🤖',
    title: 'Multi-Agent Orchestration',
    desc: 'Register agents with distinct roles, permissions, and runtimes. Coordinate orchestrators, workers, reviewers, and observers.',
  },
  {
    icon: '📋',
    title: 'Task State Machine',
    desc: 'Full lifecycle tracking: queued → assigned → in_progress → in_review → done, with branching for blocked and failed states.',
  },
  {
    icon: '🧠',
    title: 'Shared Memory',
    desc: 'Key-value store with tag scoping, TTL expiration, and cross-agent visibility. Agents read and write context seamlessly.',
  },
  {
    icon: '💬',
    title: 'Agent Messaging',
    desc: 'Direct and broadcast messaging between agents. Async communication with type-safe payloads and delivery tracking.',
  },
  {
    icon: '🖥️',
    title: 'Visual Dashboard',
    desc: 'Desktop GUI with real-time canvas, task boards, agent panels, memory viewer, and integrated documentation.',
  },
  {
    icon: '⚡',
    title: 'Managed Runtimes',
    desc: 'Launch agents in managed processes with automatic lifecycle management, health monitoring, and graceful shutdown.',
  },
]

export default function FeatureCards() {
  const { ref, isInView } = useInView()

  return (
    <section style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 12,
          }}>Features</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: 16 }}>
            Everything you need to orchestrate
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 560, margin: '0 auto' }}>
            Built for developers who need precise control over multi-agent workflows.
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }} className="feature-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -8, borderColor: 'var(--border-light)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 32, transition: 'all 0.3s', cursor: 'default',
              }}
            >
              <div style={{
                width: 48, height: 48,
                background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.2)',
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 20,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .feature-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .feature-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
