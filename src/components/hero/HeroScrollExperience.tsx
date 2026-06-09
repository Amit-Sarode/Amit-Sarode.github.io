import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import profileImg from '/assets/img/profileImg.png';
import Tilt3D from '../ThreeDTilt';

/* ─── Global Keyframes ─── */
const INJECTED_STYLES = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes pulseGreen {
    0%, 100% { box-shadow: 0 0 0 0 rgba(20,184,166,0.6); }
    50% { box-shadow: 0 0 0 6px rgba(20,184,166,0); }
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('hero-keyframes')) {
  const el = document.createElement('style');
  el.id = 'hero-keyframes';
  el.textContent = INJECTED_STYLES;
  document.head.appendChild(el);
}

/* ─── Typewriter Hook (Safe & Leak-Free) ─── */
const useTypewriter = (texts: string[]) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const currentFull = texts[textIndex];

    if (phase === 'typing') {
      if (displayText === currentFull) {
        const t = setTimeout(() => setPhase('pausing'), 2200);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplayText(currentFull.substring(0, displayText.length + 1)),
        130
      );
      return () => clearTimeout(t);
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), 0);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayText === '') {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setPhase('typing');
        return;
      }
      const t = setTimeout(
        () => setDisplayText(currentFull.substring(0, displayText.length - 1)),
        45
      );
      return () => clearTimeout(t);
    }
  }, [displayText, phase, textIndex, texts]);

  return displayText;
};

/* ─── Word-level translation map ─── */
const NAME_WORDS = [
  { en: 'Amit', jp: 'アミット' },
  { en: 'Sarode', jp: 'サローデ' },
];

/* ─── Cinematic Animated Word Component ─── */
const TranslatingWord: React.FC<{
  en: string;
  jp: string;
  reducedMotion: boolean;
}> = ({ en, jp, reducedMotion }) => {
  const [hovered, setHovered] = useState(false);
  const fixedWidth = Math.max(en.length , jp.length);

  // Helper to render staggered characters
  const renderStaggered = (text: string, colors: string, isJp: boolean) => {
    if (reducedMotion) {
      return (
        <motion.span
          key={isJp ? 'jp' : 'en'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: colors,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}
        >
          {text}
        </motion.span>
      );
    }

    return (
      <motion.span
        key={isJp ? 'jp-stagger' : 'en-stagger'}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          visible: { transition: { staggerChildren: 0.04 } },
          exit: { transition: { staggerChildren: 0.02 } },
        }}
        style={{ display: 'inline-flex', ...(isJp ? { fontSize: '0.72em' } : {letterSpacing: '0.05em',}) }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, filter: 'blur(8px)', y: isJp ? -8 : 8 },
              visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
              exit: { opacity: 0, filter: 'blur(8px)', y: isJp ? 8 : -8 },
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              
              background: colors,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'default',
        minWidth: `${fixedWidth}ch`,
        textAlign: 'center',
        
      }}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {hovered
          ? renderStaggered(
              jp,
              'linear-gradient(135deg, #5eead4 0%, #14b8a6 60%, #0d9488 100%)',
              true
            )
          : renderStaggered(
              en,
              'linear-gradient(135deg, #ffffff 20%, #94a3b8 80%, #475569 100%)',
              false
            )}
      </AnimatePresence>
    </motion.span>
  );
};

