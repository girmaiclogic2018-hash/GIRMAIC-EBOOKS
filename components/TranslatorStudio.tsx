'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/mock-data';
import { Globe, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface TranslatorStudioProps {
  selectedBook: Book;
}

export function TranslatorStudio({ selectedBook }: TranslatorStudioProps) {
  const [sourceText, setSourceText] = useState(selectedBook.description);
  const [targetLang, setTargetLang] = useState('Amharic');
  const [translatedText, setTranslatedText] = useState(selectedBook.amharicDescription);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Translate and culturally adapt the following book text into natural, professional ${targetLang}, preserving context, emotional tone, and terminology:\n\n${sourceText}`,
          systemInstruction: 'You are an expert bilingual literary translator specializing in English and Amharic for Girmaic AI Technology & Innovation Center.'
        })
      });
      const data = await res.json();
      if (data.text) {
        setTranslatedText(data.text);
      } else {
        alert(data.error || 'Translation failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to AI translation service.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Bilingual Publishing & Translation Studio</h1>
          <p className="text-xs text-slate-400">Ensure high-fidelity Amharic editorial quality, terminology consistency, and cultural resonance.</p>
        </div>
        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs text-amber-300 font-medium">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Active Book: {selectedBook.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Source Text (English)</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-amber-300 focus:outline-none"
            >
              <option value="Amharic">አማርኛ (Amharic)</option>
              <option value="Afaan Oromo">Afaan Oromo</option>
              <option value="Tigrinya">ትግርኛ (Tigrinya)</option>
              <option value="French">Français</option>
            </select>
          </div>
          <textarea
            rows={10}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
          />
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isTranslating ? 'Translating & Adapting...' : `Translate into ${targetLang}`}</span>
          </button>
        </div>

        {/* Target Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase text-amber-400 tracking-wider">{targetLang} Editorial Output & QA</label>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Pronunciation Normalization Checked</span>
            </span>
          </div>
          <textarea
            rows={10}
            value={translatedText}
            onChange={(e) => setTranslatedText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
          />
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            <strong className="text-amber-400">Editorial Rule:</strong> Amharic translation preserves terminology consistency across Ethiopian names, organizations, and conceptual frameworks.
          </div>
        </div>
      </div>
    </div>
  );
}
