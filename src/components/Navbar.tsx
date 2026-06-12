import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SocialsDropdown from './SocialsDropdown';
import resume from '/assets/Amit Sarode -resume (1).pdf';
import logo from "../../public/assets/favicon-removebg-preview.png"
/* ─── Hooks ─── */
export const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return width;
};

export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [handler]);
  return ref;
};

/* ─── Nav items ─── */
const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const width = useWindowSize();
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  const closeMobile = useCallback(() => setMobile(false), []);
  const menuRef = useClickOutside(closeMobile);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Close mobile on resize
  useEffect(() => { setMobile(false); }, [width]);
  // Close mobile on route change
  useEffect(() => { setMobile(false); }, [location.pathname]);

  // Navbar bg on scroll
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const handleEmail = () => {
    window.open(`mailto:sarodeamit990@gmail.com`, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'Amit_Sarode_Resume.pdf';
    link.click();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #14b8a6, #0d9488, #14b8a6)',
          transformOrigin: '0%',
          zIndex: 100,
          boxShadow: '0 0 10px rgba(20,184,166,0.6)',
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(12px, 4vw, 32px)',
          background: scrolled
            ? 'var(--bg-nav-scrolled)'
            : 'var(--bg-nav)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid var(--border-nav-scrolled)'
            : '1px solid var(--border-nav)',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'monospace',
                boxShadow: isDark ? '0 0 16px rgba(20,184,166,0.35)' : '0 0 16px rgba(13,148,136,0.25)',
                flexShrink: 0,
              }}
            >
              <img src={logo}/>
            </div>
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.01em',
              }}
            >
              Amit Sarode
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 4,
          }}
          className="md-nav"
        >
          {navItems.map((item, idx) => {
            const active = isActive(item.path);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                style={{ position: 'relative' }}
              >
                <Link
                  to={item.path}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 14,
                    color: active ? 'var(--accent)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    fontWeight: active ? 600 : 500,
                    background: active ? 'var(--accent-bg)' : 'transparent',
                    display: 'block',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--accent-light)';
                      e.currentTarget.style.background = 'var(--accent-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </Link>
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 14,
                      right: 14,
                      height: 2,
                      borderRadius: 1,
                      background: 'var(--accent)',
                      boxShadow: '0 0 8px var(--accent)',
                    }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Socials Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.07 }}
          >
            <SocialsDropdown />
          </motion.div>

          {/* Theme toggle */}
          {/* <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 34, height: 34, borderRadius: 10,
              border: '1px solid var(--border-default)',
              background: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--accent)', fontSize: 16,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.background = 'var(--bg-card-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.background = 'var(--bg-card)';
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.svg key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
                </motion.svg>
              ) : (
                <motion.svg key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button> */}

          {/* Resume download */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 14,
              color: 'var(--text-muted)',
              fontWeight: 500,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Resume
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'var(--border-default)', margin: '0 8px' }} />

          {/* Call CTA */}
          <motion.a
            href="tel:+919322137885"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20,184,166,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '8px 20px',
              borderRadius: 50,
              background: 'transparent',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'all 0.3s',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <motion.span
              animate={{ rotate: [0, -15, 15, -15, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
              style={{ display: 'inline-flex' }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            Call
          </motion.a>

          {/* Email CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20,184,166,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEmail}
            style={{
              padding: '8px 20px',
              borderRadius: 50,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'box-shadow 0.3s',
            }}
          >
            Email Me
          </motion.button>

          {/* Cmd+K button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            whileHover={{ scale: 1.05, borderColor: 'var(--accent-border)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
            style={{
              display: 'flex', alignItems: 'center', gap: 3,
              padding: '3px 8px', borderRadius: 6,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              fontSize: 10, color: 'var(--text-dim)',
              fontFamily: 'monospace',
              marginLeft: 4, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title="Ctrl+K or Cmd+K"
          >
            <span>⌘</span>K
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <div ref={menuRef} style={{ position: 'relative' }} className="mobile-nav-wrapper">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobile((p) => !p)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              background: mobile ? 'var(--accent-bg)' : 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: mobile ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'all 0.25s',
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobile ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {mobile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 48,
                  right: 0,
                  width: 'min(260px, calc(100vw - 32px))',
                  background: 'var(--bg-nav)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-hover)',
                  borderRadius: 16,
                  padding: '12px 8px',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
                  zIndex: 60,
                }}
              >
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      onClick={closeMobile}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderRadius: 10,
                        color: isActive(item.path) ? 'var(--accent)' : 'var(--text-muted)',
                        fontSize: 14,
                        textDecoration: 'none',
                        fontWeight: isActive(item.path) ? 600 : 500,
                        background: isActive(item.path) ? 'var(--accent-bg)' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(item.path)) {
                          e.currentTarget.style.color = 'var(--accent-light)';
                          e.currentTarget.style.background = 'var(--accent-bg)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(item.path)) {
                          e.currentTarget.style.color = 'var(--text-muted)';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}


                {/* Mobile resume */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.06 }}
                >
                  <button
                    onClick={() => { handleDownload(); closeMobile(); }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 14px',
                      borderRadius: 10,
                      color: '#64748b',
                      fontSize: 14,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#5eead4';
                      e.currentTarget.style.background = 'rgba(20,184,166,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#64748b';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Resume ↓
                  </button>
                </motion.div>

                {/* Mobile socials */}
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amit-sarode/' },
                  { label: 'GitHub', href: 'https://github.com/Amit-Sarode' },
                  { label: 'Instagram', href: 'https://www.instagram.com/amit_sarode__/' },
                  { label: 'X / Twitter', href: 'https://x.com/amitsarode_' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + 1 + i) * 0.06 }}
                  >
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobile}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 10,
                        color: '#64748b',
                        fontSize: 14,
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#5eead4';
                        e.currentTarget.style.background = 'rgba(20,184,166,0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#64748b';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {s.label}
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" />
                      </svg>
                    </a>
                  </motion.div>
                ))}

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 14px' }} />

                {/* Mobile call CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.06 }}
                  style={{ padding: '6px 8px' }}
                >
                  <a
                    href="tel:+919322137885"
                    onClick={closeMobile}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      width: '100%',
                      padding: '11px',
                      borderRadius: 10,
                      background: 'transparent',
                      border: '1px solid rgba(20,184,166,0.3)',
                      color: '#14b8a6',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                      textDecoration: 'none',
                      marginBottom: 8,
                    }}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Call Now
                  </a>
                </motion.div>

                {/* Mobile email CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 2) * 0.06 }}
                  style={{ padding: '6px 8px' }}
                >
                  <button
                    onClick={() => { handleEmail(); closeMobile(); }}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Email Me
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Responsive styles injected */}
      <style>{`
        .md-nav { display: none !important; }
        .mobile-nav-wrapper { display: flex !important; }

        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
          .mobile-nav-wrapper { display: none !important; }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .md-nav {
            gap: 2px !important;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .md-nav::-webkit-scrollbar { display: none; }
          .md-nav a, .md-nav button, .md-nav div > a {
            font-size: 12px !important;
            padding: 5px 10px !important;
          }
        }

        @media (max-width: 480px) {
          .mobile-nav-wrapper > button {
            width: 34px !important;
            height: 34px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
