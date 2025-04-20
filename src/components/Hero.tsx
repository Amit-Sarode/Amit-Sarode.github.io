import React from 'react'
import { motion } from "motion/react"
import profileImg from '../assets/react.svg'


const Hero:React.FC = () => {
  return (
    <section className="hero flex flex-col items-center justify-center min-h-screen text-center" >
      <img className='border-2 object-cover shadow-lg border-[#ddd] rounded-[50%] h-[200px] w-[200px]' 
      id="profile-picture" 
      src={profileImg}
       alt="Profile Picture"></img>
    <motion.h1 className='font-bold'
    initial={{opacity:0,x:-100}}
    animate={{opacity:1,x:0}}
    transition={{delay:0.5,duration:2}}
    >Hi, I'm Amit Sarode</motion.h1>
    <p>Frontend Developer | React Enthusiast</p>
    <a href="#contact">Contact Me</a>
     </section>
  )
}

export default Hero
