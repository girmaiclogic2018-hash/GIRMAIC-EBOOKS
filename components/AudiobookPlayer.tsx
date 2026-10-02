'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/mock-data';
import { Mic, Play, Pause, SkipForward, SkipBack, Volume2, Clock } from 'lucide-react';

interface AudiobookPlayerProps {
  selectedBook: Book;
}

export function AudiobookPlayer({ selectedBook }: AudiobookPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChIndex, setActiveChIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');

  const chapters = selectedBook.chapters.length > 0 ? selectedBook.chapters : [
    { id: '1', title: 'Chapter 1: Introduction', amharicTitle: 'ምዕራፍ 1', content: '', amharicContent: '', wordCount: 1000, audioDuration: '12:40' },
    { id: '2', title: 'Chapter 2: Core Principles', amharicTitle: 'ምዕራፍ 2', content: '', amharicContent: '', wordCount: 1200, audioDuration: '15:10' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Audiobook Player & Chapter Narration</h1>
          <p className="text-xs text-slate-400">Professional audiobook stream powered by Girmaic Narrator engine.</p>
        </div>
        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs text-amber-300 font-medium">
          <Mic className="w-4 h-4 text-amber-400" />
          <span>{selectedBook.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 lg:col-span-1 flex flex-col items-center text-center">
          <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 relative">
            <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{selectedBook.title}</h3>
            <p className="text-xs text-amber-400 font-medium">{chapters[activeChIndex]?.title}</p>
            <p className="text-[10px] text-slate-400">Author: {selectedBook.author}</p>
          </div>

          {/* Controls */}
          <div className="w-full space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-center space-x-6">
              <button 
                onClick={() => setActiveChIndex(Math.max(0, activeChIndex - 1))}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 transition-all"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-slate-950" />}
              </button>
              <button 
                onClick={() => setActiveChIndex(Math.min(chapters.length - 1, activeChIndex + 1))}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 transition-all"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Speed: 
                <button 
                  onClick={() => setPlaybackSpeed(playbackSpeed === '1.0x' ? '1.25x' : playbackSpeed === '1.25x' ? '1.5x' : '1.0x')}
                  className="ml-1 text-amber-400 font-bold hover:underline"
                >
                  {playbackSpeed}
                </button>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{chapters[activeChIndex]?.audioDuration || '12:00'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Chapters Playlist */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Audiobook Chapters</h3>
          <div className="space-y-2">
            {chapters.map((ch, idx) => (
              <div
                key={ch.id || idx}
                onClick={() => {
                  setActiveChIndex(idx);
                  setIsPlaying(true);
                }}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  activeChIndex === idx
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    activeChIndex === idx ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{ch.title}</div>
                    <div className="text-xs text-amber-400 font-medium">{ch.amharicTitle}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{ch.audioDuration || '10:00'}</span>
                  </span>
                  {activeChIndex === idx && isPlaying && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
