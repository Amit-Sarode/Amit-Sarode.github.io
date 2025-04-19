// import React from 'react'
// import emailjs from 'emailjs-com';

// const Contact :React.FC = () => {

//     const sendEmail = (e) => {
//         e.preventDefault();
    
//         emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
//           .then((result) => alert('Message Sent!'))
//           .catch((error) => alert('Failed to send!'));
//       };
//   return (
//     <form onSubmit={sendEmail}>
//     <input type="text" name="user_name" placeholder="Name" required />
//     <input type="email" name="user_email" placeholder="Email" required />
//     <textarea name="message" placeholder="Message" required />
//     <button type="submit">Send</button>
//   </form>
//   )
// }

// export default Contact

import React from 'react'

const Contact :React.FC = () => {
  return (
    <div>Contact</div>
  )
}

export default Contact