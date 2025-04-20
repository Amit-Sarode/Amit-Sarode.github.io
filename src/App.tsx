import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    
    <div className=" pt-[70px]" >
      <Navbar/>
      <Routes >
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </div>
  );
}

export default App;
