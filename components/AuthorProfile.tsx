'use client';

import React from 'react';
import { Book } from '@/lib/mock-data';
import { Globe, Linkedin, Twitter, Mail } from 'lucide-react';

interface AuthorProfileProps {
  authorName: string;
  books: Book[];
  onSelectBook: (book: Book) => void;
  setActiveTab: (tab: string) => void;
}

export function AuthorProfile({ authorName, books, onSelectBook, setActiveTab }: AuthorProfileProps) {
  const authorBooks = books.filter(b => b.author === authorName);
  
  // Mock author data
  const authorBio = {
    name: authorName,
    bio: "Girma Haile Bunaro is a visionary leader, author, and technologist dedicated to empowering the next generation of African innovators. Through the Girmaic AI Technology & Innovation Center, he bridges the gap between advanced technology and practical application to drive societal transformation.",
    social: {
      website: "https://girmaic.com",
      linkedin: "https://linkedin.com/in/girma-haile-bunaro",
      twitter: "https://twitter.com/girmaic",
      email: "mailto:girma@girmaic.com"
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8">
      {/* Header / Bio */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-start">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-4xl font-bold text-slate-950 flex-shrink-0">
          {authorName.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">{authorBio.name}</h1>
          <p className="text-slate-400 leading-relaxed">{authorBio.bio}</p>
          <div className="flex space-x-4">
            <a href={authorBio.social.website} target="_blank" className="text-amber-400 hover:text-amber-300"><Globe className="w-5 h-5" /></a>
            <a href={authorBio.social.linkedin} target="_blank" className="text-amber-400 hover:text-amber-300"><Linkedin className="w-5 h-5" /></a>
            <a href={authorBio.social.twitter} target="_blank" className="text-amber-400 hover:text-amber-300"><Twitter className="w-5 h-5" /></a>
            <a href={authorBio.social.email} className="text-amber-400 hover:text-amber-300"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Books by {authorName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorBooks.map(book => (
            <div key={book.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/50 transition-all">
              <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded-xl" />
              <h3 className="font-bold text-white text-lg">{book.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{book.description}</p>
              <button 
                onClick={() => { onSelectBook(book); setActiveTab('reader'); }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-sm font-semibold transition-all"
              >
                View Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
