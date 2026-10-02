'use client';

import React, { useState } from 'react';
import { useFirebase } from '@/lib/FirebaseContext';
import { ShieldCheck, Settings, Award, Lock, Key, User, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export function SettingsSecurity() {
  const { user, userProfile, resetPassword, orders, myEntitlements, readingProgress, audioProgress } = useFirebase();
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async () => {
    if (!user?.email) {
      setError('No email address associated with current session.');
      return;
    }
    try {
      await resetPassword(user.email);
      setResetSent(true);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email.');
    }
  };

  const isFounderOrAdmin = userProfile?.role === 'FOUNDER' || userProfile?.role === 'ADMIN' || user?.email === 'girmahb1979@gmail.com';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Account Settings & Security</h1>
          <p className="text-xs text-slate-400">Manage your profile credentials, authentication, and role permissions.</p>
        </div>
        <div className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium border ${
          isFounderOrAdmin 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
            : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
        }`}>
          <Award className="w-4 h-4" />
          <span>Role: {userProfile?.role || 'CUSTOMER'} {isFounderOrAdmin ? '👑 (Founder/Admin Access)' : '👤 (Customer Access)'}</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {resetSent && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Password reset email sent successfully! Please check your inbox.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">User Account Profile</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center space-x-3">
              <User className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-slate-400 text-[10px]">Display Name</span>
                <div className="text-white font-bold text-sm">{user?.displayName || userProfile?.displayName || 'Girmaic Scholar'}</div>
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center space-x-3">
              <Mail className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-slate-400 text-[10px]">Email Address</span>
                <div className="text-white font-bold text-sm">{user?.email || userProfile?.email || 'Not signed in'}</div>
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px]">Account Access Level</span>
                <div className="text-amber-400 font-bold text-sm">{isFounderOrAdmin ? 'Founder / Full Admin Studio' : 'Customer / Reader Library'}</div>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-semibold uppercase">
                {isFounderOrAdmin ? 'Customer ≠ Founder Enforced' : 'Customer Mode'}
              </span>
            </div>
          </div>
        </div>

        {/* Security & Password Reset */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Security & Credentials</h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Password Management</span>
                <Key className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-[10px] text-slate-400">Request a secure password reset link sent directly to your registered email address.</p>
              <button
                onClick={handlePasswordReset}
                disabled={!user}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl font-bold text-xs transition-all disabled:opacity-50"
              >
                Send Password Reset Email
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Library & Purchases</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">{myEntitlements.length} Books Owned</span>
              </div>
              <p className="text-[10px] text-slate-400">{orders.length} orders recorded in Firestore.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

