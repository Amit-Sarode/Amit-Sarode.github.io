// import React, { useEffect, useState,useRef } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import { motion, useScroll, useSpring , AnimatePresence } from 'framer-motion';
// import resume from '/assets/Amit Sarode -resume (1).pdf'

// export const useWindowSize = () => {
//   const [width, setWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return width;
// };
 

// export const useClickOutside = (handler: () => void) => {
//   const domNode = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const maybeHandler = (event: MouseEvent) => {
//       if (domNode.current && !domNode.current.contains(event.target as Node)) {
//         handler();
//       }
//     };
//     document.addEventListener("mousedown", maybeHandler);
//     return () => document.removeEventListener("mousedown", maybeHandler);
//   }, [handler]);

//   return domNode;
// };

// const Navbar: React.FC = () => {
// const navigate = useNavigate()
//   const domNode = useClickOutside(() => {
//     useEffect(()=>{
//       setMobile(false);
//     },[domNode]) 
//   });
  
//   const width = useWindowSize();
//   useEffect(() => {
//     setMobile(false);
//   }, [width]);

// const [mobile,setMobile]  = useState<boolean>(false)

//   const navItem = [
//     { name: "Projects", path: "/projects" },
//     { name: "Contact", path: "/contact" },
//     { name: "Linkedin", path: "https://www.linkedin.com/in/amit-sarode/", external: true },
//     { name: "Github", path: "https://github.com/Amit-Sarode", external: true },
//     { name: "Resume", path: "/resume" },
//   ];
//   const handleEmail = () => {
//     const email = "sarodeamit990@gmail.com";
//     const subject = encodeURIComponent('');
//     const body = encodeURIComponent(''); 
//     const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
//     window.open(mailtoLink, '_blank');
// }

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = resume;  
//     link.download = "Amit Sarode -resume.pdf";  
//     link.click();  
  
//     URL.revokeObjectURL(link.href);
//   };

//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });
    
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark-mode") {
//       setIsDark(true);
//     }
//   }, []);


//   useEffect(() => {
//     document.body.className = isDark ? "dark-mode" : "light-mode";
//     localStorage.setItem("theme", document.body.className);
//   }, [isDark]);


//   return (
//     <>
   
//       <motion.div
//         className="fixed origin-left top-0 left-0 right-0 h-[4px] bg-teal-300 z-50"
//         style={{ scaleX }}
//       />
    
//       {/* Nav */}
//       <nav className="w-full fixed top-0 left-0 z-40 flex items-center justify-between px-10 h-[60px] bg-[#393E46] shadow-md">
//         <div className=" text-xl font-bold">
//           <Link to="/">Home</Link>
//         </div>


//         <div ref={domNode} className="lg:hidden  md:hidden right-0 absolute pr-10">
//           <label className="switch">
//   <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
//   <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
//   <input checked={isDark} id="switch" type="checkbox" className="input"
//   onChange={() => setIsDark(prev => !prev)}/>
//   <span className="slider"></span>
// </label>

//         <button className='text-center absolute top-2 right-3'>
//         {
//           mobile?(
//             <svg onClick={()=>setMobile(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
//   <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
// </svg>

//           ):(
//             <svg onClick={()=>setMobile(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
//   <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
// </svg>
//           )
//         }
//         </button>
//       </div>
// <AnimatePresence>
//       {
//   mobile&&(
//     <motion.div 
//     ref={domNode}
//     initial={{ x: 10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 10, opacity: 0 }}
//      className=' z-50 rounded-2xl bg-[#EEEEEE] text-black w-40 h-auto py-5 text-center absolute top-[60px] right-0'
//     > <button onClick={()=>navigate('/chatgpt')}>chatbot</button>
//       {navItem.map((item, idx) =>
//    (
//         <motion.div
//         key={idx}
//         initial={{ opacity: 0, y:-20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: idx * 0.1 }}>
//             {
//               item.name==="Resume"?(
//                 <button
//                 className="hover:text-teal-300 transition-all duration-200" onClick={handleDownload}>Resume</button>
//               ):(<motion.div>
//                 {
//                   item.external ?(
//                     <Link to={item.path} target='_blank' >{item.name}</Link>
//                   ):(
//                     <Link
//                     key={idx}
//                     to={item.path}
//                     className="hover:text-teal-300 transition-all duration-200"
//                   >
//                     {item.name}
//                   </Link>
//                   )
//                 }
//               </motion.div>
//               )
//             }
//         </motion.div>
//       )
//     )}
//     </motion.div>
//   )
// }
// </AnimatePresence>


// {/* desktop nav */}
//         <motion.div 
//          className="hidden md:flex lg:flex items-center gap-10"
//          >
//           {navItem.map((item, idx) =>
//             item.external ? (
//               <motion.a
//               initial={{ opacity: 0, y:-20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 key={idx}
//                 href={item.path}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-teal-300 transition-all duration-200"
//               >
//                 {item.name}
//               </motion.a>
//             ) : (
//               <motion.div
//               key={idx}
//               initial={{ opacity: 0, y:-20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}>
//                   {
//                     item.name==="Resume"?(
//                       <button
//                       className="hover:text-teal-300 transition-all duration-200" onClick={handleDownload}>Resume</button>
//                     ):(
//                       <Link
//                       key={idx}
//                       to={item.path}
//                       className="hover:text-teal-300 transition-all duration-200"
//                     >
//                       {item.name}
//                     </Link>

//                     )
//                   }
            
