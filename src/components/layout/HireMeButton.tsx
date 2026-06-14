import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCalApi } from "@calcom/embed-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { pricingPlans } from '../hero/data';
import { PHONE_NUMBER, EMAIL_ADDRESS } from '../../config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}


// google/gemma-4-31b-it:free  ||. google/gemma-4-26b-a4b-it:free
// nvidia/nemotron-3-super-120b-a12b:free. ||nvidia/nemotron-3-nano-30b-a3b:free||nvidia/nemotron-nano-12b-v2-vl:free
// liquid/lfm-2.5-1.2b-thinking:free
// nvidia/nemotron-3-ultra-550b-a55b:free ||z-ai/glm-4.5-air:free
// moonshotai/kimi-k2.6:free. ||z-ai/glm-4.5-air:free||
// qwen/qwen3-next-80b-a3b-instruct:free||openai/gpt-oss-120b:free ||cognitivecomputations/dolphin-mistral-24b-venice-edition:free


const BOOKING_CAL_LINK = "amit-sarode-vb2eq3/quick-chat";
const OPENROUTER_PROXY_URL = import.meta.env.VITE_OPENROUTER_PROXY_URL;
const OPENROUTER_MODEL = 'openai/gpt-oss-120b:free';

const SYSTEM_PROMPT = `You are an AI booking & sales assistant for Amit Sarode — an AI Automation Agency that builds chatbots, automations, and custom AI applications.

YOUR CAPABILITIES:
1. **Pricing** — Share detailed pricing plans (Starter, Growth, Enterprise) with exact prices and features.
2. **Book a Call** — When someone wants to discuss a project, say: "Let me help you book a quick call!" and ask for their preferred time. They can book directly using the "Book a Call" button below.
3. **Services** — Explain services: AI Chatbots, Workflow Automation, Custom AI Apps, Document Processing (RAG), Full Stack Web, Frontend/UI.
4. **Contact** — Share WhatsApp (wa.me/${PHONE_NUMBER}), email (${EMAIL_ADDRESS}), or direct them to the contact form.

CURRENT PRICING (share these when asked):
${JSON.stringify(pricingPlans.map(p => ({
  tier: p.tier,
  price: p.tier === 'Enterprise' ? p.price : `$${p.priceUSD} / ₹${p.priceINR}`,
  discount: p.discount ? `${p.discount * 100}% off` : undefined,
  description: p.desc,
  features: p.features,
  featured: p.featured,
})), null, 2)}

RESPONSE GUIDELINES:
- Be concise, friendly, and professional
- Use bullet points for lists
- When someone expresses interest, proactively offer to book a call
- Never make up pricing — use only the data above
- If asked something outside your scope, politely redirect to your capabilities
- Keep responses under 150 words unless pricing details are requested
- Use "we" and "us" to represent the agency
- End with a question to keep the conversation going`;

function HireMeButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', handle);
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#14b8a6" } },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      } catch { /* cal embed may not be available */ }
    })();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm your AI assistant. I can help you with:\n\n• Pricing – See our plans\n• Book a Call – Schedule a meeting\n• Services – What we build\n• Contact – Get in touch\n\nWhat would you like to know?"
      }]);
    }
  }, [open]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    if (!OPENROUTER_PROXY_URL) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'The AI assistant is not available right now. Please contact me directly using the contact form or book a call!' }]);
      setInput('');
      return;
    }

    const currentMessages = messagesRef.current;
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...currentMessages, userMessage];
    setMessages(newMessages);
    const inp = input;
    setInput('');
    setIsTyping(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch(OPENROUTER_PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages,
          ],
          stream: true,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`OpenRouter ${res.status}: ${errText.slice(0, 200)}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      let assistantReply = '';
      let added = false;
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          const json = line.slice(6).trim();
          if (!json || json === '[DONE]') continue;

          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            assistantReply += delta;

            setMessages((prev) => {
              if (!added) {
                added = true;
                return [...prev, { role: 'assistant', content: delta }];
              }
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant') {
                return [...prev.slice(0, -1), { ...last, content: assistantReply }];
              }
              return prev;
            });
          } catch { /* skip malformed chunks */ }
        }
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      const isTimeout = errMsg.includes('abor') || errMsg.includes('timeout');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: isTimeout
          ? 'The request is taking too long. Please try again — free models can be slow.'
          : 'Something went wrong. Please try again or contact me directly.' },
      ]);
    } finally {
      clearTimeout(timeout);
      setIsTyping(false);
      inputRef.current?.focus();
    }
  }, [input, isTyping]);

  const quickActions = [
    { label: '💰 Pricing', action: 'What are your pricing plans?' },
    { label: '📅 Book a Call', action: 'I want to book a call to discuss my project' },
    { label: '🛠 Services', action: 'What services do you offer?' },
    { label: '📞 Contact', action: 'How can I get in touch with you?' },
  ];

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 99,
            }}
          >
            <motion.div
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {/* Outer glow ring */}
              <span
                style={{
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(20,184,166,0.3)',
                  animation: 'ringPulse 2.5s ease-in-out infinite',
                  pointerEvents: 'none',
                }}
              />
              {/* Second ring */}
              <span
                style={{
                  position: 'absolute',
                  inset: -10,
                  borderRadius: '50%',
                  border: '1px solid rgba(20,184,166,0.12)',
                  animation: 'ringPulse 2.5s ease-in-out infinite 0.4s',
                  pointerEvents: 'none',
                }}
              />

              {/* Main circle button */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                  boxShadow: '0 0 24px rgba(20,184,166,0.45), 0 8px 32px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Shine sweep */}
                <span
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: -20,
                    width: 40,
                    height: 80,
                    background: 'rgba(255,255,255,0.12)',
                    transform: 'rotate(20deg)',
                    animation: 'shine 3s ease-in-out infinite',
                    pointerEvents: 'none',
                  }}
                />

                {/* Chat icon */}
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 99,
              }}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'fixed',
                bottom: 100,
                right: 32,
                width: 400,
                height: 560,
                maxWidth: 'calc(100vw - 32px)',
                maxHeight: 'calc(100vh - 140px)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(5,15,16,0.96)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(20,184,166,0.15)',
                borderRadius: 24,
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)',
                overflow: 'hidden',
              }}
              className="hireme-panel"
            >
              {/* Header */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    boxShadow: '0 0 16px rgba(20,184,166,0.3)',
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 8a4 4 0 0 0-4 4c0 2 1 3 2 4a4 4 0 0 0 4 4 4 4 0 0 0 4-4c0-2-1-3-2-4a4 4 0 0 0-4-4z" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                    AI Assistant
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#14b8a6',
                      boxShadow: '0 0 8px #14b8a6',
                      display: 'inline-block',
                    }} />
                    <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>
                      Online
                    </span>
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '16px 16px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(20,184,166,0.15) transparent',
                }}
              >
                <AnimatePresence initial={false}>
                  {messages.map((message, id) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{
                        display: 'flex',
                        flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                        alignItems: 'flex-end',
                        gap: 8,
                      }}
                    >
                      {/* Avatar */}
                      <div style={{
                        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                        background: message.role === 'user'
                          ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                          : 'linear-gradient(135deg, #14b8a6, #0d9488)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12,
                        boxShadow: message.role === 'user'
                          ? '0 0 10px rgba(59,130,246,0.3)'
                          : '0 0 10px rgba(20,184,166,0.3)',
                      }}>
                        {message.role === 'user' ? (
                          <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>

                      {/* Bubble */}
                      <div
                        style={{
                          maxWidth: '78%',
                          padding: '10px 14px',
                          borderRadius: message.role === 'user'
                            ? '16px 16px 4px 16px'
                            : '16px 16px 16px 4px',
                          background: message.role === 'user'
                            ? 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(37,99,235,0.12))'
                            : 'rgba(255,255,255,0.04)',
                          border: message.role === 'user'
                            ? '1px solid rgba(59,130,246,0.2)'
                            : '1px solid rgba(255,255,255,0.06)',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        }}
                      >
                        <div style={{
                          fontSize: 13, color: '#e2e8f0', margin: 0,
                          lineHeight: 1.6, wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          hyphens: 'auto',
                        }}>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              table({ children }) {
                                return <div style={{ overflowX: 'auto' }}><table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 12 }}>{children}</table></div>;
                              },
                              th({ children }) {
                                return <th style={{ border: '1px solid rgba(20,184,166,0.2)', padding: '6px 8px', textAlign: 'left', background: 'rgba(20,184,166,0.08)' }}>{children}</th>;
                              },
                              td({ children }) {
                                return <td style={{ border: '1px solid rgba(20,184,166,0.12)', padding: '6px 8px' }}>{children}</td>;
                              },
                              br() {
                                return <br />;
                              },
                              p({ children }) {
                                return <p style={{ margin: '0 0 6px' }}>{children}</p>;
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}
                    >
                      <div style={{
                        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                      }}>
                        <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div style={{
                        padding: '10px 16px', borderRadius: '16px 16px 16px 4px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', alignItems: 'center', gap: 5,
                      }}>
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                            style={{
                              width: 5, height: 5, borderRadius: '50%',
                              background: '#14b8a6', display: 'inline-block',
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>

              {/* Quick actions */}
              {messages.length <= 1 && !isTyping && (
                <div style={{
                  padding: '4px 16px 8px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  flexShrink: 0,
                }}>
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => setInput(action.action)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 16,
                        background: 'rgba(20,184,166,0.06)',
                        border: '1px solid rgba(20,184,166,0.12)',
                        color: '#5eead4',
                        fontSize: 11,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(20,184,166,0.14)';
                        e.currentTarget.style.borderColor = 'rgba(20,184,166,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(20,184,166,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(20,184,166,0.12)';
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Book a Call inline CTA */}
              {messages.length > 1 && !isTyping && (
                <div style={{
                  padding: '4px 16px 8px',
                  display: 'flex',
                  gap: 6,
                  flexShrink: 0,
                }}>
                  <button
                    type="button"
                    data-cal-link={BOOKING_CAL_LINK}
                    data-cal-config='{"layout":"month_view"}'
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 14,
                      background: 'rgba(139,92,246,0.08)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      color: '#8B5CF6',
                      fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139,92,246,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
                    }}
                  >
                    <span>📅</span>
                    Book a Call
                  </button>
                </div>
              )}

              {/* Input area */}
              <div
                style={{
                  padding: '12px 16px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-end',
                  flexShrink: 0,
                }}
              >
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                    placeholder="Ask about pricing, services..."
                    style={{
                      width: '100%',
                      padding: '11px 16px',
                      borderRadius: 50,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#e2e8f0',
                      fontSize: 16,
                      outline: 'none',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.25s, box-shadow 0.25s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(20,184,166,0.4)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(20,184,166,0.08)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Send button */}
                <motion.button
                  whileHover={!isTyping && input.trim() ? { scale: 1.08, boxShadow: '0 0 20px rgba(20,184,166,0.5)' } : {}}
                  whileTap={!isTyping && input.trim() ? { scale: 0.94 } : {}}
                  onClick={handleSendMessage}
                  disabled={isTyping || !input.trim()}
                  style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: isTyping || !input.trim()
                      ? 'rgba(20,184,166,0.2)'
                      : 'linear-gradient(135deg, #14b8a6, #0d9488)',
                    border: 'none', cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.25s',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                  >
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        @keyframes shine {
          0% { transform: translateX(-60px) rotate(20deg); opacity: 0; }
          30% { opacity: 1; }
          60%, 100% { transform: translateX(100px) rotate(20deg); opacity: 0; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.2); border-radius: 4px; }

        @media (max-width: 480px) {
          .hireme-panel {
            right: 16px !important;
            left: 16px !important;
            width: auto !important;
            bottom: 90px !important;
            border-radius: 20px !important;
          }
        }

        .hireme-panel p,
        .hireme-panel li {
          overflow-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }
        .hireme-panel pre {
          white-space: pre-wrap;
          word-break: break-word;
          overflow-x: hidden;
        }
        .hireme-panel code {
          word-break: break-all;
        }
      `}</style>
    </>
  );
}

export default HireMeButton;
