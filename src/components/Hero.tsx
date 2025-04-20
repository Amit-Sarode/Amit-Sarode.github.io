// import React, { useEffect, useState } from 'react';
// import { motion } from 'motion/react';
// import profileImg from '../assets/profileImg.png';

// const Hero: React.FC = () => {
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const texts = ['Frontend Developer', 'React Enthusiast'];
//   const [currentText, setCurrentText] = useState('');
//   const [textIndex, setTextIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);
//   const [typingForward, setTypingForward] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const fullText = texts[textIndex];

//       if (typingForward) {
//         if (charIndex < fullText.length) {
//           setCurrentText(fullText.slice(0, charIndex + 1));
//           setCharIndex((prev) => prev + 1);
//         } else {
//           setTypingForward(false);
//           setTimeout(() => {}, 1000); // pause before deleting
//         }
//       } else {
//         if (charIndex > 0) {
//           setCurrentText(fullText.slice(0, charIndex - 1));
//           setCharIndex((prev) => prev - 1);
//         } else {
//           setTypingForward(true);
//           setTextIndex((prev) => (prev + 1) % texts.length);
//         }
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, [charIndex, typingForward, textIndex, texts]);

//   return (
//     <section className="hero gap-5 flex flex-col items-center justify-center min-h-screen text-center">
//       <motion.img
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.5, duration: 2 }}
//         className="border-2 object-cover object-center shadow-lg border-[#ddd] rounded-[50%] h-[200px] w-[200px]"
//         id="profile-picture"
//         src={profileImg}
//         alt="Profile Picture"
//       />

//       <motion.h1
//         className="font-bold text-4xl font-serif"
//         initial={{ opacity: 0, x: -100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.6, duration: 2 }}
//       >
//         Hi, I'm Amit Sarode
//       </motion.h1>

//       <motion.p
//         className="font-semibold font-mono inline"
//         aria-live="polite"
//         initial={{ opacity: 0, x: -100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 ,duration: 3 }}
//       >
//         {currentText}
//         <span className="animate-pulse">|</span>
//       </motion.p>

//       <motion.a
//         className="font-semibold mt-4 underline text-blue-600 hover:text-blue-800 transition-colors"
//         initial={{ opacity: 0, x: -100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.8, duration: 2 }}
//         href="#contact"
//       >
//         Contact Me
//       </motion.a>
//     </section>
//   );
// };

// export default Hero;


import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import profileImg from '../assets/profileImg.png';

const Hero: React.FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const texts = ['Frontend Developer', 'React Enthusiast'];
  const [textIndex, setTextIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load typing sound
  useEffect(() => {
    audioRef.current = new Audio('/typing.mp3'); // Put typing.mp3 in /public
  }, []);

  useEffect(() => {
    const word = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (letterIndex < word.length) {
        const nextLetter = word[letterIndex];
        setLetters((prev) => [...prev, nextLetter]);
        setLetterIndex((prev) => prev + 1);
        audioRef.current?.play();
        timeout = setTimeout(() => {}, 100);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (letterIndex > 0) {
        setLetters((prev) => prev.slice(0, -1));
        setLetterIndex((prev) => prev - 1);
        timeout = setTimeout(() => {}, 50);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [letterIndex, isDeleting, textIndex, texts]);

  return (
    <section className="hero gap-5 flex flex-col items-center justify-center min-h-screen text-center">
      <motion.img
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        className="border-2 object-cover object-center shadow-lg border-[#ddd] rounded-[50%] h-[200px] w-[200px]"
        src={profileImg}
        alt="Profile Picture"
      />

      <motion.h1
        className="font-bold text-4xl font-serif"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1.5 }}
      >
        Hi, I'm Amit Sarode
      </motion.h1>

      <motion.div
        className="font-semibold font-mono flex gap-1 items-center justify-center h-10"
        aria-live="polite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration:1.5 }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          className="text-blue-600 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
        >
          |
        </motion.span>
      </motion.div>

      <motion.a
        className="font-semibold mt-4 underline text-blue-600 hover:text-blue-800 transition-colors"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        href="#contact"
      >
        Contact Me
      </motion.a>
    </section>
  );
};

export default Hero;
