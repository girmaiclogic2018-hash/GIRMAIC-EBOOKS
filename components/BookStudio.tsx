'use client';

import React, { useState } from 'react';
import { Book, INITIAL_BOOKS } from '@/lib/mock-data';
import { SocialShare } from './SocialShare';
import { 
  BookOpen, 
  Sparkles, 
  Globe, 
  Mic, 
  BookMarked, 
  CheckCircle2, 
  Plus, 
  Search, 
  DollarSign, 
  FileText,
  Layers,
  User,
  Share2
} from 'lucide-react';

interface BookStudioProps {
  selectedBook: Book;
  onSelectBook: (book: Book) => void;
  setActiveTab: (tab: string) => void;
}

export function BookStudio({ selectedBook, onSelectBook, setActiveTab }: BookStudioProps) {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Self-Development & Mindset', 'Technology & Future', 'Digital Business & Wealth', 'Innovation & Leadership', 'Future of Work', 'Youth & Career'];

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.amharicTitle.includes(searchTerm);
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Book Studio & Catalog</h1>
          <p className="text-xs sm:text-sm text-slate-400">Manage manuscript architecture, bilingual translations, chapters, and publishing pipelines.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('editor')}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Book / Chapter</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search books in English or አማርኛ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-amber-500 text-slate-950 font-semibold' 
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBooks.map((book) => {
          const isSelected = selectedBook.id === book.id;
          return (
            <div
              key={book.id}
              className={`bg-slate-900/90 border rounded-2xl p-6 transition-all flex flex-col justify-between ${
                isSelected ? 'border-amber-500 shadow-xl shadow-amber-500/10' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full font-medium">
                      {book.category}
                    </span>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                      book.status === 'Published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {book.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Tier: <strong className="text-amber-400">{book.tier}</strong></span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{book.title}</h3>
                  <p className="text-xs text-amber-300 font-medium mt-0.5">{book.amharicTitle}</p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{book.subtitle}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Pages</div>
                    <div className="font-bold text-white">{book.pages}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Words</div>
                    <div className="font-bold text-white">{book.words.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Price</div>
                    <div className="font-bold text-amber-400">{book.priceETB} ETB</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setActiveTab('author-profile');
                    }}
                    className="flex items-center space-x-1.5 bg-slate-950 border border-amber-500/30 hover:bg-slate-800 text-amber-300 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Author Profile</span>
                  </button>
                  <SocialShare book={book} />
                </div>
                <button
                  onClick={() => {
                    onSelectBook(book);
                    setActiveTab('editor');
                  }}
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Editor ({book.chapters.length} Ch)</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => {
                      onSelectBook(book);
                      setActiveTab('translate');
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition-all"
                    title="Translate & Amharic QA"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectBook(book);
                      setActiveTab('voice');
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition-all"
                    title="Voice & TTS"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectBook(book);
                      setActiveTab('reader');
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition-all"
                    title="Digital Reader"
                  >
                    <BookMarked className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectBook(book);
                      setActiveTab('publishing');
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
