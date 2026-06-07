import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import SEO from './SEO';
import TextReveal from './TextReveal';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import HeroScrollExperience from './hero/HeroScrollExperience';
import SkillCard from './hero/SkillCard';
import { Reveal, Divider } from './hero/Reveal';
import {
  clients, testimonials,
  caseStudies, processSteps, stats, businesses, type BusinessCategory,
} from './hero/data';

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// ─── Industry Card with Glow ──────────────────────────
const IndustryCard: React.FC<{ biz: BusinessCategory; index: number; onNavigate: (id: number) => void }> = ({ biz, index, onNavigate }) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <Reveal delay={index * 0.05}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ y: -8 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => onNavigate(biz.id)}
        style={{
          position: 'relative', width: '100%', minHeight: 200,
          borderRadius: 18, cursor: 'pointer', overflow: 'hidden',
          background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? `${biz.color}50` : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered
            ? `0 25px 70px rgba(0,0,0,0.5), 0 0 40px ${biz.color}20, inset 0 1px 0 ${biz.color}15`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
          display: 'flex', flexDirection: 'column', padding: 28, justifyContent: 'space-between',
        }}
        role="button"
        tabIndex={0}
        aria-label={`Learn more about ${biz.title}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(biz.id); } }}
      >
        <div style={{
          position: 'absolute',
          left: mouse.x, top: mouse.y,
          width: 250, height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${biz.color}18 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }} />

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${biz.color}, transparent)`,
            transformOrigin: 'center',
            zIndex: 1,
          }}
        />

        <motion.div
          animate={{ opacity: hovered ? 0.15 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', top: -30, right: -30,
            width: 120, height: 120, borderRadius: '50%',
            background: biz.color, filter: 'blur(40px)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          <motion.span
            animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ fontSize: 40, lineHeight: 1, display: 'block', width: 'fit-content' }}
          >
            {biz.icon}
          </motion.span>
          <h4 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: hovered ? '#ffffff' : '#f8fafc',
            margin: 0, lineHeight: 1.3, transition: 'color 0.3s',
          }}>
            {biz.title}
          </h4>
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 13, color: '#cbd5e1', margin: 0, lineHeight: 1.6, overflow: 'hidden' }}
              >
                {biz.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0.4, x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative', zIndex: 1, marginTop: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={hovered ? biz.color : '#14b8a6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'stroke 0.3s' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          {biz.link && (
            <span style={{
              fontSize: 10, color: hovered ? '#cbd5e1' : '#94a3b8',
              fontFamily: 'monospace', letterSpacing: '0.06em', transition: 'color 0.3s',
            }}>
              Has live site ↗
            </span>
          )}
        </motion.div>
      </motion.div>
    </Reveal>
  );
};

