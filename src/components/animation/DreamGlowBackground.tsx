import React, { useEffect, useRef, memo } from 'react';

const DreamGlowBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let hidden = false;
    let t = 0; // animation clock, drives pulsing

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const onVisibility = () => {
      hidden = document.hidden;
      if (hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Fewer, bigger, more saturated orbs with their own pulse phase/speed
    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      baseR: 260 + Math.random() * 260,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.15,
      hue: [168, 180, 200, 160, 190][i],
      sat: 70 + Math.random() * 20,
      // pulse params, mirrors the motion.div: scale 1 -> 1.2 -> 1, opacity 0.4 -> 0.7 -> 0.4
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.3, // radians/sec-ish, varied per orb so they don't sync
      baseAlpha: 0.16, // peak alpha, ~2x stronger than original 0.08
    }));

    let lastTime = performance.now();

    const draw = (now: number) => {
      if (hidden) return;
      raf = requestAnimationFrame(draw);

      const dt = (now - lastTime) / 1000;
      lastTime = now;
      t += dt;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const o of orbs) {
        // sine wave 0->1->0 driving both scale and opacity, like the hero glow
        const wave = (Math.sin(o.phase + t * o.speed) + 1) / 2; // 0..1
        const scale = 1 + wave * 0.25; // 1 -> 1.25 -> 1
        const alpha = 0.4 * o.baseAlpha + wave * (0.7 - 0.4) * o.baseAlpha; // mirrors opacity: [0.4,0.7,0.4] scaled to baseAlpha
        const r = o.baseR * scale;

        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
        g.addColorStop(0, `hsla(${o.hue}, ${o.sat}%, 55%, ${alpha})`);
        g.addColorStop(0.4, `hsla(${o.hue}, ${o.sat}%, 50%, ${alpha * 0.5})`);
        g.addColorStop(1, `hsla(${o.hue}, ${o.sat}%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, r, 0, Math.PI * 2);
        ctx.fill();

        o.x += o.dx;
        o.y += o.dy;
        if (o.x < -o.baseR) o.x = canvas.width + o.baseR;
        if (o.x > canvas.width + o.baseR) o.x = -o.baseR;
        if (o.y < -o.baseR) o.y = canvas.height + o.baseR;
        if (o.y > canvas.height + o.baseR) o.y = -o.baseR;
      }

      const { x, y } = mousePos.current;
      if (x > -100) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, 400);
        g.addColorStop(0, 'rgba(20, 184, 166, 0.14)');
        g.addColorStop(0.5, 'rgba(20, 184, 166, 0.06)');
        g.addColorStop(1, 'rgba(20, 184, 166, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 400, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ filter: 'blur(8px)' }} // softens hard gradient edges -> hazier, dreamier
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(20,184,166,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(56,189,248,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 80%, rgba(20,184,166,0.08) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
});

DreamGlowBackground.displayName = 'DreamGlowBackground';

export default DreamGlowBackground;