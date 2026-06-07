import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import profileImg from '/assets/img/profileImg.png'
import SEO from './SEO'
import TextReveal from './TextReveal'
import AnimatedCounter from './AnimatedCounter'
import { skills } from './hero/data'
import SkillCard from './hero/SkillCard'


// 1. Import the dynamic background components
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground'
import { Divider } from './hero/Reveal'

const certificates = [
  { name: "React Development", url: "https://udemy-certificate.s3.amazonaws.com/image/UC-896441cf-e535-45b3-84dd-fa3f21eb3428.jpg" },
  { name: "Frontend Mastery", url: "https://udemy-certificate.s3.amazonaws.com/image/UC-98a0333e-6ba1-4973-bcc5-46a44944f187.jpg?v=1745387851000" },
  { name: "JavaScript Deep Dive", url: "https://udemy-certificate.s3.amazonaws.com/image/UC-51b4a0db-d01d-469a-ba2b-747485bc045a.jpg?v=1745385669000" },
  { name: "Web Design", url: "https://udemy-certificate.s3.amazonaws.com/image/UC-68f7f083-7098-4901-8792-9fac8c4677f0.jpg?v=1745395351000" },
  { name: "Advanced React", url: "https://udemy-certificate.s3.amazonaws.com/image/UC-1b736a84-be80-4c25-b589-fd8905fbe4e5.jpg?v=1745396160000" },
  { name: "Node.js Basics", url: "https://udemy-certificate.s3.amazonaws.com/image/UC-f281d26f-3bba-42d4-8ed0-6eace42f32a4.jpg?v=1745402596000" },
  { name: "UI/UX Principles", url: "https://udemy-certificate.s3.amazonaws.com/image/UC-20e6490f-c036-4ad3-a224-b6d3fa384959.jpg?v=1745405522000" },
]

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '7', label: 'Certifications' },
  // { value: '∞', label: 'Lines of Code' },
]

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

