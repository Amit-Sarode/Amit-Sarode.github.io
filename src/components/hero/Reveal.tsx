import React from 'react';
import { motion } from 'framer-motion';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className,
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <motion.div
      className={className}
      // Cinematic Entrance: Combining fade, Y-slide, and a subtle rotation/tilt
      initial={{ 
        opacity: 0, 
        y: isMobile ? 30 : 60, 
        rotateX: isMobile ? 0 : 20, 
        scale: isMobile ? 1 : 0.95 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        scale: 1 
      }}
      viewport={{ once: true, margin: isMobile ? '-50px' : '-100px' }}
      transition={{ 
        duration: isMobile ? 0.6 : 1.2, 
        delay: isMobile ? 0 : delay, 
        ease: [0.16, 1, 0.3, 1] // Custom "Vercel-style" springy ease
      }}
      style={{ 
        transformOrigin: 'top center',
        willChange: 'transform, opacity' 
      }}
    >
      {children}
    </motion.div>
  );
};

const Divider: React.FC = () => (
  <div className="flex items-center gap-4 my-8">
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent origin-right" 
    />
    
    <motion.div 
      animate={{ 
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.8)]" 
    />
    
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex-1 h-px bg-gradient-to-l from-transparent via-teal-500/40 to-transparent origin-left" 
    />
  </div>
);

export { Reveal, Divider };