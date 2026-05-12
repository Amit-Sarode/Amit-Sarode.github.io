import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from './SEO';


import doctor from '/assets/img/doctor-preview.png';
import ecom from '/assets/img/Screenshot 2025-04-22 at 1.15.51 PM.png';

const filters = ['All', 'React', 'React Native', 'Full Stack', 'Vanilla'];

const techColors: Record<string, { color: string; bg: string; border: string }> = {
  React:           { color: '#61DAFB', bg: 'rgba(97,218,251,0.07)',   border: 'rgba(97,218,251,0.2)'   },
  'React Native':  { color: '#61DAFB', bg: 'rgba(97,218,251,0.07)',   border: 'rgba(97,218,251,0.2)'   },
  Redux:           { color: '#a78bfa', bg: 'rgba(167,139,250,0.07)',  border: 'rgba(167,139,250,0.2)'  },
  Tailwind:        { color: '#38BDF8', bg: 'rgba(56,189,248,0.07)',   border: 'rgba(56,189,248,0.2)'   },
  'Tailwind CSS':  { color: '#38BDF8', bg: 'rgba(56,189,248,0.07)',   border: 'rgba(56,189,248,0.2)'   },
  Firebase:        { color: '#fb923c', bg: 'rgba(251,146,60,0.07)',   border: 'rgba(251,146,60,0.2)'   },
  'REST API':      { color: '#14b8a6', bg: 'rgba(20,184,166,0.07)',   border: 'rgba(20,184,166,0.2)'   },
  JavaScript:      { color: '#F7DF1E', bg: 'rgba(247,223,30,0.07)',   border: 'rgba(247,223,30,0.2)'   },
  TypeScript:      { color: '#3178C6', bg: 'rgba(49,120,198,0.07)',   border: 'rgba(49,120,198,0.2)'   },
  HTML:            { color: '#f97316', bg: 'rgba(249,115,22,0.07)',   border: 'rgba(249,115,22,0.2)'   },
  CSS:             { color: '#60a5fa', bg: 'rgba(96,165,250,0.07)',   border: 'rgba(96,165,250,0.2)'   },
  SCSS:            { color: '#e879f9', bg: 'rgba(232,121,249,0.07)',  border: 'rgba(232,121,249,0.2)'  },
  'Framer Motion': { color: '#a855f7', bg: 'rgba(168,85,247,0.07)',   border: 'rgba(168,85,247,0.2)'   },
  'Dark Mode':     { color: '#94a3b8', bg: 'rgba(148,163,184,0.07)',  border: 'rgba(148,163,184,0.2)'  },
  DnD:             { color: '#f59e0b', bg: 'rgba(245,158,11,0.07)',   border: 'rgba(245,158,11,0.2)'   },
  'Chart.js':      { color: '#34d399', bg: 'rgba(52,211,153,0.07)',   border: 'rgba(52,211,153,0.2)'   },
  'Node.js':       { color: '#6adf60', bg: 'rgba(106,223,96,0.07)',   border: 'rgba(106,223,96,0.2)'   },
  MongoDB:         { color: '#4DB33D', bg: 'rgba(77,179,61,0.07)',    border: 'rgba(77,179,61,0.2)'    },
  MUI:             { color: '#007FFF', bg: 'rgba(0,127,255,0.07)',    border: 'rgba(0,127,255,0.2)'    },
  'OpenAI API':    { color: '#10a37f', bg: 'rgba(16,163,127,0.07)',   border: 'rgba(16,163,127,0.2)'   },
  Expo:            { color: '#ffffff', bg: 'rgba(255,255,255,0.05)',   border: 'rgba(255,255,255,0.15)' },
  'AI/ML':         { color: '#f472b6', bg: 'rgba(244,114,182,0.07)',  border: 'rgba(244,114,182,0.2)'  },
  Python:          { color: '#facc15', bg: 'rgba(250,204,21,0.07)',   border: 'rgba(250,204,21,0.2)'   },
};

const defaultChip = { color: '#94a3b8', bg: 'rgba(148,163,184,0.07)', border: 'rgba(148,163,184,0.2)' };

interface Project {
  name: string;
  link: string;
  img: string;
  desc: string;
  metric: string;
  tech: string[];
  category: string;
  year: string;
  featured?: boolean;
}

// placeholder image for projects with no screenshot
const PH = (keyword: string) =>
  `https://images.unsplash.com/photo-${keyword}?w=800&q=80`;

