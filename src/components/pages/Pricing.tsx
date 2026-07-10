import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal, Divider } from '../hero/Reveal';
import { AmbientBackground, NoiseOverlay, GridLines } from '../hero/HeroBackground';
import { pricingPlans } from '../hero/data';
import SEO from '../ui/SEO';
import SectionHeader from '../ui/SectionHeader';
import GlowCard from '../ui/GlowCard';

// Reusable Toggle Button Component
const TogglePill: React.FC<{
  options: { label: string; value: string }[];
  active: string;
  onChange: (value: string) => void;
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);


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
                         whileHover={{ x: -3, backgroundColor: 'rgba(20,184,166,0.08)' }}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => navigate('/')}
                         style={{
                           background: 'transparent',
                           border: '1px solid rgba(20,184,166,0.2)',
                           color: '#14b8a6',
                           fontSize: 13,
                           cursor: 'pointer',
                           display: 'inline-flex',
                           alignItems: 'center',
                           gap: 8,
                           fontFamily: 'monospace',
                           padding: '8px 16px',
                           borderRadius: 8,
                           transition: 'background-color 0.2s',
                         }}
                       >
                         <span style={{ fontSize: 16 }}>←</span> Back to Home
                       </motion.button>
          </div>

          <SectionHeader
            label="INVESTMENTS"
            title="Pricing"
            description="Transparent pricing to help you plan. Every project includes a discovery call, weekly demos, and post-launch support."
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: -24, marginBottom: 56 }}>
            <TogglePill 
              active={currency} 
              onChange={(v: string) => setCurrency(v as 'USD' | 'INR')} 
              color="#334155"
              options={[ { label: 'USD', value: 'USD' }, { label: 'INR', value: 'INR' } ]} 
            />
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

        {/* FAQ */}
        <Reveal delay={0.35}>
          <div style={{ marginTop: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700,
                color: '#f1f5f9', margin: '0 0 8px',
              }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 680, margin: '0 auto' }}>
              {[
                { q: 'How long does a typical project take?', a: 'Most projects deliver within 2–4 weeks. Simple chatbot MVPs can go live in 7–10 days. Complex enterprise systems with multiple integrations typically take 4–6 weeks.' },
                { q: 'What kind of support do you provide after launch?', a: 'Every project includes 1 month of post-launch support with bug fixes and minor adjustments. Retainer options are available for ongoing maintenance, monitoring, and feature updates.' },
                { q: 'Do you work with specific industries?', a: 'I\'ve built solutions for healthcare, hospitality, e-commerce, fitness, finance, education, and more. The technology adapts — what matters is your specific workflow and goals.' },
                { q: 'Can I request revisions during the build?', a: 'Absolutely. I provide weekly demos so you can see progress and give feedback at every stage. No black boxes — you\'re involved throughout.' },
                { q: 'What tech stack do you typically use?', a: 'Frontend: React, Next.js, Tailwind CSS. Backend: Node.js, Python. AI: GPT-4, Claude, LangChain, Pinecone. The stack is chosen per project based on your specific needs.' },
                { q: 'Is there a free discovery call?', a: 'Yes — the first consultation is always free. We\'ll map your current workflows, identify automation opportunities, and discuss scope, timeline, and budget.' },
              ].map((faq, i) => {
                const isOpen = openFAQ === i;
                return (
                  <div key={i} style={{
                    borderRadius: 14,
                    border: `1px solid ${isOpen ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    background: isOpen ? 'rgba(20,184,166,0.04)' : 'rgba(255,255,255,0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                  }}>
                    <button
                      type="button"
                      onClick={() => setOpenFAQ(isOpen ? null : i)}
                      style={{
                        width: '100%', padding: '16px 20px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: 'none', border: 'none', color: '#f1f5f9',
                        fontSize: 14, fontWeight: 600, cursor: 'pointer',
                        textAlign: 'left', fontFamily: 'inherit', gap: 12,
                      }}
                    >
                      {faq.q}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: '#14b8a6', fontSize: 14, flexShrink: 0 }}
                      >
                        ▼
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 20px 16px', color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

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