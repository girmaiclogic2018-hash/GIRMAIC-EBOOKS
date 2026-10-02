'src/components/RevenueAnalytics.tsx'
'use client';

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShieldCheck, Users } from 'lucide-react';

export function RevenueAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue & Verified Sales Dashboard</h1>
          <p className="text-xs text-slate-400">Financial telemetry and verified transactions for Girma Haile Bunaro.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs text-emerald-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Payment Gateway: Ye-Buna Secure Verified</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs text-slate-400">Verified Gross Revenue</div>
          <div className="text-2xl font-bold text-white">184,500 ETB</div>
          <div className="text-xs text-emerald-400 font-medium">+24.8% this month</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs text-slate-400">International Sales</div>
          <div className="text-2xl font-bold text-white">$2,450 USD</div>
          <div className="text-xs text-emerald-400 font-medium">Global marketplace</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs text-slate-400">Total Units Sold</div>
          <div className="text-2xl font-bold text-white">412 Units</div>
          <div className="text-xs text-amber-300">Across 10 Flagship Books</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs text-slate-400">Active Readers</div>
          <div className="text-2xl font-bold text-white">1,850+</div>
          <div className="text-xs text-amber-300">Ethiopia & Global</div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
        <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Top Performing Flagship Books</h3>
        <div className="space-y-3">
          {[
            { title: 'The Human Reset', units: 98, revenue: '45,080 ETB', status: 'Verified' },
            { title: 'The AI Life Revolution', units: 84, revenue: '41,916 ETB', status: 'Verified' },
            { title: 'From Zero to Digital Income', units: 76, revenue: '37,924 ETB', status: 'Verified' },
            { title: 'The Youth Opportunity Blueprint', units: 62, revenue: '27,838 ETB', status: 'Verified' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="font-bold text-white text-sm">{item.title}</div>
                <div className="text-slate-400 mt-0.5">{item.units} units sold</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-400 text-sm">{item.revenue}</div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
