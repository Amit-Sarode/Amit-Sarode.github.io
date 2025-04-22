import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring , AnimatePresence } from 'framer-motion';
import resume from '../assets/Amit Sarode -resume.pdf'

export const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};
 

export const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => document.removeEventListener("mousedown", maybeHandler);
  }, [handler]);

  return domNode;
};

const Navbar: React.FC = () => {

  const domNode = useClickOutside(() => {
    useEffect(()=>{
      setMobile(false);
    },[domNode]) 
  });
  
  const width = useWindowSize();
  useEffect(() => {
    setMobile(false);
  }, [width]);

const [mobile,setMobile]  = useState<boolean>(false)

  const navItem = [
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
    { name: "Linkedin", path: "https://www.linkedin.com/in/amit-sarode/", external: true },
    { name: "Github", path: "https://github.com/Amit-Sarode", external: true },
    { name: "Resume", path: "/resume" },
  ];
const handleEmail =()=>{
    const mailtoLink = `mailto:${encodeURIComponent("sarodeamit990@gmail.com")}?subject=${encodeURIComponent('')}&body=${encodeURIComponent( '')}`;
    window.location.href = mailtoLink;
}
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resume;  
    link.download = "Amit Sarode -resume.pdf";  
    link.click();  
  
    URL.revokeObjectURL(link.href);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
    
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark-mode") {
      setIsDark(true);
    }
  }, []);


  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", document.body.className);
  }, [isDark]);


  return (
    <>
   
      <motion.div
        className="fixed origin-left top-0 left-0 right-0 h-[4px] bg-teal-300 z-50"
        style={{ scaleX }}
      />
    
      {/* Nav */}
      <nav className="w-full fixed top-0 left-0 z-40 flex items-center justify-between px-10 h-[60px] bg-[#393E46] shadow-md">
        <div className=" text-xl font-bold">
          <Link to="/">Home</Link>
        </div>


        <div ref={domNode} className="lg:hidden  md:hidden right-0 absolute pr-10">
          <label className="switch">
  <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
  <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
  <input checked={isDark} id="switch" type="checkbox" className="input"
  onChange={() => setIsDark(prev => !prev)}/>
  <span className="slider"></span>
</label>

        <button className='text-center absolute top-2 right-3'>
        {
          mobile?(
            <svg onClick={()=>setMobile(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
  <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
</svg>

          ):(
            <svg onClick={()=>setMobile(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
</svg>
          )
        }
        </button>
      </div>
<AnimatePresence>
      {
  mobile&&(
    <motion.div 
    ref={domNode}
    initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
     className=' z-50 rounded-2xl bg-[#EEEEEE] text-black w-40 h-auto py-5 text-center absolute top-[60px] right-0'
    >{navItem.map((item, idx) =>
   (
        <motion.div
        initial={{ opacity: 0, y:-20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}>
            {
              item.name==="Resume"?(
                <button
                className="hover:text-teal-300 transition-all duration-200" onClick={handleDownload}>Resume</button>
              ):(<motion.div>
                {
                  item.external ?(
                    <Link to={item.path} target='_blank' >{item.name}</Link>
                  ):(
                    <Link
                    key={idx}
                    to={item.path}
                    className="hover:text-teal-300 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                  )
                }
              </motion.div>
              )
            }
        </motion.div>
      )
    )}
    </motion.div>
  )
}
</AnimatePresence>


{/* desktop nav */}
        <motion.div 
         className="hidden md:flex lg:flex items-center gap-10"
         >
          {navItem.map((item, idx) =>
            item.external ? (
              <motion.a
              initial={{ opacity: 0, y:-20 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-all duration-200"
              >
                {item.name}
              </motion.a>
            ) : (
              <motion.div
              initial={{ opacity: 0, y:-20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}>
                  {
                    item.name==="Resume"?(
                      <button
                      className="hover:text-teal-300 transition-all duration-200" onClick={handleDownload}>Resume</button>
                    ):(
                      <Link
                      key={idx}
                      to={item.path}
                      className="hover:text-teal-300 transition-all duration-200"
                    >
                      {item.name}
                    </Link>

                    )
                  }
            
              </motion.div>
            )
          )}


       <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 bg-teal-400   font-medium px-5 py-2 rounded-md shadow hover:bg-teal-300 transition duration-200"
            onClick={()=>handleEmail()}
          >
            Email Me
          </motion.button>
          <label className="switch">
  <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
  <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
  <input checked={isDark} id="switch" type="checkbox" className="input"
  onChange={() => setIsDark(prev => !prev)}/>
  <span className="slider"></span>
</label>
        </motion.div>
      </nav> 
    </>
  );
};

export default Navbar;