import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  desc: string;
  level: number;
  color: string;
  badge?: string;
  tags: string[];
  icon: string;
  featured?: boolean;
  bg: string;
  roi?: string;
}

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const { color } = skill;
  const colorBg = `${color}14`;
  const colorBorder = `${color}28`;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const barRef = useRef<HTMLDivElement>(null);
  const barInView = useInView(barRef, { once: true, margin: '-20px' });

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 16 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: isMobile ? Math.min(index * 0.04, 0.2) : index * 0.07, duration: isMobile ? 0.4 : 0.6, ease: 'easeOut' }}
      whileHover={isMobile ? undefined : { y: -6, scale: 1.015, borderColor: color }}
      style={{
        position: 'relative',
        padding: '22px 24px',
        borderRadius: 18,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        cursor: 'default',
        ...(isMobile ? {} : { willChange: 'transform, opacity' }),
      }}
    >
      {/* Top gradient line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          pointerEvents: 'none',
        }}
      />

      {/* Corner glow */}
      <motion.div
        initial={{ opacity: 0.04 }}
        whileHover={{ opacity: 0.12 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: -40, right: -40, width: 130, height: 130,
          borderRadius: '50%', background: color,
          filter: 'blur(32px)', pointerEvents: 'none',
        }}
      />

      {/* Featured badge */}
      {skill.featured && (
        <span style={{
          position: 'absolute', top: 14, right: 14, fontSize: 9,
          letterSpacing: '0.12em', textTransform: 'uppercase', color,
          padding: '2px 8px', border: `1px solid ${colorBorder}`,
          borderRadius: 20, background: colorBg,
        }}>
          Featured
        </span>
      )}

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: colorBg,
          border: `1px solid ${colorBorder}`, display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <img src={skill.icon} alt={skill.name} loading="lazy" style={{
            width: 22, height: 22, objectFit: 'contain',
            filter: 'brightness(0) invert(1)', opacity: 0.85,
          }} />
        </div>
        {skill.badge && (
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
            padding: '3px 10px', borderRadius: 20, background: colorBg,
            color, border: `1px solid ${colorBorder}`, whiteSpace: 'nowrap',
          }}>
            {skill.badge}
          </span>
        )}
      </div>

      {/* Name */}
      <p style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15,
        color: '#e2e8f0', margin: '0 0 6px', lineHeight: 1.3,
      }}>
        {skill.name}
      </p>

      {/* Description */}
      <p style={{
        fontSize: 12, color: '#475569', fontWeight: 300,
        margin: '0 0 16px', lineHeight: 1.55,
      }}>
        {skill.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 18 }}>
        {skill.tags.map((tag: string) => (
          <span key={tag} style={{
            fontSize: 10, letterSpacing: '0.05em', padding: '2px 8px',
            borderRadius: 4, background: 'rgba(255,255,255,0.04)',
            color: '#64748b', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* ROI metric */}
      {skill.roi && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
          padding: '6px 10px', borderRadius: 8,
          background: `${color}10`, border: `1px solid ${color}20`,
        }}>
          <span style={{ fontSize: 11, color, fontWeight: 700 }}>↗</span>
          <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{skill.roi}</span>
        </div>
      )}

      {/* Progress bar */}
      <div ref={barRef} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          flex: 1, height: 3, borderRadius: 3,
          background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={barInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.08 }}
            style={{
              height: '100%', borderRadius: 3, background: color,
              boxShadow: `0 0 8px ${color}60`,
            }}
          />
        </div>
        <span style={{
          fontSize: 12, color, fontFamily: 'monospace',
          minWidth: 36, textAlign: 'right' as const,
        }}>
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
};

export default SkillCard;
