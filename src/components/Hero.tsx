import React, { useEffect, useState,} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import profileImg from '../assets/profileImg.png';
import flower from '../assets/flower_delivery.png'
import doctor from '../assets/doctor-preview.png'
import demo from '../assets/Screenshot 2025-04-22 at 1.34.46 PM.png'
import ecom from '../assets/Screenshot 2025-04-22 at 1.15.51 PM.png'
import react from '../assets/react.svg'
import Tilt3D from './ThreeDTilt';
import MagneticDiv from './Magnetic';

const Hero: React.FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const texts = ['Frontend Developer', 'React Enthusiast',"React Pioneer","Frontend Explorer","React Engineer"];
  const [textIndex, setTextIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);
const navigate = useNavigate()
  useEffect(() => {
    const word = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (letterIndex < word.length) {
        const nextLetter = word[letterIndex];
        setLetters((prev) => [...prev, nextLetter]);
        setLetterIndex((prev) => prev + 1);
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


  const skills =[{name:'Html',icon:'https://cdn0.iconfinder.com/data/icons/social-network-9/50/22-1024.png',text:'⭐️⭐️⭐️⭐️★'},
    {name:'Css',icon:'https://www.citypng.com/public/uploads/preview/hd-css3-round-logo-icon-transparent-png-701751694771807mljmgxztmt.png',text:'⭐️⭐️⭐️⭐️★'},
    {name:'Javascript',icon:'https://www.researchgate.net/profile/Simon-Frimpong-Yeboah/publication/385907322/figure/fig2/AS:11431281291221821@1731945210103/JavaScript-Source-JavaScript-Icon-nd.jpg',text:'⭐️⭐️⭐️⭐️★'},
    {
name:"React" , icon:react, text:'⭐️⭐️⭐️⭐️★'
    },
    {name:"Python",icon:"https://images.icon-icons.com/2108/PNG/512/python_icon_130849.png",text:'⭐️⭐️⭐️★★'},
    {name:'Typescript',icon:'https://www.svgrepo.com/show/374144/typescript.svg',text:'⭐️⭐️⭐️★★'},
    { name:'Tailwind',icon:'https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/31/tailwind.png',text:'⭐️⭐️⭐️⭐️★'},
    {name:"React Native",icon:react,text:'⭐️⭐️⭐️★★'},
    {name:"Framer Motion",icon:'https://cdn.iconscout.com/icon/free/png-512/free-framer-icon-download-in-svg-png-gif-file-formats--logo-social-media-pack-logos-icons-1912027.png?f=webp&w=512',text:'⭐️⭐️⭐️★★'},
  ]

const  newSkills =[
  {name:'LLM' ,icon:'https://as2.ftcdn.net/v2/jpg/07/56/11/69/1000_F_756116963_MKdL7O7BKH1ZHicpGXHd9ys9xDMhkGr2.jpg',text:'Large Language Model'},
  {name:'Transformer' ,icon:'https://static.thenounproject.com/png/6855240-512.png',text:'Specific type of Neural Network Architecture'},
  {name:'MCP Server' ,icon:'https://avatars.githubusercontent.com/u/182288589?s=200&v=4',text:'Model Context Protocol'}
]

    const projects = [
      {name:"Ecommerce" , link:"https://ecommerce-xi-five-58.vercel.app/" ,img:ecom},
      {name:"Healthcare" , link:"https://healthcheck-nine.vercel.app/" ,img:doctor},
      {name:"Demo-PortFolio" , link:'https://portfolio-three-livid-82.vercel.app/' , img:demo},
      {name:"Flower Delivery" , link:"https://flower-delivery-nu.vercel.app/" ,img:flower},
    ]

  return (<>
  <Tilt3D>
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
          className="text-teal-200 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
        >
          |
        </motion.span>
      </motion.div>

      <motion.a
        className="font-semibold mt-4  transition-colors px-6 py-2 text-white bg-teal-300 hover:bg-teal-200  rounded-lg shadow-md hover:scale-105"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        href="/contact"
      >
        Contact Me
      </motion.a>
    </section>
    </Tilt3D>
    <section className='h-auto md:h-[50vh] '>
    <div className='w-full'>
    <div className='flex justify-center font-semibold text-4xl'>About Me</div>
    <p className='px-12 py-5 tracking-widest  font-sans'>
    Hi, I’m Amit Sarode, a passionate Frontend Developer with 2 years of experience in creating dynamic and user-friendly web applications. With a deep understanding of HTML, CSS, JavaScript, and modern frontend frameworks like React and Framer motion, I specialize in building seamless and responsive interfaces that engage users and deliver optimal performance.

I’m always eager to stay updated with the latest trends and best practices in frontend development, continuously improving my skills and knowledge. I take pride in writing clean, maintainable code and collaborating with teams to bring creative ideas to life. Whether it’s building from scratch or refining existing designs, I enjoy the challenge of turning concepts into polished digital experiences.

When I’m not coding, you can find me exploring new tech, learning about UI/UX design, or contributing to open-source projects.
    </p>
    </div>
    <div className="flex justify-center pt-8">
      <button
      onClick={()=>navigate('/about')}
        className="px-6 py-2 text-white bg-teal-300 hover:bg-teal-200 transition rounded-lg font-semibold shadow-md hover:scale-105"
      >
         Know More About Me
      </button>
    </div>
    </section>

    <section className='h-auto pt-5'>
    <div className='w-full'>
    <div className='flex justify-center font-semibold text-4xl'>Skills</div>
    <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-5 px-10 py-10'>
    {
      skills.map((item,id)=>{
        return(
          <MagneticDiv>
          <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, delay: id * 0.05 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center h-24 w-full max-w-sm mx-auto 
                     border border-gray-300 rounded-tl-[40px] rounded-br-[40px] 
                     overflow-hidden text-center hover:bg-teal-100 
                     transition-colors duration-300 group"
          key={id}
        >
          
          <div className="flex flex-col items-center justify-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
            <img
              src={item.icon}
              alt={item.name}
              className="h-8 w-8 object-cover rounded-full"
            />
            <p className="font-semibold tracking-wider font-mono">{item.name}</p>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p className="text-sm font-medium text-gray-800">{item.text}</p>
          </div>
        </motion.div>
        </MagneticDiv>
        )
      })
    }
    </div>
    <h1 className='flex justify-center text-center font-semibold text-4xl py-10'>Now Learning About</h1>
    <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-5 px-10 py-10'>
    {
      newSkills.map((item,id)=>{
        return(
          <MagneticDiv>
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, delay: id * 0.05 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center h-24 w-full max-w-sm mx-auto 
                     border border-gray-300 rounded-tl-[40px] rounded-br-[40px] 
                     overflow-hidden text-center hover:bg-teal-100 
                     transition-colors duration-300 group"
          key={id}
        >
          
          <div className="flex flex-col items-center justify-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
            <img
              src={item.icon}
              alt={item.name}
              className="h-8 w-8 object-cover bg-white rounded-full"
            />
            <p className="font-semibold tracking-wider font-mono">{item.name}</p>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p className="text-sm font-medium text-gray-800">{item.text}</p>
          </div>
        </motion.div>
        </MagneticDiv>
        )
      })
    }
    </div>
    </div>
    </section>


    <section className='h-auto pt-10 px-10 py-5'>
  <div className='w-full mx-auto'>
    <p className='flex justify-center font-semibold text-4xl'>My Work</p>
    <div className='grid grid-cols-1 lg:grid-cols-2 text-center gap-10 pt-15 md:grid-cols-2 sx:grid-cols-1'>
      {
        projects.map((item, id) => {
          return (
          
              <motion.div key={id} className='flex justify-center gap-5 flex-col'>
                <Link target='_blank' to={item.link}>
                  <img className='object-cover h-[300px] w-full sm:w-[500px] mx-auto'
                    src={item.img} alt={item.name}
                  />
                  <h1>{item.name}</h1>
                </Link>
              </motion.div>
          
          )
        })
      }
    </div>
    <div className="flex justify-center pt-8">
      <button 
        onClick={() => { navigate('/projects') }}
        className="px-6 py-2 text-white bg-teal-300 hover:bg-teal-200 transition rounded-lg font-semibold shadow-md hover:scale-105"
      >
        View All
      </button>
    </div>
  </div>
</section>

    </>)
};

export default Hero;



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