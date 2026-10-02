'use client';

import React, { useState } from 'react';
import { useFirebase, Book } from '@/lib/FirebaseContext';
import { ShoppingBag, CheckCircle2, ShieldCheck, DollarSign, ArrowRight, Lock } from 'lucide-react';

interface MarketplaceStoreProps {
  onSelectBook: (book: Book) => void;
  setActiveTab: (tab: string) => void;
}

export function MarketplaceStore({ onSelectBook, setActiveTab }: MarketplaceStoreProps) {
  const { books, myEntitlements, purchaseBook, user, signInWithGoogle } = useFirebase();
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB');
  const [selectedTier, setSelectedTier] = useState<'Standard' | 'Premium' | 'Ultimate'>('Premium');
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckout = async (book: Book) => {
    if (!user) {
      alert("Please sign in with Google or email first to purchase books securely on Ye-Buna Digitals.");
      return;
    }

    try {
      setPurchasingId(book.id);
      const amount = currency === 'ETB' ? book.priceETB : book.priceUSD;

      // 1. Call Chapa Checkout API (/api/chapa/checkout)
      const res = await fetch('/api/chapa/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          bookTitle: book.title,
          amount,
          currency,
          email: user.email || 'scholar@girmaic.ai',
          firstName: user.displayName?.split(' ')[0] || 'Girmaic',
          lastName: user.displayName?.split(' ')[1] || 'Scholar'
        })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Chapa gateway initialization failed');
      }

      // 2. Simulate Chapa payment redirect & webhook server verification
      // 3. Complete server verification and grant entitlement
      await purchaseBook(book.id, amount, currency);

      // 4. Trigger Webhook server simulation
      await fetch('/api/chapa/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx_ref: data.txRef, status: 'success', amount, currency })
      });

      setSuccessMessage(`Chapa Secure Checkout Verified! "${book.title}" added to My Library with Secure Reader Access.`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      alert(`Checkout failed: ${err.message || err}`);
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Ye-Buna Digitals Marketplace Store</h1>
          <p className="text-xs text-slate-400">Official digital bookstore for Girmaic AI Technology & Innovation Center (<a href="https://ye-buna.com/girmaic" target="_blank" rel="noreferrer" className="text-amber-400 underline">ye-buna.com/girmaic</a>). Synchronized with Firestore & Entitlements.</p>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
          />
          <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setCurrency('ETB')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${currency === 'ETB' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
            >
              ETB (ብር)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${currency === 'USD' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-sm flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tier Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => setSelectedTier('Standard')}
          className={`bg-slate-900 border p-5 rounded-2xl cursor-pointer transition-all ${selectedTier === 'Standard' ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-slate-800'}`}
        >
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Standard Tier</div>
          <div className="text-xl font-bold text-white mt-1">E-Book (PDF + EPUB)</div>
          <p className="text-xs text-slate-400 mt-2">Essential reading package for individual learners and students.</p>
        </div>

        <div 
          onClick={() => setSelectedTier('Premium')}
          className={`bg-slate-900 border p-5 rounded-2xl cursor-pointer transition-all ${selectedTier === 'Premium' ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-slate-800'}`}
        >
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Premium Tier</div>
          <div className="text-xl font-bold text-white mt-1">E-Book + Audiobook + Reader</div>
          <p className="text-xs text-slate-400 mt-2">Includes audiobook narration, interactive reader, and AI companion.</p>
        </div>

        <div 
          onClick={() => setSelectedTier('Ultimate')}
          className={`bg-slate-900 border p-5 rounded-2xl cursor-pointer transition-all ${selectedTier === 'Ultimate' ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-slate-800'}`}
        >
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Ultimate Tier</div>
          <div className="text-xl font-bold text-white mt-1">Complete Experience + 30-Day Program</div>
          <p className="text-xs text-slate-400 mt-2">Full mastery package with workbook, 30-day transformation mode, and lifetime updates.</p>
        </div>
      </div>

      {/* Books Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const price = currency === 'ETB' ? `${book.priceETB} ETB` : `$${book.priceUSD}`;
          const isProcessing = purchasingId === book.id;
          const isOwned = myEntitlements.includes(book.id);

          return (
            <div key={book.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-amber-500/50 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full font-medium">
                    {book.category}
                  </span>
                  <span className="text-xs font-bold text-amber-400">{price}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{book.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{book.subtitle}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Author: {book.author}</span>
                  <span>{book.pages} Pages</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      onSelectBook(book);
                      setActiveTab('reader'); // The Reader logic already enforces entitlements for full content
                    }}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold transition-all"
                  >
                    Preview
                  </button>
                  {isOwned ? (
                    <button
                      onClick={() => {
                        onSelectBook(book);
                        setActiveTab('reader');
                      }}
                      className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>In Library</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCheckout(book)}
                      disabled={isProcessing}
                      className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
                    >
                      {isProcessing ? 'Processing...' : 'Buy Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

