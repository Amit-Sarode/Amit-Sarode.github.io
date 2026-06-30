import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import profileImg from '/assets/img/profileImg.png'
import SEO from '../ui/SEO'
import AnimatedCounter from '../ui/AnimatedCounter'
import { skills } from '../hero/data'
import SkillCard from '../hero/SkillCard'


// 1. Import the dynamic background components
import { AmbientBackground, NoiseOverlay, GridLines } from '../hero/HeroBackground'
import { Reveal, Divider } from '../hero/Reveal'

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

const About: React.FC = () => {
  const navigate = useNavigate();

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
        {/* ── Back button ── */}
        <Reveal>
          <div style={{ marginBottom: 16 }}>
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
        </Reveal>

        {/* ── Section label ── */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                <motion.span 
                              initial={{ width: 0 }}
                              whileInView={{ width: 32 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                            />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                ABOUT
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
                    About Me
                     </motion.h2>
          </div>
        </Reveal>

        {/* ── Bio + Image layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
            alignItems: 'start',
            marginBottom: 80,
          }}
        >
          {/* Left: Bio text */}
          <Reveal delay={0.1}>
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

            {/* CTA */}
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ y: -3, boxShadow: '0 10px 24px -10px rgba(20,184,166,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open('https://calendly.com/amitsarode', '_blank')}
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#f1f5f9',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Book a Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </motion.button>
            </div>
          </Reveal>

          {/* Right: Image with overlay stats */}
          <Reveal delay={0.2}>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(20,184,166,0.3)' }}>
              <img
                src={profileImg}
                alt="Amit Sarode"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(2,13,10,0.9) 0%, rgba(2,13,10,0.1) 60%, transparent 100%)',
              }} />
              {/* Stats overlay on image */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 20px',
                display: 'flex',
                gap: 12,
              }}>
                {stats.slice(0, 2).map((s, i) => {
                  const numVal = parseInt(s.value);
                  const suffix = s.value.replace(/[\d]/g, '');
                  const actualNum = numVal || 0;
                  return (
                    <div key={i} style={{
                      flex: 1,
                      padding: '16px 12px',
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      textAlign: 'center',
                    }}>
                      <p style={{
                        fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                        fontWeight: 800,
                        color: '#14b8a6',
                        lineHeight: 1,
                        marginBottom: 4,
                        fontFamily: 'monospace',
                      }}>
                        <AnimatedCounter value={actualNum} suffix={suffix} duration={2} />
                      </p>
                      <p style={{ fontSize: 11, color: '#e2e8f0', letterSpacing: '0.04em', margin: 0 }}>{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Availability card below image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.01, borderColor: 'rgba(20,184,166,0.4)' }}
              onClick={() => navigate('/contact')}
              style={{
                marginTop: 16,
                padding: '16px 20px',
                borderRadius: 16,
                background: 'rgba(20,184,166,0.06)',
                border: '1px solid rgba(20,184,166,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
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
                  Freelance, full-time & contract roles — Click to get in touch
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* ── Additional stats row ── */}
        <Reveal delay={0.3}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginBottom: 80,
          }}>
            {stats.slice(2).map((s, i) => {
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
        </Reveal>

  <Divider />

        {/* ── SOLUTIONS: What I Build ── */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
            {/* FIXED: changed justify-content to justifyContent */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                <motion.span 
                              initial={{ width: 0 }}
                              whileInView={{ width: 32 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                            />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                TECH STACK
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
                   Professional Capabilities 
                     </motion.h2>
            <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
             Building end-to-end digital products—from LLM-powered conversational agents to high-performance web and mobile platforms.
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
                <motion.span 
                              initial={{ width: 0 }}
                              whileInView={{ width: 32 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                            />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                VERIFIED CREDENTIALS
              </span>
               <motion.span 
                             initial={{ width: 0 }}
                             whileInView={{ width: 32 }}
                             transition={{ duration: 0.8, delay: 0.2 }}
                             style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                           />
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
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: idx * 0.1,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateY: 5,
                borderColor: 'rgba(20,184,166,0.5)',
                boxShadow: '0 30px 80px rgba(20,184,166,0.25), 0 15px 35px rgba(0,0,0,0.5)'
              }}
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(20,184,166,0.15)',
                background: 'linear-gradient(145deg, #0a1628, #0d1f35)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                perspective: 1000,
              }}
            >
              {/* Animated border glow */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 22,
                  background: 'linear-gradient(45deg, #14b8a6, #0d9488, #14b8a6)',
                  opacity: 0,
                  zIndex: -1,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <motion.img
                loading="lazy"
                src={cert.url}
                alt={cert.name}
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  objectFit: 'cover',
                  display: 'block',
                }}
                initial={{ scale: 1.1, filter: 'brightness(0.6) saturate(0.4)' }}
                whileInView={{
                  scale: 1,
                  filter: 'brightness(0.75) saturate(0.6)'
                }}
                whileHover={{
                  scale: 1.08,
                  filter: 'brightness(0.95) saturate(1)'
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut'
                }}
              />

              {/* Overlay gradient */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(2,13,10,0.95) 0%, rgba(2,13,10,0.4) 50%, transparent 100%)',
                  pointerEvents: 'none',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />

              {/* Label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px 18px',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                >
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>
                    {cert.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: 'rgba(20,184,166,0.15)',
                      border: '1px solid rgba(20,184,166,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: '#14b8a6',
                      flexShrink: 0,
                    }}>
                      ✓
                    </div>
                    <p style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                      Udemy · Professional Certificate
                    </p>
                  </div>
                </motion.div>
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