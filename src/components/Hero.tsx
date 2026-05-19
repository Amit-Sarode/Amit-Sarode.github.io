import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import doctor from '/assets/img/doctor-preview.png';
import ecom from '../../public/assets/img/ecom.png';
import SEO from './SEO';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import HeroScrollExperience from './hero/HeroScrollExperience';
import SkillCard from './hero/SkillCard';
import { Reveal, Divider } from './hero/Reveal';
import {
  skills, clients, testimonials, certificates,
  caseStudies, industries, processSteps, pricingPlans, stats,
} from './hero/data';

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

      {/* ── TRUST BAR (transition) ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '48px 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(20,184,166,0.02)',
      }}>
        <div style={{
          maxWidth: 1152,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap' as const,
          justifyContent: 'center',
          gap: 40,
        }}>
          {[
            { value: '15+', label: 'Projects Shipped' },
            { value: '10+', label: 'Businesses Automated' },
            { value: '2+', label: 'Years Building AI' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '24/7', label: 'Systems Running' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ textAlign: 'center' }}
            >
              <p style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 800,
                color: '#14b8a6',
                margin: '0 0 2px',
              }}>
                {s.value}
              </p>
              <p style={{ fontSize: 11, color: '#475569', margin: 0, letterSpacing: '0.05em' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 300,
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em' }}>01 / SOLUTIONS</span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.1 }}>What I Build</h2>
            <p style={{ color: '#64748b', fontSize: 14, fontWeight: 300, marginBottom: 48, maxWidth: 480, lineHeight: 1.75 }}>
              Production-ready AI systems that automate workflows, cut costs, and scale with your business. Every solution ships with measurable ROI.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

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
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    padding: '32px 28px', borderRadius: 20,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                    position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${item.color}40`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                >
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: item.color, letterSpacing: '0.1em', marginBottom: 16, opacity: 0.7 }}>STEP {item.step}</div>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#f1f5f9', margin: '0 0 10px' }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </motion.div>
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
        <Reveal delay={0.1} className="mt-20">
          <p style={{ fontSize: 12, letterSpacing: '0.14em', color: '#475569', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 24 }}>Verified Certifications</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {certificates.map((cert, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} whileHover={{ y: -6, scale: 1.02 }}
                style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', cursor: 'pointer', background: '#0f172a' }}>
                <img src={cert.url} alt={cert.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }} />
                <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{cert.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
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
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ padding: '20px 16px', borderRadius: 16, background: 'rgba(20,184,166,0.04)', border: '1px solid rgba(20,184,166,0.1)', textAlign: 'center' }}>
                  <p style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: '#14b8a6', margin: '0 0 4px', fontFamily: 'monospace' }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: '#475569', margin: 0 }}>{s.label}</p>
                </motion.div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {industries.map((industry, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4, borderColor: `${industry.color}40` }}
                  style={{ padding: '24px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s', cursor: 'default' }}>
                  <span style={{ fontSize: 28 }}>{industry.icon}</span>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: '#e2e8f0', margin: '12px 0 4px' }}>{industry.name}</h4>
                  <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{industry.desc}</p>
                </motion.div>
              </Reveal>
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
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} whileHover={{ y: -6 }}
                style={{ padding: '24px 26px', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 16, transition: 'border-color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(20,184,166,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
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
              </motion.div>
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
                <motion.div whileHover={{ y: -6 }}
                  style={{ padding: '28px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${cs.color}40`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
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
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="relative z-10 py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em' }}>INVESTMENT</span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.1 }}>Pricing</h2>
            <p style={{ color: '#64748b', fontSize: 14, fontWeight: 300, marginBottom: 56, maxWidth: 520, lineHeight: 1.75 }}>
              Transparent pricing to help you plan. Every project includes a discovery call, weekly demos, and post-launch support.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }}
                  style={{ padding: '32px 28px', borderRadius: 20, background: plan.featured ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${plan.featured ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.06)'}`, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'border-color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${plan.color}40`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = plan.featured ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.06)')}>
                  {plan.featured && (
                    <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', borderRadius: '0 0 12px 12px', background: '#8B5CF6', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase' }}>Most Popular</div>
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
                  <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                    style={{ display: 'block', textAlign: 'center', padding: '12px 20px', borderRadius: 12, background: plan.featured ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : 'rgba(255,255,255,0.05)', border: `1px solid ${plan.featured ? 'transparent' : 'rgba(255,255,255,0.1)'}`, color: plan.featured ? 'white' : '#94a3b8', fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'all 0.3s', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${plan.color}30`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    Get Started
                  </a>
                </motion.div>
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
