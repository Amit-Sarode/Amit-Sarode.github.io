import React, { useEffect, useState, useRef, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENES = [
  { Component: Scene1, duration: 4500 },
  { Component: Scene2, duration: 4500 },
  { Component: Scene3, duration: 6500 },
  { Component: Scene4, duration: 4500 },
  { Component: Scene5, duration: 4500 },
  { Component: Scene6, duration: 5500 },
];
const TOTAL = SCENES.reduce((a, s) => a + s.duration, 0);

const VOICEOVER = [
  'Amit Sarode. Full-Stack Developer and AI Automation.',
  'The problem. Repetitive tasks, manual replies, manual bookings, manual busywork. Amit automates this.',
  'What I build. AI Chatbots, Workflow Automation, Full-Stack Platforms, RAG and Document AI.',
  'Track record. 15 plus projects delivered, 10 plus happy clients, 3 plus years building.',
  'The toolkit. React, TypeScript, Node.js, Claude API, LangChain, PostgreSQL, Next.js.',
  'Let\'s build something that works. Start a project. amit-sarode.github.io',
];

const PromoVideo: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cursor, setCursor] = useState(0);
  const cursorRef = useRef(0);
  cursorRef.current = cursor;

  useEffect(() => {
    const t = setTimeout(() => {
      const next = (cursorRef.current + 1) % SCENES.length;
      setCursor(next);
    }, SCENES[cursor].duration);
    return () => clearTimeout(t);
  }, [cursor]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    const utterance = new SpeechSynthesisUtterance(VOICEOVER[cursor]);
    utterance.rate = 1.05;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = window.speechSynthesis?.getVoices();
    const preferred = voices?.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices?.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;
    setTimeout(() => window.speechSynthesis?.speak(utterance), 100);
    return () => { window.speechSynthesis?.cancel(); };
  }, [cursor]);

  const elapsed = SCENES.slice(0, cursor).reduce((a, s) => a + s.duration, 0);
  const progress = ((elapsed + SCENES[cursor].duration) / TOTAL) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'radial-gradient(ellipse at 50% 30%, #071412 0%, #020d0a 60%, #010705 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(20,184,166,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px', opacity: 0.5, pointerEvents: 'none',
      }} />

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'absolute', top: 24, right: 24, zIndex: 10,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', fontSize: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        ✕
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={cursor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {createElement(SCENES[cursor].Component)}
        </motion.div>
      </AnimatePresence>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 3,
        background: 'linear-gradient(90deg, #14b8a6, #5eead4)',
        width: `${progress}%`,
        transition: `width ${SCENES[cursor].duration}ms linear`,
        pointerEvents: 'none',
      }} />
    </motion.div>
  );
};

function Scene1() {
  const [show, setShow] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setShow(1), 50);
    const t2 = setTimeout(() => setShow(2), 400);
    const t3 = setTimeout(() => setShow(3), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={show >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 88, height: 88,
          border: '1.5px solid rgba(20,184,166,0.4)',
          borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 34,
          fontWeight: 500, color: '#5eead4', marginBottom: 28,
        }}
      >
        AS
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={show >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#f8fafc' }}
      >
        Amit Sarode
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={show >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(11px, 1.5vw, 16px)', color: '#14b8a6',
          letterSpacing: '0.1em', marginTop: 14,
        }}
      >
        FULL-STACK DEVELOPER · AI AUTOMATION
      </motion.div>
    </>
  );
}

