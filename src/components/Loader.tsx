import { motion } from 'framer-motion';

const CustomLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        gap: 32,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(20,184,166,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,184,166,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 800,
          color: '#fff',
          fontFamily: 'monospace',
          boxShadow: '0 0 30px rgba(20,184,166,0.4)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        AS
      </motion.div>

      {/* Three-dot pulse row */}
      <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 1 }}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.18,
            }}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === 1
                ? '#14b8a6'
                : 'rgba(20,184,166,0.4)',
              boxShadow: i === 1 ? '0 0 12px rgba(20,184,166,0.7)' : 'none',
              display: 'inline-block',
            }}
          />
        ))}
      </div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: '0.2em',
          color: '#334155',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
          margin: 0,
        }}
      >
        Loading
      </motion.p>
    </div>
  );
};

export default CustomLoader;