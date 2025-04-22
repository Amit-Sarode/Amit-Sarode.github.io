import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import About from './components/About';

import Chatgpt from './components/Chatgpt';
function App() {
  return (<>
    <Navbar/>
    <CustomCursor/>
    <div className=" pt-[70px]" >
      <Routes >
        <Route path="/" element={<Hero />}/>
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/chatgpt' element={<Chatgpt/>}/>
      </Routes>
      </div>
     
      </>
  );
}

export default App;
