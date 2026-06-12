import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from './SEO';
import { blogPosts } from '../data/blogData';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';
import { Helmet } from 'react-helmet-async';

const t = {
  bg: '#020d0a', bgAlt: '#050f10', bgDeep: '#02100d',
  surface: 'rgba(255,255,255,0.02)', cardBorder: 'rgba(255,255,255,0.06)',
  teal: '#14b8a6', tealDark: '#0d9488',
  heading: '#f1f5f9', body: '#e2e8f0', muted: '#94a3b8',
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const canonicalUrl = `https://amit-sarode.github.io/#/blog/${post.slug}`;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bgAlt} 40%, ${t.bgDeep} 100%)`,
      minHeight: '100vh', color: t.body, position: 'relative', overflow: 'hidden',
    }}>
      <SEO
        title={`${post.title} | Amit Sarode`}
        description={post.description}
        path={`/blog/${post.slug}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "author": {
              "@type": "Person",
              "name": "Amit Sarode"
            },
            "datePublished": post.date,
            "dateModified": post.date,
            "publisher": {
              "@type": "Person",
              "name": "Amit Sarode"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          })}
        </script>
      </Helmet>

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
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.cardBorder}`,
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
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                padding: '2px 10px', borderRadius: 12,
                background: 'rgba(20,184,166,0.06)',
                border: '1px solid rgba(20,184,166,0.12)',
                fontSize: 11, color: t.teal, fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800,
            color: t.heading, margin: '0 0 12px', lineHeight: 1.2,
          }}>{post.title}</h1>
          <p style={{
            fontSize: 14, color: t.muted, margin: '0 0 32px',
            display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.author}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            lineHeight: 1.8, fontSize: 15,
          }}
        >
          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2({ children }) {
                  return <h2 style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700,
                    color: t.heading, margin: '40px 0 16px', lineHeight: 1.3,
                  }}>{children}</h2>;
                },
                h3({ children }) {
                  return <h3 style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 600,
                    color: t.heading, margin: '28px 0 12px', lineHeight: 1.3,
                  }}>{children}</h3>;
                },
                p({ children }) {
                  return <p style={{ margin: '0 0 16px', color: t.body, lineHeight: 1.8 }}>{children}</p>;
                },
                ul({ children }) {
                  return <ul style={{ margin: '0 0 16px', paddingLeft: 24, color: t.body }}>{children}</ul>;
                },
                ol({ children }) {
                  return <ol style={{ margin: '0 0 16px', paddingLeft: 24, color: t.body }}>{children}</ol>;
                },
                li({ children }) {
                  return <li style={{ marginBottom: 8 }}>{children}</li>;
                },
                strong({ children }) {
                  return <strong style={{ color: t.heading, fontWeight: 700 }}>{children}</strong>;
                },
                a({ href, children }) {
                  return <a href={href} target="_blank" rel="noopener noreferrer"
                    style={{ color: t.teal, textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >{children}</a>;
                },
                table({ children }) {
                  return <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                    <table style={{
                      width: '100%', borderCollapse: 'collapse', fontSize: 14,
                    }}>{children}</table>
                  </div>;
                },
                th({ children }) {
                  return <th style={{
                    border: '1px solid rgba(20,184,166,0.2)', padding: '10px 12px',
                    textAlign: 'left', background: 'rgba(20,184,166,0.08)', color: t.heading,
                    fontWeight: 600,
                  }}>{children}</th>;
                },
                td({ children }) {
                  return <td style={{
                    border: '1px solid rgba(20,184,166,0.12)', padding: '10px 12px',
                    color: t.body,
                  }}>{children}</td>;
                },
                hr() {
                  return <hr style={{
                    border: 'none', borderTop: `1px solid ${t.cardBorder}`,
                    margin: '32px 0',
                  }} />;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: 48, padding: '32px', borderRadius: 16,
            background: 'rgba(20,184,166,0.06)',
            border: '1px solid rgba(20,184,166,0.15)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: t.heading, margin: '0 0 8px', fontWeight: 700 }}>
            Need Help Implementing This?
          </h3>
          <p style={{ color: t.muted, fontSize: 14, margin: '0 0 20px' }}>
            I build custom AI solutions for businesses. Let's discuss your project.
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
          >
            Get Free Consultation →
          </motion.button>
        </motion.div>
      </article>

      <style>{`
        .blog-content code {
          background: rgba(255,255,255,0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
          color: #5eead4;
        }
        .blog-content pre {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 16px;
          overflow-x: auto;
          margin-bottom: 16px;
        }
        .blog-content pre code {
          background: none;
          padding: 0;
          font-size: 13px;
        }
        .blog-content blockquote {
          border-left: 3px solid rgba(20,184,166,0.3);
          margin: 0 0 16px;
          padding: 12px 20px;
          background: rgba(20,184,166,0.03);
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
