import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../ui/SEO';
import { blogPosts, blogTags } from '../../data/blogData';
import { AmbientBackground, NoiseOverlay, GridLines } from '../hero/HeroBackground';
import { Reveal } from '../hero/Reveal';

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
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY || '';
const GNEWS_API_BASE = 'https://gnews.io/api/v4/top-headlines?topic=technology';
const GNEWS_API_PARAMS = `apikey=${encodeURIComponent(GNEWS_API_KEY)}&lang=en&country=in&max=6`;
const GNEWS_DIRECT_URL = `${GNEWS_API_BASE}&${GNEWS_API_PARAMS}`;
const CORS_PROXIES = ['https://api.allorigins.win/raw?url=', 'https://corsproxy.io/?'];

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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [techNews, setTechNews] = useState<GNewsArticle[]>([]);
  const [techNewsStatus, setTechNewsStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  const filtered = blogPosts.filter(p => {
    if (activeTag && !p.tags.includes(activeTag)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });
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
  }, [activeTag, searchQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTag, safeCurrentPage]);

  useEffect(() => {
    if (!GNEWS_API_KEY) {
      setTechNewsStatus('error');
      return;
    }

    const controller = new AbortController();
    setTechNewsStatus('loading');

    const tryFetch = (url: string): Promise<Response> =>
      fetch(url, { signal: controller.signal });

    const tryProxies = async (proxyIndex: number): Promise<Response> => {
      if (proxyIndex >= CORS_PROXIES.length) throw new Error('All proxies exhausted');
      const proxyUrl = `${CORS_PROXIES[proxyIndex]}${encodeURIComponent(GNEWS_DIRECT_URL)}`;
      try {
        const res = await tryFetch(proxyUrl);
        if (!res.ok) throw new Error(`Proxy ${proxyIndex} returned ${res.status}`);
        return res;
      } catch {
        return tryProxies(proxyIndex + 1);
      }
    };

    (async () => {
      try {
        let res: Response;
        try {
          res = await tryFetch(GNEWS_DIRECT_URL);
          if (!res.ok) throw new Error(`Direct request failed: ${res.status}`);
        } catch {
          res = await tryProxies(0);
        }
        const data: { articles?: GNewsArticle[] } = await res.json();
        setTechNews(Array.isArray(data.articles) ? data.articles : []);
        setTechNewsStatus('ready');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (error instanceof Error && error.name === 'AbortError') return;
        setTechNewsStatus('error');
      }
    })();

    return () => controller.abort();
  }, []);

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

        <Reveal delay={0.07}>
          <div style={{
            position: 'relative',
            maxWidth: 440,
            margin: '0 auto 44px',
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: 12,
                background: theme.surfaceSoft,
                border: `1px solid ${searchQuery ? theme.borderAccent : theme.border}`,
                color: theme.heading,
                fontSize: 14,
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
              }}
            />
            <span style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.dim,
              fontSize: 16,
              pointerEvents: 'none',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 0,
                  color: theme.dim,
                  cursor: 'pointer',
                  padding: 4,
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            )}
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

        {(techNewsStatus === 'loading' || techNewsStatus === 'ready' || techNewsStatus === 'error') && (
          <section
            style={{
              marginTop: 72,
              paddingTop: 40,
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 20,
              marginBottom: 24,
            }}>
              <div>
                <span style={{
                  color: theme.accent,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  Live feed
                </span>
                <h2 style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.045em',
                  color: theme.heading,
                  margin: '8px 0 0',
                }}>
                  Latest Tech News
                </h2>
              </div>
              <span style={{ color: theme.muted, fontSize: 13, whiteSpace: 'nowrap' }}>
                Powered by GNews
              </span>
            </div>

            {techNewsStatus === 'loading' && (
              <div className="tech-news-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 16,
              }}>
                {[0, 1, 2].map(index => (
                  <div
                    key={index}
                    style={{
                      borderRadius: 20,
                      border: `1px solid ${theme.border}`,
                      background: theme.surfaceSoft,
                      overflow: 'hidden',
                      minHeight: 280,
                    }}
                  >
                    <div style={{
                      height: 150,
                      background: `linear-gradient(135deg, ${theme.accentSoft}, rgba(255,255,255,0.03))`,
                    }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ height: 12, width: '45%', borderRadius: 999, background: 'rgba(255,255,255,0.08)', marginBottom: 16 }} />
                      <div style={{ height: 22, width: '88%', borderRadius: 8, background: 'rgba(255,255,255,0.12)', marginBottom: 10 }} />
                      <div style={{ height: 22, width: '72%', borderRadius: 8, background: 'rgba(255,255,255,0.08)' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {techNewsStatus === 'error' && !GNEWS_API_KEY && (
              <div style={{
                padding: 28,
                borderRadius: 20,
                background: 'rgba(20, 184, 166, 0.08)',
                border: `1px solid ${theme.borderAccent}`,
                color: theme.body,
                lineHeight: 1.7,
              }}>
                Add your GNews API key to enable the technology news feed. Set <strong>VITE_GNEWS_API_KEY</strong> in your environment and restart the dev server.
              </div>
            )}

            {techNewsStatus === 'error' && !!GNEWS_API_KEY && (
              <div style={{
                padding: 28,
                borderRadius: 20,
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: theme.body,
                lineHeight: 1.7,
              }}>
                Unable to load tech news. Check your GNews API key, network connection, or try again later.
              </div>
            )}

            {techNewsStatus === 'ready' && techNews.length === 0 && (
              <div style={{
                padding: 28,
                borderRadius: 20,
                background: theme.surfaceSoft,
                border: `1px solid ${theme.border}`,
                color: theme.muted,
              }}>
                No technology news found.
              </div>
            )}

            {techNewsStatus === 'ready' && techNews.length > 0 && (
              <div className="tech-news-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 16,
              }}>
                {techNews.map((article, index) => (
                  <motion.button
                    type="button"
                    key={`${article.url}-${index}`}
                    onClick={() => navigate(`/blog/news/${index}`, { state: { article } })}
                    whileHover={{ y: -4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 20,
                      border: `1px solid ${theme.border}`,
                      background: theme.surfaceSoft,
                      overflow: 'hidden',
                      color: 'inherit',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      padding: 0,
                      width: '100%',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                    }}
                  >
                    {article.image ? (
                      <img
                        src={article.image}
                        alt=""
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 150,
                          objectFit: 'cover',
                          display: 'block',
                          background: theme.accentSoft,
                        }}
                      />
                    ) : (
                      <div style={{
                        height: 150,
                        display: 'grid',
                        placeItems: 'center',
                        background: `linear-gradient(135deg, ${theme.accentSoft}, rgba(255,255,255,0.03))`,
                        color: '#5eead4',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}>
                        Tech
                      </div>
                    )}
                    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
                      <span style={{ color: theme.muted, fontSize: 12 }}>
                        {formatNewsDate(article.publishedAt)} · {article.source.name}
                      </span>
                      <h3 style={{
                        fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                        fontSize: '1.25rem',
                        lineHeight: 1.25,
                        letterSpacing: '-0.025em',
                        color: theme.heading,
                        margin: 0,
                      }}>
                        {article.title}
                      </h3>
                      <p style={{
                        color: theme.body,
                        fontSize: 14,
                        lineHeight: 1.65,
                        margin: 0,
                      }}>
                        {article.description?.trim() || 'Click to read the full technology update.'}
                      </p>
                      <span style={{
                        color: '#5eead4',
                        fontSize: 13,
                        fontWeight: 700,
                        marginTop: 'auto',
                      }}>
                        Read more →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </section>
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

          .tech-news-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .tech-news-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;
