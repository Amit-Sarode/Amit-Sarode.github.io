import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../ui/SEO';
import { AmbientBackground, NoiseOverlay, GridLines } from '../hero/HeroBackground';

type GNewsArticle = {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string };
};

const t = {
  bg: '#020d0a', bgAlt: '#051311',
  surface: 'rgba(255, 255, 255, 0.045)',
  surfaceSoft: 'rgba(255, 255, 255, 0.025)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderAccent: 'rgba(20, 184, 166, 0.28)',
  heading: '#f8fafc', body: '#cbd5e1', muted: '#94a3b8', dim: '#64748b',
  accent: '#14b8a6',
};

const formatNewsDate = (date: string) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? 'Recent'
    : new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
};

const NewsArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state?.article as GNewsArticle | undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div style={{
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bgAlt} 48%, #03100d 100%)`,
      minHeight: '100vh', color: t.body, position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title={`${article.title} | Tech News | Amit Sarode`}
        description={article.description || 'Technology news update'}
        path={`/blog/news/${id}`}
      />
      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      <article style={{
        maxWidth: 720, margin: '0 auto',
        padding: '120px 24px 80px', position: 'relative', zIndex: 1,
      }}>
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate('/blog')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.border}`,
            color: t.muted, fontSize: 13, cursor: 'pointer',
            marginBottom: 32, fontFamily: 'monospace', letterSpacing: '0.04em',
          }}
        >
          ← Back to Blog
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {article.image && (
            <img
              src={article.image}
              alt=""
              style={{
                width: '100%', maxHeight: 360, objectFit: 'cover',
                borderRadius: 16, marginBottom: 24, display: 'block',
                background: 'rgba(20, 184, 166, 0.08)',
              }}
            />
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
            <span style={{
              padding: '4px 10px', borderRadius: 999,
              background: 'rgba(20, 184, 166, 0.16)',
              border: '1px solid rgba(20, 184, 166, 0.24)',
              fontSize: 11, color: '#5eead4', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Tech News
            </span>
            <span style={{ color: t.muted, fontSize: 13 }}>
              {formatNewsDate(article.publishedAt)} · {article.source.name}
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800,
            color: t.heading, margin: '0 0 16px', lineHeight: 1.2,
          }}>
            {article.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ lineHeight: 1.8, fontSize: 15 }}
        >
          <p style={{ margin: '0 0 24px', color: t.body, lineHeight: 1.8, fontSize: 16 }}>
            {article.description || 'No description available for this article.'}
          </p>

          <div style={{
            marginTop: 32, padding: '28px', borderRadius: 16,
            background: 'rgba(20, 184, 166, 0.06)',
            border: '1px solid rgba(20, 184, 166, 0.15)',
            textAlign: 'center',
          }}>
            <p style={{ color: t.muted, fontSize: 14, margin: '0 0 16px' }}>
              This article was fetched from an external source.
            </p>
            <motion.a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                padding: '12px 28px', borderRadius: 12,
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                color: '#fff', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', fontFamily: 'inherit',
              }}
            >
              Read full article on {article.source.name} →
            </motion.a>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default NewsArticle;
