'use client';

import React, { useState } from 'react';
import { useFirebase } from '@/lib/FirebaseContext';
import { Star } from 'lucide-react';

export function ReviewsComponent({ bookId }: { bookId: string }) {
  const { reviews, addReview, user } = useFirebase();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const bookReviews = reviews.filter(r => r.bookId === bookId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await addReview({ bookId, rating, text });
      setText('');
      setRating(5);
    } catch (err) {
      alert("Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg text-white">Reviews</h3>
      
      {user && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(r => (
              <Star 
                key={r} 
                className={`w-5 h-5 cursor-pointer ${r <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                onClick={() => setRating(r)}
              />
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm text-white"
            placeholder="Write your review..."
            required
          />
          <button 
            type="submit" 
            disabled={submitting}
            className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {bookReviews.map(r => (
          <div key={r.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <div className="flex text-amber-400">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
              </div>
              <span className="text-xs text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-slate-300">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
