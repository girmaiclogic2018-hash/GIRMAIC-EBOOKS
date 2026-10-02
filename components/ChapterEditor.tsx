'use client';

import React, { useState } from 'react';
import { Book, Chapter } from '@/lib/mock-data';
import { 
  Sparkles, 
  Save, 
  RefreshCw, 
  Globe, 
  FileText, 
  Plus, 
  Check, 
  BookOpen,
  Volume2
} from 'lucide-react';

interface ChapterEditorProps {
  selectedBook: Book;
  onUpdateBook: (updatedBook: Book) => void;
  setActiveTab: (tab: string) => void;
}

export function ChapterEditor({ selectedBook, onUpdateBook, setActiveTab }: ChapterEditorProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const currentChapter: Chapter = selectedBook.chapters[activeChapterIndex] || {
    id: 'ch-new',
    title: 'New Chapter',
    amharicTitle: 'አዲስ ምዕራፍ',
    content: 'Start writing your chapter here or use the AI Writing Engine...',
    amharicContent: 'ምዕራፍዎን እዚህ ይጻፉ ወይም በ AI ጸሐፊ እርዳታ ያዘጋጁ...',
    wordCount: 0,
    audioDuration: '5:00'
  };

  const [title, setTitle] = useState(currentChapter.title);
  const [content, setContent] = useState(currentChapter.content);
  const [amharicContent, setAmharicContent] = useState(currentChapter.amharicContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = () => {
    const updatedChapters = [...selectedBook.chapters];
    if (updatedChapters[activeChapterIndex]) {
      updatedChapters[activeChapterIndex] = {
        ...currentChapter,
        title,
        content,
        amharicContent,
        wordCount: content.split(/\s+/).length
      };
    } else {
      updatedChapters.push({
        id: `ch-${Date.now()}`,
        title,
        amharicTitle: 'አዲስ ምዕራፍ',
        content,
        amharicContent,
        wordCount: content.split(/\s+/).length,
        audioDuration: '10:00'
      });
    }

    onUpdateBook({
      ...selectedBook,
      chapters: updatedChapters,
      words: updatedChapters.reduce((acc, c) => acc + c.wordCount, 0)
    });

    setSuccessMessage('Chapter saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAIGenerate = async (actionType: string) => {
    if (!aiPrompt && actionType === 'custom') return;
    setIsGenerating(true);
    setSuccessMessage('');

    let promptText = '';
    let systemInstruction = 'You are a professional book author and editor working for Girmaic AI Technology & Innovation Center under founder Girma Haile Bunaro.';

    if (actionType === 'expand') {
      promptText = `Expand the following book chapter content with deep insights, practical frameworks, and engaging examples:\n\n${content}`;
    } else if (actionType === 'amharic') {
      promptText = `Translate and culturally adapt the following chapter content into natural, professional Amharic suitable for Ethiopian readers:\n\n${content}`;
    } else if (actionType === 'edit') {
      promptText = `Perform a rigorous developmental edit on this chapter to eliminate filler, improve flow, and strengthen the core argument:\n\n${content}`;
    } else {
      promptText = `${aiPrompt}\n\nContext Book: ${selectedBook.title} - ${selectedBook.subtitle}`;
    }

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, systemInstruction })
      });
      const data = await res.json();
      if (data.text) {
        if (actionType === 'amharic') {
          setAmharicContent(data.text);
        } else {
          setContent(data.text);
        }
        setSuccessMessage('AI Generation completed successfully!');
      } else {
        alert(data.error || 'Generation failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to AI server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Active Book: {selectedBook.title}</span>
          </div>
          <h1 className="text-2xl font-bold text-white">AI Chapter Editor & Writing Engine</h1>
        </div>

        <div className="flex items-center space-x-3">
          {successMessage && (
            <div className="flex items-center space-x-1.5 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              <Check className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Chapter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chapters Sidebar */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Book Chapters</h3>
            <button
              onClick={() => {
                const newCh: Chapter = {
                  id: `ch-${Date.now()}`,
                  title: `Chapter ${selectedBook.chapters.length + 1}: New Topic`,
                  amharicTitle: `ምዕራፍ ${selectedBook.chapters.length + 1}`,
                  content: 'Write chapter content here...',
                  amharicContent: 'የምዕራፉን ይዘት እዚህ ይጻፉ...',
                  wordCount: 0,
                  audioDuration: '8:00'
                };
                onUpdateBook({
                  ...selectedBook,
                  chapters: [...selectedBook.chapters, newCh]
                });
                setActiveChapterIndex(selectedBook.chapters.length);
              }}
              className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {selectedBook.chapters.map((ch, idx) => (
              <button
                key={ch.id || idx}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  setTitle(ch.title);
                  setContent(ch.content);
                  setAmharicContent(ch.amharicContent);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeChapterIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="truncate font-medium">{ch.title}</div>
                <div className="text-[10px] opacity-80 truncate">{ch.wordCount || 0} words</div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Main Area */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 lg:col-span-3">
          {/* AI Assistance Toolbar */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Girmaic AI Writing Assistant</span>
              </span>
              {isGenerating && <span className="text-xs text-amber-400 animate-pulse">Generating with Gemini AI...</span>}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAIGenerate('expand')}
                disabled={isGenerating}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded-lg font-medium transition-all"
              >
                ✨ Expand & Deepen Chapter
              </button>
              <button
                onClick={() => handleAIGenerate('edit')}
                disabled={isGenerating}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded-lg font-medium transition-all"
              >
                📝 Developmental Edit
              </button>
              <button
                onClick={() => handleAIGenerate('amharic')}
                disabled={isGenerating}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded-lg font-medium transition-all"
              >
                🇪🇹 Translate & Adapt to Amharic
              </button>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask AI to write a specific section, exercise, or framework..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleAIGenerate('custom')}
                disabled={isGenerating}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Chapter Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Chapter Title (English)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-semibold"
            />
          </div>

          {/* English Content Editor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400">Chapter Content (English)</label>
              <span className="text-[10px] text-slate-500">{content.split(/\s+/).length} words</span>
            </div>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
            />
          </div>

          {/* Amharic Content Editor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-amber-400">አማርኛ እትም (Amharic Edition & QA)</label>
              <span className="text-[10px] text-slate-500">{amharicContent.split(/\s+/).length} words</span>
            </div>
            <textarea
              rows={10}
              value={amharicContent}
              onChange={(e) => setAmharicContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
