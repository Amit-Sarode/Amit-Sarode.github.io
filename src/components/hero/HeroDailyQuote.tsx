import React, { useEffect, useState } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface Quote {
  q: string;
  a: string;
}

const useDailyQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('daily-quote');
    if (cached) {
      setQuote(JSON.parse(cached));
      return;
    }
    fetch('https://zenquotes.io/api/today')
      .then((r) => r.json())
      .then((data) => {
        if (data && data[0]) {
          setQuote(data[0]);
          sessionStorage.setItem('daily-quote', JSON.stringify(data[0]));
        }
      })
      .catch(() => {});
  }, []);

  return quote;
};

const DailyQuote: React.FC<{
  scrollProgress: MotionValue<number>;
}> = ({ scrollProgress }) => {
  const quote = useDailyQuote();

  if (!quote) return null;

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: 600,
        padding: '0 24px',
      }}
    >
      <div style={{
        padding: '20px 28px',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ fontSize: 20, color: '#14b8a6', marginBottom: 8, opacity: 0.5 }}>"</div>
        <p style={{
          fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
          color: '#94a3b8',
          lineHeight: 1.7,
          margin: '0 0 12px',
        }}>
          {quote.q}
        </p>
        <p style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', margin: 0, letterSpacing: '0.05em' }}>
          — {quote.a}
        </p>
      </div>
    </motion.div>
  );
};

export { DailyQuote, useDailyQuote };
