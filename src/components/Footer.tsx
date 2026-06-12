import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MagneticButton from './MagneticButton'
import logo from "../../public/assets/favicon-removebg-preview.png"
const navLinks = [
   { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Certificates', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Amit-Sarode',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amit-sarode/',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/amit_sarode__/',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/amitsarode_',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Snapchat',
    href: 'https://www.snapchat.com/add/amitsarode-1?share_id=DENEiXi_xtI&locale=en-US',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.83 4.53c-.4 1.2-.7 3.5-.5 5.27-.2.1-.4.1-.6.1-1.1 0-2.1-.5-3.1-1.1.6 1.6 1.8 2.9 3.3 3.3-.1.6-.1 1.1 0 1.7-1 .4-1.8 1.1-2.3 2.2 1-.2 2-.1 2.8.3.4.2.6.6.7 1 .2.8.2 2.5.2 2.5 0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2 0 0 0-1.7.2-2.5.1-.4.3-.8.7-1 .8-.4 1.8-.5 2.8-.3-.5-1-1.3-1.8-2.3-2.2.1-.6.1-1.1 0-1.7 1.5-.4 2.7-1.7 3.3-3.3-1 .6-2 1.1-3.1 1.1-.2 0-.4 0-.6-.1.2-1.8-.1-4.1-.5-5.3-.6-1.8-2.2-3-4.2-3.1h-1.7c-2 .1-3.6 1.3-4.2 3.1z"/>
      </svg>
    ),
  },
]

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(2,13,10,0.95) 20%, #020d0a 100%)',
        borderTop: '1px solid rgba(20,184,166,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle ambient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.06) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '64px 24px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            paddingBottom: 56,
          }}
        >
          {/* ── Brand column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Logo mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#fff',
                  fontFamily: 'monospace',
                  boxShadow: '0 0 20px rgba(20,184,166,0.3)',
                  flexShrink: 0,
                }}
              >
               <img src={logo}/>
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Amit Sarode
              </span>
            </div>

            <p
              style={{
                fontSize: 13,
                lineHeight: 1.75,
                color: '#475569',
                maxWidth: 240,
              }}
            >
              Full-stack developer building AI-powered web applications, SaaS platforms, and workflow automation tools. Available for freelance worldwide.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    transition: 'color 0.25s, border-color 0.25s, background 0.25s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#14b8a6'
                    e.currentTarget.style.borderColor = 'rgba(20,184,166,0.3)'
                    e.currentTarget.style.background = 'rgba(20,184,166,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#64748b'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Navigation column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                color: '#334155',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              Navigation
            </p>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'color 0.25s, gap 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#5eead4'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#64748b'
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 1,
                      background: '#14b8a6',
                      display: 'inline-block',
                      flexShrink: 0,
                      opacity: 0.5,
                    }}
                  />
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* ── Contact / CTA column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                color: '#334155',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              Get In Touch
            </p>

            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>
              Open to freelance, full-time, and contract roles. Let's build something great together.
            </p>

            <Link
              to="/contact"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              <MagneticButton
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 22px',
                  borderRadius: 50,
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Say Hello →
              </MagneticButton>
            </Link>

            {/* Back to top */}
            <motion.button
              whileHover={{ y: -3 }}
              onClick={scrollToTop}
              style={{
                marginTop: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                color: '#334155',
                fontFamily: 'monospace',
                letterSpacing: '0.06em',
                padding: 0,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: '1px solid rgba(20,184,166,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: '#14b8a6',
                }}
              >
                ↑
              </span>
              BACK TO TOP
            </motion.button>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            padding: '20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: '#334155', fontFamily: 'monospace' }}>
            © {new Date().getFullYear()} Amit Sarode
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#14b8a6',
                boxShadow: '0 0 8px #14b8a6',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 12, color: '#334155', fontFamily: 'monospace' }}>
              Built with React · TypeScript · Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer