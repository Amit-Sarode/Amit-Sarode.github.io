import { useState, useCallback, useRef, useEffect, type MouseEvent, type TouchEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { BusinessCategory } from './data';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

function TiltCard({
  project,
  isCenter,
  onClick,
}: {
  project: BusinessCategory;
  isCenter: boolean;
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((py - 0.5) * -6);
    y.set((px - 0.5) * 6);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{
   
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={`
        relative flex-shrink-0 cursor-pointer select-none
        ${isMobile ? 'w-[240px]' : 'w-[340px]'}
      `}
    >
      <motion.div
        animate={{
          scale: isCenter ? 1 : 0.88,
          opacity: isCenter ? 1 : 0.4,
          filter: isCenter ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`
          relative overflow-hidden rounded-2xl
          ${isMobile ? 'h-[300px]' : 'h-[380px]'}
        `}
        style={{
          boxShadow: isCenter
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.15), 0 0 40px ${project.color}20`
            : '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
          transformStyle: 'preserve-3d',
          background: 'var(--bg-card)',
          willChange: 'transform, opacity, filter',
          transition: 'box-shadow 0.4s',
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${project.color}08 0%, rgba(2,13,10,0.92) 100%)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ transform: 'translateZ(24px)' }}>
          {isCenter && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-mono font-semibold tracking-widest mb-2 flex items-center gap-2"
              style={{ color: project.color }}
            >
              <span className="w-4 h-px inline-block" style={{ background: project.color }} />
              {project.impact[0]}
            </motion.span>
          )}
          <h3 className="text-lg font-bold text-white leading-tight mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {project.title}
          </h3>
          {isCenter && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm mt-1 line-clamp-2"
              style={{ color: '#94a3b8' }}
            >
              {project.description}
            </motion.p>
          )}
        </div>

        {isCenter && isHovered && !isTouch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-5 right-5 rounded-full flex items-center justify-center"
            style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              transform: 'translateZ(32px)',
              boxShadow: '0 4px 16px rgba(20,184,166,0.4)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

const CARDS = [
  {
    id: 0,
    num: "#01",
    label: "Strategy & Planning",
    desc: "Brand positioning and market research",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
  },
  {
    id: 1,
    num: "#02",
    label: "Design & Development",
    desc: "Visual identity and digital systems",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80",
  },
  {
    id: 2,
    num: "#03",
    label: "Launch & Growth",
    desc: "Campaign execution and brand rollout",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
  },
  {
    id: 3,
    num: "#04",
    label: "Ongoing Support",
    desc: "Brand management and evolution",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    id: 4,
    num: "#05",
    label: "Packaging & Print",
    desc: "Physical touchpoints and materials",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80",
  },
  {
    id: 5,
    num: "#06",
    label: "Digital Campaigns",
    desc: "Social, digital ads and motion",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

const N = CARDS.length;

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function getCardStyle(offset: number) {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset);
  const isCenter = offset === 0;

  const FAN_ANGLE = 18;
  const SPREAD_X = 72;
  const SPREAD_Z = -38;

  const rotateY = offset * FAN_ANGLE;
  const translateX = offset * SPREAD_X;
  const translateZ = abs * SPREAD_Z;
  const translateY = isCenter ? -14 : abs * 5;
  const scale = isCenter ? 1.13 : Math.max(0.6, 0.85 - (abs - 1) * 0.08);
  const opacity = [1, 0.78, 0.48, 0.22][Math.min(abs, 3)] ?? 0;
  const blur = abs > 2 ? `blur(${(abs - 2) * 2}px)` : "none";
  const zIndex = 100 - abs;

  const boxShadow = isCenter
    ? "0 24px 64px rgba(0,0,0,0.38), 0 0 0 1.5px rgba(249,115,22,0.3)"
    : "0 8px 28px rgba(0,0,0,0.2)";

  return {
    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    filter: blur,
    zIndex,
    boxShadow,
    pointerEvents: (abs > 3 ? "none" : "auto") as "auto" | "none",
  } as const;
}

const Carousel=()=> {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(mod(idx, N));
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const handleMouseDown = (e: MouseEvent) => { dragStartX.current = e.clientX; };
  const handleMouseUp = (e: MouseEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  const handleTouchStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  };

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        padding: "40px 16px 60px",
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#f97316",
            marginBottom: 10,
          }}
        >
          Behind the Designs
        </p>
        <h1
          style={{
            fontSize: "clamp(26px, 5vw, 42px)",
            fontWeight: 800,
            color: "#111",
            lineHeight: 1.18,
            marginBottom: 10,
            maxWidth: 520,
          }}
        >
          Curious What Else I've Created?
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#6b7280",
            maxWidth: 400,
            margin: "0 auto 20px",
            lineHeight: 1.6,
          }}
        >
          Explore more brand identities, packaging, and digital design work in
          my extended portfolio.
        </p>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 20px 9px 22px",
            borderRadius: 999,
            border: "1.5px solid #e5e7eb",
            background: "#fff",
            color: "#111",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          See more Projects
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="13"
              height="13"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Carousel */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          height: 340,
          position: "relative",
          perspective: "1100px",
          perspectiveOrigin: "50% 115%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          cursor: "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {CARDS.map((card, i) => {
            let offset = mod(i - current, N);
            if (offset > N / 2) offset -= N;
            const isCenter = offset === 0;
            const cardStyle = getCardStyle(offset);

            return (
              <div
                key={card.id}
                onClick={() => !isCenter && goTo(i)}
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  marginLeft: -80,
                  width: 160,
                  height: 220,
                  borderRadius: 16,
                  overflow: "hidden",
                  transformOrigin: "center bottom",
                  transition:
                    "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease, filter 0.45s ease, box-shadow 0.4s ease",
                  cursor: isCenter ? "default" : "pointer",
                  ...cardStyle,
                }}
              >
                {/* Image */}
                <img
                  src={card.img}
                  alt={card.label}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />

                {/* Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#f97316",
                      marginBottom: 2,
                    }}
                  >
                    {card.num}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.3,
                    }}
                  >
                    {card.label}
                  </span>
                  {isCenter && (
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.65)",
                        marginTop: 4,
                        lineHeight: 1.4,
                      }}
                    >
                      {card.desc}
                    </span>
                  )}
                </div>

                {/* Center ring highlight */}
                {isCenter && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 16,
                      border: "1.5px solid rgba(249,115,22,0.35)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots + Nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 18,
        }}
      >
        <NavBtn onClick={prev} dir="left" />

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {CARDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => goTo(i)}
              aria-label={c.label}
              style={{
                height: 6,
                width: i === current ? 22 : 6,
                borderRadius: 3,
                border: "none",
                background: i === current ? "#f97316" : "#d1d5db",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s",
              }}
            />
          ))}
        </div>

        <NavBtn onClick={next} dir="right" />
      </div>
    </div>
  );
}

function NavBtn({ onClick, dir }: { onClick: () => void; dir: 'left' | 'right' }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: "1px solid #e5e7eb",
        background: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
    >
      <svg
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {dir === "left" ? (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default Carousel;
