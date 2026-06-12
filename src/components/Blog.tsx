import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { blogPosts, blogTags } from '../data/blogData';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import { Reveal, Divider } from './hero/Reveal';

const t = {
  bg: '#020d0a', bgAlt: '#050f10', bgDeep: '#02100d',
  surface: 'rgba(255,255,255,0.02)', cardBorder: 'rgba(255,255,255,0.06)',
  teal: '#14b8a6', tealDark: '#0d9488',
  heading: '#f1f5f9', body: '#e2e8f0', muted: '#94a3b8',
};

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? blogPosts.filter(p => p.tags.includes(activeTag))
    : blogPosts;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bgAlt} 40%, ${t.bgDeep} 100%)`,
      minHeight: '100vh', color: t.body, position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title="Blog | AI Automation & Development | Amit Sarode"
        description="Expert articles on AI chatbots, workflow automation, custom AI applications, and full-stack development for Indian businesses."
        path="/blog"
      />
      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      <section style={{
        maxWidth: 900, margin: '0 auto',
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
          >
            ← Back to Home
          </motion.button>
        </Reveal>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 12, marginBottom: 16,
            }}>
             
                               <motion.span 
                             initial={{ width: 0 }}
                             whileInView={{ width: 32 }}
                             transition={{ duration: 0.8, delay: 0.2 }}
                             style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                           />
                             <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>BEHIND THE PROJECT</span>
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
            }}>
              Articles & Insights
            </h1>
            <p style={{ color: t.muted, fontSize: 15, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              AI automation, chatbot development, workflow optimization, and full-stack engineering — written for Indian businesses.
            </p>
          </div>
        </Reveal>

        {/* Filter tags */}
        <Reveal delay={0.05}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
            marginBottom: 40,
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTag(null)}
              style={{
                padding: '6px 16px', borderRadius: 20, fontSize: 12,
                background: activeTag === null ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeTag === null ? 'rgba(20,184,166,0.3)' : t.cardBorder}`,
                color: activeTag === null ? t.teal : t.muted, cursor: 'pointer',
                fontFamily: 'inherit', fontWeight: activeTag === null ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >All</motion.button>
            {blogTags.map(tag => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  padding: '6px 16px', borderRadius: 20, fontSize: 12,
                  background: activeTag === tag ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeTag === tag ? 'rgba(20,184,166,0.3)' : t.cardBorder}`,
                  color: activeTag === tag ? t.teal : t.muted, cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: activeTag === tag ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >{tag}</motion.button>
            ))}
          </div>
        </Reveal>

        {/* Blog posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.04}>
              <motion.article
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                style={{
                  padding: '24px', borderRadius: 16,
                  background: t.surface, border: `1px solid ${t.cardBorder}`,
                  cursor: 'pointer', transition: 'border-color 0.3s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.cardBorder;
                }}
              >
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '2px 10px', borderRadius: 12,
                      background: 'rgba(20,184,166,0.06)',
                      border: '1px solid rgba(20,184,166,0.12)',
                      fontSize: 11, color: t.teal, fontWeight: 500,
                    }}>{tag}</span>
                  ))}
                  <span style={{ fontSize: 11, color: t.muted, marginLeft: 'auto' }}>
                    {post.date} · {post.readTime}
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700,
                  color: t.heading, margin: '0 0 8px', lineHeight: 1.3,
                }}>{post.title}</h2>
                <p style={{ fontSize: 14, color: t.muted, lineHeight: 1.6, margin: 0 }}>
                  {post.description}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: t.muted }}>
            No articles found for this tag.
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
