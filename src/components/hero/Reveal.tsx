import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ─── Reveal ─── */
/*
 * Cinematic entrance: content lifts in with a subtle scale + fade,
 * using a clip-path diagonal wipe for a clean, modern reveal.
 */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const dur = prefersReduced ? 0.01 : isMobile ? 0.55 : 1.05;
  const del = prefersReduced || isMobile ? 0 : delay;
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      <motion.div
        initial={
          prefersReduced
            ? { opacity: 1 }
            : { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 24 }
        }
        animate={
          isInView
            ? { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }
            : { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 24 }
        }
        transition={{ duration: dur, delay: del, ease }}
        style={{ willChange: 'clip-path, transform, opacity' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ─── Divider ─── */
const Divider: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        margin: '2rem 0',
        position: 'relative',
      }}
    >
      {/* Left arm — shimmer travels center → left edge */}
      <Arm direction="left" isInView={isInView} prefersReduced={!!prefersReduced} />

      {/* Centre node */}
      <CentreNode hovered={hovered} prefersReduced={!!prefersReduced} />

      {/* Right arm — shimmer travels center → right edge */}
      <Arm direction="right" isInView={isInView} prefersReduced={!!prefersReduced} />
    </div>
  );
};

/* ─── Arm ─── */
const Arm: React.FC<{
  direction: 'left' | 'right';
  isInView: boolean;
  prefersReduced: boolean;
}> = ({ direction, isInView, prefersReduced }) => {
  const lineOrigin = direction === 'left' ? '100% center' : '0% center';
  const shimmerStart = '0%';
  const shimmerEnd = direction === 'left' ? '-300%' : '300%';

  return (
    <div style={{ flex: 1, position: 'relative', height: 1, overflow: 'hidden' }}>
      {/* Base line */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            direction === 'left'
              ? 'linear-gradient(to left, rgba(20,184,166,0.3), transparent)'
              : 'linear-gradient(to right, rgba(20,184,166,0.3), transparent)',
        }}
      />

      {/* Entry reveal */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: prefersReduced ? 0 : 1.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: lineOrigin,
          background:
            direction === 'left'
              ? 'linear-gradient(to left, rgba(20,184,166,0.4), transparent)'
              : 'linear-gradient(to right, rgba(20,184,166,0.4), transparent)',
        }}
      />

      {/* Shimmer: exactly synced from center → outer edge */}
      {!prefersReduced && (
        <motion.div
          initial={{ x: shimmerStart, opacity: 0 }}
          animate={
            isInView
              ? { x: [shimmerStart, shimmerEnd], opacity: [0, 0.9, 0.9, 0] }
              : { x: shimmerStart, opacity: 0 }
          }
          transition={{
            duration: 4,       
            delay: 1.4,         
            repeat: Infinity,
            repeatDelay: 3.5,   
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: 'absolute',
            top: -4,
            bottom: -4,
            [direction === 'left' ? 'right' : 'left']: 0,
            width: '45%',
            background:
              direction === 'left'
                ? 'linear-gradient(to left, rgba(94,234,212,0.8), transparent)'
                : 'linear-gradient(to right, rgba(94,234,212,0.8), transparent)',
            filter: 'blur(1.5px)',
          }}
        />
      )}
    </div>
  );
};

/* ─── CentreNode ─── */
const CentreNode: React.FC<{ hovered: boolean; prefersReduced: boolean }> = ({
  hovered,
  prefersReduced,
}) => (
  <div style={{ position: 'relative', flexShrink: 0, width: 20, height: 20 }}>
    {hovered && !prefersReduced && (
      <motion.div
        key="ripple"
        initial={{ scale: 0.6, opacity: 0.7 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid rgba(20,184,166,0.5)',
        }}
      />
    )}
    {!prefersReduced && (
      <motion.div
        animate={{ scale: [1, 2.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 3,
          borderRadius: '50%',
          border: '1px solid rgba(20,184,166,0.4)',
        }}
      />
    )}
    <motion.div
      animate={prefersReduced ? {} : { scale: [1, 1.3, 1], opacity: [0.75, 1, 0.75] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        inset: 6,
        borderRadius: '50%',
        background: '#14b8a6',
        boxShadow: '0 0 10px rgba(20,184,166,0.85)',
      }}
    />
  </div>
);

export { Reveal, Divider };