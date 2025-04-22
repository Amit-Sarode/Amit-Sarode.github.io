import React, { useEffect, useRef, useState } from 'react';
import * as webllm from '@mlc-ai/web-llm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatgpt: React.FC = () => {
  const [input, setInput] = useState('');
  const [engine, setEngine] = useState<any | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Create engine on mount
  useEffect(() => {
    const selectedModel = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';
    webllm.CreateMLCEngine(selectedModel, {
      initProgressCallback: (progress) => console.log(progress),
    }).then((createdEngine) => setEngine(createdEngine));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    const systemPrompt = {
      role: 'system',
      content: 'You are a helpful AI assistant.',
    };

    const messagesToSend = [systemPrompt, ...newMessages];

    if (engine) {
      try {
        const chunks = await engine.chat.completions.create({
          messages: messagesToSend,
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
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <main className="min-h-screen h-screen  flex items-center justify-center p-6 cursor-none">
      <section className="w-full max-w-2xl absolute h-[80vh]  bg-[#727272] shadow-lg rounded-lg p-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-3 max-h-[70vh] overflow-y-auto">
          {messages.map((message, id) => (
            <div
              key={id}
              className={`rounded-lg p-3 max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-blue-100 self-end text-right'
                  : 'bg-gray-200 self-start text-left'
              }`}
            >
              <span className="block text-sm font-semibold mb-1">
                {message.role === 'user' ? 'You' : 'ChatGPT'}
              </span>
              <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}

          {isTyping && (
            <div className="self-start text-left rounded-lg p-3 max-w-[80%] flex items-center space-x-3">
              <span className="block text-sm font-semibold">ChatGPT</span>
              <div className="w-5 h-5 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="flex items-center space-x-2 border-t absolute bottom-2 left-0 w-full px-5 pt-4">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </section>
    </main>
  );
};

export default Chatgpt;
