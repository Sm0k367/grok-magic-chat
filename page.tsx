'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    { role: 'ai', content: "Hello! I'm Grok Magic. What would you like to talk about today? ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages.map(m => ({ 
            user: m.role === 'user' ? m.content : '', 
            ai: m.role === 'ai' ? m.content : '' 
          })).filter(m => m.user || m.ai)
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Sorry, I couldn't connect. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-3 bg-slate-800/50 rounded-3xl px-8 py-3 border border-slate-700">
            <span className="text-4xl">🌟</span>
            <h1 className="text-4xl font-bold tracking-tighter">Grok Magic</h1>
          </div>
          <p className="text-slate-400 mt-4 text-sm">Real Grok-4 • Deployed on Vercel</p>
        </div>

        <div 
          ref={chatContainerRef}
          className="bg-slate-900/50 border border-slate-700 rounded-3xl p-8 h-[60vh] overflow-y-auto mb-6 space-y-6 shadow-inner"
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] message ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-3xl rounded-br-sm' 
                : 'bg-slate-800 text-slate-100 rounded-3xl rounded-bl-sm'}`}>
                <p className="text-sm opacity-70 mb-1">
                  {msg.role === 'user' ? 'You' : 'Grok Magic'}
                </p>
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-100 rounded-3xl rounded-bl-sm px-6 py-3">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800 border border-slate-700 focus:border-violet-500 rounded-2xl px-6 py-4 text-lg outline-none transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-700 px-10 rounded-2xl font-medium transition-colors"
          >
            Send
          </button>
        </div>

        <div className="text-center text-xs text-slate-500 mt-8">
          Deployed on Vercel • Powered by xAI SDK
        </div>
      </div>
    </div>
  );
}
