import React from 'react'

const Contact :React.FC = () => {
  const sendEmail =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
  }
  return (
    <form onSubmit={sendEmail}>
    <input type="text" name="user_name" placeholder="Name" required />
    <input type="email" name="user_email" placeholder="Email" required />
    <textarea name="message" placeholder="Message" required />
    <button type="submit">Send</button>
  </form>
  )
}

export default Contact