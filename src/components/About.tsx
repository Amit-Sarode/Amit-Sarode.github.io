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
    Hi, I’m Amit Sarode, a passionate Frontend Developer with 2 years of experience in creating dynamic and user-friendly web applications. With a deep understanding of HTML, CSS, JavaScript, and modern frontend frameworks like React and Framer motion, I specialize in building seamless and responsive interfaces that engage users and deliver optimal performance.

I’m always eager to stay updated with the latest trends and best practices in frontend development, continuously improving my skills and knowledge. I take pride in writing clean, maintainable code and collaborating with teams to bring creative ideas to life. Whether it’s building from scratch or refining existing designs, I enjoy the challenge of turning concepts into polished digital experiences.

When I’m not coding, you can find me exploring new tech, learning about UI/UX design, or contributing to open-source projects.
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