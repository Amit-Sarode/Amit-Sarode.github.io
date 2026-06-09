import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from './SEO';

type ErrorPageProps = {
  code: number;
  title?: string;
  message?: string;
};

const errorConfig: Record<number, { emoji: string; title: string; message: string }> = {
  404: {
    emoji: '🔍',
    title: 'Page Not Found',
    message: 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back on track.',
  },
  500: {
    emoji: '⚡',
    title: 'Server Error',
    message: 'Something went wrong on our end. Please try again in a moment.',
  },
  502: {
    emoji: '🌐',
    title: 'Bad Gateway',
    message: 'The server encountered a temporary issue connecting to upstream services. Please refresh.',
  },
};

const ErrorIllustration: React.FC<{ code: number }> = ({ code }) => {
  const is404 = code === 404;
  const is500 = code === 500;
  const accent = '#14b8a6';
  const accentLight = '#5eead4';
  const muted = '#475569';

  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {is404 && (
        <>
          {/* Document body */}
          <motion.rect
            x="60" y="30" width="80" height="100" rx="8"
            stroke={accent} strokeWidth="1.5" fill="url(#glow)"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Document lines */}
          <motion.line x1="78" y1="52" x2="122" y2="52" stroke={muted} strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
          <motion.line x1="78" y1="64" x2="110" y2="64" stroke={muted} strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
          <motion.line x1="78" y1="76" x2="118" y2="76" stroke={muted} strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
          <motion.line x1="78" y1="88" x2="105" y2="88" stroke={muted} strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
          {/* Question mark on document */}
          <motion.text x="100" y="115" textAnchor="middle" fill={accentLight} fontSize="22" fontWeight="700" fontFamily="monospace"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}>
            ?
          </motion.text>
          {/* Magnifying glass */}
          <motion.g
            initial={{ x: 20, y: -10, rotate: -15 }}
            animate={{ x: 0, y: 0, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 100 }}
          >
            <circle cx="110" cy="100" r="22" stroke={accentLight} strokeWidth="2.5" fill="none" opacity="0.6" />
            <line x1="127" y1="117" x2="140" y2="130" stroke={accentLight} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          </motion.g>
          {/* Floating dots */}
          <motion.circle cx="40" cy="45" r="3" fill={accent} opacity="0.4"
            animate={{ y: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.circle cx="160" cy="55" r="2.5" fill={accentLight} opacity="0.3"
            animate={{ y: [6, -6, 6] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
          <motion.circle cx="155" cy="120" r="2" fill={accent} opacity="0.25"
            animate={{ y: [-4, 4, -4] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        </>
      )}

      {code === 500 && (
        <>
          {/* Server/gear illustration */}
          <motion.rect x="55" y="40" width="90" height="80" rx="10" stroke={accent} strokeWidth="1.5" fill="url(#glow)"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} />
          <motion.rect x="70" y="55" width="60" height="8" rx="4" fill={accent} opacity="0.3"
            animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.rect x="70" y="72" width="60" height="8" rx="4" fill={accent} opacity="0.3"
            animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          <motion.rect x="70" y="89" width="60" height="8" rx="4" fill={accent} opacity="0.3"
            animate={{ opacity: [0.25, 0.65, 0.25] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          {/* Blinking red dot */}
          <motion.circle cx="130" cy="50" r="4" fill="#ef4444"
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          {/* Wrench */}
          <motion.g
            initial={{ rotate: -20, x: 10 }}
            animate={{ rotate: 0, x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <line x1="140" y1="105" x2="155" y2="120" stroke={accentLight} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M152 117l8 8" stroke={accentLight} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </motion.g>
        </>
      )}

      {code === 502 && (
        <>
          {/* Network/globe illustration */}
          <motion.circle cx="100" cy="75" r="35" stroke={accent} strokeWidth="1.5" fill="url(#glow)"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, type: 'spring' }} />
          {/* Globe lines */}
          <motion.ellipse cx="100" cy="75" rx="20" ry="35" stroke={muted} strokeWidth="1" fill="none" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.7 }} />
          <motion.line x1="65" y1="75" x2="135" y2="75" stroke={muted} strokeWidth="1" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
          {/* Connection nodes */}
          <motion.circle cx="100" cy="35" r="4" fill={accent}
            animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="145" cy="75" r="4" fill={accent}
            animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          <motion.circle cx="55" cy="75" r="4" fill={accent}
            animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          {/* Arcing connection lines */}
          <motion.path d="M100 39 Q125 55 141 75" stroke={accentLight} strokeWidth="1.5" fill="none" opacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.6 }} />
          <motion.path d="M59 75 Q80 55 100 39" stroke={accentLight} strokeWidth="1.5" fill="none" opacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
          {/* Broken link icon */}
          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <line x1="110" y1="100" x2="120" y2="110" stroke={accentLight} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <line x1="120" y1="100" x2="110" y2="110" stroke={accentLight} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </motion.g>
        </>
      )}
    </svg>
  );
};

const ErrorPage: React.FC<ErrorPageProps> = ({ code, title, message }) => {
  const navigate = useNavigate();

  const config = errorConfig[code] || errorConfig[500];
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f1f5f9',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SEO
        title={`${code} | ${displayTitle} | Amit Sarode`}
        description={displayMessage}
        path={`/${code}`}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: '40px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}
        >
          <ErrorIllustration code={code} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 20px',
              borderRadius: 50,
              border: '1px solid rgba(20,184,166,0.2)',
              background: 'rgba(20,184,166,0.06)',
              marginBottom: 20,
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#14b8a6',
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#14b8a6', display: 'inline-block' }} />
            ERROR {code}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 800,
            background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {displayTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: 15,
            color: '#94a3b8',
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 420,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {displayMessage}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(20,184,166,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            style={{
              padding: '14px 32px',
              borderRadius: 50,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'box-shadow 0.3s',
            }}
          >
            ← Back Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            style={{
              padding: '14px 28px',
              borderRadius: 50,
              background: 'transparent',
              border: '1px solid rgba(20,184,166,0.3)',
              color: '#14b8a6',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'all 0.3s',
            }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
