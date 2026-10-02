'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Mic, 
  Globe, 
  ShoppingBag, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  Layers, 
  BookMarked,
  Volume2,
  Cpu,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';
import { useFirebase } from '@/lib/FirebaseContext';
import { useI18n } from '@/lib/I18nContext';
import { AuthModal } from './AuthModal';
import { NotificationPanel } from './NotificationPanel';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedBookTitle?: string;
}

export function Navbar({ activeTab, setActiveTab, selectedBookTitle }: NavbarProps) {
  const { user, userProfile, logout } = useFirebase();
  const { lang, setLang, t } = useI18n();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const isFounderOrAdmin = userProfile?.role === 'FOUNDER' || userProfile?.role === 'ADMIN' || user?.email === 'girmahb1979@gmail.com';

  const customerTabs = [
    { id: 'home', label: t('dashboard'), icon: BarChart3 },
    { id: 'store', label: t('store'), icon: ShoppingBag },
    { id: 'mylibrary', label: t('library'), icon: BookOpen },
    { id: 'reader', label: t('reader'), icon: BookMarked },
    { id: 'audiobook', label: t('audiobook'), icon: Mic },
    { id: 'companion', label: t('companion'), icon: Cpu },
    { id: 'transformation', label: t('transformation'), icon: Sparkles },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const adminTabs = [
    { id: 'studio', label: 'Book Studio', icon: BookOpen },
    { id: 'editor', label: 'AI Editor', icon: Sparkles },
    { id: 'translate', label: 'Amharic Translate', icon: Globe },
    { id: 'voice', label: 'Voice & TTS', icon: Volume2 },
    { id: 'cover', label: 'Cover Studio', icon: Layers },
    { id: 'publishing', label: 'Ye-Buna Publish', icon: ShieldCheck },
    { id: 'analytics', label: 'Revenue Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Founder */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <BookOpen className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  GIRMAIC AI STUDIO
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-medium">
                  {isFounderOrAdmin ? '👑 Founder / Admin' : '👤 Customer Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-400 tracking-wider">
                Founder & Author: <span className="text-amber-400 font-medium">Girma Haile Bunaro</span>
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2 border-r border-slate-700 pr-3 mr-3">
            <button onClick={() => setLang('en')} className={`text-xs font-bold ${lang === 'en' ? 'text-amber-400' : 'text-slate-500'}`}>EN</button>
            <button onClick={() => setLang('am')} className={`text-xs font-bold ${lang === 'am' ? 'text-amber-400' : 'text-slate-500'}`}>አም</button>
          </div>

          {/* Quick Active Book Indicator */}
          {selectedBookTitle && (
            <div className="hidden lg:flex items-center space-x-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-300 truncate max-w-[200px]">Active: <strong className="text-amber-300">{selectedBookTitle}</strong></span>
            </div>
          )}

          {/* Quick Actions / Firebase Auth & Ye-Buna Link */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://ye-buna.com/girmaic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-all"
            >
              <span>ye-buna.com/girmaic</span>
            </a>

            {/* Notification Widget */}
            {user && <NotificationPanel />}

            {/* Firebase Auth User Widget */}
            {user ? (
              <div className="flex items-center space-x-2 bg-slate-900 border border-amber-500/30 px-3 py-1 rounded-lg">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-500/40">
                  {user.displayName?.[0] || user.email?.[0] || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-medium text-slate-200 truncate max-w-[120px]">{user.displayName || user.email}</div>
                  <div className="text-[9px] text-amber-400 font-bold tracking-wide uppercase">
                    {userProfile?.role || 'CUSTOMER'} {isFounderOrAdmin ? '👑' : '👤'}
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuth('login')}
                  className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold px-3 py-1.5 rounded-lg text-xs transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="flex items-center space-x-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-lg shadow-amber-500/20 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Bar (Role Separated: Customer vs Founder/Admin) */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2.5 border-t border-slate-800/80 scrollbar-none">
          {customerTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                    : 'text-slate-300 hover:bg-slate-900 hover:text-amber-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          {isFounderOrAdmin && (
            <>
              <div className="h-4 w-px bg-slate-800 mx-2"></div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-1">Admin Studio:</span>
              {adminTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                        : 'text-amber-300/80 hover:bg-slate-900 hover:text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </header>
  );
}
