import React, { useEffect, useRef, useState } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from './SEO';
import { AmbientBackground, NoiseOverlay, GridLines } from './hero/HeroBackground';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatgpt: React.FC = () => {
  const [input, setInput] = useState('');
  const [engine, setEngine] = useState<any | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);
  const [loadProgress, setLoadProgress] = useState('Initializing model...');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedModel = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';
    webllm.CreateMLCEngine(selectedModel, {
      initProgressCallback: (progress) => {
        setLoadProgress(progress.text ?? 'Loading...');
        if (progress.progress === 1) setLoadingModel(false);
      },
    }).then((createdEngine) => {
      setEngine(createdEngine);
      setLoadingModel(false);
    }).catch((err) => {
      console.error('Model load failed:', err);
      setLoadingModel(false);
      setLoadProgress('Failed to load model. Please refresh and try again.');
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim() || !engine || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    const systemPrompt = {
      role: 'system',
      content: `You are a helpful AI assistant embedded in Amit Sarode's developer portfolio. 
      Be concise, friendly, and helpful. You can answer questions about web development, 
      React, JavaScript, and general programming topics.`,
    };

    try {
      const chunks = await engine.chat.completions.create({
        messages: [systemPrompt, ...newMessages],
        temperature: 1,
        stream: true,
        stream_options: { include_usage: true },
      });

      let assistantReply = '';
      let added = false;

      for await (const chunk of chunks) {
        const delta = chunk.choices?.[0]?.delta?.content || '';
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
      }
    } catch (err) {
      console.error('Streaming error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #020d0a 0%, #050f10 40%, #02100d 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SEO
        title="AI Chat | Local LLM | Amit Sarode"
        description="Run a local AI language model directly in your browser. Powered by WebLLM, no server required."
        path="/chatgpt"
      />
      <AmbientBackground />
      <NoiseOverlay />
      <GridLines />

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: '100%',
          maxWidth: 680,
          height: 'calc(100vh - 120px)',
          maxHeight: 760,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(5,15,16,0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(20,184,166,0.12)',
          borderRadius: 24,
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}
        >
          {/* AI avatar */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              boxShadow: '0 0 16px rgba(20,184,166,0.3)',
              flexShrink: 0,
            }}
          >
            🤖
          </div>

          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
              AI Assistant
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: loadingModel ? '#f59e0b' : '#14b8a6',
                boxShadow: `0 0 8px ${loadingModel ? '#f59e0b' : '#14b8a6'}`,
                display: 'inline-block',
                animation: 'hirePulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>
                {loadingModel ? 'Loading model...' : 'Luma· Ready'}
              </span>
            </div>
          </div>

          {/* Section label */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em',
              color: '#1e3a35', padding: '4px 10px', borderRadius: 20,
              border: '1px solid rgba(20,184,166,0.08)',
              background: 'rgba(20,184,166,0.04)',
            }}>
              Runs locally · Private
            </span>
          </div>
        </div>

        {/* Model loading overlay */}
        <AnimatePresence>
          {loadingModel && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                background: 'rgba(2,13,10,0.92)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                borderRadius: 24,
              }}
            >
              {/* Spinner */}
              <div style={{ position: 'relative', width: 56, height: 56 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    border: '2px solid rgba(20,184,166,0.15)',
                    borderTopColor: '#14b8a6',
                    position: 'absolute',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 8,
                  borderRadius: '50%',
                  background: 'rgba(20,184,166,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  🤖
                </div>
              </div>

              <div style={{ textAlign: 'center', maxWidth: 320, padding: '0 24px' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#5eead4', margin: '0 0 8px' }}>
                  Loading AI Model
                </p>
                <p style={{
                  fontSize: 12, color: '#334155', fontFamily: 'monospace',
                  lineHeight: 1.6, margin: 0,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {loadProgress}
                </p>
              </div>

              {/* Loading dots */}
              <div style={{ display: 'flex', gap: 8 }}>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: i === 1 ? '#14b8a6' : 'rgba(20,184,166,0.35)',
                      display: 'inline-block',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 20px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(20,184,166,0.15) transparent',
          }}
        >
          {/* Empty state */}
          {messages.length === 0 && !loadingModel && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 16,
                padding: '40px 20px', textAlign: 'center',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'rgba(20,184,166,0.08)',
                border: '1px solid rgba(20,184,166,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>
                💬
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#cbd5e1', margin: '0 0 6px' }}>
                  Ask me anything
                </p>
                <p style={{ fontSize: 13, color: '#334155', margin: 0, lineHeight: 1.6 }}>
                  React · JavaScript · Web Dev · General programming
                </p>
              </div>

              {/* Suggestion chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 8 }}>
                {[
                  'What is React?',
                  'Explain useState hook',
                  'Best practices for TypeScript',
                  'How does Tailwind CSS work?',
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    style={{
                      padding: '7px 14px', borderRadius: 20,
                      background: 'rgba(20,184,166,0.05)',
                      border: '1px solid rgba(20,184,166,0.12)',
                      color: '#5eead4', fontSize: 12, cursor: 'pointer',
                      fontFamily: 'inherit', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(20,184,166,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(20,184,166,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(20,184,166,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(20,184,166,0.12)';
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Message bubbles */}
          <AnimatePresence initial={false}>
            {messages.map((message, id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  gap: 10,
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: message.role === 'user'
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13,
                  boxShadow: message.role === 'user'
                    ? '0 0 10px rgba(59,130,246,0.3)'
                    : '0 0 10px rgba(20,184,166,0.3)',
                }}>
                  {message.role === 'user' ? '👤' : '🤖'}
                </div>

                {/* Bubble */}
                <div
                  style={{
                    maxWidth: '72%',
                    padding: '11px 16px',
                    borderRadius: message.role === 'user'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    background: message.role === 'user'
                      ? 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(37,99,235,0.12))'
                      : 'rgba(255,255,255,0.04)',
                    border: message.role === 'user'
                      ? '1px solid rgba(59,130,246,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}
                >
                  <p style={{
                    fontSize: 14, color: '#e2e8f0', margin: 0,
                    lineHeight: 1.65, whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {message.content}
                  </p>
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
                style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                }}>
                  🤖
                </div>
                <div style={{
                  padding: '12px 18px', borderRadius: '18px 18px 18px 4px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                      style={{
                        width: 6, height: 6, borderRadius: '50%',
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

        {/* Input area */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: 10,
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
              disabled={loadingModel}
              placeholder={loadingModel ? 'Loading model, please wait...' : 'Ask anything...'}
              style={{
                width: '100%',
                padding: '13px 18px',
                borderRadius: 50,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#e2e8f0',
                fontSize: 14,
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.25s, box-shadow 0.25s',
                boxSizing: 'border-box',
                opacity: loadingModel ? 0.5 : 1,
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
            whileHover={!loadingModel && !isTyping ? { scale: 1.08, boxShadow: '0 0 20px rgba(20,184,166,0.5)' } : {}}
            whileTap={!loadingModel && !isTyping ? { scale: 0.94 } : {}}
            onClick={handleSendMessage}
            disabled={loadingModel || isTyping || !input.trim()}
            style={{
              width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
              background: loadingModel || isTyping || !input.trim()
                ? 'rgba(20,184,166,0.2)'
                : 'linear-gradient(135deg, #14b8a6, #0d9488)',
              border: 'none', cursor: loadingModel || isTyping ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.25s',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        @keyframes hirePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(20,184,166,0.4); }
      `}</style>
    </div>
  );
};

export default Chatgpt;