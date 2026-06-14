import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../ui/SEO';
import MagneticButton from '../ui/MagneticButton';

import { getCalApi } from "@calcom/embed-react";
import { WHATSAPP_URL } from '../../config';

// 1. Import the beautiful backgrounds from HeroBackground
import { AmbientBackground, NoiseOverlay, GridLines } from '../hero/HeroBackground';

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
      <label style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
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
      <label style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
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
const SocialLink: React.FC<{ href: string; label: string; icon: React.ReactNode; hoverColor?: string }> = ({ href, label, icon, hoverColor = '#14b8a6' }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 20px',
          borderRadius: 50,
          border: `1px solid ${hovered ? `${hoverColor}50` : 'rgba(255,255,255,0.08)'}`,
          background: hovered ? `${hoverColor}12` : 'rgba(255,255,255,0.02)',
          color: hovered ? hoverColor : '#94a3b8',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.25s',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
        {label}
      </motion.div>
    </a>
  );
};

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
      <NoiseOverlay />
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              id="whatsapp-btn"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 20px', borderRadius: 14,
                background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.15)',
                color: '#25D366', fontSize: 13, textDecoration: 'none',
                cursor: 'pointer', transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(37,211,102,0.12)';
                e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(37,211,102,0.06)';
                e.currentTarget.style.borderColor = 'rgba(37,211,102,0.15)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            
           <button
              type="button"
              data-cal-link="amit-sarode-vb2eq3/quick-chat" 
              data-cal-config='{"layout":"month_view"}'
              id="bookacall-btn"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 20px', borderRadius: 14,
                background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)',
                color: '#8B5CF6', fontSize: 13, textDecoration: 'none',
                cursor: 'pointer', transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.12)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.06)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.15)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#8B5CF6"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
              Book a Call
            </button>
          </div>

          <p style={{ color: '#334155', fontSize: 12, letterSpacing: '0.12em', fontFamily: 'monospace', marginBottom: 20 }}>
            CONNECT WITH US
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <SocialLink href="https://www.instagram.com/amit_sarode__/" label="Instagram" hoverColor="#E4405F" icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            } />
            <SocialLink href="https://www.linkedin.com/in/amit-sarode/" label="LinkedIn" hoverColor="#0A66C2" icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            } />
            <SocialLink href="https://github.com/Amit-Sarode" label="GitHub" hoverColor="#ffffff" icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.236 1.839 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            } />
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

