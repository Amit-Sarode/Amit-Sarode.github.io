import React from 'react';
import { motion } from 'framer-motion';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className,
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? '-40px' : '-80px' }}
      transition={{ duration: isMobile ? 0.5 : 0.75, delay: isMobile ? 0 : delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={isMobile ? {} : { willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

const Divider: React.FC = () => (
  <div className="flex items-center gap-4 my-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
    <div className="h-1.5 w-1.5 rounded-full bg-teal-500/50" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
  </div>
);

export { Reveal, Divider };
