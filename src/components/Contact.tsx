import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from './SEO';
import MagneticButton from './MagneticButton';

import { getCalApi } from "@calcom/embed-react";

// 1. Import the beautiful backgrounds from HeroBackground
import { AmbientBackground, GridLines } from './hero/HeroBackground';

const apiKeysEMailJS = {
  serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

/* ─── Input field component ─── */
const Field: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  placeholder?: string;
}> = ({ label, name, value, onChange, type = 'text', multiline, required, placeholder }) => {
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
          placeholder={placeholder}
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
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
};

/* ─── Select field component ─── */
const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}> = ({ label, name, value, onChange, options, required }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? 'rgba(20,184,166,0.5)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 12,
          padding: '14px 18px',
          color: value ? '#e2e8f0' : '#475569',
          fontSize: 15,
          outline: 'none',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          boxShadow: focused ? '0 0 0 3px rgba(20,184,166,0.1)' : 'none',
          fontFamily: 'inherit',
          cursor: 'pointer',
          appearance: 'none' as const,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
        }}
      >
        <option value="" disabled>{options[0]?.label || 'Select...'}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#0f172a', color: '#e2e8f0' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

/* ─── Social link ─── */
const SocialLink: React.FC<{ href: string; label: string; icon: string }> = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
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
  </a>
);

