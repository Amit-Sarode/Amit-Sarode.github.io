import { useRef, useState, useMemo } from 'react';
import { motion } from 'motion/react';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const MagneticButton = ({
  children,
  onClick,
  className,
  style,
  strength = 0.25,
  as: Component = 'button',
  href,
  target,
  rel,
  disabled,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: string;
}) => {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const handleLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  const animate = useMemo(() => ({
    x: hovered && !isTouch ? pos.x : 0,
    y: hovered && !isTouch ? pos.y : 0,
  }), [hovered, pos.x, pos.y]);

  const commonProps = {
    ref,
    className,
    style,
    onClick,
    onMouseMove: handleMouse,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: handleLeave,
    whileHover: isTouch ? { scale: 1.02 } : undefined,
    whileTap: { scale: 0.98 },
  };

  if (Component === 'a') {
    return (
      <motion.a
        {...commonProps}
        href={href}
        target={target}
        rel={rel}
        animate={animate}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...commonProps}
      disabled={disabled}
      type={type as 'button' | 'submit' | 'reset' | undefined}
      animate={animate}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
