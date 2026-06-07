import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mounted = useRef(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const glowX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    if (isTouch) return;

    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    const hoverTargets = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: glowX,
          top: glowY,
          width: isHovering ? 300 : 250,
          height: isHovering ? 300 : 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: isClicking ? 12 : isHovering ? 32 : 20,
          height: isClicking ? 12 : isHovering ? 32 : 20,
          borderRadius: '50%',
          background: isHovering ? 'rgba(20,184,166,0.08)' : 'rgba(20,184,166,0.04)',
          border: isHovering ? '1.5px solid rgba(20,184,166,0.4)' : '1.5px solid rgba(20,184,166,0.2)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, background 0.2s, border-color 0.2s, opacity 0.3s',
          backdropFilter: 'blur(2px)',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;