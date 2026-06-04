import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SEO from './SEO';
import { businesses } from './hero/data';

const t = {
  bg: '#020d0a', bgAlt: '#050f10', bgDeep: '#02100d',
  surface: 'rgba(255,255,255,0.02)', cardBorder: 'rgba(255,255,255,0.06)',
  teal: '#14b8a6', tealDark: '#0d9488',
  heading: '#f1f5f9', body: '#e2e8f0', muted: '#94a3b8', mutedMid: '#64748b', mutedDark: '#475569',
};

const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
    <span style={{ width: 32, height: 2, background: t.teal, borderRadius: 2, display: 'inline-block' }} />
    <span style={{ color: t.teal, fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em' }}>{text}</span>
  </div>
);

// ─── Cursor Glow ──────────────────────────────────────
const CursorGlow: React.FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({ containerRef }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, [containerRef, x, y]);

  return (
    <motion.div style={{
      position: 'absolute', left: sx, top: sy,
      width: 400, height: 400, borderRadius: '50%',
      background: `radial-gradient(circle, ${t.teal}10 0%, transparent 70%)`,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
};

// ─── Hoverable Card Wrapper ───────────────────────────
const GlowCard: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = t.teal, style }) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      style={{
        position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        ...style,
      }}
    >
      {/* Cursor glow */}
      <div style={{
        position: 'absolute', left: mouse.x, top: mouse.y,
        width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: color, filter: 'blur(30px)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 0.12 : 0, transition: 'opacity 0.4s',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const biz = businesses.find((b) => b.id === Number(id));

  if (!biz) { navigate('/', { replace: true }); return null; }

  return (
    <div ref={sectionRef} style={{
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bgAlt} 40%, ${t.bgDeep} 100%)`,
      minHeight: '100vh', color: t.body, position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title={`${biz.title} | AI Automation Solutions | Amit Sarode`}
        description={biz.description}
        path={`/projects/${biz.id}`}
      />

      {/* Grid lines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(20,184,166,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.03) 1px,transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
      }} />

      {/* Ambient orbs */}
      <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'fixed', top: '8%', left: '5%', width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)`,
          filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
        }} />
      <motion.div animate={{ x: [0, -30, 25, 0], y: [0, 25, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'fixed', bottom: '8%', right: '8%', width: 450, height: 450, borderRadius: '50%',
          background: `radial-gradient(circle, ${biz.color}08 0%, transparent 70%)`,
          filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none',
        }} />

      <section style={{
        maxWidth: 800, margin: '0 auto',
        padding: 'clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)',
        position: 'relative', zIndex: 1,
      }}>
        <CursorGlow containerRef={sectionRef} />

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4, boxShadow: `0 0 20px ${t.teal}20` }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.cardBorder}`,
            color: t.mutedMid, fontSize: 13, cursor: 'pointer',
            marginBottom: 32, fontFamily: 'monospace', letterSpacing: '0.04em',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Industries
        </motion.button>

        {/* Hero Image + Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          whileHover={{ boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 50px ${biz.color}15` }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative', height: 320, borderRadius: 20, overflow: 'hidden',
            border: `1px solid ${biz.color}25`, marginBottom: 40, cursor: 'default',
          }}
        >
          <img src={biz.image} alt={biz.title} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)', transition: 'transform 0.6s' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${t.bg} 0%, transparent 50%)` }} />
          {/* Glow accent on image */}
          <div style={{
            position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
            background: biz.color, filter: 'blur(60px)', opacity: 0.08, pointerEvents: 'none',
          }} />
          <div style={{ position: 'absolute', bottom: 24, left: 28, right: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 48 }}>{biz.icon}</span>
            <div>
              <h1 style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800,
                color: t.heading, margin: 0, fontFamily: "'Syne', sans-serif",
              }}>
                {biz.title}
              </h1>
              <p style={{ fontSize: 15, color: t.muted, margin: '6px 0 0' }}>{biz.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Business Impact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} style={{ marginBottom: 40 }}>
          <SectionLabel text="IMPACT" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: t.heading, margin: '0 0 20px', lineHeight: 1.2,
          }}>Business Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {biz.impact.map((item, i) => (
              <GlowCard key={i} color={biz.color} style={{
                borderRadius: 14, background: `${biz.color}08`, border: `1px solid ${biz.color}20`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: `${biz.color}18`, border: `1px solid ${biz.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: biz.color, fontWeight: 700,
                  }}>✓</span>
                  <span style={{ fontSize: 14, color: t.body, lineHeight: 1.5 }}>{item}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }} style={{ marginBottom: 40 }}>
          <SectionLabel text="TECH" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: t.heading, margin: '0 0 20px', lineHeight: 1.2,
          }}>Tech Stack</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {biz.tech.map((tech, i) => (
              <motion.span key={i}
                whileHover={{ scale: 1.08, borderColor: `${biz.color}60`, boxShadow: `0 0 16px ${biz.color}25`, y: -2 }}
                style={{
                  padding: '8px 18px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.cardBorder}`,
                  fontSize: 13, color: t.body, fontFamily: 'monospace', letterSpacing: '0.04em',
                  fontWeight: 500, cursor: 'default', transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${biz.color}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} style={{ marginBottom: 40 }}>
          <SectionLabel text="FEATURES" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: t.heading, margin: '0 0 20px', lineHeight: 1.2,
          }}>Key Features</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {biz.features.map((f, i) => (
              <GlowCard key={i} color={biz.color} style={{
                borderRadius: 14, background: t.surface, border: `1px solid ${t.cardBorder}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px' }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: `${biz.color}15`, border: `1px solid ${biz.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: biz.color, fontWeight: 700,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 14, color: t.body, lineHeight: 1.6 }}>{f}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.div>

        {/* Architecture / Workflow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }} style={{ marginBottom: 48 }}>
          <SectionLabel text="WORKFLOW" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: t.heading, margin: '0 0 20px', lineHeight: 1.2,
          }}>Architecture / Workflow</h2>
          <div style={{
            padding: '24px', borderRadius: 16,
            background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.cardBorder}`,
            overflow: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
              {biz.workflow.map((step, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    whileHover={{ scale: 1.08, boxShadow: `0 0 20px ${biz.color}30`, y: -3 }}
                    style={{
                      padding: '10px 18px', borderRadius: 10,
                      background: i === biz.workflow.length - 1 ? `${biz.color}15` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${i === biz.workflow.length - 1 ? `${biz.color}40` : t.cardBorder}`,
                      fontSize: 13, color: i === biz.workflow.length - 1 ? biz.color : t.body,
                      fontWeight: i === biz.workflow.length - 1 ? 700 : 500,
                      whiteSpace: 'nowrap', fontFamily: 'monospace', letterSpacing: '0.02em',
                      cursor: 'default', transition: 'background 0.3s',
                    }}
                    onMouseEnter={(e) => { if (i !== biz.workflow.length - 1) e.currentTarget.style.background = `${biz.color}10`; }}
                    onMouseLeave={(e) => { if (i !== biz.workflow.length - 1) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  >
                    {step.replace(/\s*→\s*$/, '')}
                  </motion.div>
                  {i < biz.workflow.length - 1 && (
                    <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={biz.color} strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      style={{ flexShrink: 0, margin: '0 4px', opacity: 0.5 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Links CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            position: 'relative', borderRadius: 20, overflow: 'hidden',
            padding: 'clamp(32px, 5vw, 48px)',
            background: `${t.teal}08`, border: `1px solid ${t.teal}20`,
            textAlign: 'center',
          }}
        >
          {/* Animated glow blobs */}
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 350, height: 350, borderRadius: '50%',
              background: `radial-gradient(circle, ${t.teal}18 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)', pointerEvents: 'none',
            }} />
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{
              position: 'absolute', top: '30%', left: '70%',
              width: 200, height: 200, borderRadius: '50%',
              background: `radial-gradient(circle, ${biz.color}15 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)', pointerEvents: 'none',
            }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: t.heading,
              margin: '0 0 20px', lineHeight: 1.2,
            }}>Interested in This Project?</h2>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              {biz.link && (
                <motion.a href={biz.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${biz.color}60` }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 32px', borderRadius: 12,
                    background: biz.color, color: '#fff', fontSize: 15, fontWeight: 700,
                    border: 'none', cursor: 'pointer', letterSpacing: '0.02em',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >Live Demo ↗</motion.a>
              )}
              {biz.github && (
                <motion.a href={biz.github} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, borderColor: t.teal, boxShadow: `0 0 20px ${t.teal}20` }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 32px', borderRadius: 12,
                    background: 'transparent', color: t.body, fontSize: 15, fontWeight: 600,
                    border: `1px solid rgba(148,163,184,0.2)`, cursor: 'pointer',
                    letterSpacing: '0.02em', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >GitHub ↗</motion.a>
              )}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${t.teal}50` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                style={{
                  padding: '14px 32px', borderRadius: 12,
                  background: `linear-gradient(135deg, ${t.teal}, ${t.tealDark})`,
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  border: 'none', cursor: 'pointer', letterSpacing: '0.02em',
                }}
              >Book Free Demo</motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;
