import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';


const loaderVariants = {
start: {
    scale: 0,
    opacity: 0,
    y: -20,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as 'reverse',
      delay: 0.2,
    },
  },
};

const CustomLoader = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('animate');
  }, [controls]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <motion.div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#626262',
          borderRadius: '50%',
        }}
        variants={loaderVariants}
        initial="start"
        animate={controls}
      />
    </div>
  );
};

export default CustomLoader;