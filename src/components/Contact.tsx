// import emailjs from '@emailjs/browser';
// import { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const apiKeysEMailJS = {
//   serviceID: "service_afje28q",
//   templateID: "template_fpbkzxq",
//   publicKey: "qWazhUDDDz2hUMVb7"
// };

// const Contact = () => {
//   const form = useRef<HTMLFormElement | null>(null);
//   const [formData, setFormData] = useState({
//     from_name: '',
//     from_email: '',
//     title: '',
//     message: '',
//   });

//   const [showSuccessAnim, setShowSuccessAnim] = useState(false);

//   const initializeEmaiJS = async () => {
//     await emailjs.init({
//       publicKey: apiKeysEMailJS.publicKey,
//       blockHeadless: true,
//       limitRate: { id: 'app', throttle: 10000 },
//     });
//   };

//   useEffect(() => {
//     initializeEmaiJS();
//   }, []);

//   const handeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const sendEmail = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.current) return;

//     const params = {
//       name: formData.from_name,
//       email: formData.from_email,
//       title: formData.title,
//       message: formData.message,
//       time: new Date().toLocaleString(),
//     };

//     try {
//       const response = await emailjs.send(apiKeysEMailJS.serviceID, apiKeysEMailJS.templateID, params);

//       if (response.status === 200) {
//         toast.success('Message sent successfully! 🎉');
//         setShowSuccessAnim(true);
//         setFormData({ from_name: '', from_email: '', title: '', message: '' });

//         setTimeout(() => setShowSuccessAnim(false), 3000);
//       } else {
//         toast.error('Failed to send message ❌');
//       }
//     } catch (error) {
//       toast.error('Something went wrong 😓');
//     }
//   };

//   return (
//     <section className="min-h-screen px-6 py-16 flex flex-col items-center">
//       <ToastContainer position="top-right"  autoClose={3000} />

//       <motion.h1
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-4xl font-bold mb-6"
//       >
//         Let's Work Together
//       </motion.h1>

//       <motion.form
//         ref={form}
//         onSubmit={sendEmail}
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-full max-w-lg  p-8 rounded-xl shadow-lg backdrop-blur-md flex flex-col gap-5"
//       >
//         <input
//           type="text"
//           name="from_name"
//           value={formData.from_name}
//           onChange={handeChange}
//           placeholder="Your Name"
//           required
//           className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
//         />

//         <input
//           type="email"
//           name="from_email"
//           value={formData.from_email}
//           onChange={handeChange}
//           placeholder="Your Email"
//           required
//           className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
//         />

//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handeChange}
//           placeholder="Subject / Title"
//           required
//           className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
//         />

//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handeChange}
//           placeholder="Your Message"
//           required
//           rows={5}
//           className="bg-transparent border border-gray-500 px-4 py-2 rounded-md focus:outline-none"
//         />

//         <button
//           type="submit"
//           className="bg-teal-500 hover:bg-teal-600 transition-colors duration-300  py-2 rounded-md font-semibold"
//         >
//           Send Message
//         </button>
//       </motion.form>

//       {/* Success Animation */}
//       <AnimatePresence>
//         {showSuccessAnim && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.4 }}
//             className="mt-8 bg-green-500  px-6 py-3 rounded-lg shadow-lg"
//           >
//             🎉 Email sent successfully!
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//         className="mt-10 text-center"
//       >
//         <h2 className="text-xl font-semibold mb-4">Or reach out on</h2>
//         <div className="flex gap-6 justify-center">
//           <Link
//             to="https://www.instagram.com/amit_sarode__/"
//             target="_blank"
//             className="hover:underline text-teal-400"
//           >
//             Instagram
//           </Link>
//           <Link to="#" target="_blank" className="hover:underline text-teal-400">
//             X
//           </Link>
//           <Link to="#" target="_blank" className="hover:underline text-teal-400">
//             Facebook
//           </Link>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Contact;




import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from './SEO';

const apiKeysEMailJS = {
  serviceID: 'service_afje28q',
  templateID: 'template_fpbkzxq',
  publicKey: 'qWazhUDDDz2hUMVb7',
};

/* ─── Floating orb background (matches Hero) ─── */
const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3, r: 280, dx: 0.3, dy: 0.2, hue: 168 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.7, r: 220, dx: -0.25, dy: 0.3, hue: 190 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1, r: 160, dx: 0.2, dy: 0.4, hue: 175 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 70%, 55%, 0.1)`);
        g.addColorStop(1, `hsla(${o.hue}, 70%, 55%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        o.x += o.dx;
        o.y += o.dy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

/* ─── Grid lines ─── */
const GridLines: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(rgba(20, 184, 166, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(20, 184, 166, 0.025) 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
    }}
  />
);

/* ─── Input field component ─── */
const Field: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  multiline?: boolean;
  required?: boolean;
}> = ({ label, name, value, onChange, type = 'text', multiline, required }) => {
  const [focused, setFocused] = useState(false);

  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused ? 'rgba(20,184,166,0.5)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 12,
    padding: '14px 18px',
    color: '#e2e8f0',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
    boxShadow: focused ? '0 0 0 3px rgba(20,184,166,0.1), inset 0 1px 0 rgba(255,255,255,0.04)' : 'none',
    resize: 'none' as const,
    fontFamily: 'inherit',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
};

