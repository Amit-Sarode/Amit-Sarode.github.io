import { motion, useReducedMotion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
};

const transition = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94],
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{ willChange: 'transform, opacity', position: 'relative' }}
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.3) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '-120px',
            willChange: 'opacity, transform',
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default PageTransition;
