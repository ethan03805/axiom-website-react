import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const STEPS = [
  {
    num: 1,
    title: 'Initialize',
    desc: 'Create an .axiom/ directory in your project to set up the local orchestration store.',
    code: 'axiom init',
  },
  {
    num: 2,
    title: 'Register Agents',
    desc: 'Define agents with permission levels, prompts, tools, and runtime profiles.',
    code: 'axiom agent register --name "Builder" --permission worker --runtime opencode',
  },
  {
    num: 3,
    title: 'Launch & Orchestrate',
    desc: 'Create tasks, launch agents, and watch them coordinate in real-time via the CLI or GUI.',
    code: 'axiom-app',
  },
]

export default function HowItWorks() {
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
          }}>Workflow</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700 }}>
            Three steps to orchestration
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
          maxWidth: 900, margin: '0 auto',
        }} className="steps-grid">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' }}
                style={{
                  width: 56, height: 56,
                  background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.3)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 700, color: 'var(--accent)', margin: '0 auto 16px',
                  transition: 'all 0.3s',
                }}
              >
                {step.num}
              </motion.div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 12 }}>
                {step.desc}
              </p>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '10px 16px', fontFamily: 'var(--mono)',
                fontSize: 12, color: 'var(--accent-light)', wordBreak: 'break-all',
              }}>
                {step.code}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
