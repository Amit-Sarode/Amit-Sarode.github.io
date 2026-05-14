import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImg from '/assets/img/profileImg.png';
import doctor from '/assets/img/doctor-preview.png';
import ecom from '../../public/assets/img/ecom.png';
import react from '/assets/img/react.svg';
import Tilt3D from './ThreeDTilt';
import SEO from './SEO';



interface Skill {
  name: string;
  desc: string;
  level: number;
  color: string;
  badge: string;
  tags: string[];
  icon: string;
  featured?: boolean;
  bg: string;
}
 
function SkillCard({ skill, index }: { skill: any; index: number }) {
  const { color } = skill;
  const colorBg   = `${color}14`; // ~8% opacity fill
  const colorBorder = `${color}28`; // ~16% opacity border
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.015 }}
      style={{
        position: 'relative',
        padding: '22px 24px',
        borderRadius: 18,
        background:  'rgba(255,255,255,0.02)',
        border: `1px solid rgba(255,255,255,0.06)`,
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.25s',
      }}
      className="skill-card group"
    >
      {/* Hover top-border glow — rendered via CSS class below */}
      <style>{`
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, ${color}, transparent);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .skill-card:hover::before { opacity: 1; }
        .skill-card:hover { border-color: ${color} !important; }
      `}</style>
 
      {/* Corner ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 130,
          height: 130,
          borderRadius: '50%',
          background: color,
          opacity: 0.04,
          filter: 'blur(32px)',
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
        }}
        className="group-hover:opacity-[0.09]"
      />
 
      {/* Featured badge */}
      {skill.featured && (
        <span
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            fontSize: 9,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color,
            padding: '2px 8px',
            border: `1px solid ${colorBorder}`,
            borderRadius: 20,
            background: colorBg,
          }}
        >
          Featured
        </span>
      )}
 
      {/* Top row: icon + badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: colorBg,
            border: `1px solid ${colorBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            style={{
              width: 22,
              height: 22,
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: 0.85,
            }}
          />
        </div>
 
        {/* Badge */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.08em',
            padding: '3px 10px',
            borderRadius: 20,
            background: colorBg,
            color,
            border: `1px solid ${colorBorder}`,
            whiteSpace: 'nowrap',
          }}
        >
          {skill.badge}
        </span>
      </div>
 
      {/* Name */}
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: '#e2e8f0',
          margin: '0 0 6px',
          lineHeight: 1.3,
        }}
      >
        {skill.name}
      </p>
 
      {/* Description */}
      <p
        style={{
          fontSize: 12,
          color: '#475569',
          fontWeight: 300,
          margin: '0 0 16px',
          lineHeight: 1.55,
        }}
      >
        {skill.desc}
      </p>
 
      {/* Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          gap: 6,
          marginBottom: 18,
        }}
      >
        {skill.tags.map((tag:any) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              letterSpacing: '0.05em',
              padding: '2px 8px',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.04)',
              color: '#64748b',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
 
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            flex: 1,
            height: 3,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
              delay: index * 0.08,
            }}
            style={{
              height: '100%',
              borderRadius: 3,
              background: color,
              boxShadow: `0 0 8px ${color}60`,
            }}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            color,
            fontFamily: 'monospace',
            minWidth: 36,
            textAlign: 'right' as const,
          }}
        >
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Animated background canvas (floating orbs) ─── */
const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 200 + Math.random() * 200,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      hue: [168, 180, 200, 160, 190, 150][i],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 70%, 55%, 0.12)`);
        g.addColorStop(1, `hsla(${o.hue}, 70%, 55%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        o.x += o.dx;
        o.y += o.dy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

/* ─── Noise texture overlay ─── */
const NoiseOverlay: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '200px',
    }}
  />
);

/* ─── Floating grid lines ─── */
const GridLines: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
    }}
  />
);

/* ─── Typewriter hook ─── */
const useTypewriter = (texts: string[]) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 45 : 130);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  return displayText;
};

