import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const STEPS = [
  {
    title: 'Initialize',
    desc: 'Create an .axiom/ directory in your project to set up the local orchestration store.',
    code: 'axiom init',
  },
  {
    title: 'Register Agents',
    desc: 'Define agents with permission levels, prompts, tools, and runtime profiles.',
    code: 'axiom agent register --name "Builder" --permission worker --runtime opencode',
  },
  {
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

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              style={{
                display: 'flex', gap: 24, alignItems: 'flex-start',
                marginBottom: i < STEPS.length - 1 ? 0 : 0,
              }}
            >
              {/* Timeline column */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                flexShrink: 0, width: 40,
              }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'var(--surface)', border: '1px solid rgba(20, 184, 166, 0.3)',
                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 600, color: 'var(--accent-light)',
                  fontFamily: 'var(--mono)',
                }}>
                  0{i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: 1, flexGrow: 1, minHeight: 40,
                    background: 'rgba(20, 184, 166, 0.15)',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: i < STEPS.length - 1 ? 32 : 0, flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, letterSpacing: -0.3 }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 12,
                }}>
                  {step.desc}
                </p>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '12px 16px', fontFamily: 'var(--mono)',
                  fontSize: 13, color: 'var(--accent-light)',
                  overflowX: 'auto', whiteSpace: 'nowrap',
                }}>
                  <span style={{ color: 'var(--text-muted)', marginRight: 8, userSelect: 'none' }}>$</span>
                  {step.code}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
