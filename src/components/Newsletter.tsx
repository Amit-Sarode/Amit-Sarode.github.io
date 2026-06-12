import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const dismissedBefore = localStorage.getItem('newsletter-dismissed');
    if (dismissedBefore) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    localStorage.setItem('newsletter-dismissed', 'true');
  };

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setDismissed(true);
      setVisible(false);
      localStorage.setItem('newsletter-dismissed', 'true');
    }, 2500);
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed', bottom: 100, left: 32,
            zIndex: 98, maxWidth: 340, width: 'calc(100vw - 64px)',
            background: 'rgba(5,15,16,0.96)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(20,184,166,0.15)',
            borderRadius: 20, padding: '20px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            style={{
              position: 'absolute', top: 8, right: 10,
              background: 'none', border: 'none', color: '#475569',
              cursor: 'pointer', fontSize: 16, padding: 4, lineHeight: 1,
              fontFamily: 'inherit',
            }}
          >✕</button>

          {subscribed ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>🎉</span>
              <p style={{ color: '#5eead4', fontSize: 14, fontWeight: 600, margin: 0 }}>
                You're subscribed!
              </p>
              <p style={{ color: '#64748b', fontSize: 12, margin: '6px 0 0' }}>
                Check your inbox for the AI checklist.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>📋</span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.02em',
                }}>
                  Free AI Automation Checklist
                </span>
              </div>
              <p style={{
                fontSize: 12, color: '#94a3b8', lineHeight: 1.5, margin: '0 0 14px',
              }}>
                Get our 10-point checklist to identify automation opportunities in your business — plus weekly AI tips.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubscribe(); }}
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#e2e8f0', fontSize: 13, outline: 'none',
                    fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(20,184,166,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubscribe}
                  style={{
                    padding: '10px 16px', borderRadius: 10, whiteSpace: 'nowrap',
                    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                    color: '#fff', fontSize: 13, fontWeight: 700,
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    flexShrink: 0,
                  }}
                >Get Free →</motion.button>
              </div>
              <button
                onClick={handleDismiss}
                style={{
                  background: 'none', border: 'none', color: '#475569',
                  fontSize: 11, cursor: 'pointer', marginTop: 8,
                  fontFamily: 'inherit', padding: 0, textDecoration: 'underline',
                  textUnderlineOffset: 2,
                }}
              >No thanks, I'll automate later</button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Newsletter;
