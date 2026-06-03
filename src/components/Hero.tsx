import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from './SEO';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import HeroScrollExperience from './hero/HeroScrollExperience';
import SkillCard from './hero/SkillCard';
import { Reveal, Divider } from './hero/Reveal';
import {
  skills, clients, testimonials,
  caseStudies, processSteps, stats, businesses, type BusinessCategory,
} from './hero/data';

// ─── Industry Card with Glow ──────────────────────────
const IndustryCard: React.FC<{ biz: BusinessCategory; index: number; onNavigate: (id: number) => void }> = ({ biz, index, onNavigate }) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
        {/* Cursor-following glow */}
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

        {/* Top gradient bar on hover */}
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

        {/* Corner glow blob */}
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
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: hovered ? '#f1f5f9' : '#e2e8f0',
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
                style={{ fontSize: 13, color: '#94a3b8', margin: 0, lineHeight: 1.6, overflow: 'hidden' }}
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
              fontSize: 10, color: hovered ? '#94a3b8' : '#475569',
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
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `${color}40` : 'rgba(255,255,255,0.06)'}`,
        transition: 'background 0.4s, border-color 0.4s',
        ...style,
      }}
    >
      {/* Cursor glow */}
      <div style={{
        position: 'absolute', left: mouse.x, top: mouse.y,
        width: 220, height: 220, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />
      {/* Corner glow blob */}
      <div style={{
        position: 'absolute', top: -25, right: -25,
        width: 100, height: 100, borderRadius: '50%',
        background: color, filter: 'blur(35px)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 0.12 : 0, transition: 'opacity 0.5s',
      }} />
      {/* Top gradient bar */}
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

  return (
    <div
      className="overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        minHeight: '100vh',
        color: '#e2e8f0',
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

      {/* ── HOW I WORK ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '112px 24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em' }}>PROCESS</span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.1 }}>How I Work</h2>
            <p style={{ color: '#64748b', fontSize: 14, fontWeight: 300, marginBottom: 56, maxWidth: 480, lineHeight: 1.75 }}>
              A proven 3-step process to turn your business challenges into automated solutions.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {processSteps.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard color={item.color} style={{ padding: 0 }}>
                  <div style={{ padding: '32px 28px' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 11, color: item.color, letterSpacing: '0.1em', marginBottom: 16, opacity: 0.7 }}>STEP {item.step}</div>
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#f1f5f9', margin: '0 0 10px' }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="relative z-10 py-28 max-w-6xl mx-auto px-6">
        <Divider />
        <Reveal delay={0.1} className="mt-16">
          <div className="flex items-center gap-3 mb-2">
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>02 / STORY</span>
          </div>
          <h2 className="font-bold mb-10" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(120deg, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>The Journey</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <Reveal delay={0.15}>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.85, color: '#94a3b8' }}>
              From a Non Technical background to founding an <span style={{ color: '#5eead4', fontWeight: 600 }}>AI Automation Agency</span>. My journey
              is defined by turning complex AI capabilities into practical business solutions — building production-grade automation systems that save companies time, money, and human effort.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ padding: 28, borderRadius: 20, background: 'rgba(20,184,166,0.04)', border: '1px solid rgba(20,184,166,0.15)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(20,184,166,0.15)', filter: 'blur(30px)', pointerEvents: 'none' }} />
              <span style={{ fontSize: 30, color: '#14b8a6', lineHeight: 1, display: 'block', marginBottom: 12 }}>"</span>
              <p style={{ fontStyle: 'italic', color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
                I don't just build software; I design intelligent systems that automate repetitive work — freeing businesses to focus on what actually matters.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>03 / CLIENTS</span>
            </div>
            <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(120deg, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Trusted By</h2>
            <p style={{ color: '#334155', fontSize: 14, marginBottom: 48, fontFamily: 'monospace' }}>Businesses I've automated and scaled</p>
          </Reveal>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to right, #020d0a, transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to left, #020d0a, transparent)', pointerEvents: 'none' }} />
            <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: 16, width: 'max-content', willChange: 'transform' }}>
              {[...clients, ...clients].map((client, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 50, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap', flexShrink: 0, transition: 'border-color 0.3s, background 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(20,184,166,0.25)'; e.currentTarget.style.background = 'rgba(20,184,166,0.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  <span style={{ fontSize: 20 }}>{client.emoji}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', margin: 0 }}>{client.name}</p>
                    <p style={{ fontSize: 11, color: '#334155', margin: 0, fontFamily: 'monospace' }}>{client.type}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <Reveal delay={0.2} className="mt-16">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
              {stats.map((s, i) => (
                <GlowCard key={i} color="#14b8a6" hoverY={-4} style={{ padding: 0, textAlign: 'center' }}>
                  <div style={{ padding: '20px 16px' }}>
                    <p style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: '#14b8a6', margin: '0 0 4px', fontFamily: 'monospace' }}>{s.value}</p>
                    <p style={{ fontSize: 12, color: '#475569', margin: 0 }}>{s.label}</p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em' }}>INDUSTRIES</span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.1 }}>Industries I Serve</h2>
            <p style={{ color: '#64748b', fontSize: 14, fontWeight: 300, marginBottom: 48, maxWidth: 520, lineHeight: 1.75 }}>
              Deep domain expertise across multiple verticals. Each industry has unique workflows — I build automation that fits.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {businesses.map((biz, i) => (
              <IndustryCard key={biz.id} biz={biz} index={i} onNavigate={(id) => navigate(`/projects/${id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>04 / TESTIMONIALS</span>
            </div>
            <h2 className="font-bold mb-16" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(120deg, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>What Clients Say</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div whileHover={{ y: -4 }} style={{ padding: '36px 40px', borderRadius: 24, background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.18)', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(20,184,166,0.12)', filter: 'blur(40px)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[...Array(5)].map((_, i) => (<span key={i} style={{ color: '#14b8a6', fontSize: 16 }}>★</span>))}
              </div>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#cbd5e1', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 28, position: 'relative' }}>
                "Amit delivered our HRMS portal ahead of schedule and the quality exceeded our expectations. His understanding of complex business logic, clean code, and attention to UI detail is rare for a developer his age. He's been a key contributor to our product team at Atum IT."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', margin: '0 0 2px' }}>Atum IT Pvt. Ltd.</p>
                  <p style={{ fontSize: 12, color: '#475569', margin: 0, fontFamily: 'monospace' }}>Technology Company · Nagpur, India</p>
                </div>
                <div style={{ marginLeft: 'auto', padding: '5px 14px', borderRadius: 20, background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', fontSize: 11, color: '#5eead4', fontFamily: 'monospace' }}>Employer</div>
              </div>
            </motion.div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard color={t.color} style={{ padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {[...Array(t.stars)].map((_, s) => (<span key={s} style={{ color: '#f59e0b', fontSize: 13 }}>★</span>))}
                    </div>
                    <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.75, margin: 0, fontStyle: 'italic', flex: 1 }}>"{t.text}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`, border: `1px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: t.color }}>{t.initials}</div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', margin: '0 0 2px' }}>{t.name}</p>
                        <p style={{ fontSize: 11, color: '#334155', margin: 0, fontFamily: 'monospace' }}>{t.role}</p>
                      </div>
                      {t.source && (
                        <div style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 10, color: '#334155', fontFamily: 'monospace' }}>{t.source}</div>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em' }}>RESULTS</span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.1 }}>Case Studies</h2>
            <p style={{ color: '#64748b', fontSize: 14, fontWeight: 300, marginBottom: 48, maxWidth: 520, lineHeight: 1.75 }}>Real projects, real impact. Here's what automation looks like in practice.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard color={cs.color} style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '4px 12px', borderRadius: 20, background: `${cs.color}15`, border: `1px solid ${cs.color}30`, marginBottom: 16 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: cs.color }}>↗ {cs.result}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: '#f1f5f9', margin: '0 0 4px', lineHeight: 1.3 }}>{cs.title}</h3>
                    <p style={{ fontSize: 12, color: '#475569', margin: '0 0 12px', fontFamily: 'monospace' }}>{cs.client}</p>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, margin: '0 0 16px', flex: 1 }}>{cs.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {cs.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 10, letterSpacing: '0.05em', padding: '2px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)' }}>{tag}</span>
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
