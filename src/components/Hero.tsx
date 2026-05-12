// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import profileImg from '/assets/img/profileImg.png';
// import flower from '/assets/img/flower_delivery.png';
// import doctor from '/assets/img/doctor-preview.png';
// import demo from '/assets/img/Screenshot 2025-04-22 at 1.34.46 PM.png';
// import ecom from '/assets/img/Screenshot 2025-04-22 at 1.15.51 PM.png';
// import react from '/assets/img/react.svg';
// import Tilt3D from './ThreeDTilt';

// const Hero: React.FC = () => {
//   const navigate = useNavigate();
//   const [displayText, setDisplayText] = useState("");
  
//   const texts = ['Frontend Developer', 'React Native Developer', "UI/UX Enthusiast", "React Engineer"];
//   const [textIndex, setTextIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentFullText = texts[textIndex];
    
//     const timeout = setTimeout(() => {
//       if (!isDeleting) {
//         setDisplayText(currentFullText.substring(0, displayText.length + 1));
//         if (displayText === currentFullText) {
//           setTimeout(() => setIsDeleting(true), 2000); 
//         }
//       } else {
//         setDisplayText(currentFullText.substring(0, displayText.length - 1));
//         if (displayText === "") {
//           setIsDeleting(false);
//           setTextIndex((prev) => (prev + 1) % texts.length);
//         }
//       }
//     }, isDeleting ? 50 : 150);

//     return () => clearTimeout(timeout);
//   }, [displayText, isDeleting, textIndex]);

//   const skills = [
//     { name: 'React', level: '85%', color: '#61DAFB', icon: react, bg: 'rgba(97, 218, 251, 0.15)' },
//     { name: 'JavaScript', level: '90%', color: '#F7DF1E', icon: 'https://www.svgrepo.com/show/303206/javascript-logo.svg', bg: 'rgba(247, 223, 30, 0.15)' },
//     { name: 'TypeScript', level: '85%', color: '#3178C6', icon: 'https://www.svgrepo.com/show/374144/typescript.svg', bg: 'rgba(49, 120, 198, 0.15)' },
//     { name: 'Tailwind', level: '80%', color: '#38BDF8', icon: 'https://www.svgrepo.com/show/374118/tailwind.svg', bg: 'rgba(56, 189, 248, 0.15)' },
//     { name: 'React Native', level: '80%', color: '#61DAFB', icon: react, bg: 'rgba(97, 218, 251, 0.15)' },
//     { name: 'Node.js', level: '75%', color: '#339933', icon: 'https://w7.pngwing.com/pngs/452/24/png-transparent-js-logo-node-logos-and-brands-icon.png', bg: 'rgba(51, 153, 51, 0.15)' },
//   ];

//   const certificates = [
//     { url: "https://udemy-certificate.s3.amazonaws.com/image/UC-896441cf-e535-45b3-84dd-fa3f21eb3428.jpg", title: "Advanced React" },
//     { url: "https://udemy-certificate.s3.amazonaws.com/image/UC-98a0333e-6ba1-4973-bcc5-46a44944f187.jpg", title: "Frontend Web" },
//     { url: "https://udemy-certificate.s3.amazonaws.com/image/UC-51b4a0db-d01d-469a-ba2b-747485bc045a.jpg", title: "JavaScript ES6" },
//   ];

//   return (
//     <div className="transition-colors duration-500 overflow-x-hidden">
      
//       {/* 1. HERO SECTION */}
//       <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
//         <Tilt3D>
//           <motion.img 
//             initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
//             className="rounded-full h-44 w-44 object-cover border-4 border-teal-500 shadow-2xl"
//             src={profileImg} alt="Amit" 
//           />
//         </Tilt3D>
//         <motion.h1 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//           className="text-5xl md:text-7xl font-bold mt-8 tracking-tighter"
//         >
//           Amit Sarode
//         </motion.h1>
//         <div className="text-2xl text-teal-500 font-mono mt-2 h-10">
//           {displayText}<span className="animate-pulse">|</span>
//         </div>

//         {/* --- ADDED LETS TALK BUTTON --- */}
//         <motion.button
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate('/contact')}
//           className="mt-8 px-8 py-3 bg-teal-500 text-white font-bold rounded-full shadow-lg hover:bg-teal-600 transition-colors duration-300"
//         >
//           Let's Talk
//         </motion.button>
//       </section>

//       {/* 2. JOURNEY & CERTIFICATES */}
//       <section className="py-20 max-w-6xl mx-auto px-6 border-t border-gray-100 dark:border-gray-800">
//         <h2 className="text-3xl font-bold mb-8 text-teal-500">The Journey</h2>
//         <div className="grid md:grid-cols-2 gap-10 items-center">
//             <p className="text-xl leading-relaxed opacity-80">
//                 From a Bachelor of Arts to a specialized 
//                 <span className="text-teal-500"> Frontend Engineer</span>. My path is defined by a 
//                 transition from theory to creation, building production-ready apps at Atum IT.
//             </p>
//             <div className="bg-teal-500/10 p-6 rounded-2xl border border-teal-500/20 italic text-sm">
//                 "I don't just write code; I craft digital interfaces that solve human problems."
//             </div>
//         </div>

//         <div className="mt-16">
//             <h3 className="text-xl font-semibold mb-6 uppercase tracking-widest text-gray-400">Verified Certifications</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 {certificates.map((cert, i) => (
//                     <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
//                         <img src={cert.url} alt={cert.title} className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//       </section>

