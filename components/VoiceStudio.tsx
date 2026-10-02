'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/mock-data';
import { Mic, Volume2, Play, Square, Sparkles, RefreshCw } from 'lucide-react';

interface VoiceStudioProps {
  selectedBook: Book;
}

export function VoiceStudio({ selectedBook }: VoiceStudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceStyle, setVoiceStyle] = useState('Professional & Warm');
  const [speechText, setSpeechText] = useState(selectedBook.description);
  const [sttPrompt, setSttPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      alert('Speech synthesis not supported in this browser.');
    }
  };

  const simulateSTT = () => {
    setIsRecording(true);
    setTimeout(() => {
      setSttPrompt('Create a powerful chapter about overcoming adversity and building resilience in young leaders.');
      setIsRecording(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Voice Studio & Narrator Engine</h1>
          <p className="text-xs text-slate-400">Generate high-fidelity audiobooks, text-to-speech (TTS), and speech-to-text (STT) prompt writing.</p>
        </div>
        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs text-amber-300 font-medium">
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>Narrator: Girmaic Professional Voice</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TTS Narration Studio */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Text-to-Speech Narration</h3>
            <select
              value={voiceStyle}
              onChange={(e) => setVoiceStyle(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-amber-300 focus:outline-none"
            >
              <option value="Professional & Warm">Professional & Warm</option>
              <option value="Inspirational">Inspirational</option>
              <option value="Educational">Educational</option>
              <option value="Storytelling">Storytelling</option>
            </select>
          </div>

          <textarea
            rows={8}
            value={speechText}
            onChange={(e) => setSpeechText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">Voice Style: <strong className="text-white">{voiceStyle}</strong></span>
            <button
              onClick={toggleSpeech}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-500 text-white' 
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Stop Narration' : 'Read Aloud / Listen'}</span>
            </button>
          </div>
        </div>

        {/* Speech-to-Text (Speak to Write) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Speak to Write (Voice Dictation)</h3>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-medium">Multilingual STT</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl flex flex-col items-center justify-center space-y-4 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isRecording ? 'bg-red-500/20 text-red-400 border-2 border-red-500 animate-pulse' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}>
              <Mic className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-semibold text-white">{isRecording ? 'Listening to your voice...' : 'Click to Speak Idea'}</div>
              <p className="text-[10px] text-slate-400 mt-1">Speak in English or Amharic to generate manuscript content.</p>
            </div>

            <button
              onClick={simulateSTT}
              disabled={isRecording}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all"
            >
              {isRecording ? 'Recording...' : 'Simulate Voice Dictation'}
            </button>
          </div>

          {sttPrompt && (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[10px] font-semibold text-amber-400">Captured Dictation Result:</div>
              <p className="text-xs text-slate-300 italic">&ldquo;{sttPrompt}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
