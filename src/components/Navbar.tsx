import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar: React.FC = () => {
  const navItem = [
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
    { name: "LinkedIn", path: "https://linkedin.com", external: true },
    { name: "Github", path: "https://github.com", external: true },
    { name: "Resume", path: "/resume" },
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed origin-left top-0 left-0 right-0 h-[4px] bg-teal-300 z-50"
        style={{ scaleX }}
      />

      {/* Nav */}
      <nav className="w-full fixed top-0 left-0 z-40 flex items-center justify-between px-10 h-[60px] bg-[#393E46] shadow-md">
        <div className="text-white text-xl font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="flex items-center gap-10 text-white">
          {navItem.map((item, idx) =>
            item.external ? (
              <a
                key={idx}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-all duration-200"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={idx}
                to={item.path}
                className="hover:text-teal-300 transition-all duration-200"
              >
                {item.name}
              </Link>
            )
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 bg-teal-400 text-black font-medium px-4 py-1 rounded-md shadow hover:bg-teal-300 transition duration-200"
          >
            Email Me
          </motion.button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
