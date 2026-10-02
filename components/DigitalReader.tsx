'use client';

import React, { useState, useRef } from 'react';
import { Book } from '@/lib/mock-data';
import { BookMarked, Sun, Moon, BookOpen, ChevronLeft, ChevronRight, Globe, Share2, MessageSquarePlus, Trash2 } from 'lucide-react';
import { useFirebase } from '@/lib/FirebaseContext';
import { ReviewsComponent } from './ReviewsComponent';

interface DigitalReaderProps {
  selectedBook: Book;
}

export function DigitalReader({ selectedBook }: DigitalReaderProps) {
  const { annotations, addAnnotation, deleteAnnotation, myEntitlements } = useFirebase();
  const [theme, setTheme] = useState<'dark' | 'sepia' | 'light'>('dark');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [activeLang, setActiveLang] = useState<'en' | 'am'>('en');
  const [currentChIndex, setCurrentChIndex] = useState(0);
  const [note, setNote] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isEntitled = myEntitlements.includes(selectedBook.id);
  // Enforce entitlement only for chapters beyond the first one
  const canAccessChapter = isEntitled || currentChIndex === 0;

  const chapters = selectedBook.chapters.length > 0 ? selectedBook.chapters : [
    {
      id: '1',
      title: 'Chapter 1: Introduction to the Journey',
      amharicTitle: 'ምዕራፍ 1፡ መግቢያ',
      content: selectedBook.description,
      amharicContent: selectedBook.amharicDescription,
      wordCount: 1500,
      audioDuration: '10:00'
    }
  ];

  const currentCh = chapters[currentChIndex] || chapters[0];

  const handleAnnotate = async () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !selection.toString().trim()) return;

    const text = selection.toString().trim();
    if (!note.trim()) return;

    await addAnnotation({
      bookId: selectedBook.id,
      chapterId: currentCh.id,
      highlightedText: text,
      note: note
    });
    setNote('');
    selection.removeAllRanges();
  };

  const shareChapter = () => {
    const shareUrl = `${window.location.origin}/reader/${selectedBook.id}/chapter/${currentCh.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => alert(`Link copied to clipboard!\n${shareUrl}`));
  };

  const themeClasses = {
    dark: 'bg-slate-950 text-slate-100 border-slate-800',
    sepia: 'bg-[#fbf0d9] text-[#5f4b32] border-[#e2d1b5]',
    light: 'bg-white text-slate-900 border-slate-200'
  };

  const fontClasses = {
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const chapterAnnotations = annotations.filter(a => a.chapterId === currentCh.id);

  return (
    <div className="space-y-6">
      {/* Reader Controls Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <BookMarked className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-sm font-bold text-white">{selectedBook.title}</div>
            <div className="text-xs text-slate-400">Author: {selectedBook.author}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Share Chapter Button */}
          <button
            onClick={shareChapter}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          
          {/* Annotation Controls */}
          <div className="flex items-center space-x-1">
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Highlight text then add note..."
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none w-48"
            />
            <button
              onClick={handleAnnotate}
              className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
              title="Add Annotation"
            >
              <MessageSquarePlus className="w-4 h-4" />
            </button>
          </div>

          {/* Language Switch */}
          <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setActiveLang('en')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeLang === 'en' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400'}`}
            >
              English
            </button>
            <button
              onClick={() => setActiveLang('am')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeLang === 'am' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400'}`}
            >
              አማርኛ
            </button>
          </div>

          {/* Theme Switch */}
          <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-md text-xs ${theme === 'dark' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded-md text-xs ${theme === 'sepia' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              title="Sepia Mode"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-md text-xs ${theme === 'light' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Size */}
          <select
            value={fontSize}
            onChange={(e: any) => setFontSize(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-300 focus:outline-none"
          >
            <option value="sm">Small Font</option>
            <option value="base">Normal Font</option>
            <option value="lg">Large Font</option>
            <option value="xl">XL Font</option>
          </select>
        </div>
      </div>

      {/* Reader Main View */}
      <div className={`border rounded-3xl p-8 sm:p-12 shadow-2xl transition-all max-w-4xl mx-auto ${themeClasses[theme]}`}>
        <div className="border-b pb-6 mb-8 border-current/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
              {activeLang === 'en' ? currentCh.title : currentCh.amharicTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              {activeLang === 'en' ? selectedBook.title : selectedBook.amharicTitle}
            </h1>
          </div>
          <span className="text-xs px-3 py-1 rounded-full border border-current/30 font-medium">
            Chapter {currentChIndex + 1} of {chapters.length}
          </span>
        </div>

        <div className={`leading-relaxed space-y-6 font-sans ${fontClasses[fontSize]}`}>
          {canAccessChapter ? (
            <p className="whitespace-pre-line">
              {activeLang === 'en' ? (currentCh.content || selectedBook.description) : (currentCh.amharicContent || selectedBook.amharicDescription)}
            </p>
          ) : (
            <div className="p-8 bg-slate-900 border border-amber-500/30 rounded-xl text-center">
              <p className="text-slate-300">You need to purchase this book to read further chapters.</p>
            </div>
          )}
        </div>

        {/* Annotations Section */}
        {chapterAnnotations.length > 0 && (
          <div className="mt-12 pt-8 border-t border-current/20 space-y-4">
            <h3 className="text-sm font-bold text-amber-400">Your Annotations for this Chapter</h3>
            <div className="space-y-3">
              {chapterAnnotations.map(ann => (
                <div key={ann.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400 italic mb-1">&quot;{ann.highlightedText}&quot;</p>
                    <p className="text-sm text-white font-medium">{ann.note}</p>
                  </div>
                  <button onClick={() => deleteAnnotation(ann.id)} className="text-slate-600 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12 pt-8 border-t border-current/20">
          <ReviewsComponent bookId={selectedBook.id} />
        </div>

        <div className="border-t pt-8 mt-12 border-current/20 flex items-center justify-between">
          <button
            onClick={() => setCurrentChIndex(Math.max(0, currentChIndex - 1))}
            disabled={currentChIndex === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-current/30 text-xs font-bold disabled:opacity-40 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>
          
          <button
            onClick={() => setCurrentChIndex(Math.min(chapters.length - 1, currentChIndex + 1))}
            disabled={currentChIndex === chapters.length - 1}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-40 transition-all"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
