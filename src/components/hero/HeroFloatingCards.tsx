import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface ActivityCardProps {
  text: string;
  x: string;
  y: string;
  delay: number;
  scrollProgress: MotionValue<number>;
  offset: number;
  color: string;
  icon?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ text, x, y, delay, scrollProgress, offset, color, icon = '✓' }) => {
  const cardY = useTransform(scrollProgress, [0, 1], [0, offset]);
  const cardOpacity = useTransform(scrollProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        y: cardY,
        scale: cardScale,
        opacity: cardOpacity,
        padding: '8px 14px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${color}20`,
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 4,
        willChange: 'transform',
      }}
    >
      <div style={{
        width: 18,
        height: 18,
        borderRadius: 6,
        background: `${color}15`,
        border: `1px solid ${color}25`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 9,
        color,
        fontWeight: 700,
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 11, color: '#64748b', fontWeight: 400, whiteSpace: 'nowrap' }}>{text}</span>
      <div style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${color}`,
        animation: 'hirePulse 2.5s ease-in-out infinite',
        marginLeft: 2,
      }} />
    </motion.div>
  );
};

const FloatingCards: React.FC<{ scrollProgress: MotionValue<number>; isMobile: boolean }> = ({ scrollProgress, isMobile }) => {
  if (isMobile) return null;

  return (
    <>
      <ActivityCard text="Lead Qualified by AI" x="6%" y="38%" delay={1.4} scrollProgress={scrollProgress} offset={-25} color="#10B981" icon="↗" />
      <ActivityCard text="Proposal Generated" x="68%" y="14%" delay={1.6} scrollProgress={scrollProgress} offset={-55} color="#8B5CF6" icon="⚡" />
      <ActivityCard text="CRM Updated" x="78%" y="70%" delay={1.8} scrollProgress={scrollProgress} offset={-30} color="#06B6D4" icon="↻" />
      <ActivityCard text="Meeting Booked" x="22%" y="78%" delay={1.9} scrollProgress={scrollProgress} offset={-40} color="#F59E0B" icon="📅" />
      <ActivityCard text="Support Resolved" x="52%" y="10%" delay={1.5} scrollProgress={scrollProgress} offset={-50} color="#EC4899" icon="✦" />
      <ActivityCard text="Invoice Synced" x="86%" y="38%" delay={2.0} scrollProgress={scrollProgress} offset={-35} color="#14b8a6" icon="$" />
      <ActivityCard text="Email Campaign Sent" x="10%" y="55%" delay={2.1} scrollProgress={scrollProgress} offset={-20} color="#F97316" icon="✉" />
      <ActivityCard text="Data Pipeline Active" x="72%" y="50%" delay={1.7} scrollProgress={scrollProgress} offset={-45} color="#3B82F6" icon="◉" />
    </>
  );
};

export { ActivityCard, FloatingCards };
