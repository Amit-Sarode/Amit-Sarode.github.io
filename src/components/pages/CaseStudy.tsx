import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../ui/SEO';
import { caseStudies, businesses } from '../hero/data';
import { AmbientBackground, NoiseOverlay, GridLines } from '../hero/HeroBackground';
import { Helmet } from 'react-helmet-async';

const t = {
  bg: '#020d0a', bgAlt: '#050f10', bgDeep: '#02100d',
  surface: 'rgba(255,255,255,0.02)', cardBorder: 'rgba(255,255,255,0.06)',
  teal: '#14b8a6', tealDark: '#0d9488',
  heading: '#f1f5f9', body: '#e2e8f0', muted: '#94a3b8',
};

const caseStudySlugs: Record<string, { study: typeof caseStudies[0]; biz: typeof businesses[0] | undefined }> = {
  'ai-receptionist-dental': {
    study: caseStudies[0],
    biz: businesses.find(b => b.id === 2),
  },
  'ecommerce-product-recommender': {
    study: caseStudies[1],
    biz: businesses.find(b => b.id === 3),
  },
  'hrms-task-automation': {
    study: caseStudies[2],
    biz: businesses.find(b => b.id === 1),
  },
};

const caseStudyList = [
  { slug: 'ai-receptionist-dental', ...caseStudies[0] },
  { slug: 'ecommerce-product-recommender', ...caseStudies[1] },
  { slug: 'hrms-task-automation', ...caseStudies[2] },
];

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const data = slug ? caseStudySlugs[slug] : undefined;

  if (!data) return <Navigate to="/case-studies" replace />;

  const { study, biz } = data;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bgAlt} 40%, ${t.bgDeep} 100%)`,
      minHeight: '100vh', color: t.body, position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title={`${study.title} | Case Study | Amit Sarode`}
        description={`${study.desc} Result: ${study.result}.`}
        path={`/case-studies/${slug}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": study.title,
            "description": study.desc,
            "author": { "@type": "Person", "name": "Amit Sarode" },
            "datePublished": "2026-01-15",
            "publisher": { "@type": "Person", "name": "Amit Sarode" },
          })}
        </script>
      </Helmet>

      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      <article style={{
        maxWidth: 800, margin: '0 auto',
        padding: '120px 24px 80px', position: 'relative', zIndex: 1,
      }}>
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate('/case-studies')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.cardBorder}`,
            color: t.muted, fontSize: 13, cursor: 'pointer',
            marginBottom: 32, fontFamily: 'monospace', letterSpacing: '0.04em',
          }}
        >← All Case Studies</motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '32px', borderRadius: 20, marginBottom: 32,
            background: `${study.color}08`, border: `1px solid ${study.color}25`,
            position: 'relative', overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 300, height: 300, borderRadius: '50%',
              background: `radial-gradient(circle, ${study.color}15 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)', pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {study.tags.map(tag => (
                <span key={tag} style={{
                  padding: '2px 10px', borderRadius: 12,
                  background: `${study.color}15`, border: `1px solid ${study.color}30`,
                  fontSize: 11, color: study.color, fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>
            <h1 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800,
              color: t.heading, margin: '0 0 8px', lineHeight: 1.2,
            }}>{study.title}</h1>
            <p style={{ color: study.color, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
              Client: {study.client}
            </p>
            <p style={{ color: t.body, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              {study.desc}
            </p>
          </div>
        </motion.div>

        {/* Result highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            textAlign: 'center', padding: '28px', borderRadius: 16, marginBottom: 32,
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${t.cardBorder}`,
          }}
        >
          <p style={{ fontSize: 12, color: t.muted, fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 8 }}>
            KEY RESULT
          </p>
          <p style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
            color: study.color, margin: 0,
          }}>{study.result}</p>
        </motion.div>

        {/* Business Impact from linked project */}
        {biz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ marginBottom: 32 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700,
              color: t.heading, marginBottom: 16,
            }}>Measurable Impact</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {biz.impact.map((item, i) => (
                <div key={i} style={{
                  padding: '16px 18px', borderRadius: 14,
                  background: `${study.color}08`, border: `1px solid ${study.color}20`,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: `${study.color}20`, border: `1px solid ${study.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: study.color, fontWeight: 700,
                  }}>✓</span>
                  <span style={{ fontSize: 14, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Architecture / Workflow from project */}
        {biz && biz.workflow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: 32 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700,
              color: t.heading, marginBottom: 16,
            }}>System Architecture</h2>
            <div style={{
              padding: '20px', borderRadius: 16,
              background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.cardBorder}`,
              display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', justifyContent: 'center',
            }}>
              {biz.workflow.map((step, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    padding: '8px 14px', borderRadius: 8,
                    background: i === biz.workflow.length - 1 ? `${study.color}15` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${i === biz.workflow.length - 1 ? `${study.color}40` : t.cardBorder}`,
                    fontSize: 12, color: i === biz.workflow.length - 1 ? study.color : t.body,
                    fontWeight: i === biz.workflow.length - 1 ? 700 : 500,
                    fontFamily: 'monospace', whiteSpace: 'nowrap',
                  }}>{step.replace(/\s*→\s*$/, '')}</span>
                  {i < biz.workflow.length - 1 && (
                    <span style={{ color: study.color, margin: '0 4px', fontSize: 14, opacity: 0.5 }}>→</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech stack */}
        {biz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ marginBottom: 32 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700,
              color: t.heading, marginBottom: 16,
            }}>Tech Stack</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {biz.tech.map(tech => (
                <span key={tech} style={{
                  padding: '6px 16px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.cardBorder}`,
                  fontSize: 13, color: t.body, fontFamily: 'monospace', letterSpacing: '0.04em',
                }}>{tech}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Problem + Solution */}
        {biz && biz.problem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: 32 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700,
              color: t.heading, marginBottom: 12,
            }}>The Problem</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: t.body, margin: 0 }}>
              {biz.problem}
            </p>
          </motion.div>
        )}
        {biz && biz.solution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: 32 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700,
              color: t.heading, marginBottom: 12,
            }}>The Solution</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: t.body, margin: 0 }}>
              {biz.solution}
            </p>
          </motion.div>
        )}

        {/* Lessons learned */}
        {biz && biz.lessonsLearned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              padding: '24px', borderRadius: 16, marginBottom: 32,
              background: 'rgba(255,255,255,0.02)', border: `1px dashed ${t.cardBorder}`,
            }}
          >
            <h3 style={{ fontSize: 15, color: t.heading, marginBottom: 8 }}>
              Lessons Learned
            </h3>
            <p style={{ fontSize: 14, color: t.muted, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              "{biz.lessonsLearned}"
            </p>
          </motion.div>
        )}

        {/* Project link */}
        {biz && biz.link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <motion.a
              href={biz.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${study.color}50` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 12,
                background: study.color, color: '#fff', fontSize: 15, fontWeight: 700,
                textDecoration: 'none', fontFamily: 'inherit',
              }}
            >View Live Project ↗</motion.a>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            padding: '32px', borderRadius: 16,
            background: 'rgba(20,184,166,0.06)',
            border: '1px solid rgba(20,184,166,0.15)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: t.heading, margin: '0 0 8px', fontWeight: 700 }}>
            Want Results Like This?
          </h3>
          <p style={{ color: t.muted, fontSize: 14, margin: '0 0 20px' }}>
            Let's discuss how we can achieve similar outcomes for your business.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/contact')}
              style={{
                padding: '12px 28px', borderRadius: 12,
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                color: '#fff', fontSize: 14, fontWeight: 700,
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >Get Free Consultation →</motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/pricing')}
              style={{
                padding: '12px 28px', borderRadius: 12,
                background: 'transparent', color: t.body, fontSize: 14, fontWeight: 600,
                border: `1px solid ${t.cardBorder}`, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >View Pricing</motion.button>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

const CaseStudyList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bgAlt} 40%, ${t.bgDeep} 100%)`,
      minHeight: '100vh', color: t.body, position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title="Case Studies | AI Automation Results | Amit Sarode"
        description="Real case studies showing measurable results from AI automation, chatbot development, and full-stack projects."
        path="/case-studies"
      />
      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      <section style={{
        maxWidth: 900, margin: '0 auto',
        padding: '120px 24px 80px', position: 'relative', zIndex: 1,
      }}>
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -3 }}
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', color: '#475569', fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'monospace', padding: 0, marginBottom: 24,
          }}
        >← Back to Home</motion.button>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 32, height: 2, background: t.teal, borderRadius: 2 }} />
            <span style={{ color: t.teal, fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>CASE STUDIES</span>
            <span style={{ width: 32, height: 2, background: t.teal, borderRadius: 2 }} />
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800,
            background: 'linear-gradient(120deg, #ffffff, #cbd5e1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1.2, margin: '0 0 12px',
          }}>Real Results</h1>
          <p style={{ color: t.muted, fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            Detailed case studies showing measurable business outcomes from AI automation and custom development.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {caseStudyList.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/case-studies/${item.slug}`)}
              style={{
                padding: '28px', borderRadius: 16, cursor: 'pointer',
                background: `${item.color}06`, border: `1px solid ${item.color}20`,
                transition: 'border-color 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${item.color}50`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${item.color}20`; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '2px 8px', borderRadius: 10,
                        background: `${item.color}15`, fontSize: 10, color: item.color,
                      }}>{tag}</span>
                    ))}
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700,
                    color: t.heading, margin: '0 0 6px', lineHeight: 1.3,
                  }}>{item.title}</h2>
                  <p style={{ fontSize: 13, color: t.muted, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
                <div style={{
                  flexShrink: 0, textAlign: 'right',
                }}>
                  <p style={{ fontSize: 11, color: t.muted, marginBottom: 4 }}>Result</p>
                  <p style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontWeight: 800,
                    color: item.color, margin: 0, whiteSpace: 'nowrap',
                  }}>{item.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: 48, padding: '32px', borderRadius: 16, textAlign: 'center',
            background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)',
          }}
        >
          <h3 style={{ color: t.heading, margin: '0 0 8px', fontWeight: 700 }}>
            Ready to Be Our Next Case Study?
          </h3>
          <p style={{ color: t.muted, fontSize: 14, margin: '0 0 20px' }}>
            Let's build something that delivers measurable results for your business.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            style={{
              padding: '12px 28px', borderRadius: 12,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              color: '#fff', fontSize: 14, fontWeight: 700,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            }}
          >Start Your Project →</motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export { CaseStudyPage, CaseStudyList };
