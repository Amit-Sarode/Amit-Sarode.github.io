import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import profileImg from '/assets/img/profileImg.png';
import Tilt3D from '../ThreeDTilt';

/* ─── Typewriter hook ─── */
const useTypewriter = (texts: string[]) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 45 : 130);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  return displayText;
};

const HeroScrollExperience: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  const displayText = useTypewriter([
    'React Native Developer',
    'Building LLM-Powered Workflows',
    'ChatGPT & AI Integrations',
    'Process Automation Specialist',
  ]);

  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10"
    >
      {/* Glowing ring behind avatar */}
      <div
        style={{
          position: 'absolute',
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <Tilt3D>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            padding: 3,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #14b8a6, #0e7490, #14b8a6)',
            boxShadow: '0 0 40px rgba(20,184,166,0.4), 0 0 80px rgba(20,184,166,0.15)',
          }}
        >
          <img
            className="rounded-full object-cover"
            style={{ display: 'block', background: '#0f172a', width: 'clamp(120px, 30vw, 176px)', height: 'clamp(120px, 30vw, 176px)' }}
            src={profileImg}
            alt="Amit Sarode"
            loading="lazy"
          />
        </motion.div>
      </Tilt3D>

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full"
        style={{
          background: 'rgba(20,184,166,0.08)',
          border: '1px solid rgba(20,184,166,0.25)',
          fontSize: 13,
          color: '#5eead4',
          letterSpacing: '0.05em',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#14b8a6',
            boxShadow: '0 0 8px #14b8a6',
            display: 'inline-block',
          }}
        />
       Open for New Projects · Nagpur · Remote worldwide
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-6 font-bold tracking-tighter"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
          lineHeight: 1.05,
          background: 'linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Amit Sarode
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 font-mono"
        style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: '#14b8a6', minHeight: '2.2rem' }}
      >
        <span>{displayText}</span>
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: '1.1em',
            background: '#14b8a6',
            marginLeft: 3,
            verticalAlign: 'middle',
            borderRadius: 1,
            animation: 'blink 1s step-end infinite',
          }}
        />
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex gap-4 mt-10 flex-wrap justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(20,184,166,0.5)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/contact')}
          style={{
            padding: '14px 36px',
            borderRadius: 50,
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.03em',
            transition: 'box-shadow 0.3s',
          }}
        >
          Automate Your Business →
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { navigate('/'); setTimeout(() => window.scrollTo({ top: document.body.scrollHeight * 0.65, behavior: 'smooth' }), 100); }}
          style={{
            padding: '14px 36px',
            borderRadius: 50,
            background: 'transparent',
            color: '#94a3b8',
            fontWeight: 600,
            fontSize: 15,
            border: '1px solid rgba(148,163,184,0.2)',
            cursor: 'pointer',
            letterSpacing: '0.03em',
          }}
        >
          See Results
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default HeroScrollExperience;
