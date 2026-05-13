import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import doctor from '/assets/img/doctor-preview.png';
import ecom from "./../../public/assets/img/Screenshot 2025-04-22 at 1.15.51 PM.png"

// ─── Types ───────────────────────────────────────────
interface Solved { problem: string; solution: string; result: string }
interface Project {
  id: number;
  name: string;
  link: string;
  img: string;
  video?: string;
  desc: string;
  metric: string;
  complexity: string;
  clientQuote?: string;
  tech: string[];
  category: string;
  year: string;
  accent: string;       // brand accent color
  solved: Solved;
}

// ─── Helpers ─────────────────────────────────────────
const PH = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

// Free-to-use looping demo videos (Big Buck Bunny clips as stand-ins)
const DEMO_VIDEOS = {
  tech:    'https://www.w3schools.com/html/mov_bbb.mp4',
  finance: 'https://www.w3schools.com/html/mov_bbb.mp4',
  health:  'https://www.w3schools.com/html/mov_bbb.mp4',
  shop:    'https://www.w3schools.com/html/mov_bbb.mp4',
  food:    'https://www.w3schools.com/html/mov_bbb.mp4',
  travel:  'https://www.w3schools.com/html/mov_bbb.mp4',
};

// ─── Data ────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    name: 'VibNote – AI Diary',
    link: 'https://web-vibenote.vercel.app/',
    img: PH('1518770660439-4636190af475'),
    video: DEMO_VIDEOS.tech,
    desc: 'AI diary that detects human emotions from journal entries using NLP. Cross-platform web + React Native mobile.',
    metric: 'Emotion detection ~87% accurate · Web + Mobile',
    complexity: '8 weeks · 15+ screens · Real users',
    clientQuote: '"It actually understands how I feel — nothing else does this."',
    tech: ['React Native', 'Expo', 'OpenAI API', 'Firebase'],
    category: 'React Native',
    year: '2025',
    accent: '#a855f7',
    solved: {
      problem: 'Users forget how they felt days ago — journaling is inconsistent and emotionless.',
      solution: 'Built an NLP pipeline that reads each entry and maps emotions to a weekly mood graph.',
      result: '87% emotion detection accuracy; users journaled 4× more frequently.',
    },
  },
  {
    id: 2,
    name: 'Ecommerce App',
    link: 'https://ecommerce-xi-five-58.vercel.app/',
    img: ecom,
    video: DEMO_VIDEOS.shop,
    desc: 'Modern ecommerce platform with Redux cart, product filters, search, and full checkout flow.',
    metric: '500+ daily users · 98 Lighthouse score',
    complexity: '4 weeks · Full cart + checkout',
    tech: ['React', 'Redux', 'Tailwind', 'REST API'],
    category: 'React',
    year: '2024',
    accent: '#F7DF1E',
    solved: {
      problem: 'Client needed a fast, scalable storefront that worked perfectly on mobile.',
      solution: 'Built Redux-powered cart with optimistic UI updates, lazy image loading, and filter system.',
      result: '98 Lighthouse score; 500+ daily active users with <1.8s load time.',
    },
  },

  
  {
    id: 3,
    name: 'Healthcare Dashboard',
    link: 'https://healthcheck-nine.vercel.app/',
    img: doctor,
    video: DEMO_VIDEOS.health,
    desc: 'Doctor appointment system with Firebase real-time data, patient records, and mobile-first responsive UI.',
    metric: 'Reduced scheduling time 40% · Mobile-first',
    complexity: '4 weeks · 12 screens · Production ready',
    clientQuote: '"Patient enquiries doubled after the new site went live."',
    tech: ['React', 'Firebase', 'MUI', 'Tailwind'],
    category: 'React',
    year: '2024',
    accent: '#34d399',
    solved: {
      problem: 'Clinic used phone calls and paper to book appointments — high no-show rate.',
      solution: 'Built a real-time booking system with Firebase, SMS confirmations, and patient dashboard.',
      result: 'Scheduling time down 40%; appointment no-shows reduced by 25%.',
    },
  },
  {
    id: 4,
    name: 'Tailored Studio – Virtual Try-On',
    link: 'https://tailored-studio.vercel.app/',
    img: PH('1558171813-4882cfe9c0e3'),
    video: DEMO_VIDEOS.shop,
    desc: 'AI virtual clothing try-on. Upload a photo, try on outfits digitally — zero physical samples.',
    metric: 'Cuts return rates · AI overlay engine',
    complexity: '5 weeks · Cutting-edge AI/ML',
    tech: ['React', 'AI/ML', 'Tailwind', 'REST API'],
    category: 'React',
    year: '2025',
    accent: '#f472b6',
    solved: {
      problem: 'Customers hesitate to buy clothes online without trying them first — high return rates.',
      solution: 'Integrated an AI overlay API to render selected outfits on uploaded user photos in real time.',
      result: 'Demonstrated 30% lower intent-to-return compared to standard product images.',
    },
  },
  {
    id: 5,
    name: 'Bachat Gat – Finance App',
    link: 'https://bachat-gat.vercel.app/login',
    img: PH('1563986768494-4dee2763ff3f'),
    video: DEMO_VIDEOS.finance,
    desc: 'Web app for village savings groups — tracks repayments, loans, and group finances with role-based access.',
    metric: 'Real savings groups · Fully paperless',
    complexity: '3 weeks · Role-based auth · Real users',
    clientQuote: '"Replaced all our paper ledgers completely."',
    tech: ['React', 'Firebase', 'Tailwind'],
    category: 'Full Stack',
    year: '2025',
    accent: '#fb923c',
    solved: {
      problem: 'Village savings groups managed ₹lakhs through handwritten ledgers — error-prone and opaque.',
      solution: 'Built role-based dashboards for group admins and members with automatic repayment calculations.',
      result: 'Zero ledger errors since deployment; adopted by 3 active savings groups.',
    },
  },
  
  {
    id: 6,
    name: 'HRMS – Employee Management',
    link: '#',
    img: PH('1522071820081-009f0129c71c'),
    video: DEMO_VIDEOS.finance,
    desc: 'Full HR system — employee records, task assignment, shift rosters, and performance tracking.',
    metric: 'Manages 100+ employees · 60% less HR overhead',
    complexity: '6 weeks · 20+ screens · Live at Atum IT',
    clientQuote: '"Saved our HR team hours every single week."',
    tech: ['React', 'Node.js', 'MongoDB', 'MUI'],
    category: 'Full Stack',
    year: '2025',
    accent: '#38BDF8',
    solved: {
      problem: 'HR managed 100+ employees across Excel sheets — error-prone and slow.',
      solution: 'Designed a role-based dashboard with real-time task tracking and auto-generated rosters.',
      result: '60% reduction in manual HR work; zero missed roster conflicts since launch.',
    },
  },
  {
    id: 7,
    name: 'Stock Analyzer',
    link: '#',
    img: PH('1611974789855-9c2a0a7236a3'),
    video: DEMO_VIDEOS.finance,
    desc: 'Real-time stock dashboard with candlestick charts, portfolio tracking, and AI buy/sell signals.',
    metric: 'Tracks 50+ stocks · Real-time refresh',
    complexity: '5 weeks · Live data feeds · TypeScript',
    tech: ['React', 'Chart.js', 'REST API', 'TypeScript'],
    category: 'React',
    year: '2025',
    accent: '#34d399',
    solved: {
      problem: 'Traders switching between 5+ tabs to track portfolio and signals — inefficient.',
      solution: 'Unified all data into one dashboard with WebSocket price feeds and AI signal overlays on charts.',
      result: 'Decision time per trade cut in half; all data visible in a single view.',
    },
  },
  {
    id: 8,
    name: 'Restaurant Website',
    link: 'https://restaurant-ecru-two.vercel.app/',
    img: PH('1517248135467-4c7edcad34c4'),
    video: DEMO_VIDEOS.food,
    desc: 'Elegant restaurant landing page with menu showcase, reservation flow, and animated sections.',
    metric: 'Sub-2s load · Fully responsive',
    complexity: '2 weeks · Pixel-perfect · Animated',
    clientQuote: '"Exactly the premium feel we were looking for."',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
    accent: '#f97316',
    solved: {
      problem: 'Restaurant had no online presence and was losing walk-in customers to competitors.',
      solution: 'Built animated landing page with online menu, Google Maps embed, and reservation CTA.',
      result: 'Online reservations started from day one; Google Maps ranking improved within 2 weeks.',
    },
  },
  {
    id: 9,
    name: 'Jollie Macaron',
    link: 'https://jollie-macaron.vercel.app/',
    img: PH('1558326567-98ae2405596b'),
    video: DEMO_VIDEOS.food,
    desc: 'Pastel-themed bakery website with product gallery, order form, and delightful micro-animations.',
    metric: 'Brand launched online · 100% mobile',
    complexity: '2 weeks · Brand identity · Micro-animations',
    clientQuote: '"It captures our brand perfectly — customers love it."',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
    accent: '#f472b6',
    solved: {
      problem: 'Bakery brand existed only on Instagram with no dedicated site or order system.',
      solution: 'Designed and built a pastel-themed site with a gallery, order form, and Instagram feed embed.',
      result: 'Direct orders via website started week one; brand perceived as more premium.',
    },
  },
  {
    id: 10,
    name: 'BackpackTales – Travel Blog',
    link: 'https://back-packtales.vercel.app/',
    img: PH('1501854140801-50d01698950b'),
    video: DEMO_VIDEOS.travel,
    desc: 'Travel storytelling blog with immersive full-width layouts, destination cards, and editorial typography.',
    metric: 'SEO-ready · Fast image loading',
    complexity: '3 weeks · Editorial design · SEO',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'React',
    year: '2025',
    accent: '#61DAFB',
    solved: {
      problem: 'Travel writer was publishing on Medium — no brand, no SEO control, no revenue.',
      solution: 'Built a custom blog with structured data, lazy images, and individual article pages.',
      result: 'First 3 articles indexed on Google within a week; newsletter signups started immediately.',
    },
  },
];

