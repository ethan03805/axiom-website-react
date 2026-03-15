import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { docSections } from '../data/docsContent'
import Navbar from '../components/Navbar'

export default function Docs() {
  const [activeSection, setActiveSection] = useState(docSections[0]?.id || '')
  useEffect(() => {
    // Check URL hash on load
    const hash = window.location.hash.replace('#', '')
    if (hash && docSections.find(s => s.id === hash)) {
      setActiveSection(hash)
    }
    window.scrollTo(0, 0)
  }, [])

  const switchSection = (id: string) => {
    setActiveSection(id)
    window.history.replaceState(null, '', `#${id}`)
    // Scroll content to top
    const content = document.querySelector('.doc-content-area')
    if (content) content.scrollTop = 0
  }

  const currentSection = docSections.find(s => s.id === activeSection)

  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex', minHeight: 'calc(100vh - 64px)', paddingTop: 64,
      }}>
        {/* Sidebar — desktop only */}
        <aside className="docs-sidebar" style={{
          width: 280, minWidth: 280, background: 'var(--surface)',
          borderRight: '1px solid var(--border)', position: 'sticky',
          top: 64, height: 'calc(100vh - 64px)', overflowY: 'auto', padding: '24px 0',
        }}>
          <div style={{
            padding: '0 20px 16px', fontSize: 11, fontWeight: 600,
            letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent)',
          }}>
            Documentation
          </div>
          {docSections.map(section => (
            <motion.a
              key={section.id}
              whileHover={{ x: 2 }}
              onClick={() => switchSection(section.id)}
              style={{
                display: 'block', padding: '8px 20px 8px 24px',
                color: activeSection === section.id ? 'var(--accent-light)' : 'var(--text-dim)',
                fontSize: 14, fontWeight: activeSection === section.id ? 500 : 400,
                borderLeft: `3px solid ${activeSection === section.id ? 'var(--accent)' : 'transparent'}`,
                background: activeSection === section.id ? 'rgba(20, 184, 166, 0.05)' : 'transparent',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {section.label}
            </motion.a>
          ))}
        </aside>

        {/* Main content */}
        <main className="doc-content-area" style={{
          flex: 1, maxWidth: 900, padding: '40px 48px 80px', margin: '0 auto',
          overflowY: 'auto',
        }}>
          {/* Mobile picker */}
          <div className="docs-mobile-picker" style={{ marginBottom: 24 }}>
            <select
              value={activeSection}
              onChange={(e) => switchSection(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', background: 'var(--surface)',
                border: '1px solid var(--border-light)', borderRadius: 8,
                color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font)',
                appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
              }}
            >
              {docSections.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <Link to="/" style={{
            display: 'inline-block', marginBottom: 24, fontSize: 13, color: 'var(--text-muted)',
          }}>
            &larr; Back to Home
          </Link>

          <AnimatePresence mode="wait">
            {currentSection && (
              <motion.div
                key={currentSection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="doc-section-content"
                dangerouslySetInnerHTML={{ __html: currentSection.html }}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      <style>{`
        .docs-mobile-picker { display: none; }

        .doc-section-content h1 { font-size: 32px; font-weight: 700; margin-bottom: 8px; }
        .doc-section-content h2 { font-size: 22px; font-weight: 600; margin: 40px 0 16px; padding-top: 16px; border-top: 1px solid var(--border); }
        .doc-section-content h2:first-of-type { border-top: none; margin-top: 24px; }
        .doc-section-content h3 { font-size: 17px; font-weight: 600; margin: 28px 0 12px; color: var(--text); }
        .doc-section-content p { color: var(--text-dim); line-height: 1.7; margin-bottom: 12px; font-size: 15px; }
        .doc-section-content ul, .doc-section-content ol { color: var(--text-dim); margin: 0 0 16px 24px; line-height: 1.7; font-size: 15px; }
        .doc-section-content li { margin-bottom: 4px; }
        .doc-section-content strong { color: var(--text); }
        .doc-section-content code {
          font-family: var(--mono);
          background: rgba(255,255,255,0.06);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
          color: var(--accent-light);
        }
        .doc-section-content pre {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px 20px;
          margin: 12px 0 16px;
          overflow-x: auto;
        }
        .doc-section-content pre code {
          background: none;
          padding: 0;
          font-size: 13px;
          line-height: 1.6;
          color: var(--accent-light);
        }
        .doc-section-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0 20px;
          font-size: 14px;
        }
        .doc-section-content thead th {
          text-align: left;
          padding: 10px 12px;
          background: var(--surface);
          border-bottom: 1px solid var(--border-light);
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .doc-section-content tbody td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
          color: var(--text-dim);
          vertical-align: top;
        }
        .doc-section-content tbody tr:hover { background: rgba(255,255,255,0.02); }
        .doc-section-content .lead { font-size: 17px; color: var(--text-dim); margin-bottom: 24px; }
        .doc-section-content hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }

        @media (max-width: 768px) {
          .docs-sidebar { display: none !important; }
          .docs-mobile-picker { display: block !important; }
          .doc-content-area { padding: 24px 20px 60px !important; }
          .doc-section-content h1 { font-size: 24px; }
          .doc-section-content h2 { font-size: 19px; margin-top: 28px; }
          .doc-section-content h3 { font-size: 15px; }
          .doc-section-content p { font-size: 14px; }
          .doc-section-content ul, .doc-section-content ol { font-size: 14px; }
          .doc-section-content pre { padding: 12px; }
          .doc-section-content pre code { font-size: 12px; }
          .doc-section-content table { font-size: 13px; display: block; overflow-x: auto; }
        }
      `}</style>
    </>
  )
}
