'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/mock-data';
import { Cpu, Sparkles, Send, BookOpen, Check } from 'lucide-react';

interface AskTheBookProps {
  selectedBook: Book;
}

export function AskTheBook({ selectedBook }: AskTheBookProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Greetings! I am your AI Companion for "${selectedBook.title}" by ${selectedBook.author}. Ask me anything about this book, request a summary, or ask for practical exercises in English or Amharic.`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const userMsg = inputQuery;
    setInputQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Based strictly on the book titled "${selectedBook.title}" (Subtitle: ${selectedBook.subtitle}, Description: ${selectedBook.description}), answer this reader question thoughtfully and professionally:\n\n${userMsg}`,
          systemInstruction: 'You are an AI Book Companion trained exclusively on the author\'s verified work. Clearly distinguish between book content and AI explanations. Never fabricate citations.'
        })
      });
      const data = await res.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I could not generate a response at this moment.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error connecting to AI Companion server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Ask The Book (AI Companion)</h1>
          <p className="text-xs text-slate-400">Interact with the verified knowledge base of &ldquo;{selectedBook.title}&rdquo;.</p>
        </div>
        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs text-amber-300 font-medium">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>Active Book Companion</span>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col h-[550px] shadow-xl">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-amber-500 text-slate-950 font-medium' 
                  : 'bg-slate-950 text-slate-200 border border-slate-800'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-amber-400 animate-pulse">
                AI Companion is consulting the book pages...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="mt-4 pt-4 border-t border-slate-800 flex space-x-3">
          <input
            type="text"
            placeholder="Ask about key concepts, summaries, or Amharic explanations..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