/* ═══════════════════════════════════════════════════
   MAIN CONTACT COMPONENT
═══════════════════════════════════════════════════ */
const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    project_type: '',
    budget: '',
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

  // Fixed Cal.com Initialization
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark", 
        styles: { branding: { brandColor: "#14b8a6" } }, 
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);

    const projectLabels: Record<string, string> = {
      'ai-chatbot': 'AI Chatbot / Support Agent',
      'workflow-automation': 'Workflow Automation',
      'custom-ai-app': 'Custom AI Application',
      'rag-documents': 'Document Processing (RAG)',
      'full-stack-web': 'Full Stack Web Platform',
      'frontend-ui': 'Frontend / UI Development',
      'other': 'Other / Not Sure',
    };
    const budgetLabels: Record<string, string> = {
      'under-25k': 'Under ₹25,000',
      '25k-50k': '₹25,000 – ₹50,000',
      '50k-1l': '₹50,000 – ₹1,00,000',
      '1l-plus': '₹1,00,000+',
      'lets-discuss': "Let's discuss",
    };

    const params = {
      name: formData.from_name,
      email: formData.from_email,
      project_type: projectLabels[formData.project_type] || formData.project_type || 'Not specified',
      budget: budgetLabels[formData.budget] || formData.budget || 'Not specified',
      title: formData.title,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      const response = await emailjs.send(apiKeysEMailJS.serviceID, apiKeysEMailJS.templateID, params);
      if (response.status === 200) {
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setShowSuccessAnim(true);
        setFormData({ from_name: '', from_email: '', project_type: '', budget: '', title: '', message: '' });
        setTimeout(() => setShowSuccessAnim(false), 4000);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again or reach out via WhatsApp.');
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
        title="Contact | AI Automation Agency | Amit Sarode"
        description="Tell us about your automation goals. Get a free discovery call and custom proposal for AI chatbots, workflow automation, or custom AI applications."
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
            <motion.span 
                                                     initial={{ width: 0 }}
                                                     whileInView={{ width: 32 }}
                                                     transition={{ duration: 0.8, delay: 0.2 }}
                                                     style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                                                   />
                                     <span style={{ color: '#14b8a6', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.12em', fontWeight: 600 }}>
                                       CONTACT
                                     </span>
                                      <motion.span 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: 32 }}
                                                    transition={{ duration: 0.8, delay: 0.2 }}
                                                    style={{ height: 2, background: '#14b8a6', borderRadius: 2, display: 'inline-block' }} 
                                                  />
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
            Let's Automate Your Business
          </h1>

          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Tell us about your automation goals. We'll map your workflows, identify quick wins, and build a custom proposal — no strings attached.
          </p>
          <p style={{ color: '#5eead4', marginTop: 12, fontSize: 14, fontWeight: 500 }}>
            Free discovery call · 24-hour response time
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            width: '100%',
            maxWidth: 580,
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)',
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
            <div className="form-grid-2">
              <Field
                label="YOUR NAME"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
              <Field
                label="YOUR EMAIL"
                name="from_email"
                type="email"
                value={formData.from_email}
                onChange={handleChange}
                required
                placeholder="john@company.com"
              />
            </div>

            <div className="form-grid-2">
              <SelectField
                label="WHAT DO YOU NEED?"
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                required
                options={[
                  { value: '', label: 'Select a service...' },
                  { value: 'ai-chatbot', label: 'AI Chatbot / Support Agent' },
                  { value: 'workflow-automation', label: 'Workflow Automation' },
                  { value: 'custom-ai-app', label: 'Custom AI Application' },
                  { value: 'rag-documents', label: 'Document Processing (RAG)' },
                  { value: 'full-stack-web', label: 'Full Stack Web Platform' },
                  { value: 'frontend-ui', label: 'Frontend / UI Development' },
                  { value: 'other', label: 'Other / Not Sure' },
                ]}
              />
              <SelectField
                label="BUDGET RANGE"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                options={[
                  { value: '', label: 'Select budget...' },
                  { value: 'under-25k', label: 'Under ₹25,000' },
                  { value: '25k-50k', label: '₹25,000 – ₹50,000' },
                  { value: '50k-1l', label: '₹50,000 – ₹1,00,000' },
                  { value: '1l-plus', label: '₹1,00,000+' },
                  { value: 'lets-discuss', label: "Let's discuss" },
                ]}
              />
            </div>

            <Field
              label="SUBJECT"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Need an AI chatbot for customer support"
            />
            <Field
              label="TELL US MORE"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              required
              placeholder="Describe your current workflow, pain points, and what you'd like to automate..."
            />

            <MagneticButton
              type="submit"
              disabled={sending}
              style={{
                padding: '16px 32px',
                borderRadius: 14,
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
                width: '100%',
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
                'Get Free Proposal →'
              )}
            </MagneticButton>
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
                borderRadius: 14,
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
              Proposal request sent! We'll reach out within 24 hours.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginTop: 52, textAlign: 'center', maxWidth: 600 }}
        >
          {/* Quick contact */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginBottom: 32,
          }}>
    
            <a
              href="https://wa.me/9322137885?text=Hi%20Amit%2C%20I%27m%20interested%20in%20your%20automation%20services."
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 20px', borderRadius: 14,
                background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.15)',
                color: '#25D366', fontSize: 13, textDecoration: 'none', transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(37,211,102,0.15)')}
            >
              <span style={{ fontSize: 16 }}>💬</span>
              WhatsApp
            </a>
            
           {/* Fixed Button - Added type="button" and removed broken namespace */}
           <button
              type="button"
              data-cal-link="amit-sarode-vb2eq3/quick-chat" 
              data-cal-config='{"layout":"month_view"}'
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 20px', borderRadius: 14,
                background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)',
                color: '#8B5CF6', fontSize: 13, textDecoration: 'none', transition: 'border-color 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.15)')}
            >
              <span style={{ fontSize: 16 }}>📅</span>
              Book a Call
            </button>
          </div>

          <p style={{ color: '#334155', fontSize: 12, letterSpacing: '0.12em', fontFamily: 'monospace', marginBottom: 20 }}>
            CONNECT WITH US
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <SocialLink href="https://www.instagram.com/amit_sarode__/" label="Instagram" icon="📸" />
            <SocialLink href="https://www.linkedin.com/in/amit-sarode/" label="LinkedIn" icon="in" />
            <SocialLink href="https://github.com/Amit-Sarode" label="GitHub" icon="⌨" />
          </div>
        </motion.div>
      </section>

      <style>{`
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 500px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;