/* ─── Social link ─── */
const SocialLink: React.FC<{ href: string; label: string; icon: string }> = ({ href, label, icon }) => (
  <Link
    to={href}
    target="_blank"
    style={{ textDecoration: 'none' }}
  >
    <motion.div
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 20px',
        borderRadius: 50,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'border-color 0.25s',
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </motion.div>
  </Link>
);

/* ═══════════════════════════════════════════════════
   MAIN CONTACT COMPONENT
═══════════════════════════════════════════════════ */
const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    title: '',
    message: '',
  });
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    emailjs.init({
      publicKey: apiKeysEMailJS.publicKey,
      blockHeadless: true,
      limitRate: { id: 'app', throttle: 10000 },
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);

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
        toast.success('Message sent! I\'ll get back to you soon 🎉');
        setShowSuccessAnim(true);
        setFormData({ from_name: '', from_email: '', title: '', message: '' });
        setTimeout(() => setShowSuccessAnim(false), 4000);
      } else {
        toast.error('Failed to send message ❌');
      }
    } catch {
      toast.error('Something went wrong 😓');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        minHeight: '100vh',
        color: '#e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SEO
        title="Contact | Hire Frontend Developer in India | Amit Sarode"
        description="Email, WhatsApp, or book a 15-min call. I reply within 24 hours and work with startups and growing teams worldwide."
        path="/contact"
      />
      <AmbientBackground />
      <GridLines />

      <ToastContainer
        position="top-right"
        autoClose={3500}
        toastStyle={{
          background: '#0f172a',
          color: '#e2e8f0',
          border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: 12,
        }}
      />

      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
            <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em' }}>
               / CONTACT
            </span>
            <span style={{ width: 32, height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} />
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 16,
            }}
          >
            Let's Work Together
          </h1>

          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Have a project in mind? I'm currently available for freelance engagements and full-time roles.
          </p>
          <p style={{ color: '#5eead4', marginTop: 12, fontSize: 14 }}>
            I usually reply within 24 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            width: '100%',
            maxWidth: 540,
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            padding: '40px 36px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Card inner glow */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(20,184,166,0.08)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <form
            ref={form}
            onSubmit={sendEmail}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}
          >
            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: -4 }}>
              Budget-friendly collaborations welcome. Let's discuss your budget.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="YOUR NAME" name="from_name" value={formData.from_name} onChange={handleChange} required />
              <Field label="YOUR EMAIL" name="from_email" type="email" value={formData.from_email} onChange={handleChange} required />
            </div>
            <Field label="SUBJECT / TITLE" name="title" value={formData.title} onChange={handleChange} required />
            <Field label="MESSAGE" name="message" value={formData.message} onChange={handleChange} multiline required />

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={!sending ? { scale: 1.02, boxShadow: '0 0 30px rgba(20,184,166,0.5)' } : {}}
              whileTap={!sending ? { scale: 0.98 } : {}}
              style={{
                padding: '16px 32px',
                borderRadius: 50,
                background: sending
                  ? 'rgba(20,184,166,0.3)'
                  : 'linear-gradient(135deg, #14b8a6, #0d9488)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                border: 'none',
                cursor: sending ? 'not-allowed' : 'pointer',
                letterSpacing: '0.03em',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {sending ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                  Sending...
                </>
              ) : (
                'Send Message →'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Success animation */}
        <AnimatePresence>
          {showSuccessAnim && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: 24,
                padding: '16px 28px',
                borderRadius: 50,
                background: 'rgba(20,184,166,0.1)',
                border: '1px solid rgba(20,184,166,0.3)',
                color: '#5eead4',
                fontWeight: 600,
                fontSize: 15,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#14b8a6',
                boxShadow: '0 0 10px #14b8a6',
                display: 'inline-block',
              }} />
              Message sent successfully! Talk soon.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginTop: 52, textAlign: 'center' }}
        >
          <div style={{ marginBottom: 18, display: 'grid', gap: 8 }}>
            <a href="mailto:sarodeamit990@gmail.com" style={{ color: '#5eead4', textDecoration: 'underline' }}>
              sarodeamit990@gmail.com
            </a>
            <a href="https://wa.me/9322137885?text=Hi%20Amit%2C%20I%20want%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" style={{ color: '#e2e8f0' }}>
              WhatsApp: Start a quick chat
            </a>
            <a href="https://cal.com/" target="_blank" rel="noreferrer" style={{ color: '#e2e8f0' }}>
              Book a 15-min call (Calendly / cal.com)
            </a>
          </div>
          <p style={{ color: '#334155', fontSize: 12, letterSpacing: '0.12em', fontFamily: 'monospace', marginBottom: 20 }}>
            OR REACH OUT ON
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <SocialLink href="https://www.instagram.com/amit_sarode__/" label="Instagram" icon="📸" />
            <SocialLink href="#" label="Twitter / X" icon="𝕏" />
            <SocialLink href="#" label="Facebook" icon="f" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
