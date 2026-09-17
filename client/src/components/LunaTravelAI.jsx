import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Compass, 
  ChevronDown, 
  MessageSquare, 
  RefreshCw,
  Award
} from 'lucide-react';
import { api } from '../services/api';
import { usePassport } from '../context/PassportContext';

export const LunaTravelAI = ({ isOpen, onClose, destinationContext = null }) => {
  const { addXp } = usePassport();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: destinationContext 
        ? `✨ Hello! I am Luna, your AI travel concierge for ASIA EXPLORA. I see you are looking at **${destinationContext.name}** in ${destinationContext.country}. Ask me anything about heritage facts, local dishes, transport routes, or secret visiting hours!`
        : `✨ Greetings! I am Luna, your AI Travel Assistant for **ASIA EXPLORA**. Where across Asia would your heart like to journey? You can click a quick topic below or ask any question!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const quickPrompts = [
    "Best places for family?",
    "Budget trip under $40/day",
    "Grand heritage temple trails",
    "7-day Japan cultural itinerary",
    "Best time to visit India & Tamil Nadu",
    "Secret hidden gems of Asia"
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText = null) => {
    const textToSend = queryText || input;
    if (!textToSend || textToSend.trim() === '' || loading) return;

    const userMsg = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await api.askLunaAI(textToSend, destinationContext);
      const assistantMsg = {
        role: 'assistant',
        text: res?.reply || "I apologize, I am temporarily having trouble reaching the network. Please try again shortly!"
      };
      setMessages(prev => [...prev, assistantMsg]);
      addXp(15, "Consulted Luna Travel AI");
    } catch (err) {
      console.error("AI chat error:", err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: "Encountered a connection delay. Asia Explora's offline knowledge engine is active." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[460px] h-[600px] max-h-[85vh] rounded-3xl glass-panel border border-ocean-400/40 shadow-glow-blue flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
      
      {/* AI Header */}
      <div className="p-4 px-5 bg-gradient-to-r from-ocean-950 via-[#07162c] to-ocean-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-heritage-500 to-ocean-400 p-0.5 shadow-glow-gold">
            <div className="w-full h-full bg-[#07162c] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-heritage-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
              <span>Luna Travel AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <span className="text-[10px] text-ocean-300 font-medium">
              Powered by Google Gemini AI
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
              m.role === 'user' 
                ? 'bg-ocean-600 text-white' 
                : 'bg-heritage-950 border border-heritage-500/40 text-heritage-400'
            }`}>
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`p-3.5 rounded-2xl max-w-[82%] leading-relaxed ${
              m.role === 'user'
                ? 'bg-ocean-600 text-white rounded-tr-sm shadow-sm'
                : 'glass-card border border-white/10 text-slate-200 rounded-tl-sm whitespace-pre-line'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-ocean-400 text-xs italic pl-9">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-heritage-400" />
            <span>Luna is analyzing Asian travel routes & heritage archives...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="p-2.5 px-4 bg-black/40 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-slate-300 hover:text-white shrink-0 transition-colors"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#030c1b] border-t border-white/10 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask Luna about destinations, food, trains, culture..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 text-white text-xs px-4 py-2.5 rounded-full placeholder-slate-500 focus:outline-none focus:border-ocean-400 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-full bg-ocean-600 hover:bg-ocean-500 disabled:opacity-40 text-white transition-all shadow-glow-blue"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
