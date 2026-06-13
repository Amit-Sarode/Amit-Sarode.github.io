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

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 200 + Math.random() * 300,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      hue: [168, 180, 200, 160, 190, 150][i],
      sat: 60 + Math.random() * 20,
    }));

    const draw = () => {
      if (hidden) return;
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, ${o.sat}%, 50%, 0.08)`);
        g.addColorStop(0.5, `hsla(${o.hue}, ${o.sat}%, 50%, 0.03)`);
        g.addColorStop(1, `hsla(${o.hue}, ${o.sat}%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        o.x += o.dx;
        o.y += o.dy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;
      }

      const { x, y } = mousePos.current;
      if (x > -100) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, 400);
        g.addColorStop(0, 'rgba(20, 184, 166, 0.08)');
        g.addColorStop(0.5, 'rgba(20, 184, 166, 0.03)');
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
      <canvas ref={canvasRef} className="absolute inset-0" />
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
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(20,184,166,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(56,189,248,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 80%, rgba(20,184,166,0.06) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
});

DreamGlowBackground.displayName = 'DreamGlowBackground';

export default DreamGlowBackground;
