import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function HireMeButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Show after scrolling down a bit
  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', handle);
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 99,
            }}
          >
            <Link to="/contact" aria-label="Work with me" style={{ textDecoration: 'none' }}>
              <motion.div
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {/* Outer glow ring */}
                <span
                  style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(20,184,166,0.3)',
                    animation: 'ringPulse 2.5s ease-in-out infinite',
                    pointerEvents: 'none',
                  }}
                />
                {/* Second ring */}
                <span
                  style={{
                    position: 'absolute',
                    inset: -10,
                    borderRadius: '50%',
                    border: '1px solid rgba(20,184,166,0.12)',
                    animation: 'ringPulse 2.5s ease-in-out infinite 0.4s',
                    pointerEvents: 'none',
                  }}
                />

                {/* Main circle button */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    boxShadow: '0 0 24px rgba(20,184,166,0.45), 0 8px 32px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Shine sweep */}
                  <span
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: -20,
                      width: 40,
                      height: 80,
                      background: 'rgba(255,255,255,0.12)',
                      transform: 'rotate(20deg)',
                      animation: 'shine 3s ease-in-out infinite',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Briefcase icon */}
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Expanding label on hover */}
                <AnimatePresence>
                  {hovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scaleX: 0.8 }}
                      animate={{ opacity: 1, x: 0, scaleX: 1 }}
                      exit={{ opacity: 0, x: 8, scaleX: 0.8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        right: 70,
                        transformOrigin: 'right center',
                      }}
                    >
                      <div
                        style={{
                          padding: '8px 16px',
                          borderRadius: 50,
                          background: 'rgba(5,15,16,0.96)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(20,184,166,0.2)',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5eead4',
                          letterSpacing: '0.03em',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#14b8a6',
                            boxShadow: '0 0 8px #14b8a6',
                            display: 'inline-block',
                            animation: 'hirePulse 2s ease-in-out infinite',
                            flexShrink: 0,
                          }}
                        />
                        Work with Me
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        @keyframes hirePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes shine {
          0% { transform: translateX(-60px) rotate(20deg); opacity: 0; }
          30% { opacity: 1; }
          60%, 100% { transform: translateX(100px) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}

export default HireMeButton;