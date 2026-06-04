import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({
  value,
  suffix = '',
  duration = 2,
  shouldCount = true,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  shouldCount?: boolean;
}) => {
  const [displayed, setDisplayed] = useState(shouldCount ? 0 : value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldCount || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const frame = (now: number) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayed(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, shouldCount]);

  const display = shouldCount ? displayed : value;

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
};

export default AnimatedCounter;