const GlowCard: React.FC<{
  children: React.ReactNode
  color?: string
  style?: React.CSSProperties
}> = ({ children, color = '#14b8a6', style }) => {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])

  return (
    <motion.div
      whileHover={{ y: -6 }}
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
      <div style={{
        position: 'absolute', left: mouse.x, top: mouse.y,
        width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: color, filter: 'blur(30px)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 0.1 : 0, transition: 'opacity 0.5s',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  )
}

const About: React.FC = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        minHeight: '100vh',
        color: '#e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SEO
        title="About | Full-Stack Developer | Amit Sarode"
        description="Full-stack developer building AI-powered web applications and SaaS platforms. React, TypeScript, Node.js."
        path="/about"
      />
      
      {/* Dynamic Backgrounds */}
      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      <section
        style={{
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '120px 24px 100px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Section label ── */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                ABOUT
              </span>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #ffffff 30%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <TextReveal as="span">About Me</TextReveal>
            </h2>
          </div>
        </Reveal>

        {/* ── Bio + stats layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
            alignItems: 'start',
            marginBottom: 80,
          }}
        >
          {/* Bio text */}
          <Reveal delay={0.1}>
            <img
              src={profileImg}
              alt="Amit Sarode"
              loading="lazy"
              style={{ width: 'clamp(80px, 20vw, 120px)', height: 'clamp(80px, 20vw, 120px)', borderRadius: '9999px', objectFit: 'cover', marginBottom: 20, border: '2px solid rgba(20,184,166,0.4)' }}
            />
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.9,
                color: '#cbd5e1',
              }}
            >
              Hi, I'm{' '}
              <span style={{ color: '#5eead4', fontWeight: 600 }}>Amit Sarode</span>, a
              full-stack developer who builds AI-integrated web applications and SaaS platforms.
              I work with{' '}
              <span style={{ color: '#5eead4', fontWeight: 500 }}>
                React, TypeScript, Node.js, and modern AI APIs
              </span>
              {' '}to create tools that automate workflows, generate leads, and drive growth.
              <br />
              <br />I specialize in building production-grade applications — from AI chatbots and
              workflow automation to full-stack web platforms. My projects consistently ship on time
              and deliver measurable results for clients. Currently contributing to impactful
              products at{' '}
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Atum Information Technologies</span>.
            </p>
            <p style={{ marginTop: 16, color: '#5eead4', fontWeight: 600 }}>
              I ship on time, reply in 24hrs.
            </p>
            <blockquote style={{ marginTop: 18, padding: '14px 16px', borderLeft: '3px solid #14b8a6', background: 'rgba(20,184,166,0.05)', color: '#f8fafc' }}>
              "Amit consistently delivers clean frontend work and communicates clearly across deadlines." - Colleague at Atum IT
            </blockquote>
          </Reveal>

          {/* Stats grid */}
          <Reveal delay={0.2}>
            <div
              style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 12,
              }}
            >
              {stats.map((s, i) => {
                const numVal = parseInt(s.value);
                const suffix = s.value.replace(/[\d]/g, '');
                const actualNum = numVal || 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    style={{
                      padding: '24px 20px',
                      borderRadius: 16,
                      background: 'rgba(20,184,166,0.04)',
                      border: '1px solid rgba(20,184,166,0.12)',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(20,184,166,0.04) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <p
                      style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                        fontWeight: 800,
                        color: '#14b8a6',
                        lineHeight: 1,
                        marginBottom: 8,
                        fontFamily: 'monospace',
                      }}
                    >
                      <AnimatedCounter value={actualNum} suffix={suffix} duration={2} />{!actualNum && s.value}
                    </p>
                    <p style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '0.06em' }}>{s.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                marginTop: 16,
                padding: '18px 24px',
                borderRadius: 16,
                background: 'rgba(20,184,166,0.06)',
                border: '1px solid rgba(20,184,166,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#14b8a6',
                  boxShadow: '0 0 12px #14b8a6',
                  flexShrink: 0,
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#5eead4', marginBottom: 2 }}>
                  Open to opportunities
                </p>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>
                  Freelance, full-time & contract roles
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>

  <Divider />

        {/* ── SOLUTIONS: What I Build ── */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
            {/* FIXED: changed justify-content to justifyContent */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                SOLUTIONS
              </span>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            </div>
            <h3 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700,
              background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: 12,
            }}>
              <TextReveal as="span" stagger={0.04}>What I Build</TextReveal>
            </h3>
            <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
              End-to-end AI solutions and digital products — from chatbots to full-stack platforms.
            </p>
          </div>
        </Reveal>

       {/* ── SKILLS ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '40px 0 80px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 300,
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

        <Divider />
        {/* ── Certifications ── */}
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
            {/* FIXED: changed justify-content to justifyContent */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                VERIFIED CREDENTIALS
              </span>
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                fontWeight: 700,
                background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Professional Certifications
            </h3>
          </div>
        </Reveal>


        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#0a1628',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                cursor: 'pointer',
              }}
            >
              <img
                loading="lazy"
                src={cert.url}
                alt={cert.name}
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.75) saturate(0.6)',
                  transition: 'filter 0.5s ease, transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget
                  img.style.filter = 'brightness(0.95) saturate(1)'
                  img.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget
                  img.style.filter = 'brightness(0.75) saturate(0.6)'
                  img.style.transform = 'scale(1)'
                }}
              />

              {/* Overlay gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(2,13,10,0.9) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>
                    {cert.name}
                  </p>
                  <p style={{ fontSize: 11, color: '#14b8a6', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                    Udemy · Verified
                  </p>
                </div>

                {/* Check badge */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(20,184,166,0.15)',
                    border: '1px solid rgba(20,184,166,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: '#14b8a6',
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 12px #14b8a6; }
          50% { opacity: 0.6; box-shadow: 0 0 4px #14b8a6; }
        }
      `}</style>
    </div>
  )
}

export default About