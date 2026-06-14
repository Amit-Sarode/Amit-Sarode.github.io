import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, Divider } from './hero/Reveal';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import { pricingPlans } from './hero/data';
import SEO from './SEO';
const GlowCard: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = '#14b8a6', style }) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 24,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `${color}50` : 'rgba(255,255,255,0.08)'}`,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        boxShadow: hovered ? `0 20px 40px -10px ${color}20` : '0 10px 30px -10px rgba(0,0,0,0.5)',
        ...style,
      }}
    >
      {/* Cinematic Cursor Glow */}
      <div style={{
        position: 'absolute', left: mouse.x, top: mouse.y,
        width: 300, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20 0%, transparent 60%)`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease',
      }} />
      
      {/* Ambient Corner Blob */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 120, height: 120, borderRadius: '50%',
        background: color, filter: 'blur(45px)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 0.2 : 0.05, transition: 'opacity 0.5s ease',
      }} />
      
      {/* Top Accent Bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s ease',
        zIndex: 1,
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </motion.div>
  );
};

// Reusable Toggle Button Component
const TogglePill: React.FC<{
  options: { label: string; value: string }[];
  active: string;
  onChange: (value: any) => void;
  color: string;
}> = ({ options, active, onChange, color }) => (
  <div style={{
    display: 'flex', background: 'rgba(255,255,255,0.03)', 
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, 
    padding: 4, position: 'relative'
  }}>
    {options.map((opt: { label: string; value: string }) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        style={{
          position: 'relative', padding: '8px 20px', 
          background: 'none', border: 'none', cursor: 'pointer',
          color: active === opt.value ? '#fff' : '#64748b',
          fontSize: 14, fontWeight: 600, fontFamily: "'Syne', sans-serif",
          zIndex: 1, transition: 'color 0.3s'
        }}
      >
        {active === opt.value && (
          <motion.div
            layoutId={`pill-${options[0].value}`}
            style={{
              position: 'absolute', inset: 0, background: color, 
              borderRadius: 100, zIndex: -1,
              boxShadow: `0 4px 15px ${color}40`
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        {opt.label}
      </button>
    ))}
  </div>
);

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');


  return (
    <div style={{
      position: 'relative', minHeight: '100vh',
      background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
      overflow: 'hidden',
    }}>
      <SEO
        title="Pricing | AI Automation & Web Development Services | Amit Sarode"
        description="Transparent pricing for AI automation, web development, and SaaS solutions. Freelance, project-based, and retainer options available."
        path="/pricing"
      />
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <motion.span 
                                         initial={{ width: 0 }}
                                         whileInView={{ width: 32 }}
                                         transition={{ duration: 0.8, delay: 0.2 }}
                                         style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                                       />
                         <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                           INVESTMENTS
                         </span>
                          <motion.span 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 32 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                                      />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24, marginBottom: 56 }}>
            <div>
              <h1 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#f1f5f9',
                margin: '0 0 12px', lineHeight: 1.1,
              }}>Pricing</h1>
              <p style={{ color: '#64748b', fontSize: 15, fontWeight: 300, margin: '0 auto', maxWidth: 460, lineHeight: 1.75 }}>
                Transparent pricing to help you plan. Every project includes a discovery call, weekly demos, and post-launch support.
              </p>
            </div>
            
            {/* Cinematic Toggles */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <TogglePill 
                active={currency} 
                onChange={setCurrency} 
                color="#334155"
                options={[ { label: 'USD', value: 'USD' }, { label: 'INR', value: 'INR' } ]} 
              />
            
            </div>
          </div>
        </Reveal>
        

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <GlowCard color={plan.color} style={{
                padding: 0, display: 'flex', flexDirection: 'column', height: '100%',
                background: plan.featured ? 'rgba(139, 92, 246, 0.05)' : undefined,
                border: plan.featured ? '1px solid rgba(139, 92, 246, 0.25)' : undefined,
              }}>
                <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
                  {/* {plan.featured && (
                    <div style={{
                      position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                      padding: '6px 20px', borderRadius: '0 0 16px 16px', 
                      background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                      fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'white', textTransform: 'uppercase',
                      boxShadow: '0 10px 20px -5px rgba(139, 92, 246, 0.4)'
                    }}>Most Popular</div>
                  )} */}
                  
                  <p style={{ fontSize: 13, fontWeight: 600, color: plan.color, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px', fontFamily: 'monospace' }}>
                    {plan.tier}
                  </p>
                  
                  {/* ---> NEW PRICE BLOCK STARTS HERE <--- */}
                  <div style={{ margin: '12px 0 16px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    {plan.tier === 'Enterprise' ? (
                      <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc' }}>
                        {plan.price }
                      </span>
                    ) : (
                      <>
                        {plan.discount && (
                          <span style={{ fontSize: '1.25rem', color: '#64748b', textDecoration: 'line-through' }}>
                            {currency === 'USD' ? '$' : '₹'}
                            {currency === 'USD' ? plan.priceUSD : plan.priceINR} 
                          </span>
                        )}
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                          {currency === 'USD' ? '$' : '₹'}
                         {
  Math.floor(
    currency === 'USD'
      ? plan.priceUSD! * (1 - (plan.discount || 0))
      : plan.priceINR! * (1 - (plan.discount || 0))
  )
}
<span style={{fontWeight:200 , fontSize:24}}
>/project</span>
                        </span>
                      </>
                    )}
                  </div>
                  {/* ---> NEW PRICE BLOCK ENDS HERE <--- */}

                  <p style={{ fontSize: 14, color: '#94a3b8', margin: '0 0 24px', lineHeight: 1.6 }}>{plan.desc}</p>
                  
                  <Divider />
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 32px', flex: 1 }}>
                    {plan.features.map((f, j) => (
                      <motion.li 
                        key={j} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (j * 0.1) }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, fontSize: 14, color: '#cbd5e1' }}
                      >
                        <span style={{ color: plan.color, fontSize: 16, lineHeight: 1.2 }}>✓</span>{f}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ y: -3, boxShadow: `0 15px 30px -10px ${plan.color}50` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/contact')}
                    style={{
                      display: 'block', textAlign: 'center', padding: '16px 20px', borderRadius: 14,
                      background: plan.featured ? `linear-gradient(135deg, ${plan.color}, #6D28D9)` : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${plan.featured ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                      color: plan.featured ? 'white' : '#f8fafc',
                      fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.3s ease',
                      letterSpacing: '0.02em'
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
        <Reveal delay={0.4}>
          <div style={{
            marginTop: 72, padding: '32px', borderRadius: 20,
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center', backdropFilter: 'blur(10px)'
          }}>
            <p style={{ fontSize: 15, color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
              Not sure which plan fits? <span style={{ color: '#14b8a6', cursor: 'pointer', fontWeight: 600, borderBottom: '1px solid #14b8a640' }} onClick={() => navigate('/contact')}>Book a free discovery call</span> — I'll help you pick the right scope.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Pricing;