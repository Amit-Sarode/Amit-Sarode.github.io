import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { blogPosts, blogTags } from '../data/blogData';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import { Reveal } from './hero/Reveal';

const theme = {
  bg: '#020d0a',
  bgAlt: '#051311',
  surface: 'rgba(255, 255, 255, 0.045)',
  surfaceSoft: 'rgba(255, 255, 255, 0.025)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderAccent: 'rgba(20, 184, 166, 0.28)',
  heading: '#f8fafc',
  body: '#cbd5e1',
  muted: '#94a3b8',
  dim: '#64748b',
  accent: '#14b8a6',
  accentSoft: 'rgba(20, 184, 166, 0.12)',
};

const formatDate = (date: string) => new Intl.DateTimeFormat('en-IN', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}).format(new Date(`${date}T00:00:00`));

const formatNewsDate = (date: string) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? 'Recent'
    : new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' }).format(parsed);
};

const BLOGS_PER_PAGE = 5;
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY || 'YOUR_API_KEY';
const IS_PLACEHOLDER_GNEWS_KEY = GNEWS_API_KEY === 'YOUR_API_KEY';
const GNEWS_API_URL = `https://gnews.io/api/v4/top-headlines?topic=technology&apikey=${encodeURIComponent(GNEWS_API_KEY)}&lang=en&country=in&max=6`;

