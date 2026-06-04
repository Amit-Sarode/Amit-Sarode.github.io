import { motion } from 'motion/react';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const TextReveal = ({
  children,
  delay = 0,
  stagger = 0.03,
  className,
  as: asTag = 'p',
}: {
  children: string;
  delay?: number;
  stagger?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}) => {
  const words = children.split(' ');

  let Tag: typeof motion.p;
  if (asTag === 'h1') Tag = motion.h1;
  else if (asTag === 'h2') Tag = motion.h2;
  else if (asTag === 'h3') Tag = motion.h3;
  else if (asTag === 'span') Tag = motion.span;
  else Tag = motion.p;

  return (
    <Tag className={className} style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '0.25em' }}>
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ display: 'inline-block', ...(isTouch ? {} : { willChange: 'transform' }) }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
