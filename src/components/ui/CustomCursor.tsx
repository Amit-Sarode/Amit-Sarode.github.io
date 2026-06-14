import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDisabled = isTouch || prefersReduced;

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select';

const isHoverTarget = (el: EventTarget | null): boolean => {
  if (!el || !(el instanceof Element)) return false;
  return el.matches(HOVER_SELECTOR) || el.closest(HOVER_SELECTOR) !== null;
};

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const hoverRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const glowX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    if (isDisabled) {
      document.documentElement.style.cursor = '';
      return;
    }
    document.documentElement.style.cursor = 'none';

    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      if (isHoverTarget(e.target)) {
        setIsHovering(true);
        hoverRef.current = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (hoverRef.current && (!e.relatedTarget || !isHoverTarget(e.relatedTarget))) {
        setIsHovering(false);
        hoverRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  if (isDisabled) return null;

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