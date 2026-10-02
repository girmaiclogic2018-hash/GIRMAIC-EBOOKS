'use client';

import React from 'react';
import { useFirebase, Book } from '@/lib/FirebaseContext';
import { 
  BookOpen, 
  Sparkles, 
  Globe, 
  ShoppingBag, 
  ShieldCheck, 
  Mic, 
  TrendingUp, 
  Award, 
  CheckCircle2,
  ArrowRight,
  DollarSign
} from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
  onSelectBook: (book: any) => void;
}

export function HomeDashboard({ setActiveTab, onSelectBook }: HomeDashboardProps) {
  const { books } = useFirebase();

  const [searchTerm, setSearchTerm] = React.useState('');
  const publishedCount = books.filter(b => b.status === 'Published').length;
  const totalWords = books.reduce((acc, b) => acc + (b.words || 0), 0);
  const totalPages = books.reduce((acc, b) => acc + (b.pages || 0), 0);
  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 border border-amber-500/30 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Girmaic AI Technology & Innovation Center (Firestore Synchronized)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Girmaic AI Global <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">E-Book Studio</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founder & Author: <strong className="text-amber-400 font-semibold">Girma Haile Bunaro</strong>. Transform valuable ideas into high-quality books and audiobooks that educate, inspire, and empower readers globally and across Ethiopia via <a href="https://ye-buna.com/girmaic" target="_blank" rel="noreferrer" className="text-amber-300 underline font-medium">Ye-Buna Digitals</a>.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('studio')}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Book Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 px-6 py-3 rounded-xl font-semibold transition-all text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ye-Buna Storefront</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Flagship Catalog</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{books.length} Books</div>
          <div className="text-xs text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{publishedCount} Published Editions</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Manuscript Volume</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{totalPages.toLocaleString()} Pages</div>
          <div className="text-xs text-slate-400">{totalWords.toLocaleString()} total words</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Bilingual Support</span>
            <Globe className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">English / አማርኛ</div>
          <div className="text-xs text-amber-300">Amharic Normalization QA Active</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Primary Marketplace</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white truncate">Ye-Buna Digitals</div>
          <div className="text-xs text-amber-400 hover:underline">
            <a href="https://ye-buna.com/girmaic" target="_blank" rel="noreferrer">ye-buna.com/girmaic</a>
          </div>
        </div>
      </div>

      {/* Flagship Books Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">The Flagship E-Books (Firestore Live)</h2>
            <p className="text-xs sm:text-sm text-slate-400">Authored & Supervised by Girma Haile Bunaro</p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white"
            />
            <button
              onClick={() => setActiveTab('studio')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
            >
              <span>View All in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.slice(0, 6).map((book) => (
            <div 
              key={book.id}
              onClick={() => {
                onSelectBook(book);
                setActiveTab('studio');
              }}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full font-medium">
                    {book.category}
                  </span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                    book.status === 'Published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {book.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{book.subtitle}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Launch Price</div>
                  <div className="text-sm font-bold text-amber-400">{book.priceETB} ETB <span className="text-xs text-slate-400 font-normal">(${book.priceUSD})</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">{book.pages} Pages</div>
                  <div className="text-xs text-amber-300 font-medium flex items-center space-x-1">
                    <span>Open Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

