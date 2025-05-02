import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Contact =lazy(()=>import(  './components/Contact'))
const Navbar = lazy(()=>import( './components/Navbar'))
const CustomCursor =lazy(()=>import(  './components/CustomCursor'))
const About = lazy(()=>import( './components/About'))
const Chatgpt =lazy(()=>import( './components/Chatgpt'))
const  Projects =lazy(() => import ('./components/Projects'));
const Hero = lazy(() => import('./components/Hero'));

function App() {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <div className="pt-[70px]">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen bg-black">
              <img
                src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif"
                alt="Loading..."
                className="w-24 h-24"
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/chatgpt" element={<Chatgpt />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
