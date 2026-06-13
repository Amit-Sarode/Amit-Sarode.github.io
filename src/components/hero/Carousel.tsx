import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { BusinessCategory } from './data';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

function TiltCard({
  project,
  isCenter,
  onClick,
}: {
  project: BusinessCategory;
  isCenter: boolean;
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((py - 0.5) * -6);
    y.set((px - 0.5) * 6);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{
   
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={`
        relative flex-shrink-0 cursor-pointer select-none
        ${isMobile ? 'w-[240px]' : 'w-[340px]'}
      `}
    >
      <motion.div
        animate={{
          scale: isCenter ? 1 : 0.88,
          opacity: isCenter ? 1 : 0.4,
          filter: isCenter ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`
          relative overflow-hidden rounded-2xl
          ${isMobile ? 'h-[300px]' : 'h-[380px]'}
        `}
        style={{
          boxShadow: isCenter
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.15), 0 0 40px ${project.color}20`
            : '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
          transformStyle: 'preserve-3d',
          background: 'var(--bg-card)',
          willChange: 'transform, opacity, filter',
          transition: 'box-shadow 0.4s',
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${project.color}08 0%, rgba(2,13,10,0.92) 100%)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ transform: 'translateZ(24px)' }}>
          {isCenter && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-mono font-semibold tracking-widest mb-2 flex items-center gap-2"
              style={{ color: project.color }}
            >
              <span className="w-4 h-px inline-block" style={{ background: project.color }} />
              {project.impact[0]}
            </motion.span>
          )}
          <h3 className="text-lg font-bold text-white leading-tight mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {project.title}
          </h3>
          {isCenter && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm mt-1 line-clamp-2"
              style={{ color: '#94a3b8' }}
            >
              {project.description}
            </motion.p>
          )}
        </div>

        {isCenter && isHovered && !isTouch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-5 right-5 rounded-full flex items-center justify-center"
            style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              transform: 'translateZ(32px)',
              boxShadow: '0 4px 16px rgba(20,184,166,0.4)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

const Carousel = ({ projects, onFocus }: { projects: BusinessCategory[]; onFocus: (id: number) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const total = projects.length;

  const syncFocus = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    const cards = el.querySelectorAll('[data-card]');
    cards.forEach((card, i) => {
      const c = card as HTMLElement;
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setFocusIdx(closest);
  }, []);

  const goTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(`[data-card="${idx}"]`) as HTMLElement;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => { syncFocus(); ticking = false; });
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    syncFocus();
    return () => el.removeEventListener('scroll', onScroll);
  }, [syncFocus]);

  return (
    <div className="relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#020d0a] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#020d0a] to-transparent" />

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scroll-smooth hide-scrollbar"
        style={{
          padding: `${isMobile ? 40 : 60}px 0`,
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            padding: `0 ${isMobile ? 80 : 160}px`,
            perspective: 1200,
          }}
        >
          {projects.map((p, i) => (
            <div key={p.id} data-card={i} style={{ scrollSnapAlign: 'center' }}>
              <TiltCard
                project={p}
                isCenter={focusIdx === i}
                onClick={() => onFocus(p.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <motion.button
          whileHover={{ scale: 1.1, background: 'rgba(20,184,166,0.12)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goTo(Math.max(0, focusIdx - 1))}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.button>

        <div className="flex items-center gap-1.5">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => goTo(i)}
              animate={{
                width: focusIdx === i ? 24 : 6,
                background: focusIdx === i ? p.color : 'rgba(255,255,255,0.12)',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-1.5 rounded-full"
              style={{ border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1, background: 'rgba(20,184,166,0.12)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goTo(Math.min(total - 1, focusIdx + 1))}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Carousel;