function Scene2() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.25em', color: '#14b8a6', textTransform: 'uppercase', marginBottom: 24 }}
      >
        THE PROBLEM
      </motion.div>
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14, padding: '28px 32px',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 17, color: '#cbd5e1',
        maxWidth: '90vw', width: 760, textAlign: 'left',
      }}>
        <motion.div
          initial={{ width: 0 }} animate={ready ? { width: '26ch' } : { width: 0 }}
          transition={{ duration: 0.8, ease: 'linear' }}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', color: '#64748b', marginBottom: 10 }}
        >
          $ business.repetitive_tasks
        </motion.div>
        <motion.div
          initial={{ width: 0 }} animate={ready ? { width: '52ch' } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'linear' }}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', color: '#64748b', marginBottom: 10 }}
        >
          → manual replies, manual bookings, manual busywork
        </motion.div>
        <motion.div
          initial={{ width: 0 }} animate={ready ? { width: '24ch' } : { width: 0 }}
          transition={{ duration: 0.8, delay: 2.1, ease: 'linear' }}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', color: '#5eead4', borderRight: '2px solid #5eead4' }}
        >
          $ amit.automate(this)
        </motion.div>
      </div>
    </>
  );
}

function Scene3() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  const cards = [
    { icon: '◆', border: 'rgba(139,92,246,0.25)', bg: 'rgba(139,92,246,0.12)', color: '#c4b5fd', title: 'AI Chatbots', desc: '24/7 customer support that qualifies leads and cuts response time to zero.' },
    { icon: '◇', border: 'rgba(6,182,212,0.25)', bg: 'rgba(6,182,212,0.12)', color: '#67e8f9', title: 'Workflow Automation', desc: 'Connect tools and APIs so your team stops doing things by hand.' },
    { icon: '▲', border: 'rgba(245,158,11,0.25)', bg: 'rgba(245,158,11,0.12)', color: '#fcd34d', title: 'Full-Stack Platforms', desc: 'React, Node.js, and cloud-native apps built to scale with you.' },
    { icon: '●', border: 'rgba(20,184,166,0.25)', bg: 'rgba(20,184,166,0.12)', color: '#5eead4', title: 'RAG & Document AI', desc: 'Search, summarize, and extract from your own knowledge base.' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.25em', color: '#14b8a6', textTransform: 'uppercase', marginBottom: 24 }}
      >
        WHAT I BUILD
      </motion.div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 320px))',
        gap: 20, justifyContent: 'center', padding: '0 20px',
      }}>
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.22 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${c.border}`, borderRadius: 16,
              padding: '26px 28px',
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10, marginBottom: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, background: c.bg, color: c.color,
            }}>
              {c.icon}
            </div>
            <h3 style={{ fontSize: 19, color: '#f8fafc', fontWeight: 700, margin: '0 0 6px' }}>{c.title}</h3>
            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Scene4() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  const stats = [
    { num: '15+', label: 'Projects Delivered' },
    { num: '10+', label: 'Happy Clients' },
    { num: '3+', label: 'Years Building' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.25em', color: '#14b8a6', textTransform: 'uppercase', marginBottom: 24 }}
      >
        TRACK RECORD
      </motion.div>
      <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap', justifyContent: 'center' }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#5eead4', fontFamily: "'JetBrains Mono', monospace" }}>
              {s.num}
            </div>
            <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 8 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Scene5() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  const pills = ['React', 'TypeScript', 'Node.js', 'Claude API', 'LangChain', 'PostgreSQL', 'Next.js'];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.25em', color: '#14b8a6', textTransform: 'uppercase', marginBottom: 24 }}
      >
        THE TOOLKIT
      </motion.div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', maxWidth: '90vw', padding: '0 20px' }}>
        {pills.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.14 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 15,
              color: '#5eead4', background: 'rgba(20,184,166,0.08)',
              border: '1px solid rgba(20,184,166,0.25)', borderRadius: 999,
              padding: '10px 22px',
            }}
          >
            {p}
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Scene6() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 700, color: '#f8fafc', textAlign: 'center' }}
      >
        Let's build something <span style={{ color: '#5eead4' }}>that works.</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          marginTop: 36, fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16, fontWeight: 500, color: '#020d0a',
          background: 'linear-gradient(120deg, #5eead4, #14b8a6)',
          padding: '16px 38px', borderRadius: 999,
        }}
      >
        START A PROJECT →
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: '#64748b', marginTop: 18 }}
      >
        amit-sarode.github.io
      </motion.div>
    </>
  );
}

export default PromoVideo;
