import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  label: string;
  path?: string;
  action?: () => void;
  icon?: string;
}

const defaultCommands: Command[] = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Projects', path: '/projects', icon: '◆' },
  { label: 'About', path: '/about', icon: '◎' },
  { label: 'Blog', path: '/blog', icon: '✎' },
  { label: 'Pricing', path: '/pricing', icon: '$' },
  { label: 'Contact', path: '/contact', icon: '✉' },
  { label: 'Case Studies', path: '/case-studies', icon: '⚑' },
  { label: 'AI Chat', path: '/chatgpt', icon: '⚡' },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(p => !p);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = query
    ? defaultCommands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : defaultCommands;

  const execute = useCallback((cmd: Command) => {
    setOpen(false);
    if (cmd.path) navigate(cmd.path);
    if (cmd.action) cmd.action();
  }, [navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      execute(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
              zIndex: 10000, width: 'min(480px, calc(100vw - 32px))',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-hover)',
              borderRadius: 16,
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-default)' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'var(--input-bg)', borderRadius: 10,
                border: '1px solid var(--accent-border)', padding: '0 12px',
              }}>
                <span style={{ fontSize: 16, color: 'var(--text-dim)' }}>⌘</span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type to search pages..."
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: 1, padding: '10px 0', border: 'none', outline: 'none',
                    background: 'transparent', color: 'var(--text-primary)',
                    fontSize: 14, fontFamily: 'inherit',
                  }}
                />
                <kbd style={{
                  fontSize: 10, padding: '2px 6px', borderRadius: 4,
                  background: 'var(--bg-card)', color: 'var(--text-dim)',
                  border: '1px solid var(--border-default)',
                  fontFamily: 'monospace',
                }}>ESC</kbd>
              </div>
            </div>
            <div style={{ padding: '8px', maxHeight: 280, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-dim)', fontSize: 13 }}>
                  No results found
                </div>
              ) : filtered.map((cmd, i) => (
                <motion.div
                  key={cmd.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => execute(cmd)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 14px', borderRadius: 10,
                    cursor: 'pointer',
                    background: i === selectedIndex ? 'var(--accent-bg)' : 'transparent',
                    color: i === selectedIndex ? 'var(--accent)' : 'var(--text-secondary)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  <span style={{ width: 24, textAlign: 'center', fontSize: 14, opacity: 0.6 }}>
                    {cmd.icon}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{cmd.label}</span>
                  {cmd.path && (
                    <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'monospace' }}>
                      {cmd.path}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
            <div style={{
              padding: '8px 16px', borderTop: '1px solid var(--border-default)',
              display: 'flex', alignItems: 'center', gap: 16, fontSize: 11,
              color: 'var(--text-dim)', fontFamily: 'monospace',
            }}>
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