type GNewsArticle = {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
};

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeTag
    ? blogPosts.filter(p => p.tags.includes(activeTag))
    : blogPosts;
  const totalPages = Math.max(1, Math.ceil(filtered.length / BLOGS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * BLOGS_PER_PAGE;
  const pagePosts = filtered.slice(pageStart, pageStart + BLOGS_PER_PAGE);
  const featuredPost = pagePosts[0];
  const remainingPosts = pagePosts.slice(1);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const startIndex = filtered.length === 0 ? 0 : pageStart + 1;
  const endIndex = pageStart + pagePosts.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTag, safeCurrentPage]);

  return (
    <div style={{
      background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgAlt} 48%, #03100d 100%)`,
      minHeight: '100vh',
      color: theme.body,
      position: 'relative',
      overflow: 'hidden',
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
        maxWidth: 960,
        margin: '0 auto',
        padding: '120px 24px 96px',
        position: 'relative',
        zIndex: 1,
      }}>
        <Reveal>
          <motion.button
            type="button"
            whileHover={{ x: -4 }}
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: 0,
              color: theme.dim,
              fontSize: 13,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'monospace',
              padding: 0,
              marginBottom: 32,
            }}
          >
            ← Back to Home
          </motion.button>
        </Reveal>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              marginBottom: 18,
            }}>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 36 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: theme.accent, borderRadius: 2, display: 'inline-block' }}
              />
              <span style={{
                color: theme.accent,
                fontFamily: 'monospace',
                fontSize: 12,
                letterSpacing: '0.16em',
                fontWeight: 700,
              }}>
                BEHIND THE PROJECT
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 36 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: 2, background: theme.accent, borderRadius: 2, display: 'inline-block' }}
              />
            </div>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.06em',
              background: 'linear-gradient(120deg, #ffffff, #cbd5e1 52%, #5eead4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.05,
              margin: '0 0 16px',
            }}>
              Articles & Insights
            </h1>
            <p style={{ color: theme.muted, fontSize: 16, maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
              Medium-style editorial notes on AI chatbots, automation, SaaS products, and full-stack engineering — written for Indian businesses building faster.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 44,
          }}>
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTag(null)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 13,
                background: activeTag === null ? theme.accentSoft : 'transparent',
                border: `1px solid ${activeTag === null ? theme.borderAccent : theme.border}`,
                color: activeTag === null ? '#ffffff' : theme.muted,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: activeTag === null ? 700 : 500,
                transition: 'all 0.2s ease',
              }}
            >
              All stories
            </motion.button>
            {blogTags.map(tag => (
              <motion.button
                key={tag}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  background: activeTag === tag ? theme.accentSoft : 'transparent',
                  border: `1px solid ${activeTag === tag ? theme.borderAccent : theme.border}`,
                  color: activeTag === tag ? '#ffffff' : theme.muted,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: activeTag === tag ? 700 : 500,
                  transition: 'all 0.2s ease',
                }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {featuredPost && (
          <Reveal delay={0.1}>
            <motion.a
              className="blog-featured-card"
              href={`/blog/${featuredPost.slug}`}
              aria-label={`Read article: ${featuredPost.title}`}
              whileHover={{ y: -4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.1fr) minmax(240px, 0.72fr)',
                gap: 32,
                padding: 32,
                borderRadius: 26,
                background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.surface})`,
                border: `1px solid ${theme.borderAccent}`,
                color: 'inherit',
                textDecoration: 'none',
                boxShadow: '0 24px 80px rgba(0, 0, 0, 0.28)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  marginBottom: 18,
                }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'rgba(20, 184, 166, 0.16)',
                    border: '1px solid rgba(20, 184, 166, 0.24)',
                    fontSize: 11,
                    color: '#5eead4',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    Featured
                  </span>
                  <span style={{ color: theme.muted, fontSize: 13 }}>
                    {formatDate(featuredPost.date)} · {featuredPost.readTime}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.045em',
                  color: theme.heading,
                  margin: '0 0 16px',
                }}>
                  {featuredPost.title}
                </h2>
                <p style={{
                  color: theme.body,
                  fontSize: 16,
                  lineHeight: 1.85,
                  maxWidth: 680,
                  margin: 0,
                }}>
                  {featuredPost.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 24,
                  color: '#5eead4',
                  fontSize: 14,
                  fontWeight: 700,
                }}>
                  Read article
                  <span aria-hidden="true">→</span>
                </div>
              </div>

              <div
                className="blog-featured-side"
                style={{
                  borderLeft: `1px solid ${theme.border}`,
                  paddingLeft: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 28,
                }}
              >
                <div>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 50,
                    display: 'grid',
                    placeItems: 'center',
                    background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.28), rgba(255, 255, 255, 0.06))',
                    border: '1px solid rgba(94, 234, 212, 0.25)',
                    color: '#ffffff',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    marginBottom: 18,
                  }}>
                    AS
                  </div>
                  <p style={{ color: theme.heading, fontWeight: 700, margin: '0 0 4px' }}>
                    {featuredPost.author}
                  </p>
                  <p style={{ color: theme.muted, fontSize: 13, margin: 0 }}>
                    AI automation, SaaS, and product engineering notes.
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {featuredPost.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '5px 10px',
                      borderRadius: 999,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${theme.border}`,
                      color: theme.muted,
                      fontSize: 12,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          </Reveal>
        )}

        <div style={{ marginTop: 28 }}>
          {remainingPosts.map((post, i) => (
            <Reveal key={post.slug} delay={0.08 + i * 0.04}>
              <motion.a
                className="blog-list-card"
                href={`/blog/${post.slug}`}
                aria-label={`Read article: ${post.title}`}
                whileHover={{ x: 6 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  gap: 28,
                  alignItems: 'start',
                  padding: '30px 0',
                  borderBottom: `1px solid ${theme.border}`,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}>
                    <span style={{
                      color: theme.accent,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {post.tags[0]}
                    </span>
                    <span style={{ color: theme.dim, fontSize: 13 }}>
                      {formatDate(post.date)} · {post.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                    fontSize: 'clamp(1.35rem, 3vw, 2rem)',
                    lineHeight: 1.18,
                    letterSpacing: '-0.035em',
                    color: theme.heading,
                    margin: '0 0 10px',
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ color: theme.body, fontSize: 15, lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
                    {post.description}
                  </p>
                </div>
                <span style={{
                  color: theme.dim,
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  paddingTop: 6,
                }}>
                  Read →
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>

        {filtered.length > 0 && (
          <div
            className="blog-pagination"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              paddingTop: 28,
              marginTop: 40,
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            <span style={{ color: theme.muted, fontSize: 13 }}>
              Showing {startIndex}–{endIndex} of {filtered.length} stories
            </span>

            <div
              className="blog-pagination-pages"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              aria-label="Blog pagination"
            >
              <motion.button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: safeCurrentPage === 1 ? theme.dim : theme.heading,
                  cursor: safeCurrentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '8px 4px',
                  opacity: safeCurrentPage === 1 ? 0.45 : 1,
                }}
              >
                Previous
              </motion.button>

              {pageNumbers.map(page => (
                <motion.button
                  key={page}
                  type="button"
                  aria-current={safeCurrentPage === page ? 'page' : undefined}
                  onClick={() => setCurrentPage(page)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'transparent',
                    border: 0,
                    borderBottom: safeCurrentPage === page ? `2px solid ${theme.accent}` : '2px solid transparent',
                    color: safeCurrentPage === page ? theme.heading : theme.muted,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: safeCurrentPage === page ? 800 : 600,
                    minWidth: 32,
                    padding: '8px 6px',
                  }}
                >
                  {page}
                </motion.button>
              ))}

              <motion.button
                type="button"
                disabled={safeCurrentPage === totalPages}
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: safeCurrentPage === totalPages ? theme.dim : theme.heading,
                  cursor: safeCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '8px 4px',
                  opacity: safeCurrentPage === totalPages ? 0.45 : 1,
                }}
              >
                Next
              </motion.button>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 64,
            borderRadius: 24,
            background: theme.surfaceSoft,
            border: `1px solid ${theme.border}`,
            color: theme.muted,
          }}>
            No articles found for this tag.
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 720px) {
          .blog-featured-card {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }

          .blog-featured-side {
            border-left: 0 !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-left: 0 !important;
            padding-top: 24px !important;
          }

          .blog-list-card {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          .blog-list-card > span:last-child {
            justify-self: start;
          }

          .blog-pagination {
            align-items: flex-start !important;
            flex-direction: column !important;
          }

          .blog-pagination-pages {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;
