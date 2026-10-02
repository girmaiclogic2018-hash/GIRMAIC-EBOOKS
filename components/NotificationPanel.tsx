'use client';

import React, { useState } from 'react';
import { useFirebase } from '@/lib/FirebaseContext';
import { Bell, BookOpen, Mic, ShoppingBag, X, Check } from 'lucide-react';

export function NotificationPanel() {
  const { notifications, markNotificationAsRead } = useFirebase();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-amber-400 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Notifications</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4"/></button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No notifications yet.</div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`p-4 border-b border-slate-800 space-y-1 ${n.read ? 'bg-slate-950/50' : 'bg-slate-900'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{n.type}</span>
                    {!n.read && <button onClick={() => markNotificationAsRead(n.id)} className="text-emerald-500"><Check className="w-3 h-3"/></button>}
                  </div>
                  <h4 className="text-sm font-semibold text-white">{n.title}</h4>
                  <p className="text-xs text-slate-400">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
