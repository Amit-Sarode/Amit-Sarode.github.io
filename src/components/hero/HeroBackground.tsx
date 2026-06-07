import React, { useEffect, useRef } from 'react';

const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track mouse position for the glow effect
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let hidden = false;

    const isMobile = window.innerWidth < 768;
    // Fewer orbs on mobile for performance
    const orbCount = isMobile ? 3 : 6;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Update mouse position reference
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    // Hide glow when mouse leaves window
    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 }; 
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    const onVisibility = () => {
      hidden = document.hidden;
      if (hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const orbs = Array.from({ length: orbCount }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 200 + Math.random() * 200,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      hue: [168, 180, 200, 160, 190, 150][i],
    }));

    let lastTime = 0;
    const interval = isMobile ? 32 : 0;

    const draw = (time: number) => {
      if (hidden) return;
      raf = requestAnimationFrame(draw);
      if (isMobile && time - lastTime < interval) return;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Draw floating ambient orbs
      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 70%, 55%, 0.12)`);
        g.addColorStop(1, `hsla(${o.hue}, 70%, 55%, 0)`);
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

      // 2. Draw Mouse Follow Glow (Desktop Only)
      if (!isMobile && mousePos.current.x > -100) {
        const { x, y } = mousePos.current;
        const glowRadius = 400; // Size of the mouse glow
        
        const mouseGlow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        // Using your theme's teal color (#14b8a6) with low opacity
        mouseGlow.addColorStop(0, 'rgba(20, 184, 166, 0.15)'); 
        mouseGlow.addColorStop(0.5, 'rgba(20, 184, 166, 0.05)');
        mouseGlow.addColorStop(1, 'rgba(20, 184, 166, 0)');

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

const NoiseOverlay: React.FC = () => {
  return (
    <div
      className="hidden md:block"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }}
    />
  );
};

const GridLines: React.FC = () => {
  return (
    <div
      className="hidden md:block"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
  );
};

export { AmbientBackground, NoiseOverlay, GridLines };