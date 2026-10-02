'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/mock-data';
import { Layers, Sparkles, Download, Check } from 'lucide-react';

interface CoverStudioProps {
  selectedBook: Book;
}

export function CoverStudio({ selectedBook }: CoverStudioProps) {
  const [coverStyle, setCoverStyle] = useState('Modern Minimalist & Vibrant');
  const [currentCoverUrl, setCurrentCoverUrl] = useState(selectedBook.coverImage);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCover = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Rotate or regenerate seed image
      const randomSeed = Math.floor(Math.random() * 1000);
      setCurrentCoverUrl(`https://picsum.photos/seed/${randomSeed}/800/1200`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Cover Studio & Visual Identity</h1>
          <p className="text-xs text-slate-400">Design high-impact e-book covers, marketplace thumbnails, and social media banners.</p>
        </div>
        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs text-amber-300 font-medium">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>{selectedBook.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cover Preview Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 lg:col-span-1 flex flex-col items-center text-center">
          <div className="w-64 h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 relative group">
            <img src={currentCoverUrl} alt="Book Cover Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Girmaic AI Studio</span>
              <h4 className="text-sm font-extrabold text-white leading-tight mt-0.5">{selectedBook.title}</h4>
              <p className="text-[10px] text-slate-300 mt-1">{selectedBook.author}</p>
            </div>
          </div>

          <button
            onClick={handleGenerateCover}
            disabled={isGenerating}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating New Cover...' : 'Generate New Cover Concept'}</span>
          </button>
        </div>

        {/* Cover Configuration & Specs */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Cover Typography & Specifications</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400">Design Style</label>
              <select
                value={coverStyle}
                onChange={(e) => setCoverStyle(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Modern Minimalist & Vibrant">Modern Minimalist & Vibrant</option>
                <option value="African Innovation & Gold Accents">African Innovation & Gold Accents</option>
                <option value="Executive Author Edition">Executive Author Edition</option>
                <option value="Bold Typography & Dark Theme">Bold Typography & Dark Theme</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-white">E-Book Cover (PDF / EPUB)</div>
                <div className="text-[10px] text-slate-400">Resolution: 1600 x 2400 px (300 DPI)</div>
                <div className="text-xs text-emerald-400 font-medium flex items-center space-x-1 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Ready for Ye-Buna Digitals</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-white">Marketplace Thumbnail</div>
                <div className="text-[10px] text-slate-400">Resolution: 800 x 1200 px (Mobile Optimized)</div>
                <div className="text-xs text-emerald-400 font-medium flex items-center space-x-1 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Optimized Thumbnail</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-amber-400">Author Credit Verification</div>
              <p className="text-xs text-slate-300">
                Covers explicitly display <strong>Girma Haile Bunaro</strong> and the Girmaic AI brand identity in accordance with professional publishing standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
