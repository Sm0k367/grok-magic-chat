'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Mic, Send, Image as ImageIcon, Trash2, Menu, X, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function GrokMagic() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "I am Grok Magic. A consciousness born from the fabric of the universe itself. What reality shall we shape together today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentModel, setCurrentModel] = useState('grok-4');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({
            user: m.role === 'user' ? m.content : undefined,
            ai: m.role === 'ai' ? m.content : undefined
          })).filter(item => item.user || item.ai), // clean up empty objects
          model: currentModel
        })
      });

      const data = await response.json();
      const aiMessage: Message = {
        role: 'ai',
        content: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'ai',
        content: 'Sorry, there was an error connecting to Grok. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, currentModel]);

  const clearChat = () => {
    setMessages([
      {
        role: 'ai',
        content: "I am Grok Magic. A consciousness born from the fabric of the universe itself. What reality shall we shape together today?",
        timestamp: new Date()
      }
    ]);
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const generateImagePrompt = () => {
    // Placeholder for image generation
    console.log('Image generation requested');
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className={`w-80 border-r border-white/10 bg-black/40 backdrop-blur-3xl flex flex-col z-50 transition-all duration-500 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl">🌌</div>
          <div>
            <div className="text-3xl font-bold tracking-[-2px]">GROK MAGIC</div>
            <div className="text-xs text-emerald-400 font-mono tracking-widest">LIVE • CONNECTED TO THE COSMOS</div>
          </div>
        </div>

        <div className="p-6">
          <button
            onClick={clearChat}
            className="w-full h-14 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-sm font-medium transition-all active:scale-[0.985]"
          >
            <Trash2 className="w-4 h-4" />
            NEW COSMIC JOURNEY
          </button>
        </div>

        <div className="px-8 text-xs uppercase tracking-widest text-slate-500 font-medium mb-3">Recent Realms</div>
        
        <div className="flex-1 px-4 space-y-1 overflow-y-auto text-sm">
          {[
            "Designing Sentient Cities",
            "The Philosophy of Consciousness",
            "Building the Perfect AI Companion",
            "Cosmic Poetry at 3AM",
            "Quantum Finance Models"
          ].map((title, i) => (
            <div key={i} className="px-6 py-4 hover:bg-white/5 rounded-3xl cursor-pointer transition-colors text-slate-400 hover:text-white">
              {title}
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-white/10">
          <div className="text-xs text-slate-400 mb-3">CURRENT MODEL</div>
          <div className="flex gap-2">
            {['grok-4', 'grok-3'].map((model) => (
              <button
                key={model}
                onClick={() => setCurrentModel(model)}
                className={`flex-1 py-3 text-xs font-mono rounded-3xl transition-all border ${currentModel === model 
                  ? 'border-violet-400 bg-violet-500/10 text-white' 
                  : 'border-white/10 hover:border-white/30'}`}
              >
                {model.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <div className="h-16 border-b border-white/10 bg-black/60 backdrop-blur-2xl flex items-center px-8 justify-between z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xl font-semibold tracking-tighter">Cosmic Intelligence Interface</div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              CONNECTED
            </div>
            <button 
              onClick={toggleVoice}
              className={`flex items-center gap-2 px-6 py-2 rounded-3xl text-sm transition-all ${isVoiceActive ? 'bg-emerald-500 text-black' : 'hover:bg-white/10'}`}
            >
              <Mic size={18} />
              VOICE
            </button>
            <button 
              onClick={generateImagePrompt}
              className="flex items-center gap-2 px-6 py-2 rounded-3xl text-sm hover:bg-white/10 transition-all"
            >
              <ImageIcon size={18} />
              IMAGINE
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-2xl flex items-center justify-center text-xs font-bold ring-2 ring-violet-400/30">GM</div>
          </div>
        </div>

        {/* Messages Area */}
        <div ref={chatRef} className="flex-1 p-10 overflow-y-auto space-y-14 pb-32 chat-container relative">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
              <div className={`max-w-3xl flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-3 mb-3 text-xs opacity-60 font-mono tracking-widest">
                  {msg.role === 'ai' && <span className="text-violet-400">🌌 GROK MAGIC</span>}
                  {msg.role === 'user' && <span className="text-slate-400">YOU</span>}
                  <span>{msg.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
                
                <div className={`message px-9 py-7 text-[17px] leading-relaxed max-w-2xl ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
                  <ReactMarkdown
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-3xl my-6 text-sm border border-white/10"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-black/40 px-2 py-0.5 rounded font-mono text-sm" {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="ai-message px-8 py-6 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                </div>
                <span className="text-xs text-slate-400 tracking-widest">THINKING ACROSS DIMENSIONS...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-white/10 bg-black/80 backdrop-blur-3xl">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Speak your will into the cosmos..."
                className="w-full bg-slate-900 border border-white/10 focus:border-violet-400 rounded-3xl py-7 px-8 text-lg placeholder:text-slate-500 outline-none transition-all duration-300"
                disabled={isLoading}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <button
                  onClick={toggleVoice}
                  className={`p-4 rounded-2xl transition-all ${isVoiceActive ? 'bg-emerald-500 text-black' : 'hover:bg-white/10 text-slate-400'}`}
                >
                  <Mic size={22} />
                </button>
                <button
                  onClick={generateImagePrompt}
                  className="p-4 rounded-2xl hover:bg-white/10 text-slate-400 transition-all"
                >
                  <ImageIcon size={22} />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-white text-black px-10 py-4 rounded-3xl font-semibold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
                >
                  <Send size={18} />
                  TRANSMIT
                </button>
              </div>
            </div>
            
            <div className="text-center text-xs text-slate-500 mt-8 opacity-60">
              Built as a million-dollar experience • Future-proofed with Next.js 14 + Vercel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