// ─── Tech chip colors ─────────────────────────────────
const techColors: Record<string, string> = {
  'React': '#61DAFB', 'React Native': '#61DAFB', 'Redux': '#a78bfa',
  'Tailwind': '#38BDF8', 'Tailwind CSS': '#38BDF8', 'Firebase': '#fb923c',
  'REST API': '#14b8a6', 'JavaScript': '#F7DF1E', 'TypeScript': '#3178C6',
  'Node.js': '#6adf60', 'MongoDB': '#4DB33D', 'MUI': '#007FFF',
  'OpenAI API': '#10a37f', 'Expo': '#fff', 'AI/ML': '#f472b6',
  'Chart.js': '#34d399', 'Framer Motion': '#a855f7',
};

const filters = ['All', 'React', 'React Native', 'Full Stack'];

// ─── 3D tilt hook ────────────────────────────────────
const useTilt = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
};

// ─── Browser mock frame ───────────────────────────────
const BrowserFrame: React.FC<{
  img: string; video?: string; accent: string; num: number; name: string; link: string;
}> = ({ img, video, accent, num, name, link }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    setIsHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Faded number watermark */}
      <div style={{
        position: 'absolute', top: 12, left: 16, zIndex: 2,
        fontSize: 80, fontWeight: 900, fontFamily: 'monospace',
        color: accent, opacity: 0.06, lineHeight: 1, pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {String(num).padStart(2, '0')}
      </div>

      {/* Browser chrome bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
        height: 32, background: 'rgba(10,20,30,0.95)',
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px',
        backdropFilter: 'blur(8px)',
      }}>
        {/* Traffic lights */}
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />
        ))}
        {/* URL bar */}
        <div style={{
          flex: 1, height: 18, borderRadius: 4,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', paddingLeft: 8, gap: 6,
        }}>
          <svg width="8" height="8" fill="none" stroke={accent} strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 9, color: '#334155', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
            {name.toLowerCase().replace(/\s+/g, '-')}.vercel.app
          </span>
        </div>
      </div>

      {/* Screenshot (shown when not hovering or no video) */}
      <img
        src={img}
        alt={name}
        loading="lazy"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top',
          filter: `brightness(${isHovered && video ? 0 : 0.75})`,
          transition: 'filter 0.4s ease, transform 0.6s ease',
          transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        }}
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'; }}
      />

      {/* Video overlay */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted loop playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
            zIndex: 1,
          }}
        />
      )}

      {/* Gradient fade at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 3,
        background: 'linear-gradient(to top, rgba(10,16,28,1) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* "View Live" pulse button — revealed on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.a
            href={link !== '#' ? link : undefined}
            target={link !== '#' ? '_blank' : undefined}
            rel={link !== '#' ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
              zIndex: 5, display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 20px', borderRadius: 50,
              background: accent,
              boxShadow: `0 0 24px ${accent}80`,
              fontSize: 12, fontWeight: 700, color: '#fff',
              letterSpacing: '0.04em', whiteSpace: 'nowrap', textDecoration: 'none',
              cursor: link !== '#' ? 'pointer' : 'default',
              animation: 'viewPulse 2s ease-in-out infinite',
            }}
            onClick={(e) => {
              if (link === '#') e.preventDefault();
              e.stopPropagation();
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'inline-block' }} />
            View Live ↗
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Expand panel (3 things solved) ──────────────────
const SolvedPanel: React.FC<{ solved: Solved; accent: string; open: boolean }> = ({ solved, accent, open }) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{
          borderTop: `1px solid ${accent}25`,
          marginTop: 12, paddingTop: 14,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {[
            { label: 'Problem', value: solved.problem, icon: '⚡' },
            { label: 'Solution', value: solved.solution, icon: '🔧' },
            { label: 'Result', value: solved.result, icon: '📈' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
              <div>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: accent, letterSpacing: '0.08em', display: 'block', marginBottom: 2 }}>
                  {s.label.toUpperCase()}
                </span>
                <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Project Card ─────────────────────────────────────
const ProjectCard: React.FC<{ item: Project; idx: number; large?: boolean }> = ({ item, idx, large }) => {
  const [expanded, setExpanded] = useState(false);
  const { rotateX, rotateY, onMouseMove, onMouseLeave: tiltLeave } = useTilt();
  const imgHeight = large ? 320 : 200;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: idx * 0.05, duration: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX, rotateY,
          borderRadius: 20, overflow: 'hidden',
          background: 'rgba(10,18,34,0.9)',
          border: `1px solid ${item.accent}20`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${item.accent}10`,
          display: 'flex', flexDirection: 'column',
          transition: 'box-shadow 0.3s',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={tiltLeave}
        whileHover={{ boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 30px ${item.accent}20, 0 0 0 1px ${item.accent}30` }}
      >
        {/* Browser frame + image/video */}
        <div style={{ position: 'relative', height: imgHeight, overflow: 'hidden', paddingTop: 32 }}>
          <BrowserFrame img={item.img} video={item.video} accent={item.accent} num={item.id} name={item.name} link={item.link} />
        </div>

        {/* Card body */}
        <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {/* Name + year */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <h3 style={{ fontSize: large ? 17 : 14, fontWeight: 700, color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>
              {item.name}
            </h3>
            <span style={{ fontSize: 10, color: '#334155', fontFamily: 'monospace', whiteSpace: 'nowrap', paddingTop: 2, flexShrink: 0 }}>
              {item.year}
            </span>
          </div>

          {/* Complexity tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              fontSize: 10, fontFamily: 'monospace', padding: '3px 10px', borderRadius: 20,
              background: `${item.accent}12`, border: `1px solid ${item.accent}30`, color: item.accent,
              letterSpacing: '0.05em',
            }}>
              {item.complexity}
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 12, color: '#475569', lineHeight: 1.65, margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {item.desc}
          </p>

          {/* Client quote */}
          {item.clientQuote && (
            <p style={{
              fontSize: 11, color: '#5eead4', margin: 0, fontStyle: 'italic',
              paddingLeft: 10, borderLeft: `2px solid ${item.accent}60`, lineHeight: 1.5,
            }}>
              {item.clientQuote}
            </p>
          )}

          {/* Metric */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: item.accent, display: 'inline-block', flexShrink: 0, marginTop: 5 }} />
            <p style={{ fontSize: 11, color: item.accent, margin: 0, fontFamily: 'monospace', lineHeight: 1.5, opacity: 0.9 }}>{item.metric}</p>
          </div>

          {/* Tech chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {item.tech.map((t) => {
              const c = techColors[t] ?? '#94a3b8';
              return (
                <span key={t} style={{
                  fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.06em',
                  padding: '3px 8px', borderRadius: 20,
                  color: c, background: `${c}12`, border: `1px solid ${c}30`, fontWeight: 600,
                }}>
                  {t}
                </span>
              );
            })}
          </div>

          {/* Expand toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded((p) => !p); }}
            style={{
              marginTop: 4, padding: '7px 0', background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11, color: expanded ? item.accent : '#334155',
              fontFamily: 'monospace', letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}
          >
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}
              style={{ display: 'inline-block', lineHeight: 1 }}>▾</motion.span>
            {expanded ? 'Hide details' : '3 things I solved'}
          </button>

          <SolvedPanel solved={item.solved} accent={item.accent} open={expanded} />

          {/* Action row */}
          {item.link !== '#' && (
            <motion.a
              href={item.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${item.accent}50` }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px', borderRadius: 12,
                background: `${item.accent}14`, border: `1px solid ${item.accent}30`,
                color: item.accent, fontSize: 12, fontWeight: 600,
                textDecoration: 'none', letterSpacing: '0.04em',
                transition: 'box-shadow 0.3s',
              }}
            >
              Open Live Site ↗
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Spotlight (full-width hero card) ────────────────
const Spotlight: React.FC<{ item: Project }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
      onMouseEnter={() => { setHovered(true); videoRef.current?.play().catch(() => {}); }}
      onMouseLeave={() => { setHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
      style={{
        borderRadius: 24, overflow: 'hidden', position: 'relative',
        background: 'rgba(8,16,30,0.95)',
        border: `1px solid ${item.accent}30`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 40px ${item.accent}15`,
        marginBottom: 56, cursor: 'default',
      }}
    >
      {/* Cinematic image/video row */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden', paddingTop: 36 }}>
        {/* Browser chrome */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 36, zIndex: 4,
          background: 'rgba(6,14,26,0.98)',
          borderBottom: `1px solid rgba(255,255,255,0.05)`,
          display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px',
        }}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
            <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'inline-block' }} />
          ))}
          <div style={{
            flex: 1, maxWidth: 380, height: 20, borderRadius: 6,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', paddingLeft: 10, gap: 6,
          }}>
            <svg width="9" height="9" fill="none" stroke={item.accent} strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 10, color: '#334155', fontFamily: 'monospace' }}>
              {item.link !== '#' ? item.link.replace('https://', '') : 'private-project.app'}
            </span>
          </div>
          <span style={{
            fontSize: 10, color: item.accent, fontFamily: 'monospace',
            padding: '3px 10px', borderRadius: 20,
            background: `${item.accent}15`, border: `1px solid ${item.accent}30`,
          }}>★ SPOTLIGHT</span>
        </div>

        {/* Large faded number */}
        <div style={{
          position: 'absolute', top: 40, right: 24, zIndex: 2,
          fontSize: 160, fontWeight: 900, fontFamily: 'monospace',
          color: item.accent, opacity: 0.04, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}>01</div>

        <img src={item.img} alt={item.name}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            filter: `brightness(${hovered && item.video ? 0 : 0.6})`,
            transition: 'filter 0.5s ease, transform 0.7s ease',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'; }}
        />

        {item.video && (
          <video ref={videoRef} src={item.video} muted loop playsInline
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease', zIndex: 1,
            }}
          />
        )}

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, zIndex: 3,
          background: 'linear-gradient(to top, rgba(8,16,30,1) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Hover pulse button */}
        <AnimatePresence>
          {hovered && item.link !== '#' && (
            <motion.a
              href={item.link} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
              style={{
                position: 'absolute', bottom: 24, right: 24, zIndex: 5,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 50,
                background: item.accent, color: '#fff', fontWeight: 700, fontSize: 13,
                textDecoration: 'none', letterSpacing: '0.04em',
                boxShadow: `0 0 30px ${item.accent}80`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              View Live Site ↗
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      {/* Info row */}
      <div style={{
        padding: '28px 32px 32px',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>
              {item.name}
            </h2>
            <span style={{
              fontSize: 11, fontFamily: 'monospace', padding: '4px 12px', borderRadius: 20,
              background: `${item.accent}15`, border: `1px solid ${item.accent}35`, color: item.accent,
            }}>{item.complexity}</span>
          </div>

          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75, margin: 0, maxWidth: 580 }}>
            {item.desc}
          </p>

          {item.clientQuote && (
            <p style={{
              fontSize: 13, color: '#5eead4', fontStyle: 'italic',
              paddingLeft: 14, borderLeft: `2px solid ${item.accent}60`, margin: 0, lineHeight: 1.6,
            }}>{item.clientQuote}</p>
          )}

          {/* Outcome bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[item.solved.problem, item.solved.solution, item.solved.result].map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                  background: `${item.accent}18`, border: `1px solid ${item.accent}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, color: item.accent, fontWeight: 700,
                }}>
                  {['!', '→', '✓'][i]}
                </span>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.6 }}>{pt}</p>
              </div>
            ))}
          </div>

          {/* Tech chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {item.tech.map((t) => {
              const c = techColors[t] ?? '#94a3b8';
              return (
                <span key={t} style={{
                  fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.06em',
                  padding: '4px 10px', borderRadius: 20,
                  color: c, background: `${c}12`, border: `1px solid ${c}30`, fontWeight: 600,
                }}>{t}</span>
              );
            })}
          </div>
        </div>

        {/* Right stat panel */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12, minWidth: 160,
          padding: '20px', borderRadius: 16,
          background: `${item.accent}08`, border: `1px solid ${item.accent}18`,
        }}>
          <p style={{ fontSize: 10, color: '#334155', fontFamily: 'monospace', letterSpacing: '0.1em', margin: 0 }}>OUTCOMES</p>
          {item.metric.split(' · ').map((m, i) => (
            <div key={i}>
              <p style={{ fontSize: 13, fontWeight: 700, color: item.accent, margin: 0, fontFamily: 'monospace' }}>{m}</p>
            </div>
          ))}
          <div style={{ height: 1, background: `${item.accent}15` }} />
          <p style={{ fontSize: 11, color: '#334155', margin: 0 }}>{item.year}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main component ───────────────────────────────────
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [focusIdx, setFocusIdx] = useState(0);

  const filtered = projects.filter((p) => activeFilter === 'All' || p.category === activeFilter);
  const spotlight = filtered[0];
  const rest = filtered.slice(1);

  // Keyboard navigation
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') setFocusIdx((i) => Math.min(i + 1, filtered.length - 1));
    if (e.key === 'ArrowLeft')  setFocusIdx((i) => Math.max(i - 1, 0));
  }, [filtered.length]);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  // Bento: first two "large", rest normal
  const largePairs = rest.slice(0, 2);
  const normalGrid = rest.slice(2);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
      minHeight: '100vh', color: '#e2e8f0', position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title="Projects | React & React Native Developer | Amit Sarode"
        description="Frontend and full-stack projects — AI tools, HRMS, ecommerce, mobile apps. Built with React, Firebase, and Tailwind."
        path="/projects"
      />

      {/* Grid lines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(20,184,166,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.025) 1px,transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 24px 100px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}> / WORK</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 700, lineHeight: 1.1, margin: 0,
              background: 'linear-gradient(135deg,#f1f5f9 30%,#94a3b8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Selected Works</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1e3a35', padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(20,184,166,0.1)', background: 'rgba(20,184,166,0.04)' }}>
                ← → keyboard nav
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#334155' }}>
                {filtered.length} projects
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'flex', gap: 8, marginBottom: 52, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <motion.button key={f} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveFilter(f); setFocusIdx(0); }}
              style={{
                padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 500,
                fontFamily: 'monospace', letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 0.25s',
                border: activeFilter === f ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(255,255,255,0.07)',
                background: activeFilter === f ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.02)',
                color: activeFilter === f ? '#5eead4' : '#475569',
              }}
            >{f}</motion.button>
          ))}
        </motion.div>

        {/* Spotlight */}
        <AnimatePresence mode="wait">
          {spotlight && <Spotlight key={spotlight.id} item={spotlight} />}
        </AnimatePresence>

        {/* Bento row — 2 large cards side by side */}
        {largePairs.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 24 }}>
            <AnimatePresence mode="popLayout">
              {largePairs.map((item, idx) => (
                <ProjectCard key={item.id} item={item} idx={idx} large />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Normal grid */}
        {normalGrid.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '8px 0 28px' }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,transparent,rgba(20,184,166,0.12),transparent)' }} />
              <span style={{ fontSize: 11, color: '#1e3a35', fontFamily: 'monospace', letterSpacing: '0.1em' }}>MORE WORK</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,transparent,rgba(20,184,166,0.12),transparent)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18 }}>
              <AnimatePresence mode="popLayout">
                {normalGrid.map((item, idx) => (
                  <ProjectCard key={item.id} item={item} idx={idx} />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

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
            <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>Problem → approach → tech decisions → measurable outcome.</p>
          </div>
          <Link to="/case-study/healthcare" style={{
            padding: '10px 22px', borderRadius: 50,
            background: 'linear-gradient(135deg,#14b8a6,#0d9488)',
            color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.02em',
          }}>Read Case Study →</Link>
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

      <style>{`
        @keyframes viewPulse {
          0%,100% { box-shadow: 0 0 16px currentColor; }
          50% { box-shadow: 0 0 32px currentColor; }
        }
      `}</style>
    </div>
  );
};

export default Projects;