//       {/* 3. SKILLS SECTION */}
//       <section className="py-24 bg-gray-50 dark:bg-[#1a1a1a]/40 px-6 transition-colors">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold">Technical Arsenal</h2>
//             <div className="h-1.5 w-20 bg-teal-500 mx-auto mt-4 rounded-full"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {skills.map((skill, i) => (
//               <motion.div 
//                 key={i}
//                 whileHover={{ y: -8 }}
//                 style={{ backgroundColor: skill.bg }}
//                 className="p-6 rounded-3xl backdrop-blur-md border border-gray-200 dark:border-gray-700 transition-all"
//               >
//                 <div className="flex justify-between items-center mb-5">
//                   <div className="flex items-center gap-3">
//                     <img src={skill.icon} alt={skill.name} className="h-8 w-8 object-contain" />
//                     <span className="font-black text-lg" style={{ color: skill.color }}>{skill.name}</span>
//                   </div>
//                   <span className="text-xs font-bold opacity-70">{skill.level}</span>
//                 </div>
                
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
//                   <motion.div 
//                     initial={{ width: 0 }}
//                     whileInView={{ width: skill.level }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 1.5, ease: "easeOut" }}
//                     style={{ backgroundColor: skill.color }}
//                     className="h-full rounded-full"
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 4. WORK SECTION */}
//        <section className="py-24 px-6 mb-10">
//         <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl font-bold mb-12">Selected Projects</h2>
//             <div className="grid md:grid-cols-2 gap-12">
//                 {[
//                   { name: "Ecommerce", img: ecom, tech: "React / Redux", link: "https://ecommerce-xi-five-58.vercel.app/" },
//                   { name: "Healthcare", img: doctor, tech: "Firebase / MUI", link: "https://healthcheck-nine.vercel.app/" }
//                 ].map((p, i) => (
//                   <motion.div 
//                     key={i} 
//                     whileHover={{ y: -10 }} 
//                     className="group cursor-pointer"
//                     onClick={() => window.open(p.link, '_blank')}
//                   >
//                     <div className="rounded-3xl overflow-hidden h-80 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
//                         <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
//                     </div>
//                     <div className="mt-6 flex justify-between items-center">
//                         <div>
//                             <h3 className="text-2xl font-bold">{p.name}</h3>
//                             <p className="text-teal-500 font-mono text-sm uppercase tracking-wider">{p.tech}</p>
//                         </div>
//                         <div className="h-12 w-12 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-all">
//                             →
//                         </div>
//                     </div>
//                   </motion.div>
//                 ))}
//             </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Hero;



import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImg from '/assets/img/profileImg.png';
import doctor from '/assets/img/doctor-preview.png';
import ecom from '/assets/img/Screenshot 2025-04-22 at 1.15.51 PM.png';
import react from '/assets/img/react.svg';
import Tilt3D from './ThreeDTilt';
import SEO from './SEO';

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
    { name: 'React', level: 85, color: '#61DAFB', icon: react, bg: 'rgba(97, 218, 251, 0.08)' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E', icon: 'https://www.svgrepo.com/show/303206/javascript-logo.svg', bg: 'rgba(247, 223, 30, 0.08)' },
    { name: 'TypeScript', level: 85, color: '#3178C6', icon: 'https://www.svgrepo.com/show/374144/typescript.svg', bg: 'rgba(49, 120, 198, 0.08)' },
    { name: 'Tailwind', level: 80, color: '#38BDF8', icon: 'https://www.svgrepo.com/show/374118/tailwind.svg', bg: 'rgba(56, 189, 248, 0.08)' },
    { name: 'React Native', level: 80, color: '#61DAFB', icon: react, bg: 'rgba(97, 218, 251, 0.08)' },
    { name: 'Node.js', level: 75, color: '#339933', icon: 'https://w7.pngwing.com/pngs/452/24/png-transparent-js-logo-node-logos-and-brands-icon.png', bg: 'rgba(51, 153, 51, 0.08)' },
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

      {/* ── 2. JOURNEY & CERTIFICATES ── */}
      <section className="relative z-10 py-28 max-w-6xl mx-auto px-6">
        <Divider />

        <Reveal delay={0.1} className="mt-16">
          <div className="flex items-center gap-3 mb-2">
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>
              01 / STORY
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

      {/* ── 3. SKILLS ── */}
      <section
        className="relative z-10 py-28 px-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>
                02 / EXPERTISE
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
              Technical Arsenal
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  padding: '24px 28px',
                  borderRadius: 20,
                  background: skill.bg,
                  border: `1px solid ${skill.color}18`,
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* corner glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `${skill.color}22`,
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                  }}
                />

                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${skill.color}14`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={skill.icon} alt={skill.name} style={{ height: 22, width: 22, objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16, color: skill.color }}>{skill.name}</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#475569', fontFamily: 'monospace' }}>{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    width: '100%',
                    height: 4,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: 'easeOut', delay: i * 0.1 }}
                    style={{
                      height: '100%',
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                      boxShadow: `0 0 10px ${skill.color}60`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROJECTS ── */}
      <section
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
                {/* Image wrapper */}
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

                  {/* Year badge */}
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

                  {/* Hover overlay */}
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
          04 / CLIENTS
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
        {/* Duplicate the list for seamless loop */}
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
          05 / TESTIMONIALS
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