//               </motion.div>
//             )
//           )}


//        <motion.button
//             // whileHover={{ scale: 1.05 }}
//             // whileTap={{ scale: 0.95 }}
//             className="ml-4  font-medium px-5 py-2 rounded-md shadow text-white bg-teal-300 hover:bg-teal-200  hover:scale-105"
//             onClick={()=>handleEmail()}
//           >
//             Email Me
//           </motion.button>
//           <label className="switch">
//   <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
//   <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
//   <input checked={isDark} id="switch" type="checkbox" className="input"
//   onChange={() => setIsDark(prev => !prev)}/>
//   <span className="slider"></span>
// </label>
//         </motion.div>
//       </nav> 
//     </>
//   );
// };

// export default Navbar;





import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import resume from '/assets/Amit Sarode -resume (1).pdf';

/* ─── Hooks ─── */
export const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return width;
};

export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [handler]);
  return ref;
};

/* ─── Nav items ─── */
const navItems = [
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/in/amit-sarode/', external: true },
  { name: 'GitHub', path: 'https://github.com/Amit-Sarode', external: true },
  // { name: 'Chatgpt', path: '/chatgpt' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const width = useWindowSize();
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobile = useCallback(() => setMobile(false), []);
  const menuRef = useClickOutside(closeMobile);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Close mobile on resize
  useEffect(() => { setMobile(false); }, [width]);
  // Close mobile on route change
  useEffect(() => { setMobile(false); }, [location.pathname]);

  // Navbar bg on scroll
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const handleEmail = () => {
    window.open(`mailto:sarodeamit990@gmail.com`, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'Amit_Sarode_Resume.pdf';
    link.click();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #14b8a6, #0d9488, #14b8a6)',
          transformOrigin: '0%',
          zIndex: 100,
          boxShadow: '0 0 10px rgba(20,184,166,0.6)',
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          background: scrolled
            ? 'rgba(2, 13, 10, 0.92)'
            : 'rgba(2, 13, 10, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(20,184,166,0.12)'
            : '1px solid transparent',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'monospace',
                boxShadow: '0 0 16px rgba(20,184,166,0.35)',
                flexShrink: 0,
              }}
            >
              AS
            </div>
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.01em',
              }}
            >
              Amit Sarode
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 4,
          }}
          className="md-nav"
        >
          {navItems.map((item, idx) => {
            const active = !item.external && isActive(item.path);
            return item.external ? (
              <motion.a
                key={idx}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  color: '#64748b',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#5eead4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                {item.name}
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            ) : (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
              >
                <Link
                  to={item.path}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 14,
                    color: active ? '#14b8a6' : '#64748b',
                    textDecoration: 'none',
                    fontWeight: active ? 600 : 500,
                    background: active ? 'rgba(20,184,166,0.08)' : 'transparent',
                    display: 'block',
                    transition: 'color 0.2s, background 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#5eead4';
                      e.currentTarget.style.background = 'rgba(20,184,166,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#64748b';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}

          {/* Resume download */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 14,
              color: '#64748b',
              fontWeight: 500,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#5eead4')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            Resume
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />

          {/* Email CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20,184,166,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEmail}
            style={{
              padding: '8px 20px',
              borderRadius: 50,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'box-shadow 0.3s',
            }}
          >
            Email Me
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <div ref={menuRef} style={{ position: 'relative' }} className="mobile-nav-wrapper">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobile((p) => !p)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              background: mobile ? 'rgba(20,184,166,0.1)' : 'rgba(255,255,255,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: mobile ? '#14b8a6' : '#94a3b8',
              transition: 'all 0.25s',
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobile ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {mobile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 48,
                  right: 0,
                  width: 220,
                  background: 'rgba(5, 15, 16, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(20,184,166,0.15)',
                  borderRadius: 16,
                  padding: '12px 8px',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
                  zIndex: 60,
                }}
              >
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    {item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobile}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: 10,
                          color: '#64748b',
                          fontSize: 14,
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#5eead4';
                          e.currentTarget.style.background = 'rgba(20,184,166,0.06)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#64748b';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {item.name}
                        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeMobile}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 14px',
                          borderRadius: 10,
                          color: isActive(item.path) ? '#14b8a6' : '#64748b',
                          fontSize: 14,
                          textDecoration: 'none',
                          fontWeight: isActive(item.path) ? 600 : 500,
                          background: isActive(item.path) ? 'rgba(20,184,166,0.08)' : 'transparent',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive(item.path)) {
                            e.currentTarget.style.color = '#5eead4';
                            e.currentTarget.style.background = 'rgba(20,184,166,0.06)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(item.path)) {
                            e.currentTarget.style.color = '#64748b';
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Mobile resume */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.06 }}
                >
                  <button
                    onClick={() => { handleDownload(); closeMobile(); }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 14px',
                      borderRadius: 10,
                      color: '#64748b',
                      fontSize: 14,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#5eead4';
                      e.currentTarget.style.background = 'rgba(20,184,166,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#64748b';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Resume ↓
                  </button>
                </motion.div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 14px' }} />

                {/* Mobile email CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.06 }}
                  style={{ padding: '6px 8px' }}
                >
                  <button
                    onClick={() => { handleEmail(); closeMobile(); }}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Email Me
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Responsive styles injected */}
      <style>{`
        .md-nav { display: none !important; }
        .mobile-nav-wrapper { display: flex !important; }

        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
          .mobile-nav-wrapper { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