/* ─── Scroll-reveal wrapper ─── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

/* ─── Section divider ─── */
const Divider: React.FC = () => (
  <div className="flex items-center gap-4 my-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
    <div className="h-1.5 w-1.5 rounded-full bg-teal-500/50" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
  </div>
);

/* ═══════════════════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════════════════ */
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  const displayText = useTypewriter([
    'Frontend Developer',
    'React Native Developer',
    'UI/UX Enthusiast',
    'React Engineer',
  ]);


  // ── Paste these arrays just above the Hero component ──

const clients = [
  { name: 'Atum IT Pvt. Ltd.',       type: 'Technology',      emoji: '🏢' },
  { name: 'Chariot Bar',             type: 'Hospitality',     emoji: '🍸' },
  { name: 'Travel One Studio',       type: 'Travel & Tourism', emoji: '✈️' },
  { name: 'Lead Dentist Clinic',     type: 'Healthcare',      emoji: '🦷' },
  { name: 'Jollie Macaron',          type: 'Bakery & Food',   emoji: '🍰' },
  { name: 'FitForge Gym',            type: 'Fitness',         emoji: '💪' },
  { name: 'BackpackTales',           type: 'Travel Blog',     emoji: '🎒' },
  { name: 'Glamour Salon',           type: 'Beauty & Wellness', emoji: '✂️' },
  { name: 'Bachat Gat',             type: 'Finance & FinTech', emoji: '💰' },
  { name: 'VibNote',                type: 'AI / SaaS',        emoji: '🤖' },
];

