import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Loader from './components/ui/Loader';
import Footer from './components/layout/Footer';
import HireMeButton from './components/layout/HireMeButton';
import ScrollToTop from './components/layout/ScrollToTop';
import CustomCursor from './components/ui/CustomCursor';
import ClickParticles from './components/ui/ClickParticles';
const DreamGlowBackground = lazy(() => import('./components/animation/DreamGlowBackground'));


const Contact    = lazy(() => import('./components/pages/Contact'));
const Navbar     = lazy(() => import('./components/layout/Navbar'));
const About      = lazy(() => import('./components/pages/About'));
const Chatgpt    = lazy(() => import('./components/pages/Chatgpt'));
const Projects   = lazy(() => import('./components/pages/Projects'));
const Hero       = lazy(() => import('./components/pages/Hero'));
const Pricing    = lazy(() => import('./components/pages/Pricing'));
const ErrorPage  = lazy(() => import('./components/pages/ErrorPage'));
const Blog       = lazy(() => import('./components/pages/Blog'));
const BlogPost   = lazy(() => import('./components/pages/BlogPost'));
const NewsArticle = lazy(() => import('./components/pages/NewsArticle'));
const ProjectsGrid = lazy(() => import('./components/pages/ProjectsGrid'));
const CaseStudyList = lazy(() => import('./components/pages/CaseStudy').then(m => ({ default: m.CaseStudyList })));
const CaseStudyPage = lazy(() => import('./components/pages/CaseStudy').then(m => ({ default: m.CaseStudyPage })));


function App() {
  const location = useLocation();
   const navigate = useNavigate();

  useEffect(() => {
    if (location.search.startsWith('?/')) {
      navigate(location.search.slice(1) + location.hash, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
   <>
      <Suspense fallback={null}>
        <DreamGlowBackground />
      </Suspense>
      <CustomCursor />
      <ClickParticles />
      <div
        style={{
          background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 40%, var(--bg-tertiary) 100%)',
          minHeight: '100vh',
          color: 'var(--text-primary)',
          transition: 'background 0.4s, color 0.4s',
        }}
      >
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <ScrollToTop />

        <div style={{ paddingTop: 64 }}>
          <Suspense fallback={<Loader />}>
            <AnimatePresence mode="wait">
          
                <Routes location={location} key={location.pathname}>
                  <Route path="/"         element={<Hero />} />
                  <Route path="/projects" element={<ProjectsGrid />} />
                  <Route path="/projects/:id" element={<Projects />} />
                  <Route path="/pricing"  element={<Pricing />} />
                  <Route path="/contact"  element={<Contact />} />
                  <Route path="/about"    element={<About />} />
                  <Route path="/chatgpt"  element={<Chatgpt />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/news/:id" element={<NewsArticle />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudyList />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
                  <Route path="/500" element={<ErrorPage code={500} />} />
                  <Route path="/502" element={<ErrorPage code={502} />} />
                  <Route path="*" element={<ErrorPage code={404} />} />
                </Routes>

            </AnimatePresence>
          </Suspense>
        </div>

        <HireMeButton />
        <Footer />
      </div>
  </>
  );
}

export default App;