/* ─── Main Component ─── */
const HeroScrollExperience: React.FC = () => {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);

  const displayText = useTypewriter([
    'React Native Developer',
    'Building LLM-Powered Workflows',
    'ChatGPT & AI Integrations',
    'Process Automation Specialist',
  ]);

  const cinematicEase = [0.16, 1, 0.3, 1];

  return (
    <motion.section
      aria-label="Hero section"
      style={{
        opacity: heroOpacity,
        y: prefersReduced ? 0 : heroY,
        scale: prefersReduced ? 1 : heroScale,
        willChange: 'opacity, transform',
      }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10"
    >
      {/* Dream Glow Background */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.3) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '-120px',
            willChange: 'opacity, transform',
            
          }}
        />
      )}

      {/* 3D Floating Avatar with Inner/Outer Glow */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      >
        <Tilt3D>
          <motion.div
            initial={{ scale: 0.85, opacity: 0, filter: prefersReduced ? 'none' : 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: cinematicEase }}
            style={{
              padding: 3,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14b8a6, #0e7490, #14b8a6)',
              boxShadow: '0 0 40px rgba(20,184,166,0.4), inset 0 0 20px rgba(20,184,166,0.8)',
            }}
          >
            <img
              className="rounded-full object-cover relative z-10"
              style={{
                display: 'block',
                background: '#0f172a',
                width: 'clamp(120px, 30vw, 176px)',
                height: 'clamp(120px, 30vw, 176px)',
              }}
              src={profileImg}
              alt="Amit Sarode — profile photo"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </Tilt3D>
      </motion.div>

      {/* Cinematic Headline */}
      <motion.h1
        initial={{ y: 30, opacity: 0, filter: prefersReduced ? 'none' : 'blur(15px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.15, duration: 1.4, ease: cinematicEase }}
        aria-label="Amit Sarode"
        className="mt-6 font-bold tracking-tighter"
        style={{
          fontSize: 'clamp(3rem, 9vw, 6rem)',
          lineHeight: 1.05,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
         
          textShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {NAME_WORDS.map(({ en, jp }) => (
          <span key={en} aria-hidden="true">
            <TranslatingWord en={en} jp={jp} reducedMotion={prefersReduced} />
          </span>
        ))}
      </motion.h1>

      {/* Cinematic Typewriter */}
      <motion.div
        initial={{ opacity: 0, filter: prefersReduced ? 'none' : 'blur(5px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.6, duration: 1, ease: cinematicEase }}
        className="mt-4 font-mono flex items-center justify-center"
        aria-live="polite"
        aria-atomic="true"
        style={{
          fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
          color: '#14b8a6',
          minHeight: '2.5rem',
          textShadow: '0 0 20px rgba(20,184,166,0.3)',
        }}
      >
        <span>{displayText}</span>
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 3,
            height: '1.2em',
            background: '#5eead4',
            marginLeft: 6,
            borderRadius: 2,
            boxShadow: '0 0 8px #5eead4',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </motion.div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.8, ease: cinematicEase }}
        role="status"
        className="flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full"
        style={{
          background: 'rgba(20,184,166,0.06)',
          border: '1px solid rgba(20,184,166,0.22)',
          backdropFilter: 'blur(10px)',
          fontSize: 13,
          color: '#5eead4',
          letterSpacing: '0.05em',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#14b8a6',
            boxShadow: '0 0 12px #14b8a6',
            display: 'inline-block',
            animation: prefersReduced ? 'none' : 'pulseGreen 2s ease-in-out infinite',
          }}
        />
        Open for New Projects · Nagpur · Remote worldwide
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: cinematicEase }}
        className="flex gap-5 mt-10 flex-wrap justify-center"
      >
        <motion.button
          whileHover={prefersReduced ? {} : { scale: 1.05 }}
          whileTap={prefersReduced ? {} : { scale: 0.96 }}
          onClick={() => navigate('/contact')}
          aria-label="Contact Amit to automate your business"
          style={{
            position: 'relative',
            padding: '16px 40px',
            borderRadius: 50,
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            letterSpacing: '0.03em',
            boxShadow: '0 10px 30px rgba(20,184,166,0.3)',
            overflow: 'hidden',
          }}
        >
          {/* Internal Shimmer Sweep */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                transform: 'skewX(-20deg)',
                willChange: 'transform',
              }}
            />
          )}
          <span style={{ position: 'relative', zIndex: 1 }}>Automate Your Business →</span>
        </motion.button>

        <motion.button
          whileHover={prefersReduced ? {} : { scale: 1.04, background: 'rgba(255,255,255,0.05)' }}
          whileTap={prefersReduced ? {} : { scale: 0.96 }}
          onClick={() => {
            const el = document.getElementById('industries');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              navigate('/', { state: { scrollTo: 'industries' } });
            }
          }}
          aria-label="View my recent projects and results"
          style={{
            padding: '16px 40px',
            borderRadius: 50,
            background: 'rgba(0,0,0,0.18)',
            backdropFilter: 'blur(10px)',
            color: '#e2e8f0',
            fontWeight: 600,
            fontSize: 15,
            border: '1px solid rgba(148,163,184,0.2)',
            cursor: 'pointer',
            letterSpacing: '0.03em',
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          View My Work
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default HeroScrollExperience;