const testimonials = [
  {
    name: 'Rahul M.',
    role: 'Founder · Chariot Bar',
    text: 'Amit built our website exactly the way we imagined it. Clean, fast, and professional. Our online presence improved significantly after launch.',
    stars: 5,
    initials: 'R',
    color: '#f59e0b',
    source: 'Google',
  },
  {
    name: 'Priya S.',
    role: 'Owner · Travel One Studio',
    text: 'Very responsive developer. He understood our travel brand instantly and delivered a beautiful, conversion-focused website within the deadline.',
    stars: 5,
    initials: 'P',
    color: '#61DAFB',
    source: 'Google',
  },
  {
    name: 'Dr. Neha K.',
    role: 'Lead Dentist Clinic',
    text: 'Our patient enquiries doubled after the new website went live. Amit was professional, fast, and easy to work with from start to finish.',
    stars: 5,
    initials: 'N',
    color: '#a78bfa',
    source: 'Google',
  },
  {
    name: 'Suresh P.',
    role: 'Manager · Bachat Gat',
    text: 'The repayment tracking app Amit built for our savings group replaced all our paper ledgers. It is simple, reliable, and our members love it.',
    stars: 5,
    initials: 'S',
    color: '#34d399',
    source: 'Direct',
  },
  {
    name: 'Anjali R.',
    role: 'HR Lead · Atum IT Pvt. Ltd.',
    text: 'The HRMS system Amit built internally has saved our HR team hours every week. Task management, rosters, and performance tracking all in one place.',
    stars: 5,
    initials: 'A',
    color: '#14b8a6',
    source: 'Internal',
  },
  {
    name: 'Vikram D.',
    role: 'Owner · FitForge Gym',
    text: 'Great work on the gym website. Exactly what we needed to showcase our trainers and membership plans. Very happy with the result.',
    stars: 4,
    initials: 'V',
    color: '#f97316',
    source: 'Google',
  },
];


  const skills = [
  {
    name: 'LLM Application Development',
    desc: 'Production-grade AI apps powered by GPT-4, Claude & Gemini',
    level: 92,
    color: '#8B5CF6',
    badge: 'Core',
    tags: ['GPT-4', 'Claude API', 'Agents', 'Fine-tuning'],
    icon: 'https://www.svgrepo.com/show/235148/chip-ai.svg',
    featured: true,
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  {
    name: 'Prompt Engineering',
    desc: 'Systematic prompt design for reliable, repeatable AI outputs',
    level: 90,
    color: '#EC4899',
    badge: 'Expert',
    tags: ['Chain-of-Thought', 'Few-shot', 'DSPy', 'Evals'],
    icon: 'https://www.svgrepo.com/show/143991/command-window.svg',
    bg: 'rgba(236, 72, 153, 0.08)',
  },
  {
    name: 'AI Chatbot Systems',
    desc: 'Conversational agents with memory, tools & multi-turn logic',
    level: 88,
    color: '#06B6D4',
    badge: 'Expert',
    tags: ['LangChain', 'WhatsApp', 'Slack Bots', 'NLP'],
    icon: 'https://www.svgrepo.com/show/409868/bot.svg',
    bg: 'rgba(6, 182, 212, 0.08)',
  },
  {
    name: 'RAG & Vector Databases',
    desc: 'Semantic search pipelines that bring knowledge to any AI model',
    level: 86,
    color: '#10B981',
    tags: ['Pinecone', 'Weaviate', 'pgvector', 'Embeddings'],
    icon: 'https://www.svgrepo.com/show/330289/deutschebank.svg',
    featured: true,
    bg: 'rgba(16, 185, 129, 0.08)',
  },
  {
    name: 'Full Stack Architecture',
    desc: 'Scalable, cloud-native backend & frontend systems built to grow',
    level: 90,
    color: '#F59E0B',
    badge: 'Expert',
    tags: ['Node.js', 'REST', 'GraphQL', 'Microservices'],
    icon: 'https://cdn.simpleicons.org/nodedotjs/white',
    bg: 'rgba(245, 158, 11, 0.08)',
  },
  {
    name: 'React & Next.js',
    desc: 'High-performance interfaces clients love — fast, clean, responsive',
    level: 92,
    color: '#61DAFB',
    badge: 'Core',
    tags: ['Next.js 14', 'Tailwind', 'Framer Motion', 'SSR'],
    icon: react,
    bg: 'rgba(97, 218, 251, 0.08)',
  },
  {
    name: 'TypeScript Systems',
    desc: 'Type-safe codebases that scale without breaking under pressure',
    level: 88,
    color: '#3178C6',
    badge: 'Advanced',
    tags: ['Zod', 'tRPC', 'Prisma', 'Type Guards'],
    icon: 'https://www.svgrepo.com/show/374144/typescript.svg',
    bg: 'rgba(49, 120, 198, 0.08)',
  },
  {
    name: 'API & Backend Engineering',
    desc: 'Robust APIs that connect your tools, data, and automation workflows',
    level: 85,
    color: '#339933',
    badge: 'Advanced',
    tags: ['Express', 'PostgreSQL', 'Redis', 'Webhooks'],
    icon: 'https://cdn.simpleicons.org/nodedotjs/white',
    bg: 'rgba(51, 153, 51, 0.08)',
  },
];

  const certificates = [
    { url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-896441cf-e535-45b3-84dd-fa3f21eb3428.jpg', title: 'Advanced React' },
    { url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-98a0333e-6ba1-4973-bcc5-46a44944f187.jpg', title: 'Frontend Web' },
    { url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-51b4a0db-d01d-469a-ba2b-747485bc045a.jpg', title: 'JavaScript ES6' },
  ];

  const projects = [
    { name: 'Ecommerce', img: ecom, tech: 'React / Redux', link: 'https://ecommerce-xi-five-58.vercel.app/', year: '2024' },
    { name: 'Healthcare', img: doctor, tech: 'Firebase / MUI', link: 'https://healthcheck-nine.vercel.app/', year: '2024' },
  ];

  return (
    /* Global dark background */
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
        title="Amit Sarode | React Developer Nagpur | Hire Frontend Developer India"
        description="React developer in Nagpur available for freelance and remote projects worldwide. Hire a frontend developer in India for fast, production-ready interfaces."
        path="/"
      />
      {/* Atmospheric layers */}
      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      {/* ── 1. HERO SECTION ── */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10"
      >
        {/* Glowing ring behind avatar */}
        <div
          style={{
            position: 'absolute',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />

        <Tilt3D>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              padding: 3,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14b8a6, #0e7490, #14b8a6)',
              boxShadow: '0 0 40px rgba(20,184,166,0.4), 0 0 80px rgba(20,184,166,0.15)',
            }}
          >
            <img
              className="rounded-full h-44 w-44 object-cover"
              style={{ display: 'block', background: '#0f172a' }}
              src={profileImg}
              alt="Amit Sarode"
            />
          </motion.div>
        </Tilt3D>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full"
          style={{
            background: 'rgba(20,184,166,0.08)',
            border: '1px solid rgba(20,184,166,0.25)',
            fontSize: 13,
            color: '#5eead4',
            letterSpacing: '0.05em',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#14b8a6',
              boxShadow: '0 0 8px #14b8a6',
              display: 'inline-block',
            }}
          />
          Available for freelance · Nagpur · Remote worldwide
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 font-bold tracking-tighter"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            lineHeight: 1.05,
            background: 'linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Amit Sarode
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 font-mono"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: '#14b8a6', minHeight: '2.2rem' }}
        >
          <span>{displayText}</span>
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: '1.1em',
              background: '#14b8a6',
              marginLeft: 3,
              verticalAlign: 'middle',
              borderRadius: 1,
              animation: 'blink 1s step-end infinite',
            }}
          />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex gap-4 mt-10 flex-wrap justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(20,184,166,0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/contact')}
            style={{
              padding: '14px 36px',
              borderRadius: 50,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'box-shadow 0.3s',
            }}
          >
            Let's Talk →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/projects')}
            style={{
              padding: '14px 36px',
              borderRadius: 50,
              background: 'transparent',
              color: '#94a3b8',
              fontWeight: 600,
              fontSize: 15,
              border: '1px solid rgba(148,163,184,0.2)',
              cursor: 'pointer',
              letterSpacing: '0.03em',
            }}
          >
            View Work
          </motion.button>
        </motion.div>
      </motion.section>



      {/* ── 3. SKILLS ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '112px 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Subtle radial ambient behind section heading */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 300,
            background:
              'radial-gradient(ellipse, rgba(20,184,166,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
 
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          {/* Header */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span
                style={{
                  width: 32,
                  height: 2,
                  background: '#14b8a6',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  color: '#14b8a6',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  letterSpacing: '0.14em',
                }}
              >
                01 / EXPERTISE
              </span>
            </div>
 
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
                color: '#f1f5f9',
                margin: '0 0 12px',
                lineHeight: 1.1,
              }}
            >
              Technical Arsenal
            </h2>
 
            <p
              style={{
                color: '#64748b',
                fontSize: 14,
                fontWeight: 300,
                marginBottom: 48,
                maxWidth: 480,
                lineHeight: 1.75,
              }}
            >
              End-to-end capabilities to build, ship, and scale intelligent
              automation systems that drive measurable outcomes.
            </p>
          </Reveal>
 
          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* ── 2. JOURNEY & CERTIFICATES ── */}
      <section className="relative z-10 py-28 max-w-6xl mx-auto px-6">
        <Divider />

        <Reveal delay={0.1} className="mt-16">
          <div className="flex items-center gap-3 mb-2">
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>
              02 / STORY
            </span>
          </div>
          <h2
            className="font-bold mb-10"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              background: 'linear-gradient(120deg, #f1f5f9, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            The Journey
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <Reveal delay={0.15}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.85,
                color: '#94a3b8',
              }}
            >
              From a Bachelor of Arts to a specialized{' '}
              <span style={{ color: '#5eead4', fontWeight: 600 }}>Frontend Engineer</span>. My path is
              defined by a relentless transition from theory to creation, building production-ready
              apps at Atum IT where every pixel and every interaction is intentional.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div
              style={{
                padding: 28,
                borderRadius: 20,
                background: 'rgba(20,184,166,0.04)',
                border: '1px solid rgba(20,184,166,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* top-left glow */}
              <div
                style={{
                  position: 'absolute',
                  top: -30,
                  left: -30,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'rgba(20,184,166,0.15)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />
              <span style={{ fontSize: 30, color: '#14b8a6', lineHeight: 1, display: 'block', marginBottom: 12 }}>"</span>
              <p style={{ fontStyle: 'italic', color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
                I don't just write code; I craft digital interfaces that solve human problems — with
                precision, empathy, and craft.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Certifications */}
        <Reveal delay={0.1} className="mt-20">
          <p
            style={{
              fontSize: 12,
              letterSpacing: '0.14em',
              color: '#475569',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              marginBottom: 24,
            }}
          >
            Verified Certifications
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  cursor: 'pointer',
                  background: '#0f172a',
                }}
              >
                <img
                  src={cert.url}
                  alt={cert.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }}
                />
                <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{cert.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      

      {/* ── 4. PROJECTS ── */}
      {/* <section
        id="projects"
        className="relative z-10 py-28 px-6 mb-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>
                03 / WORK
              </span>
            </div>
            <h2
              className="font-bold mb-16"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                background: 'linear-gradient(120deg, #f1f5f9, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Selected Projects
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => window.open(p.link, '_blank')}
              >
              
                <div
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    height: 300,
                    border: '1px solid rgba(255,255,255,0.06)',
                    position: 'relative',
                    background: '#0f172a',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s ease, filter 0.5s ease',
                      filter: 'brightness(0.75)',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLImageElement).style.transform = 'scale(1.06)';
                      (e.target as HTMLImageElement).style.filter = 'brightness(0.9)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLImageElement).style.transform = 'scale(1)';
                      (e.target as HTMLImageElement).style.filter = 'brightness(0.75)';
                    }}
                  />

       
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      padding: '5px 12px',
                      borderRadius: 20,
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontSize: 12,
                      color: '#94a3b8',
                      fontFamily: 'monospace',
                    }}
                  >
                    {p.year}
                  </div>

              
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(20,184,166,0.3) 0%, transparent 60%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      padding: 20,
                    }}
                    className="group-hover:opacity-100"
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: '#14b8a6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        color: '#fff',
                        transform: 'translateY(8px)',
                        transition: 'transform 0.4s ease',
                      }}
                      className="group-hover:translate-y-0"
                    >
                      ↗
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-end">
                  <div>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#f1f5f9',
                        marginBottom: 4,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        fontFamily: 'monospace',
                        color: '#14b8a6',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.tech}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       */}


      {/* ── 5. CLIENTS ── */}
<section
  className="relative z-10 py-24 px-6"
  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
>
  <div className="max-w-6xl mx-auto">
    <Reveal>
      <div className="flex items-center gap-3 mb-2">
        <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
        <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>
          03 / CLIENTS
        </span>
      </div>
      <h2
        className="font-bold mb-4"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          background: 'linear-gradient(120deg, #f1f5f9, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Trusted By
      </h2>
      <p style={{ color: '#334155', fontSize: 14, marginBottom: 48, fontFamily: 'monospace' }}>
        Brands and businesses I've built for
      </p>
    </Reveal>

    {/* Scrolling marquee row */}
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(to right, #020d0a, transparent)', pointerEvents: 'none',
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(to left, #020d0a, transparent)', pointerEvents: 'none',
      }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 16, width: 'max-content' }}
      >
        {[...clients, ...clients].map((client, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 28px',
              borderRadius: 50,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(20,184,166,0.25)';
              e.currentTarget.style.background = 'rgba(20,184,166,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            <span style={{ fontSize: 20 }}>{client.emoji}</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', margin: 0 }}>{client.name}</p>
              <p style={{ fontSize: 11, color: '#334155', margin: 0, fontFamily: 'monospace' }}>{client.type}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>

    {/* Stats row */}
    <Reveal delay={0.2} className="mt-16">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 16,
        }}
      >
        {[
          { value: '15+', label: 'Projects Delivered' },
          { value: '10+', label: 'Happy Clients' },
          { value: '2+', label: 'Years Experience' },
          { value: '100%', label: 'On-time Delivery' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              padding: '20px 16px',
              borderRadius: 16,
              background: 'rgba(20,184,166,0.04)',
              border: '1px solid rgba(20,184,166,0.1)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: '#14b8a6', margin: '0 0 4px', fontFamily: 'monospace' }}>
              {s.value}
            </p>
            <p style={{ fontSize: 12, color: '#475569', margin: 0 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  </div>
</section>

{/* ── 6. TESTIMONIALS ── */}
<section
  className="relative z-10 py-24 px-6"
  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
>
  <div className="max-w-6xl mx-auto">
    <Reveal>
      <div className="flex items-center gap-3 mb-2">
        <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
        <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>
          04 / TESTIMONIALS
        </span>
      </div>
      <h2
        className="font-bold mb-16"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          background: 'linear-gradient(120deg, #f1f5f9, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        What Clients Say
      </h2>
    </Reveal>

    {/* Featured testimonial */}
    <Reveal delay={0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        style={{
          padding: '36px 40px',
          borderRadius: 24,
          background: 'rgba(20,184,166,0.05)',
          border: '1px solid rgba(20,184,166,0.18)',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(20,184,166,0.12)', filter: 'blur(40px)', pointerEvents: 'none',
        }} />

        {/* Stars */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: '#14b8a6', fontSize: 16 }}>★</span>
          ))}
        </div>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#cbd5e1', lineHeight: 1.8,
          fontStyle: 'italic', marginBottom: 28, position: 'relative',
        }}>
          "Amit delivered our HRMS portal ahead of schedule and the quality exceeded our expectations.
          His understanding of complex business logic, clean code, and attention to UI detail is
          rare for a developer his age. He's been a key contributor to our product team at Atum IT."
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>A</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', margin: '0 0 2px' }}>Atum IT Pvt. Ltd.</p>
            <p style={{ fontSize: 12, color: '#475569', margin: 0, fontFamily: 'monospace' }}>
              Technology Company · Nagpur, India
            </p>
          </div>
          <div style={{
            marginLeft: 'auto', padding: '5px 14px', borderRadius: 20,
            background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
            fontSize: 11, color: '#5eead4', fontFamily: 'monospace',
          }}>
            Employer
          </div>
        </div>
      </motion.div>
    </Reveal>

    {/* Grid of other testimonials */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}
    >
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          whileHover={{ y: -6 }}
          style={{
            padding: '24px 26px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', gap: 16,
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(20,184,166,0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
        >
          {/* Stars */}
          <div style={{ display: 'flex', gap: 3 }}>
            {[...Array(t.stars)].map((_, s) => (
              <span key={s} style={{ color: '#f59e0b', fontSize: 13 }}>★</span>
            ))}
          </div>

          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.75, margin: 0, fontStyle: 'italic', flex: 1 }}>
            "{t.text}"
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`,
              border: `1px solid ${t.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: t.color,
            }}>
              {t.initials}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', margin: '0 0 2px' }}>{t.name}</p>
              <p style={{ fontSize: 11, color: '#334155', margin: 0, fontFamily: 'monospace' }}>{t.role}</p>
            </div>
            {t.source && (
              <div style={{
                marginLeft: 'auto', padding: '3px 10px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                fontSize: 10, color: '#334155', fontFamily: 'monospace',
              }}>
                {t.source}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Cursor blink keyframes injected globally */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .group:hover .group-hover\\:translate-y-0 {
          transform: translateY(0) !important;
        }
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Hero;
