import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
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
const CaseStudyHealthcare = lazy(() => import('./components/CaseStudyHealthcare'));

function App() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        minHeight: '100vh',
        color: '#e2e8f0',
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
            <Route path="/projects" element={<Projects />} />
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
  );
}

export default App;
