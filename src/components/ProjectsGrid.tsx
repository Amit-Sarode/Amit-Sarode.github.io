import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { businesses, type BusinessCategory } from './hero/data';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import { Reveal } from './hero/Reveal';
import Tilt3D from './ThreeDTilt';

const t = {
  bg: '#020d0a', bgAlt: '#050f10', bgDeep: '#02100d',
  surface: 'rgba(255,255,255,0.02)', cardBorder: 'rgba(255,255,255,0.06)',
  teal: '#14b8a6',
  heading: '#f1f5f9', body: '#e2e8f0', muted: '#94a3b8',
};

const allIndustries = [...new Set([
  'Healthcare', 'Hospitality', 'E-Commerce', 'Finance',
  'Fitness', 'Travel', 'Education', 'Real Estate', 'Automotive', 'SaaS',
])].sort();

const allTechs = [...new Set(businesses.flatMap(b => b.tech))].sort();

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const ProjectCard: React.FC<{ biz: BusinessCategory; index: number; navigate: ReturnType<typeof useNavigate> }> = ({ biz, index, navigate }) => {
  const [hovered, setHovered] = useState(false);
  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <Reveal key={biz.id} delay={index * 0.03}>
      <Tilt3D>
        <motion.div
          whileHover={isTouch ? {} : { y: -6 }}
          onClick={() => navigate(`/projects/${biz.id}`)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
            border: `1px solid ${hovered ? `${biz.color}40` : t.cardBorder}`,
            background: hovered ? `${biz.color}06` : t.surface,
            transition: 'border-color 0.3s, background 0.3s',
            position: 'relative',
            boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.3), 0 0 30px ${biz.color}10` : 'none',
          }}
        >
          <div style={{
            height: 160, overflow: 'hidden', position: 'relative',
          }}>
            <motion.img
              src={biz.image} alt={biz.title} loading="lazy"
              animate={{ scale: hovered ? 1.08 : 1, filter: hovered ? 'brightness(0.6)' : 'brightness(0.5)' }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to top, ${t.bg} 0%, transparent 50%)`,
            }} />
            <motion.span
              animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? [0, -8, 8, 0] : 0 }}
              transition={{ duration: 0.4 }}
              style={{ position: 'absolute', top: 12, left: 12, fontSize: 28 }}
            >{biz.icon}</motion.span>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute', bottom: 12, right: 12,
                  padding: '4px 10px', borderRadius: 6,
                  background: `${biz.color}90`, backdropFilter: 'blur(4px)',
                  fontSize: 10, color: '#fff', fontWeight: 600,
                  fontFamily: 'monospace', letterSpacing: '0.05em',
                }}
              >
                View Case Study →
              </motion.div>
            )}
          </div>
          <div style={{ padding: '16px 18px 18px' }}>
            <h3 style={{
              fontSize: 15, fontWeight: 700, color: t.heading,
              margin: '0 0 6px', lineHeight: 1.3,
            }}>{biz.title}</h3>
            <p style={{
              fontSize: 13, color: t.muted, margin: '0 0 12px',
              lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>{biz.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {biz.tech.slice(0, 3).map((tech: string) => (
                <span key={tech} style={{
                  padding: '2px 8px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 10, color: t.muted,
                }}>{tech}</span>
              ))}
              {biz.tech.length > 3 && (
                <span style={{ fontSize: 10, color: t.muted, padding: '2px 4px' }}>
                  +{biz.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Tilt3D>
    </Reveal>
  );
};

const ProjectsGrid: React.FC = () => {
  const navigate = useNavigate();
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = businesses.filter(b => {
    if (industryFilter && !b.title.toLowerCase().includes(industryFilter.toLowerCase()) && !b.description.toLowerCase().includes(industryFilter.toLowerCase())) {
      const indMap: Record<string, string[]> = {
        'Healthcare': ['AI Healthcare Receptionist', 'Dental', 'Clinic'],
        'Hospitality': ['Restaurant', 'Bar', 'Hotel'],
        'E-Commerce': ['Jollie Macaron', 'E-Commerce', 'Order'],
        'Fitness': ['Gym', 'Wellness', 'Fitness'],
        'Travel': ['Travel Booking', 'BackpackTales'],
        'Education': ['Education Enrollment', 'Coaching'],
        'Real Estate': ['Buyer Agent', 'Perth', 'Property'],
        'Finance': ['Bachat Gat', 'FinTech'],
        'Automotive': ['Garage Management'],
        'SaaS': ['VibNote', 'SaaS'],
      };
      const related = indMap[industryFilter] || [];
      if (!related.some(r => b.title.includes(r))) return false;
    }
    if (techFilter && !b.tech.some(t => t.toLowerCase().includes(techFilter.toLowerCase()))) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!b.title.toLowerCase().includes(q) && !b.description.toLowerCase().includes(q) && !b.tech.some(t => t.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  return (
    <div style={{
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bgAlt} 40%, ${t.bgDeep} 100%)`,
      minHeight: '100vh', color: t.body, position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title="Projects | Portfolio | Amit Sarode"
        description="Browse my portfolio of AI automation, chatbot, and full-stack development projects for businesses across India and globally."
        path="/projects"
      />
      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      <section style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '120px 24px 80px', position: 'relative', zIndex: 1,
      }}>
        <Reveal>
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none', color: '#475569', fontSize: 13,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'monospace', padding: 0, marginBottom: 24,
            }}
          >← Back to Home</motion.button>
        </Reveal>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
             
                                <motion.span 
                              initial={{ width: 0 }}
                              whileInView={{ width: 32 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                            />
                              <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>PORTFOLIO</span>
                                <motion.span 
                              initial={{ width: 0 }}
                              whileInView={{ width: 32 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                            />
                          
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800,
              background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', lineHeight: 1.2, margin: '0 0 12px',
            }}>All Projects</h1>
            <p style={{ color: t.muted, fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
              Browse AI chatbots, automation systems, and full-stack platforms I've built.
            </p>
          </div>
        </Reveal>

        {/* Search + Filters */}
        <Reveal delay={0.05}>
          <div style={{ marginBottom: 32 }}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: t.heading, fontSize: 14, outline: 'none',
                fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 12,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(20,184,166,0.4)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: t.muted, fontFamily: 'monospace' }}>Industry:</span>
              <button
                onClick={() => setIndustryFilter(null)}
                style={{
                  padding: '4px 12px', borderRadius: 14, fontSize: 11,
                  background: industryFilter === null ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${industryFilter === null ? 'rgba(20,184,166,0.3)' : t.cardBorder}`,
                  color: industryFilter === null ? t.teal : t.muted, cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: industryFilter === null ? 600 : 400,
                }}
              >All</button>
              {allIndustries.map(ind => (
                <button
                  key={ind}
                  onClick={() => setIndustryFilter(industryFilter === ind ? null : ind)}
                  style={{
                    padding: '4px 12px', borderRadius: 14, fontSize: 11,
                    background: industryFilter === ind ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${industryFilter === ind ? 'rgba(20,184,166,0.3)' : t.cardBorder}`,
                    color: industryFilter === ind ? t.teal : t.muted, cursor: 'pointer',
                    fontFamily: 'inherit', fontWeight: industryFilter === ind ? 600 : 400,
                  }}
                >{ind}</button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Project grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16,
        }}>
          {filtered.map((biz, i) => (
            <ProjectCard key={biz.id} biz={biz} index={i} navigate={navigate} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: t.muted }}>
            No projects match your filters.
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectsGrid;
