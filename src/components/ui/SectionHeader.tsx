import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  delay?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title, description, delay = 0 }) => {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }}
        />
        <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
          {label}
        </span>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }}
        />
      </div>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 + delay }}
        className="font-bold mb-2"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2,
        }}
      >
        {title}
      </motion.h2>
      {description && (
        <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
