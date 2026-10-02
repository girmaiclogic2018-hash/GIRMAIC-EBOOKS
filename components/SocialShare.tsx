'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Book } from '@/lib/FirebaseContext';
import { Share2 } from 'lucide-react';

interface SocialShareProps {
  book: Book;
}

export function SocialShare({ book }: SocialShareProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      // Generate image from the card div
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f172a', // slate-900
        scale: 2, // Higher quality
      });

      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], `${book.id}-share.png`, { type: 'image/png' });

        // Use Web Share API if available
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: book.title,
            text: `Check out this great book: ${book.title}`,
            files: [file],
          });
        } else {
          // Fallback: download the image
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${book.title}-share.png`;
          link.click();
        }
      });
    } catch (error) {
      console.error('Error generating share card:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* The invisible card template for rendering */}
      <div 
        ref={cardRef}
        className="absolute -left-[9999px] w-[800px] h-[400px] bg-slate-900 p-8 flex flex-col justify-between border-4 border-amber-500 rounded-3xl"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-white">{book.title}</h1>
          <p className="text-xl text-amber-300 font-medium">{book.author}</p>
          <p className="text-lg text-slate-300 line-clamp-3">{book.description}</p>
        </div>
        <div className="text-amber-500 font-bold text-xl">Girmaic AI Studio</div>
      </div>

      <button
        onClick={handleShare}
        className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-amber-300 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
      >
        <Share2 className="w-4 h-4" />
        <span>Share Book</span>
      </button>
    </div>
  );
}
