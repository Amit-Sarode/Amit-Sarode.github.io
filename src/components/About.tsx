import React from 'react'
const About :React.FC = () => {
  const certificates = [{name:"", url:"https://udemy-certificate.s3.amazonaws.com/image/UC-896441cf-e535-45b3-84dd-fa3f21eb3428.jpg"},
    {name:"", url:"https://udemy-certificate.s3.amazonaws.com/image/UC-98a0333e-6ba1-4973-bcc5-46a44944f187.jpg?v=1745387851000"},
    {name:"", url:"https://udemy-certificate.s3.amazonaws.com/image/UC-51b4a0db-d01d-469a-ba2b-747485bc045a.jpg?v=1745385669000"},
    {name:"", url:"https://udemy-certificate.s3.amazonaws.com/image/UC-68f7f083-7098-4901-8792-9fac8c4677f0.jpg?v=1745395351000"}
    ,{name:"", url:"https://udemy-certificate.s3.amazonaws.com/image/UC-1b736a84-be80-4c25-b589-fd8905fbe4e5.jpg?v=1745396160000"},
    {name:"", url:"https://udemy-certificate.s3.amazonaws.com/image/UC-f281d26f-3bba-42d4-8ed0-6eace42f32a4.jpg?v=1745402596000"},
    {name:"", url:"https://udemy-certificate.s3.amazonaws.com/image/UC-20e6490f-c036-4ad3-a224-b6d3fa384959.jpg?v=1745405522000"}
  ]
  return (<>
    <div className='w-full'>
    <div className='flex justify-center'>About Me</div>
    <p className='px-12 py-5'>
Hi, I’m Amit Sarode, a passionate Frontend Developer with over 2 years of hands-on experience crafting responsive and dynamic web applications. Despite coming from a non-traditional background with a Bachelor of Arts degree, I’ve pursued my passion for programming through real-world projects, continuous learning, and dedication.

I specialize in building clean, user-focused interfaces using React, Redux, Tailwind CSS, and MUI. I’ve also expanded into mobile development with React Native, creating innovative apps like an OCR-based number plate scanner and a multilingual AI voice diary. My work combines a strong eye for design with scalable code architecture and API integration.

Currently, I’m working at Atum Information Technologies, where I contribute to projects that solve real-world problems. I’m driven by curiosity, creativity, and the desire to build things that make a difference.
    </p>
    </div>
    <div>
      add certificates here{
        certificates.map((image,idx)=>{
          return(
            <img  key={idx}
            className='text-center px-10 h-[500px] w-[800px]' loading='lazy' src={image.url}>
      </img>
          )
        })
      }
    </div>
   
    </>
  )
}

export default About