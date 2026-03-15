import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const PLATFORMS = [
  {
    platform: 'Linux x64', cli: 'axiom-linux-amd64', gui: 'axiom-app-linux-amd64',
  },
  {
    platform: 'Linux ARM64', cli: 'axiom-linux-arm64', gui: 'axiom-app-linux-arm64',
  },
  {
    platform: 'macOS Intel', cli: 'axiom-darwin-amd64', gui: 'axiom-app-darwin-amd64.zip',
  },
  {
    platform: 'macOS Apple Silicon', cli: 'axiom-darwin-arm64', gui: 'axiom-app-darwin-arm64.zip',
  },
  {
    platform: 'Windows x64', cli: 'axiom.exe', gui: 'axiom-app.exe',
  },
  {
    platform: 'Windows ARM64', cli: 'axiom-windows-arm64.exe', gui: '',
  },
]

function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '20px 24px', position: 'relative',
      marginBottom: 16, maxWidth: 700,
    }}>
      <code style={{
        fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--accent-light)',
        lineHeight: 1.6, display: 'block', overflowX: 'auto',
      }}>
        {text}
      </code>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={copy}
        style={{
          position: 'absolute', top: 12, right: 12,
          background: copied ? 'var(--accent)' : 'var(--border-light)',
          border: 'none', color: copied ? '#000' : 'var(--text-dim)',
          padding: '4px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer',
          fontFamily: 'var(--font)', transition: 'all 0.2s',
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </motion.button>
    </div>
  )
}

export default function InstallSection() {
  const [tab, setTab] = useState(0)
  const { ref, isInView } = useInView()

  const tabs = ['macOS / Linux', 'Windows', 'Manual']

  return (
    <section id="install" style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
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
          }}>Install</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: 16 }}>
            Get started in seconds
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 560, margin: '0 auto' }}>
            One command. Auto-detects your OS and architecture. No build tools required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab bar */}
          <div style={{
            display: 'inline-flex', gap: 4, background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 10, padding: 4,
            marginBottom: 24,
          }}>
            {tabs.map((t, i) => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTab(i)}
                style={{
                  background: tab === i ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
                  border: 'none', color: tab === i ? 'var(--accent-light)' : 'var(--text-dim)',
                  padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
                }}
              >
                {t}
              </motion.button>
            ))}
          </div>

          {/* Content */}
          {tab === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <CopyBlock text="curl -fsSL https://github.com/ethan03805/axiom4.0_experimental/releases/latest/download/install.sh | sh" />
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
                Downloads CLI and GUI binaries for your platform and installs to <code style={{
                  fontFamily: 'var(--mono)', background: 'rgba(255,255,255,0.06)',
                  padding: '2px 6px', borderRadius: 4, fontSize: 12, color: 'var(--accent-light)',
                }}>~/.local/bin</code>. On macOS, the GUI app is placed in <code style={{
                  fontFamily: 'var(--mono)', background: 'rgba(255,255,255,0.06)',
                  padding: '2px 6px', borderRadius: 4, fontSize: 12, color: 'var(--accent-light)',
                }}>/Applications</code>.
              </p>
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <CopyBlock text="irm https://github.com/ethan03805/axiom4.0_experimental/releases/latest/download/install.ps1 | iex" />
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
                Downloads CLI and GUI binaries and installs to <code style={{
                  fontFamily: 'var(--mono)', background: 'rgba(255,255,255,0.06)',
                  padding: '2px 6px', borderRadius: 4, fontSize: 12, color: 'var(--accent-light)',
                }}>%LOCALAPPDATA%\Programs\Axiom\bin</code>. Updates PATH automatically.
              </p>
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 16 }}>
                Download the binary for your platform from{' '}
                <a href="https://github.com/ethan03805/axiom4.0_experimental/releases/latest" target="_blank" rel="noreferrer">
                  GitHub Releases
                </a>{' '}
                and place it on your PATH.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  borderCollapse: 'collapse', fontSize: 13, width: '100%', maxWidth: 600,
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Platform</th>
                      <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>CLI</th>
                      <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>GUI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLATFORMS.map((p) => (
                      <tr key={p.platform} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '10px 12px' }}>{p.platform}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <code style={{
                            color: 'var(--accent-light)', fontSize: 12, fontFamily: 'var(--mono)',
                            background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4,
                          }}>{p.cli}</code>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          {p.gui ? (
                            <code style={{
                              color: 'var(--accent-light)', fontSize: 12, fontFamily: 'var(--mono)',
                              background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4,
                            }}>{p.gui}</code>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 16, lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--text-muted)' }}>Note:</strong> Both installers download the CLI and GUI automatically. macOS GUI is packaged as a <code style={{
                  fontFamily: 'var(--mono)', background: 'rgba(255,255,255,0.06)',
                  padding: '2px 6px', borderRadius: 4, fontSize: 12, color: 'var(--accent-light)',
                }}>.zip</code> containing <code style={{
                  fontFamily: 'var(--mono)', background: 'rgba(255,255,255,0.06)',
                  padding: '2px 6px', borderRadius: 4, fontSize: 12, color: 'var(--accent-light)',
                }}>axiom-app.app</code>.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
