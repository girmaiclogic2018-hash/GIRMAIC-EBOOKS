'use client';

import React from 'react';
import { BookOpen, Shield, Globe, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>Girmaic AI E-Book Studio</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transforming valuable ideas into high-quality books that educate, inspire, empower, and help people solve real problems across Ethiopia, Africa, and the globe.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-amber-400 tracking-wider mb-3">Founder & Organization</h4>
            <ul className="space-y-2 text-xs">
              <li><strong className="text-white">Founder & Author:</strong> Girma Haile Bunaro</li>
              <li><strong className="text-white">Center:</strong> Girmaic AI Technology & Innovation Center</li>
              <li><strong className="text-white">Primary Marketplace:</strong> <a href="https://ye-buna.com/girmaic" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">ye-buna.com/girmaic</a></li>
              <li><strong className="text-white">Mission:</strong> Create knowledge that improves human lives</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-amber-400 tracking-wider mb-3">Languages & Localization</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>English (Global Edition)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>አማርኛ (Ethiopian Edition)</span>
              </li>
              <li>Afaan Oromo, Tigrinya, Somali & More</li>
              <li>Amharic Pronunciation Normalization QA</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-amber-400 tracking-wider mb-3">Security & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Payment Workflows</span>
              </li>
              <li>Server-Side Gemini AI Secret Protection</li>
              <li>Secure Digital Delivery & DRM</li>
              <li>Zero Fake Reviews & Ethical AI Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>© {new Date().getFullYear()} Girmaic AI Technology & Innovation Center. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for global learners and Ethiopian readers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
