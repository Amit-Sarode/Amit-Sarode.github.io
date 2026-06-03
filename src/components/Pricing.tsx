import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal, Divider } from './hero/Reveal';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import { pricingPlans } from './hero/data';

const GlowCard: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
  hoverY?: number;
}> = ({ children, color = '#14b8a6', style, hoverY = -6 }) => {
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

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative', minHeight: '100vh',
      background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
      overflow: 'hidden',
    }}>
      <AmbientBackground />
      <GridLines />
      <NoiseOverlay />

      <section className="relative z-10 py-24 px-6" style={{ maxWidth: 1152, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: 12 }}>
            <motion.button
              whileHover={{ x: -3 }}
              onClick={() => navigate('/')}
              style={{
                background: 'none', border: 'none', color: '#475569', fontSize: 13,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'monospace', padding: 0,
              }}
            >
              <span style={{ fontSize: 16 }}>←</span> Back to Home
            </motion.button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em' }}>INVESTMENT</span>
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#f1f5f9',
            margin: '0 0 12px', lineHeight: 1.1,
          }}>Pricing</h1>
          <p style={{ color: '#64748b', fontSize: 15, fontWeight: 300, marginBottom: 56, maxWidth: 560, lineHeight: 1.75 }}>
            Transparent pricing to help you plan. Every project includes a discovery call, weekly demos, and post-launch support.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <GlowCard color={plan.color} style={{
                padding: 0, display: 'flex', flexDirection: 'column', height: '100%',
                background: plan.featured ? 'rgba(139, 92, 246, 0.05)' : undefined,
                border: plan.featured ? '1px solid rgba(139, 92, 246, 0.2)' : undefined,
              }}>
                <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
                  {plan.featured && (
                    <div style={{
                      position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                      padding: '4px 16px', borderRadius: '0 0 12px 12px', background: '#8B5CF6',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase',
                    }}>Most Popular</div>
                  )}
                  <p style={{ fontSize: 12, fontWeight: 600, color: plan.color, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px', fontFamily: 'monospace' }}>{plan.tier}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#f1f5f9' }}>{plan.price}</span>
                    {plan.period && <span style={{ fontSize: 13, color: '#475569' }}>{plan.period}</span>}
                  </div>
                  <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px', lineHeight: 1.6 }}>{plan.desc}</p>
                  <Divider />
                  <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 24px', flex: 1 }}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, fontSize: 13, color: '#94a3b8' }}>
                        <span style={{ color: plan.color, fontSize: 14, lineHeight: 1.4 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ y: -2, boxShadow: `0 8px 25px ${plan.color}30` }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/contact')}
                    style={{
                      display: 'block', textAlign: 'center', padding: '12px 20px', borderRadius: 12,
                      background: plan.featured ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${plan.featured ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                      color: plan.featured ? 'white' : '#94a3b8',
                      fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.3s',
                    }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {/* FAQ note */}
        <Reveal delay={0.3}>
          <div style={{
            marginTop: 64, padding: '24px 28px', borderRadius: 16,
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.7 }}>
              Not sure which plan fits? <span style={{ color: '#14b8a6', cursor: 'pointer' }} onClick={() => navigate('/contact')}>Book a free discovery call</span> — I'll help you pick the right scope.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Pricing;
