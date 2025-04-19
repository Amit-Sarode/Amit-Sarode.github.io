import React from 'react'

const Projects:React.FC = () => {
  const projectList = [
    { title: "Project One", description: "React App", url: "https://..." },
    // more projects
  ];
  return (
    <section>
    <h2>My Projects</h2>
    {projectList.map((proj, i) => (
      <div key={i}>
        <h3>{proj.title}</h3>
        <p>{proj.description}</p>
        <a href={proj.url} target="_blank">Live Demo</a>
      </div>
    ))}
  </section>
  )
}

export default Projects

