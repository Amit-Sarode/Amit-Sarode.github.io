import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../ui/SEO';
import { businesses, type BusinessCategory } from '../hero/data';
import { AmbientBackground, NoiseOverlay, GridLines } from '../hero/HeroBackground';
import { Reveal } from '../hero/Reveal';
import Tilt3D from '../ui/ThreeDTilt';

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

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const ProjectRow: React.FC<{ biz: BusinessCategory; index: number; navigate: ReturnType<typeof useNavigate> }> = ({ biz, index, navigate }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-10 md:gap-16 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} w-full`}
    >
      {/* Image / Mockup Section */}
      <div className="w-full md:w-1/2 group relative">
        <div 
          className="relative overflow-hidden rounded-2xl border border-white/10"
          style={{
             background: 'rgba(255,255,255,0.03)',
             boxShadow: `0 20px 40px -10px ${biz.color}30`
          }}
        >
          {/* Browser Bar */}
          <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-4 gap-1.5 backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          
          {/* Image */}
          <div className="overflow-hidden aspect-video relative">
            <motion.img 
              src={biz.image} 
              alt={biz.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f1f5f9' }}>{biz.title}</h2>
        
        <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
          {biz.description} {biz.problem && <span className="opacity-80 block mt-2">{biz.problem}</span>}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {biz.tech.map(tech => (
            <span key={tech} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${biz.color}15`, color: biz.color, border: `1px solid ${biz.color}40` }}>
              {tech}
            </span>
          ))}
        </div>
        
        {/* Key Highlights */}
        {biz.impact && biz.impact.length > 0 && (
          <div className="flex flex-col gap-3 mb-8 w-full">
            {biz.impact.slice(0, 4).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: biz.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm md:text-base text-slate-300">{highlight}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* CTAs */}
        <div className="flex flex-wrap gap-4 w-full sm:w-auto mt-auto">
          <motion.button
            whileHover={{ y: -3, boxShadow: `0 10px 20px -10px ${biz.color}` }}
            whileTap={{ scale: 0.95 }}
            onClick={() => biz.link ? window.open(biz.link, '_blank') : navigate(`/projects/${biz.id}`)}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2"
            style={{ background: biz.color }}
          >
            Live Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </motion.button>
          
          {biz.github ? (
            <motion.button
              whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(biz.github, '_blank')}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/20"
              style={{ color: '#f1f5f9', background: 'rgba(255,255,255,0.03)' }}
            >
              GitHub
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/projects/${biz.id}`)}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/20"
              style={{ color: '#f1f5f9', background: 'rgba(255,255,255,0.03)' }}
            >
              Case Study
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsGrid: React.FC = () => {
  const navigate = useNavigate();
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
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
        <div className="flex flex-col gap-24 md:gap-32 mt-16">
          {filtered.map((biz, i) => (
            <ProjectRow key={biz.id} biz={biz} index={i} navigate={navigate} />
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
