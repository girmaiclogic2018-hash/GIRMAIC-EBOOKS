'use client';

import React from 'react';
import { useFirebase, Book } from '@/lib/FirebaseContext';
import { BookOpen, ShoppingBag, CheckCircle2, Play, ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface MyLibraryProps {
  setActiveTab: (tab: string) => void;
  onSelectBook: (book: Book) => void;
}

export function MyLibrary({ setActiveTab, onSelectBook }: MyLibraryProps) {
  const { user, userProfile, books, myEntitlements, orders, readingProgress, audioProgress } = useFirebase();

  const ownedBooks = books.filter(b => myEntitlements.includes(b.id) || userProfile?.role === 'FOUNDER' || userProfile?.role === 'ADMIN');

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Library & Purchased Editions</h1>
          <p className="text-xs text-slate-400">
            {user ? `Signed in as ${user.email} (${userProfile?.role || 'CUSTOMER'})` : 'Sign in to view your purchased books and reading progress.'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('store')}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Ye-Buna Store</span>
          </button>
        </div>
      </div>

      {!user && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl text-center space-y-3">
          <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Authentication Required</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Please sign in with Google or your email account to view your synchronized library entitlements and reading progress.
          </p>
        </div>
      )}

      {/* Owned Books Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Your Bookshelf ({ownedBooks.length} Available)</span>
        </h2>

        {ownedBooks.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <p className="text-sm text-slate-400">Your library is currently empty. Purchase books from the Ye-Buna Marketplace to unlock instant access.</p>
            <button
              onClick={() => setActiveTab('store')}
              className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
            >
              Explore Marketplace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedBooks.map(book => {
              const readProg = readingProgress[book.id] || 0;
              const audProg = audioProgress[book.id] || 0;

              return (
                <div key={book.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-amber-500/50 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full font-medium">
                        {book.category}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
                        Owned / Unlocked
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{book.title}</h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">{book.subtitle}</p>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-2 pt-2">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Reading Progress</span>
                          <span className="text-amber-400 font-semibold">{readProg}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${readProg}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Audiobook Listened</span>
                          <span className="text-amber-400 font-semibold">{Math.floor(audProg / 60)} mins</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${Math.min(100, (audProg / 1800) * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800 flex space-x-2">
                    <button
                      onClick={() => {
                        onSelectBook(book);
                        setActiveTab('reader');
                      }}
                      className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read E-Book</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectBook(book);
                        setActiveTab('audiobook');
                      }}
                      className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Audiobook</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Purchase History Section */}
      <div className="space-y-6 pt-6">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <ShoppingBag className="w-5 h-5 text-amber-400" />
          <span>Purchase History & Orders ({orders.length})</span>
        </h2>

        {orders.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-slate-400 text-xs">
            No purchase orders recorded yet in Firestore for this account.
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Book ID</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Provider</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-800/50">
                      <td className="p-4 font-mono text-amber-400">{order.id.slice(0, 10)}...</td>
                      <td className="p-4 font-mono">{order.bookId}</td>
                      <td className="p-4 font-bold text-white">{order.amount} {order.currency}</td>
                      <td className="p-4"><span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">{order.status}</span></td>
                      <td className="p-4 text-slate-400">{order.paymentProvider}</td>
                      <td className="p-4 text-slate-400">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
