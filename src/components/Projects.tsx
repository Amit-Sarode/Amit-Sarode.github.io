import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import flower from '../assets/flower_delivery.png'
import doctor from '../assets/doctor-preview.png'
import space from '../assets/Space-preview.png'
import demo from '../assets/Screenshot 2025-04-22 at 1.34.46 PM.png'
import huddle from  '../assets/Screenshot 2025-04-22 at 1.31.28 PM.png'
import taskManager from '../assets/Screenshot 2025-04-22 at 1.30.33 PM.png'
import ecom from '../assets/Screenshot 2025-04-22 at 1.15.51 PM.png'
const Projects:React.FC = () => {
  const projects = [
    // {name:"BikeSearch",link:"#" , img:''},
    {name:"Ecommerce" , link:"https://ecommerce-xi-five-58.vercel.app/" ,img:ecom},
    {name:"Healthcare" , link:"https://healthcheck-nine.vercel.app/" ,img:doctor},
    {name:"Flower Delivery" , link:"https://flower-delivery-nu.vercel.app/" ,img:flower},
    {name:"Space Tourism" , link:"https://space-tourism-five-eta.vercel.app/" ,img:space},
    {name:"Demo-PortFolio" , link:'https://portfolio-three-livid-82.vercel.app/' , img:demo},
    {name:"Task Manager" , link:"https://task-manager-five-umber.vercel.app/" ,img:taskManager},
    {name:"Huddle" , link:"https://huddle-xi-ten.vercel.app/" ,img:huddle},
    
  ]
  return (
    <section className='h-auto pt-10 px-10 py-5'>
  <div className='w-full mx-auto'>
    <p className='flex justify-center font-semibold text-4xl'>My Work</p>
    <div className='grid grid-cols-1 lg:grid-cols-2 text-center gap-10 py-10 md:grid-cols-2 sx:grid-cols-1'>
      {
        projects.map((item, id) => {
          return (
          
              <motion.div key={id} className='flex justify-center gap-5 flex-col'>
                <Link target='_blank' to={item.link}>
                  <img 
                  loading='lazy' 
                  className='object-cover h-[300px] w-full sm:w-[500px] mx-auto'
                    src={item.img} alt={item.name}
                  />
                  <h1>{item.name}</h1>
                </Link>
              </motion.div>
           
          )
        })
      }
    </div>
  </div>
</section>
  )
}

export default Projects

