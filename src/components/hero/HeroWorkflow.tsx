import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

/* ─── Connection Lines SVG with data flow ─── */
const ConnectionLines: React.FC<{ scrollProgress: MotionValue<number> }> = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.8, 1], [0, 0.2, 0.2, 0]);

  return (
    <motion.svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        zIndex: 3,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
          <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
          <stop offset="40%" stopColor="#14b8a6" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Static connection lines */}
      <line x1="15%" y1="22%" x2="40%" y2="40%" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="40%" y1="40%" x2="75%" y2="27%" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="40%" y1="40%" x2="60%" y2="70%" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="75%" y1="27%" x2="85%" y2="58%" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="20%" y1="68%" x2="40%" y2="40%" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="60%" y1="70%" x2="85%" y2="58%" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="15%" y1="22%" x2="20%" y2="68%" stroke="url(#lineGrad)" strokeWidth="0.5" strokeDasharray="4 8" />
      <line x1="75%" y1="27%" x2="60%" y2="70%" stroke="url(#lineGrad)" strokeWidth="0.5" strokeDasharray="4 8" />

      {/* Animated data flow particles */}
      <circle r="2.5" fill="#14b8a6" opacity="0.9">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 15% 22% L 40% 40% L 75% 27%" />
      </circle>
      <circle r="2" fill="#06b6d4" opacity="0.8">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 40% 40% L 60% 70% L 85% 58%" />
      </circle>
      <circle r="2" fill="#14b8a6" opacity="0.7">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 20% 68% L 40% 40% L 75% 27%" />
      </circle>
      <circle r="1.5" fill="#8B5CF6" opacity="0.6">
        <animateMotion dur="5s" repeatCount="indefinite" path="M 75% 27% L 85% 58% L 60% 70%" />
      </circle>

      {/* Intersection dots */}
      {[
        { cx: '15%', cy: '22%' }, { cx: '40%', cy: '40%' }, { cx: '75%', cy: '27%' },
        { cx: '60%', cy: '70%' }, { cx: '85%', cy: '58%' }, { cx: '20%', cy: '68%' },
      ].map((p, i) => (
        <React.Fragment key={i}>
          <circle cx={p.cx} cy={p.cy} r="3" fill="#14b8a6" opacity="0.4" />
          <circle cx={p.cx} cy={p.cy} r="6" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2">
            <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
          </circle>
        </React.Fragment>
      ))}
    </motion.svg>
  );
};

/* ─── Workflow Node ─── */
interface WorkflowNodeProps {
  label: string;
  icon: string;
  x: string;
  y: string;
  delay: number;
  scrollProgress: MotionValue<number>;
  offset: number;
  color?: string;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ label, icon, x, y, delay, scrollProgress, offset, color = '#14b8a6' }) => {
  const nodeY = useTransform(scrollProgress, [0, 1], [0, offset]);
  const nodeOpacity = useTransform(scrollProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const nodeScale = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        y: nodeY,
        scale: nodeScale,
        opacity: nodeOpacity,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        zIndex: 5,
        willChange: 'transform',
      }}
    >
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
      {/* Pulse indicator */}
      <div style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${color}`,
        animation: 'hirePulse 2s ease-in-out infinite',
      }} />
    </motion.div>
  );
};

export { ConnectionLines, WorkflowNode };
