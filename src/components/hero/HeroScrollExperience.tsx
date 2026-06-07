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
  const [isNameHovered, setIsNameHovered] = useState(false);
  const navigate = useNavigate();
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

  // Premium cubic-bezier easing for cinematic entrances
  const cinematicEase = [0.16, 1, 0.3, 1];

  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10"
    >
      {/* Cinematic Breathing Glow behind avatar */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.4, 0.7, 0.4] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
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
          marginTop: '-120px' // offset to align behind avatar
        }}
      />

      {/* Floating Avatar Container */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Tilt3D>
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
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
              className="rounded-full object-cover"
              style={{ display: 'block', background: '#0f172a', width: 'clamp(120px, 30vw, 176px)', height: 'clamp(120px, 30vw, 176px)' }}
              src={profileImg}
              alt="Amit Sarode"
              loading="lazy"
            />
          </motion.div>
        </Tilt3D>
      </motion.div>

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: cinematicEase }}
        className="flex items-center gap-2 mt-8 px-4 py-1.5 rounded-full"
        style={{
          background: 'rgba(20,184,166,0.05)',
          border: '1px solid rgba(20,184,166,0.25)',
          backdropFilter: 'blur(10px)',
          fontSize: 13,
          color: '#5eead4',
          letterSpacing: '0.05em',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#14b8a6',
            boxShadow: '0 0 12px #14b8a6',
            display: 'inline-block',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
       Open for New Projects · Nagpur · Remote worldwide
      </motion.div>

      {/* Cinematic Text Reveal */}
  <motion.h1
        initial={{ y: 40, opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
        animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.1, duration: 1.4, ease: cinematicEase }}
        onMouseEnter={() => setIsNameHovered(true)}
        onMouseLeave={() => setIsNameHovered(false)}
        className="mt-6 font-bold tracking-tighter"
        style={{
          fontSize: 'clamp(3rem, 9vw, 6rem)',
          lineHeight: 1.05,
          cursor: 'default',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          textShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {isNameHovered
          ? 'アミット・サローデ'.split('').map((char, i) => (
              <motion.span
                key={`jp-${i}`}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 20%, #94a3b8 80%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                }}
              >
                {char}
              </motion.span>
            ))
          : 'Amit Sarode'.split('').map((char, i) => (
              <motion.span
                key={`en-${i}`}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 20%, #94a3b8 80%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
      </motion.h1>

      
      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.6, duration: 1, ease: cinematicEase }}
        className="mt-4 font-mono flex items-center justify-center"
        style={{ 
          fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)', 
          color: '#14b8a6', 
          minHeight: '2.5rem',
          textShadow: '0 0 20px rgba(20,184,166,0.3)'
        }}
      >
        <span>{displayText}</span>
        <span
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

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: cinematicEase }}
        className="flex gap-5 mt-12 flex-wrap justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/contact')}
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
          {/* Internal Button Shimmer Effect */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: 'skewX(-20deg)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>Automate Your Business →</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { navigate('/'); setTimeout(() => window.scrollTo({ top: document.body.scrollHeight * 0.65, behavior: 'smooth' }), 100); }}
          style={{
            padding: '16px 40px',
            borderRadius: 50,
            background: 'rgba(0,0,0,0.2)',
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
          See Results
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default HeroScrollExperience;