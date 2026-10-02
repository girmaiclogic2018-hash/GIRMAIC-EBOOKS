'use client';

import React, { useState } from 'react';
import { Book, INITIAL_BOOKS } from '@/lib/mock-data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomeDashboard } from '@/components/HomeDashboard';
import { BookStudio } from '@/components/BookStudio';
import { ChapterEditor } from '@/components/ChapterEditor';
import { TranslatorStudio } from '@/components/TranslatorStudio';
import { VoiceStudio } from '@/components/VoiceStudio';
import { AudiobookPlayer } from '@/components/AudiobookPlayer';
import { CoverStudio } from '@/components/CoverStudio';
import { DigitalReader } from '@/components/DigitalReader';
import { AskTheBook } from '@/components/AskTheBook';
import { PublishingYeBuna } from '@/components/PublishingYeBuna';
import { MarketplaceStore } from '@/components/MarketplaceStore';
import { RevenueAnalytics } from '@/components/RevenueAnalytics';
import { SettingsSecurity } from '@/components/SettingsSecurity';
import { MyLibrary } from '@/components/MyLibrary';
import { AuthorProfile } from '@/components/AuthorProfile';
import { useFirebase } from '@/lib/FirebaseContext';
import { ShieldAlert } from 'lucide-react';

const ProtectedFeature = ({ children, hasEntitlement, setActiveTab }: { children: React.ReactNode, hasEntitlement: boolean, setActiveTab: (tab: string) => void }) => (
  hasEntitlement ? children : (
    <div className="bg-slate-900 border border-amber-500/30 p-12 rounded-3xl text-center space-y-4">
      <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
      <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
      <p className="text-sm text-slate-400 max-w-sm mx-auto">
        You need to purchase this book to access this feature.
      </p>
      <button 
        onClick={() => setActiveTab('store')}
        className="px-6 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm"
      >
        Go to Marketplace
      </button>
    </div>
  )
);

export default function Page() {
  const { user, userProfile, myEntitlements } = useFirebase();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBook, setSelectedBook] = useState<Book>(INITIAL_BOOKS[0]);
  const [booksList, setBooksList] = useState<Book[]>(INITIAL_BOOKS);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('Girma Haile Bunaro');

  const handleUpdateBook = (updatedBook: Book) => {
    setSelectedBook(updatedBook);
    setBooksList(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
  };

  const isFounderOrAdmin = userProfile?.role === 'FOUNDER' || userProfile?.role === 'ADMIN' || user?.email === 'girmahb1979@gmail.com';
  const hasEntitlement = isFounderOrAdmin || myEntitlements.includes(selectedBook.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedBookTitle={selectedBook?.title} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'author-profile' && (
          <AuthorProfile 
            authorName={selectedAuthor}
            books={booksList}
            onSelectBook={setSelectedBook}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'home' && (
          <HomeDashboard 
            setActiveTab={setActiveTab} 
            onSelectBook={setSelectedBook} 
          />
        )}
        {activeTab === 'mylibrary' && (
          <MyLibrary 
            setActiveTab={setActiveTab} 
            onSelectBook={setSelectedBook} 
          />
        )}
        {activeTab === 'studio' && (
          <BookStudio 
            selectedBook={selectedBook} 
            onSelectBook={setSelectedBook} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'editor' && (
          <ChapterEditor 
            selectedBook={selectedBook} 
            onUpdateBook={handleUpdateBook} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'translate' && (
          <TranslatorStudio 
            selectedBook={selectedBook} 
          />
        )}
        {activeTab === 'voice' && (
          <VoiceStudio 
            selectedBook={selectedBook} 
          />
        )}
        {activeTab === 'audiobook' && (
          <ProtectedFeature hasEntitlement={hasEntitlement} setActiveTab={setActiveTab}>
            <AudiobookPlayer 
              selectedBook={selectedBook} 
            />
          </ProtectedFeature>
        )}
        {activeTab === 'cover' && (
          <CoverStudio 
            selectedBook={selectedBook} 
          />
        )}
        {activeTab === 'reader' && (
          <ProtectedFeature hasEntitlement={hasEntitlement} setActiveTab={setActiveTab}>
            <DigitalReader 
              selectedBook={selectedBook} 
            />
          </ProtectedFeature>
        )}
        {activeTab === 'companion' && (
          <ProtectedFeature hasEntitlement={hasEntitlement} setActiveTab={setActiveTab}>
            <AskTheBook 
              selectedBook={selectedBook} 
            />
          </ProtectedFeature>
        )}
        {activeTab === 'publishing' && (
          <PublishingYeBuna 
            selectedBook={selectedBook} 
          />
        )}
        {activeTab === 'store' && (
          <MarketplaceStore 
            onSelectBook={setSelectedBook} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'analytics' && (
          <RevenueAnalytics />
        )}
        {activeTab === 'settings' && (
          <SettingsSecurity />
        )}
      </main>

      <Footer />
    </div>
  );
}
