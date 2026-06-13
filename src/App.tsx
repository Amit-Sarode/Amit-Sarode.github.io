import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Loader from './components/Loader';
import Footer from './components/Footer';
import HireMeButton from './components/HireMeButton';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import ClickParticles from './components/ClickParticles';


const Contact    = lazy(() => import('./components/Contact'));
const Navbar     = lazy(() => import('./components/Navbar'));
const About      = lazy(() => import('./components/About'));
const Chatgpt    = lazy(() => import('./components/Chatgpt'));
const Projects   = lazy(() => import('./components/Projects'));
const Hero       = lazy(() => import('./components/Hero'));
const Pricing    = lazy(() => import('./components/Pricing'));
const ErrorPage  = lazy(() => import('./components/ErrorPage'));
const Blog       = lazy(() => import('./components/Blog'));
const BlogPost   = lazy(() => import('./components/BlogPost'));
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid'));
const CaseStudyList = lazy(() => import('./components/CaseStudy').then(m => ({ default: m.CaseStudyList })));
const CaseStudyPage = lazy(() => import('./components/CaseStudy').then(m => ({ default: m.CaseStudyPage })));


function App() {
  const location = useLocation();
   const navigate = useNavigate();

  useEffect(() => {
    if (location.search.startsWith('?/')) {
      navigate(location.search.slice(1) + location.hash, { replace: true });
    }
  }, []);


  return (
   <>
      <CustomCursor />
      <ClickParticles />
      <div
        style={{
          background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 40%, var(--bg-tertiary) 100%)',
          minHeight: '100vh',
          color: 'var(--text-primary)',
          transition: 'background 0.4s, color 0.4s',
          cursor: 'none',
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