const projects: Project[] = [
  /* ── FEATURED ── */
  {
    name: 'VibNote – AI Diary',
    link: 'https://web-vibenote.vercel.app/',
    img: PH('1518770660439-4636190af475'),
    desc: 'AI-powered diary that detects and tracks human emotions from journal entries using NLP. Ships as web app and React Native mobile app.',
    metric: 'Emotion detection ~87% accurate · Web + Mobile',
    tech: ['React Native', 'Expo', 'OpenAI API', 'Firebase', 'React'],
    category: 'React Native',
    year: '2025',
    featured: true,
  },
  {
    name: 'Tailored Studio – Virtual Try-On',
    link: 'https://tailored-studio.vercel.app/',
    img: PH('1558171813-4882cfe9c0e3'),
    desc: 'AI-powered virtual clothing try-on. Upload a photo, try on outfits digitally before purchasing — zero physical samples needed.',
    metric: 'Cuts return rates · AI-powered overlay',
    tech: ['React', 'AI/ML', 'Tailwind', 'REST API'],
    category: 'React',
    year: '2025',
    featured: true,
  },
  {
    name: 'HRMS – Employee Management',
    link: '#',
    img: PH('1522071820081-009f0129c71c'),
    desc: 'Full HR management system — employee records, task assignment, shift roster, and performance tracking for mid-size companies.',
    metric: 'Manages 100+ employees · Reduces HR overhead 60%',
    tech: ['React', 'Node.js', 'MongoDB', 'MUI'],
    category: 'Full Stack',
    year: '2025',
    featured: true,
  },
  {
    name: 'Bachat Gat – Finance App',
    link: 'https://bachat-gat.vercel.app/login',
    img: PH('1563986768494-4dee2763ff3f'),
    desc: 'Web app for village savings groups. Tracks member repayments, loans, and group finances with role-based access — replaces manual ledgers.',
    metric: 'Used by real savings groups · Fully paperless',
    tech: ['React', 'Firebase', 'Tailwind'],
    category: 'Full Stack',
    year: '2025',
    featured: true,
  },
  {
    name: 'Healthcare Dashboard',
    link: 'https://healthcheck-nine.vercel.app/',
    img: doctor,
    desc: 'Doctor appointment and health dashboard with Firebase real-time data, patient records, and responsive mobile-first layout.',
    metric: 'Reduced scheduling time 40% · Mobile-first',
    tech: ['React', 'Firebase', 'MUI', 'Tailwind'],
    category: 'React',
    year: '2024',
    featured: true,
  },
  {
    name: 'Stock Analyzer',
    link: '#',
    img: PH('1611974789855-9c2a0a7236a3'),
    desc: 'Real-time stock analysis dashboard with candlestick charts, portfolio tracking, and AI-assisted buy/sell signals.',
    metric: 'Tracks 50+ stocks · Real-time refresh',
    tech: ['React', 'Chart.js', 'REST API', 'TypeScript'],
    category: 'React',
    year: '2025',
    featured: true,
  },

  /* ── CLIENT WEBSITES ── */
  {
    name: 'Ecommerce App',
    link: 'https://ecommerce-xi-five-58.vercel.app/',
    img: ecom,
    desc: 'Modern ecommerce platform with Redux cart, product filters, search, and checkout flow.',
    metric: '500+ daily users · 98 Lighthouse score',
    tech: ['React', 'Redux', 'Tailwind', 'REST API'],
    category: 'React',
    year: '2024',
  },
  {
    name: 'Lead Dentist',
    link: 'https://lead-dentist.vercel.app/',
    img: PH('1588776814546-1ffbb2f28a08'),
    desc: 'Professional dentist clinic website with service listings and patient-first design.',
    metric: 'Increased clinic enquiries 35%',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
  },
  {
    name: 'Restaurant Website',
    link: 'https://restaurant-ecru-two.vercel.app/',
    img: PH('1517248135467-4c7edcad34c4'),
    desc: 'Elegant restaurant landing page with menu showcase, reservation flow, and animated sections.',
    metric: 'Sub-2s load · Fully responsive',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
  },
  {
    name: 'Gym Website',
    link: 'https://gym-orpin-two.vercel.app/',
    img: PH('1534438327276-14e5300c3a48'),
    desc: 'High-energy gym and fitness studio website with class schedules, trainer profiles, and membership plans.',
    metric: '20+ membership enquiries/week',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
  },
  {
    name: 'Salon Booking App',
    link: 'https://saloon-web-app.vercel.app/',
    img: PH('1560066984-138dadb4c035'),
    desc: 'Salon management app with service booking, stylist availability, and appointment calendar.',
    metric: 'Replaces phone bookings · Saves 2hrs/day',
    tech: ['React', 'Firebase', 'Tailwind'],
    category: 'Full Stack',
    year: '2025',
  },
  {
    name: 'Jollie Macaron',
    link: 'https://jollie-macaron.vercel.app/',
    img: PH('1558326567-98ae2405596b'),
    desc: 'Pastel-themed bakery website with product gallery, order form, and delightful micro-animations.',
    metric: 'Brand launched online · 100% mobile friendly',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
  },
  {
    name: 'BackpackTales – Travel Blog',
    link: 'https://back-packtales.vercel.app/',
    img: PH('1501854140801-50d01698950b'),
    desc: 'Travel storytelling blog with immersive full-width layouts, destination cards, and rich editorial typography.',
    metric: 'SEO-ready · Fast image loading',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
  },

  /* ── OLDER / VANILLA ── */
  // {
  //   name: 'Space Tourism',
  //   link: 'https://space-tourism-five-eta.vercel.app/',
  //   img: space,
  //   desc: 'Responsive multipage space travel site with animated tab navigation — Frontend Mentor challenge.',
  //   metric: '100 Lighthouse accessibility score',
  //   tech: ['React', 'SCSS', 'Framer Motion'],
  //   category: 'React',
  //   year: '2024',
  // },
  // {
  //   name: 'Task Manager',
  //   link: 'https://task-manager-five-umber.vercel.app/',
  //   img: taskManager,
  //   desc: 'Kanban-style task tracker with drag-and-drop columns and analytics charts.',
  //   metric: 'Full DnD · Real-time chart updates',
  //   tech: ['React', 'DnD', 'Chart.js'],
  //   category: 'React',
  //   year: '2024',
  // },
  // {
  //   name: 'Flower Delivery',
  //   link: 'https://flower-delivery-nu.vercel.app/',
  //   img: flower,
  //   desc: 'Floral delivery landing page with elegant UI and smooth CSS interactions.',
  //   metric: 'Sub-1s load · Pixel-perfect',
  //   tech: ['HTML', 'CSS', 'JavaScript'],
  //   category: 'Vanilla',
  //   year: '2023',
  // },
  // {
  //   name: 'Huddle Landing Page',
  //   link: 'https://huddle-xi-ten.vercel.app/',
  //   img: huddle,
  //   desc: 'Clean landing page for a mock collaboration platform — pixel-perfect from design spec.',
  //   metric: '100% responsive · Pixel-perfect',
  //   tech: ['HTML', 'Tailwind CSS'],
  //   category: 'Vanilla',
  //   year: '2023',
  // },
];

