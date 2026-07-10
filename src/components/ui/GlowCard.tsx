import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
  hoverY?: number;
  hoverScale?: number;
  className?: string;
}

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  color = '#14b8a6',
  style,
  hoverY = -6,
  hoverScale = 1.01,
  className,
}) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      whileHover={isTouchDevice ? {} : { y: hoverY, scale: hoverScale }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `${color}50` : 'rgba(255,255,255,0.08)'}`,
        transition: 'background 0.4s, border-color 0.4s',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', left: mouse.x, top: mouse.y,
        width: 220, height: 220, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />
      <div style={{
        position: 'absolute', top: -25, right: -25,
        width: 100, height: 100, borderRadius: '50%',
        background: color, filter: 'blur(35px)',
        pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 0.15 : 0, transition: 'opacity 0.5s',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
        zIndex: 1,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
};

export default GlowCard;
