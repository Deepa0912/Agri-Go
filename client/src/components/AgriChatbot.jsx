import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Key, 
  Settings, 
  Trash2, 
  User, 
  ChevronDown, 
  Sprout,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function AgriChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! 👋 I am **AgriBot**, your AI Agronomist assistant powered by Google Gemini. Ask me anything about crop disease diagnosis, organic remedies, N-P-K fertilizer rates, or irrigation schedules!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  // Load stored API key on mount
  useEffect(() => {
    const key = localStorage.getItem('agri_gemini_key') || '';
    setSavedKey(key);
    setApiKey(key);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    const trimmed = apiKey.trim();
    localStorage.setItem('agri_gemini_key', trimmed);
    setSavedKey(trimmed);
    setShowSettings(false);
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.filter(m => m.id !== 'welcome'),
          userApiKey: savedKey || null
        })
      });

      const data = await response.json();

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.success ? data.reply : `⚠️ ${data.message || 'Error processing query.'}`,
        source: data.source,
        requiresKey: data.requiresApiKey,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "⚠️ Connection error to AI server. Please check your internet or API key.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Chat cleared! How can I assist with your farm today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper renderer for Markdown bold and linebreaks
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Simple inline bold replacement
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={line.startsWith('#') ? 'font-bold text-emerald-300 text-sm my-1' : 'my-0.5'}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-extrabold text-emerald-200">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all group flex items-center gap-2 font-extrabold"
        >
          <div className="relative">
            <Bot className="w-6 h-6 stroke-[2.5]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 absolute -top-0.5 -right-0.5 animate-ping" />
          </div>
          <span className="hidden sm:inline text-xs font-black tracking-wide">AI AgriBot</span>
        </button>
      )}

      {/* Floating Chat Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[440px] h-[600px] max-h-[85vh] rounded-3xl glass-card border border-emerald-500/30 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">AgriBot AI</h3>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    Gemini 1.5
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  {savedKey ? '🟢 Gemini API Active' : '🟡 Smart Agronomic Engine (Key Optional)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Configure Gemini API Key"
                className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                  showSettings ? 'text-emerald-400 bg-slate-800' : ''
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                title="Clear Chat History"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* API Key Drawer Modal Overlay */}
          {showSettings && (
            <div className="bg-slate-900 border-b border-emerald-500/30 p-4 space-y-3 animate-fadeIn text-xs">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Key className="w-4 h-4" />
                  Gemini API Key Configuration
                </span>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Paste your Google Gemini API key below to power AgriBot with generative AI intelligence. Keys are stored locally in your browser.
              </p>
              <form onSubmit={handleSaveKey} className="space-y-2">
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <div className="flex items-center justify-between">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5"
                  >
                    <HelpCircle className="w-3 h-3" /> Get Free Gemini Key
                  </a>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Key
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser 
                      ? 'bg-teal-500 text-slate-950' 
                      : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[82%] rounded-2xl p-3.5 space-y-1 ${
                    isUser
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none shadow-md'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                  }`}>
                    <div className="leading-relaxed">
                      {renderFormattedText(msg.text)}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-slate-800/50">
                      <span>{msg.time}</span>
                      {msg.requiresKey && (
                        <button
                          onClick={() => setShowSettings(true)}
                          className="text-amber-400 hover:underline font-bold"
                        >
                          + Set API Key
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>AgriBot is analyzing agronomic data...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="p-2.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Ask:</span>
            <button
              onClick={() => handleQuickPrompt("How to treat Tomato Early Blight naturally?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 whitespace-nowrap"
            >
              🍅 Tomato Blight Treatment
            </button>
            <button
              onClick={() => handleQuickPrompt("What is the best NPK ratio for Wheat?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 whitespace-nowrap"
            >
              🌾 Wheat NPK Ratio
            </button>
            <button
              onClick={() => handleQuickPrompt("How much water does Rice need per day?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 whitespace-nowrap"
            >
              💧 Rice Water Needs
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask AgriBot about crop diseases, NPK, irrigation..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:brightness-110 active:scale-95 disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
