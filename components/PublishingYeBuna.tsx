'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/mock-data';
import { ShieldCheck, CheckCircle2, Download, ExternalLink, Globe } from 'lucide-react';

interface PublishingYeBunaProps {
  selectedBook: Book;
}

export function PublishingYeBuna({ selectedBook }: PublishingYeBunaProps) {
  const [isExported, setIsExported] = useState(false);

  const checklist = [
    { label: 'Complete manuscript & word count verification', checked: true },
    { label: 'Appropriate chapter length & no filler', checked: true },
    { label: 'Amharic editorial QA & normalization checked', checked: true },
    { label: 'Fact check claims & sources verified', checked: true },
    { label: 'Cover studio image & thumbnails generated', checked: true },
    { label: 'PDF & EPUB digital files compiled', checked: true },
    { label: 'Audiobook narration files generated', checked: true },
    { label: 'Pricing configured in ETB and USD', checked: true },
    { label: 'Founder Girma Haile Bunaro approval', checked: true }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Ye-Buna Digitals Publishing Connector</h1>
          <p className="text-xs text-slate-400">Publish your flagship books directly to <a href="https://ye-buna.com/girmaic" target="_blank" rel="noreferrer" className="text-amber-400 underline">ye-buna.com/girmaic</a>.</p>
        </div>
        <a
          href="https://ye-buna.com/girmaic"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
        >
          <span>Visit Ye-Buna Profile</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quality Gate Checklist */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Publication Quality Gate Checklist</h3>
          <div className="space-y-2.5">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-200 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Publishing Package Export */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Ye-Buna Ready Publishing Package</h3>
            
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div><strong className="text-slate-400">Title:</strong> <span className="text-white font-semibold">{selectedBook.title}</span></div>
              <div><strong className="text-slate-400">አማርኛ ርዕስ:</strong> <span className="text-amber-300 font-semibold">{selectedBook.amharicTitle}</span></div>
              <div><strong className="text-slate-400">Author:</strong> <span className="text-white">{selectedBook.author} ({selectedBook.organization})</span></div>
              <div><strong className="text-slate-400">Price:</strong> <span className="text-amber-400 font-bold">{selectedBook.priceETB} ETB (${selectedBook.priceUSD})</span></div>
              <div><strong className="text-slate-400">Formats:</strong> <span className="text-white">PDF, EPUB, Audiobook, Interactive Reader</span></div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Exporting bundles all metadata, covers, encrypted files, and pricing configuration into a verified package ready for upload to Ye-Buna Digitals.
            </p>
          </div>

          <button
            onClick={() => {
              setIsExported(true);
              setTimeout(() => setIsExported(false), 4000);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExported ? 'Package Exported Successfully!' : 'Export Ye-Buna Publishing Package'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