/* ─── Card component ─── */
const ProjectCard: React.FC<{ item: Project; idx: number; featured?: boolean }> = ({ item, idx, featured }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: idx * 0.05, duration: 0.5 }}
    whileHover={{ y: -7 }}
    onClick={() => item.link !== '#' && window.open(item.link, '_blank')}
    style={{
      borderRadius: 20, overflow: 'hidden',
      background: featured ? 'rgba(12,26,44,0.9)' : 'rgba(10,22,40,0.8)',
      border: featured ? '1px solid rgba(20,184,166,0.12)' : '1px solid rgba(255,255,255,0.06)',
      boxShadow: featured ? '0 24px 64px rgba(0,0,0,0.5)' : '0 16px 48px rgba(0,0,0,0.35)',
      cursor: item.link !== '#' ? 'pointer' : 'default',
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(20,184,166,0.25)';
      e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = featured ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.06)';
      e.currentTarget.style.boxShadow = featured ? '0 24px 64px rgba(0,0,0,0.5)' : '0 16px 48px rgba(0,0,0,0.35)';
    }}
  >
    {/* Image */}
    <div style={{ position: 'relative', overflow: 'hidden', height: featured ? 210 : 170 }}>
      <img
        src={item.img}
        alt={item.name}
        loading="lazy"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: 'brightness(0.7)', transition: 'transform 0.6s ease, filter 0.4s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.filter = 'brightness(0.9)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.7)'; }}
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'; }}
      />

      {featured ? (
        <div style={{
          position: 'absolute', top: 12, left: 14, padding: '4px 10px', borderRadius: 20,
          background: 'rgba(20,184,166,0.2)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(20,184,166,0.35)',
          fontSize: 10, color: '#5eead4', fontFamily: 'monospace', letterSpacing: '0.08em',
        }}>★ FEATURED</div>
      ) : (
        <div style={{
          position: 'absolute', top: 12, left: 14, padding: '4px 10px', borderRadius: 20,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: 11, color: '#64748b', fontFamily: 'monospace',
        }}>{item.year}</div>
      )}

      {item.link !== '#' && (
        <div style={{
          position: 'absolute', top: 12, right: 14, width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8',
        }}>
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
        background: 'linear-gradient(to top, rgba(10,22,40,1), transparent)', pointerEvents: 'none',
      }} />
    </div>

    {/* Body */}
    <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{ fontSize: featured ? 16 : 14, fontWeight: 700, color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>
          {item.name}
        </h3>
        {featured && (
          <span style={{ fontSize: 10, color: '#334155', fontFamily: 'monospace', whiteSpace: 'nowrap', paddingTop: 2 }}>
            {item.year}
          </span>
        )}
      </div>

      <p style={{
        fontSize: 12, color: '#475569', lineHeight: 1.65, margin: 0, flex: 1,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {item.desc}
      </p>

      {/* Metric */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#14b8a6', display: 'inline-block', flexShrink: 0, marginTop: 5 }} />
        <p style={{ fontSize: 11, color: '#5eead4', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>{item.metric}</p>
      </div>

      {/* Tech chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 4 }}>
        {item.tech.map((t) => {
          const c = techColors[t] || defaultChip;
          return (
            <span key={t} style={{
              fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.07em',
              padding: '3px 8px', borderRadius: 20,
              color: c.color, background: c.bg, border: `1px solid ${c.border}`, fontWeight: 600,
            }}>
              {t}
            </span>
          );
        })}
      </div>
    </div>
  </motion.div>
);

/* ─── Main component ─── */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered      = projects.filter((p) => activeFilter === 'All' || p.category === activeFilter);
  const featuredList  = filtered.filter((p) => p.featured);
  const regularList   = filtered.filter((p) => !p.featured);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
      minHeight: '100vh', color: '#e2e8f0', position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title="Projects | React & React Native Developer | Amit Sarode"
        description="Frontend and full-stack projects by Amit Sarode — AI tools, HRMS, ecommerce, mobile apps, and client websites built with React, Firebase, and Tailwind."
        path="/projects"
      />

      {/* Grid lines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(20,184,166,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.025) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />
      <div style={{
        position: 'fixed', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 24px 100px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>03 / WORK</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.1,
              background: 'linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0,
            }}>
              Selected Works
            </h1>
            <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#334155', paddingBottom: 4 }}>
              {filtered.length} projects
            </span>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'flex', gap: 8, marginBottom: 52, flexWrap: 'wrap' }}
        >
          {filters.map((f) => (
            <motion.button key={f} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 500,
                fontFamily: 'monospace', letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 0.25s',
                border: activeFilter === f ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(255,255,255,0.07)',
                background: activeFilter === f ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.02)',
                color: activeFilter === f ? '#5eead4' : '#475569',
              }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured section */}
        <AnimatePresence>
          {featuredList.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 11, color: '#1e3a35', fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
                ★ Featured
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                <AnimatePresence mode="popLayout">
                  {featuredList.map((item, idx) => <ProjectCard key={item.name} item={item} idx={idx} featured />)}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        {featuredList.length > 0 && regularList.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.15), transparent)' }} />
            <span style={{ fontSize: 11, color: '#1e3a35', fontFamily: 'monospace', letterSpacing: '0.1em' }}>MORE WORK</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.15), transparent)' }} />
          </div>
        )}

        {/* Regular grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          <AnimatePresence mode="popLayout">
            {regularList.map((item, idx) => <ProjectCard key={item.name} item={item} idx={idx} />)}
          </AnimatePresence>
        </motion.div>

        {/* Case study CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            marginTop: 60, padding: '28px 32px', borderRadius: 20,
            background: 'rgba(20,184,166,0.04)', border: '1px solid rgba(20,184,166,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', margin: '0 0 4px' }}>Deep dive: Healthcare App</p>
            <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>Problem → approach → tech decisions → outcome.</p>
          </div>
          <Link to="/case-study/healthcare" style={{
            padding: '10px 22px', borderRadius: 50,
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none',
            whiteSpace: 'nowrap', letterSpacing: '0.02em',
          }}>
            Read Case Study →
          </Link>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '80px 0', color: '#334155', fontFamily: 'monospace' }}>
              No projects in this category yet.
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Projects;
