import React from 'react';
import { motion } from 'framer-motion'; // fixed typo
import flower from '../assets/flower_delivery.png';
import doctor from '../assets/doctor-preview.png';
import space from '../assets/Space-preview.png';
import demo from '../assets/Screenshot 2025-04-22 at 1.34.46 PM.png';
import huddle from '../assets/Screenshot 2025-04-22 at 1.31.28 PM.png';
import taskManager from '../assets/Screenshot 2025-04-22 at 1.30.33 PM.png';
import ecom from '../assets/Screenshot 2025-04-22 at 1.15.51 PM.png';

const Projects: React.FC = () => {
  const projects = [
    {
      name: 'Ecommerce App',
      link: 'https://ecommerce-xi-five-58.vercel.app/',
      img: ecom,
      desc: 'Modern ecommerce site with cart, filters, and checkout.',
      tech: ['React', 'Redux', 'Tailwind', 'REST API'],
    },
    {
      name: 'Healthcare App',
      link: 'https://healthcheck-nine.vercel.app/',
      img: doctor,
      desc: 'Health dashboard using Firebase and responsive layouts.',
      tech: ['React', 'Tailwind', 'Firebase'],
    },
    {
      name: 'Flower Delivery',
      link: 'https://flower-delivery-nu.vercel.app/',
      img: flower,
      desc: 'A floral delivery landing page with elegant UI.',
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      name: 'Space Tourism',
      link: 'https://space-tourism-five-eta.vercel.app/',
      img: space,
      desc: 'Responsive space travel site with multipage layout.',
      tech: ['React', 'SCSS', 'Framer Motion'],
    },
    {
      name: 'Personal Portfolio',
      link: 'https://portfolio-three-livid-82.vercel.app/',
      img: demo,
      desc: 'A personal portfolio to showcase my dev journey.',
      tech: ['React', 'Tailwind', 'Dark Mode'],
    },
    {
      name: 'Task Manager',
      link: 'https://task-manager-five-umber.vercel.app/',
      img: taskManager,
      desc: 'Kanban-style task tracker with analytics.',
      tech: ['React', 'DnD', 'Chart.js'],
    },
    {
      name: 'Huddle Landing Page',
      link: 'https://huddle-xi-ten.vercel.app/',
      img: huddle,
      desc: 'Clean landing page for a mock collaboration platform.',
      tech: ['HTML', 'Tailwind CSS'],
    },
  ];

  return (
    <section className="h-auto pt-10 px-6 md:px-16  transition-all">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-all duration-300"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.img}
                  alt={item.name}
                  loading='lazy'
                  className="w-full h-56 object-cover"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-300"
                >
                  View Live →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
