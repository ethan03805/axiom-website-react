import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  { prompt: '$ ', text: 'axiom init', delay: 800 },
  { prompt: '', text: 'Initialized Axiom workspace in .axiom/', delay: 400, color: 'var(--text-dim)' },
  { prompt: '', text: '', delay: 300 },
  { prompt: '$ ', text: 'axiom agent register --name "Architect" --permission orchestrator', delay: 600 },
  { prompt: '', text: 'Agent registered: Architect (orchestrator)', delay: 400, color: 'var(--accent-light)' },
  { prompt: '', text: '', delay: 200 },
  { prompt: '$ ', text: 'axiom agent register --name "Builder" --permission worker --runtime opencode', delay: 600 },
  { prompt: '', text: 'Agent registered: Builder (worker)', delay: 400, color: 'var(--accent-light)' },
  { prompt: '', text: '', delay: 200 },
  { prompt: '$ ', text: 'axiom task create --title "Build the auth system" --assign Builder', delay: 600 },
  { prompt: '', text: 'Task created: #1 "Build the auth system" → Builder', delay: 400, color: 'var(--amber)' },
  { prompt: '', text: '', delay: 200 },
  { prompt: '$ ', text: 'axiom status', delay: 500 },
  { prompt: '', text: 'Agents: 2 active | Tasks: 1 in_progress | Memory: 0 entries', delay: 300, color: 'var(--text-dim)' },
]

export default function TerminalTyper() {
  const [displayedLines, setDisplayedLines] = useState<Array<{ prompt: string; text: string; color?: string }>>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentLine >= LINES.length) {
      setIsTyping(false)
      return
    }

    const line = LINES[currentLine]

    if (!line.prompt && line.text === '') {
      // Empty line — just add it
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, { prompt: '', text: '', color: undefined }])
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, line.delay)
      return
    }

    if (!line.prompt) {
      // Output line — show all at once
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, { prompt: '', text: line.text, color: line.color }])
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, line.delay)
      return
    }

    // Command line — type character by character
    if (currentChar === 0) {
      setDisplayedLines(prev => [...prev, { prompt: line.prompt, text: '', color: undefined }])
    }

    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          newLines[newLines.length - 1] = {
            ...newLines[newLines.length - 1],
            text: line.text.slice(0, currentChar + 1),
          }
          return newLines
        })
        setCurrentChar(c => c + 1)
      }, 25 + Math.random() * 35)
      return () => clearTimeout(timeout)
    } else {
      // Line complete
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, line.delay)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar])

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedLines])

  return (
    <div style={{
      background: '#0D0D0D', border: '1px solid var(--border-light)',
      borderRadius: 12, overflow: 'hidden', maxWidth: 700, margin: '0 auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(20, 184, 166, 0.05)',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '10px 16px',
        background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)',
        gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22C55E' }} />
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
          terminal
        </span>
      </div>

      {/* Content */}
      <div ref={containerRef} style={{
        padding: '16px 20px', fontFamily: 'var(--mono)', fontSize: 13,
        lineHeight: 1.8, minHeight: 220, maxHeight: 280, overflowY: 'auto',
        textAlign: 'left',
      }}>
        {displayedLines.map((line, i) => (
          <div key={i} style={{ minHeight: line.text === '' ? 8 : undefined }}>
            {line.prompt && (
              <span style={{ color: 'var(--accent)' }}>{line.prompt}</span>
            )}
            <span style={{ color: line.color || 'var(--text)' }}>{line.text}</span>
          </div>
        ))}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              display: 'inline-block', width: 8, height: 16,
              background: 'var(--accent)', marginLeft: 2, verticalAlign: 'middle',
            }}
          />
        )}
      </div>
    </div>
  )
}
