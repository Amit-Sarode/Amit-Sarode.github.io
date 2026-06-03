import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Loader from './components/Loader';
import Footer from './components/Footer';
import HireMeButton from './components/HireMeButton';
import ScrollToTop from './components/ScrollToTop';

const Contact    = lazy(() => import('./components/Contact'));
const Navbar     = lazy(() => import('./components/Navbar'));
const About      = lazy(() => import('./components/About'));
const Chatgpt    = lazy(() => import('./components/Chatgpt'));
const Projects   = lazy(() => import('./components/Projects'));
const Hero       = lazy(() => import('./components/Hero'));
const Pricing    = lazy(() => import('./components/Pricing'));
const CaseStudyHealthcare = lazy(() => import('./components/CaseStudyHealthcare'));

function App() {
  return (
    <ThemeProvider>
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
            <Routes>
              <Route path="/"         element={<Hero />} />
              <Route path="/projects/:id" element={<Projects />} />
              <Route path="/pricing"  element={<Pricing />} />
              <Route path="/contact"  element={<Contact />} />
              <Route path="/about"    element={<About />} />
              <Route path="/chatgpt"  element={<Chatgpt />} />
              <Route path="/case-study/healthcare" element={<CaseStudyHealthcare />} />
            </Routes>
          </Suspense>
        </div>

        <HireMeButton />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