// ─── Glow Card (reusable) ────────────────────────────
const GlowCard: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  hoverY?: number;
}> = ({ children, color = '#14b8a6', className, style, hoverY = -6 }) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      whileHover={{ y: hoverY }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `${color}50` : 'rgba(255,255,255,0.08)'}`,
        transition: 'background 0.4s, border-color 0.4s',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', left: mouse.x, top: mouse.y,
        width: 220, height: 220, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />
      <div style={{
        position: 'absolute', top: -25, right: -25,
        width: 100, height: 100, borderRadius: '50%',
        background: color, filter: 'blur(35px)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 0.15 : 0, transition: 'opacity 0.5s',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
        zIndex: 1,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // ─── Carousel State ───
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  }, []);

  const currentTestimonial = testimonials[current];

  useEffect(() => {
    if (testimonials.length === 0) return;

    if (!autoPlay) {
      const timer = setTimeout(() => setAutoPlay(true), 8000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  return (
    <div
      className="overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        minHeight: '100vh',
        color: '#f8fafc',
        position: 'relative',
      }}
    >
      <SEO
        title="Amit Sarode | AI Automation Agency | ChatGPT & LLM Integrations"
        description="AI automation agency founder building intelligent workflows, chatbots, and LLM-powered systems. Automate your business with production-grade AI solutions."
        path="/"
      />

      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      {/* ── CINEMATIC HERO ── */}
      <HeroScrollExperience />

      <Divider />
      {/* ── HOW I WORK ── */}
      
      <section style={{ position: 'relative', zIndex: 10, padding: '112px 24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                 <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
                <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>PROCESS</span>
                  <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
              </div>
              <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', background: 'linear-gradient(120deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.2 }}>
       
                <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-bold mb-2"
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2
              }}
            >
            How I Work
            </motion.h2>
    
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 300, maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
                A proven 3-step process to turn your business challenges into automated solutions.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {processSteps.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard color={item.color} style={{ padding: 0 }}>
                  <div style={{ padding: '32px 28px' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 12, color: item.color, letterSpacing: '0.1em', marginBottom: 16, opacity: 0.9 }}>STEP {item.step}</div>
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#ffffff', margin: '0 0 10px' }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
<Divider />
      {/* ── JOURNEY ── */}
      <section className="relative z-10 py-28 max-w-6xl mx-auto px-6">
        <Reveal delay={0.1} className="mt-16">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
                 <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>STORY</span>
                <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
            </div>
            <h2 className="font-bold mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', background: 'linear-gradient(120deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.2 }}>
         
                <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-bold mb-2"
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2
              }}
            >
        The Journey
            </motion.h2>
          
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <Reveal delay={0.15}>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.85, color: '#cbd5e1' }}>
              From a Non Technical background to founding an <span style={{ color: '#5eead4', fontWeight: 600 }}>AI Automation Agency</span>. My journey
              is defined by turning complex AI capabilities into practical business solutions — building production-grade automation systems that save companies time, money, and human effort.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ padding: 28, borderRadius: 20, background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(20,184,166,0.2)', filter: 'blur(30px)', pointerEvents: 'none' }} />
              <span style={{ fontSize: 30, color: '#14b8a6', lineHeight: 1, display: 'block', marginBottom: 12 }}>"</span>
              <p style={{ fontStyle: 'italic', color: '#f8fafc', lineHeight: 1.7, fontSize: 16 }}>
                I don't just build software; I design intelligent systems that automate repetitive work — freeing businesses to focus on what actually matters.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
<Divider />
      {/* ── CLIENTS ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                   <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
                <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>CLIENTS</span>
                  <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
              </div>
              <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', background: 'linear-gradient(120deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.2 }}>
               <Reveal>
                <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-bold mb-2"
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2
              }}
            >
         Trusted By
            </motion.h2>
            </Reveal>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 15, fontFamily: 'monospace', margin: '0 auto' }}>Businesses I've automated and scaled</p>
            </div>
          </Reveal>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to right, #020d0a, transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to left, #020d0a, transparent)', pointerEvents: 'none' }} />
            <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: 16, width: 'max-content', ...(isMobile ? {} : { willChange: 'transform' }) }}>
              {[...clients, ...clients].map((client, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 50, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap', flexShrink: 0, transition: 'border-color 0.3s, background 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(20,184,166,0.3)'; e.currentTarget.style.background = 'rgba(20,184,166,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                  <span style={{ fontSize: 20 }}>{client.emoji}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', margin: 0 }}>{client.name}</p>
                    <p style={{ fontSize: 12, color: '#cbd5e1', margin: 0, fontFamily: 'monospace' }}>{client.type}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <Reveal delay={0.2} className="mt-16">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
              {stats.map((s, i) => {
                const numVal = parseInt(s.value);
                const suffix = s.value.replace(/[\d]/g, '');
                const actualNum = numVal || 0;
                return (
                  <GlowCard key={i} color="#14b8a6" hoverY={-4} style={{ padding: 0, textAlign: 'center' }}>
                    <div style={{ padding: '20px 16px' }}>
                      <p style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: '#14b8a6', margin: '0 0 4px', fontFamily: 'monospace' }}>
                        <AnimatedCounter value={actualNum} suffix={suffix} duration={2} />{!actualNum && s.value}
                      </p>
                      <p style={{ fontSize: 13, color: '#cbd5e1', margin: 0 }}>{s.label}</p>
                    </div>
                  </GlowCard>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
      <Divider />

      {/* ── INDUSTRIES ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
                <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>INDUSTRIES</span>
                 <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
              </div>
              <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', background: 'linear-gradient(120deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.2 }}>
                <Reveal>
                <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-bold mb-2"
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2
              }}
            >
           Industries I Serve
            </motion.h2>
            </Reveal>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 300, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
                Deep domain expertise across multiple verticals. Each industry has unique workflows — I build automation that fits.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {businesses.map((biz, i) => (
              <IndustryCard key={biz.id} biz={biz} index={i} onNavigate={(id) => navigate(`/projects/${id}`)} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── TESTIMONIALS (DRAG-TO-SWIPE) ── */}
      <section 
        className="relative z-10 py-32 px-6 overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(20,184,166,0.03) 0%, transparent 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                CLIENT SUCCESS
              </span>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
            </div>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-bold mb-2"
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2
              }}
            >
              What Clients Say
            </motion.h2>
          </motion.div>
   
          {/* Main Carousel Container */}
          {testimonials.length > 0 && (
            <div style={{ position: 'relative', width: '100%', maxWidth: 850, margin: '0 auto' }}>
              
              <div style={{ display: 'grid', gridTemplateAreas: '"stack"' }}>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 220, damping: 25, mass: 1 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset }) => {
                      const swipeThreshold = 50;
                      if (offset.x < -swipeThreshold) {
                        paginate(1);
                      } else if (offset.x > swipeThreshold) {
                        paginate(-1);
                      }
                    }}
                    style={{
                      gridArea: 'stack',
                      width: '100%',
                      padding: isMobile ? '36px 24px' : '56px 64px',
                      borderRadius: 32,
                      background: 'rgba(20,184,166,0.06)',
                      border: '1px solid rgba(20,184,166,0.2)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                      position: 'relative',
                      overflow: 'hidden',
                      touchAction: 'pan-y', 
                      cursor: 'grab'
                    }}
                    whileTap={{ cursor: 'grabbing' }}
                  >
                    <div style={{
                      position: 'absolute', top: -50, right: -50, width: 250, height: 250,
                      borderRadius: '50%', background: `radial-gradient(circle, ${currentTestimonial?.color}30 0%, transparent 70%)`,
                      filter: 'blur(40px)', pointerEvents: 'none'
                    }} />

                    <span style={{ 
                      position: 'absolute', top: 20, left: 30, fontSize: 120, lineHeight: 1, 
                      color: 'rgba(255,255,255,0.05)', fontFamily: 'serif', pointerEvents: 'none' 
                    }}>
                      "
                    </span>
       
                    <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'flex', gap: 4, marginBottom: 24 }}
                      >
                        {[...Array(currentTestimonial?.stars || 5)].map((_, s) => (
                          <span key={s} style={{ color: '#f59e0b', fontSize: 18 }}>★</span>
                        ))}
                      </motion.div>
         
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                          fontSize: 'clamp(1.15rem, 3vw, 1.5rem)',
                          color: '#ffffff',
                          lineHeight: 1.7,
                          fontWeight: 300,
                          marginBottom: 40,
                        }}
                      >
                        "{currentTestimonial?.text}"
                      </motion.p>
         
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                      >
                        <div style={{
                          width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                          background: `linear-gradient(135deg, ${currentTestimonial?.color}90, ${currentTestimonial?.color}40)`,
                          border: `2px solid ${currentTestimonial?.color}60`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 20, fontWeight: 700, color: '#fff',
                        }}>
                          {currentTestimonial?.initials}
                        </div>
                        <div>
                          <p style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>
                            {currentTestimonial?.name}
                          </p>
                          <p style={{ fontSize: 13, color: '#cbd5e1', margin: 0, fontFamily: 'monospace' }}>
                            {currentTestimonial?.role}
                          </p>
                        </div>
                        {currentTestimonial?.source && (
                          <div style={{
                            marginLeft: 'auto', padding: '6px 14px', borderRadius: 20,
                            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                            fontSize: 11, color: '#e2e8f0', fontFamily: 'monospace', letterSpacing: '0.05em'
                          }}>
                            {currentTestimonial?.source}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
     
              {/* Pagination Dots and Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40, gap: 32 }}>
                
                <motion.button
                  onClick={() => paginate(-1)}
                  whileHover={{ scale: 1.1, background: 'rgba(20,184,166,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(20,184,166,0.3)',
                    background: 'rgba(20,184,166,0.05)', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: '#14b8a6', fontSize: 24, transition: 'all 0.3s ease',
                  }}
                >
                  ←
                </motion.button>

                <div style={{ display: 'flex', gap: 10 }}>
                  {testimonials.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => { setCurrent(i); setAutoPlay(false); }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ 
                        width: i === current ? 32 : 10,
                        background: i === current ? '#14b8a6' : 'rgba(20,184,166,0.2)'
                      }}
                      style={{ height: 10, borderRadius: 5, border: 'none', cursor: 'pointer' }}
                    />
                  ))}
                </div>
     
                <motion.button
                  onClick={() => paginate(1)}
                  whileHover={{ scale: 1.1, background: 'rgba(20,184,166,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(20,184,166,0.3)',
                    background: 'rgba(20,184,166,0.05)', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: '#14b8a6', fontSize: 24, transition: 'all 0.3s ease',
                  }}
                >
                  →
                </motion.button>

              </div>
            </div>
          )}
        </div>
      </section>


      <Divider />

      {/* ── CASE STUDIES ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
                <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>RESULTS</span>
                  <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
              />
              </div>
              <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', background: 'linear-gradient(120deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.2 }}>
                <Reveal>
                <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-bold mb-2"
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2
              }}
            >
          Case Studies
            </motion.h2>
            </Reveal>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 300, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
                Real projects, real impact. Here's what automation looks like in practice.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard color={cs.color} style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '4px 12px', borderRadius: 20, background: `${cs.color}20`, border: `1px solid ${cs.color}40`, marginBottom: 16 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: cs.color }}>↗ {cs.result}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#ffffff', margin: '0 0 6px', lineHeight: 1.3 }}>{cs.title}</h3>
                    <p style={{ fontSize: 13, color: '#cbd5e1', margin: '0 0 12px', fontFamily: 'monospace' }}>{cs.client}</p>
                    <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 16px', flex: 1 }}>{cs.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {cs.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 11, letterSpacing: '0.05em', padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cursor blink keyframes */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes hirePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .group:hover .group-hover\\:translate-y-0 { transform: translateY(0) !important; }
        .group:hover .group-hover\\:opacity-100 { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default Hero;