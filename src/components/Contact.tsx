import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiKeysEMailJS = {
  serviceID: "service_afje28q",
  templateID: "template_fpbkzxq",
  publicKey: "qWazhUDDDz2hUMVb7"
};

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    title: '',
    message: '',
  });

  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  const initializeEmaiJS = async () => {
    await emailjs.init({
      publicKey: apiKeysEMailJS.publicKey,
      blockHeadless: true,
      limitRate: { id: 'app', throttle: 10000 },
    });
  };

  useEffect(() => {
    initializeEmaiJS();
  }, []);

  const handeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const params = {
      name: formData.from_name,
      email: formData.from_email,
      title: formData.title,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      const response = await emailjs.send(apiKeysEMailJS.serviceID, apiKeysEMailJS.templateID, params);

      if (response.status === 200) {
        toast.success('Message sent successfully! 🎉');
        setShowSuccessAnim(true);
        setFormData({ from_name: '', from_email: '', title: '', message: '' });

        setTimeout(() => setShowSuccessAnim(false), 3000);
      } else {
        toast.error('Failed to send message ❌');
      }
    } catch (error) {
      toast.error('Something went wrong 😓');
    }
  };

  return (
    <section className="min-h-screen px-6 py-16 flex flex-col items-center">
      <ToastContainer position="top-right"  autoClose={3000} />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Let's Work Together
      </motion.h1>

      <motion.form
        ref={form}
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg  p-8 rounded-xl shadow-lg backdrop-blur-md flex flex-col gap-5"
      >
        <input
          type="text"
          name="from_name"
          value={formData.from_name}
          onChange={handeChange}
          placeholder="Your Name"
          required
          className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
        />

        <input
          type="email"
          name="from_email"
          value={formData.from_email}
          onChange={handeChange}
          placeholder="Your Email"
          required
          className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
        />

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handeChange}
          placeholder="Subject / Title"
          required
          className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handeChange}
          placeholder="Your Message"
          required
          rows={5}
          className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
        />

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 transition-colors duration-300  py-2 rounded-md font-semibold"
        >
          Send Message
        </button>
      </motion.form>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccessAnim && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="mt-8 bg-green-500  px-6 py-3 rounded-lg shadow-lg"
          >
            🎉 Email sent successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-10 text-center"
      >
        <h2 className="text-xl font-semibold mb-4">Or reach out on</h2>
        <div className="flex gap-6 justify-center">
          <Link
            to="https://www.instagram.com/amit_sarode__/"
            target="_blank"
            className="hover:underline text-teal-400"
          >
            Instagram
          </Link>
          <Link to="#" target="_blank" className="hover:underline text-teal-400">
            X
          </Link>
          <Link to="#" target="_blank" className="hover:underline text-teal-400">
            Facebook
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
