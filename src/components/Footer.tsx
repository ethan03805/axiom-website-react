import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 0' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          AXIOM
        </span>
        <ul style={{ display: 'flex', gap: 24, listStyle: 'none', flexWrap: 'wrap' }}>
          <li><Link to="/docs" style={{ color: 'var(--text-muted)', fontSize: 13 }}>Docs</Link></li>
          <li><a href="https://github.com/ethan03805/axiom4.0_experimental" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: 13 }}>GitHub</a></li>
          <li><a href="https://github.com/ethan03805/axiom4.0_experimental/releases" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: 13 }}>Releases</a></li>
          <li><a href="https://github.com/ethan03805/axiom4.0_experimental/issues" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: 13 }}>Issues</a></li>
        </ul>
      </div>
    </footer>
  )
}
