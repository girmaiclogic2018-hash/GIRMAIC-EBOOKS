'use client';

import React, { useState } from 'react';
import { useFirebase } from '@/lib/FirebaseContext';
import { Mail, Lock, User, LogIn, Sparkles, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'reset';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { signInWithGoogle, signUpWithEmail, loginWithEmail, resetPassword } = useFirebase();
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        setSuccess('Successfully logged in!');
        setTimeout(() => { onClose(); setLoading(false); }, 1000);
      } else if (mode === 'signup') {
        if (!name.trim()) throw new Error('Full name is required.');
        await signUpWithEmail(email, password, name);
        setSuccess('Account created successfully!');
        setTimeout(() => { onClose(); setLoading(false); }, 1000);
      } else if (mode === 'reset') {
        if (!email.trim()) throw new Error('Email is required for password reset.');
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error occurred.');
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' && 'Sign In to Girmaic AI'}
            {mode === 'signup' && 'Create Your Account'}
            {mode === 'reset' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Access your digital library, reader progress, and purchases.'}
            {mode === 'signup' && 'Join Ye-Buna Digitals and start exploring world-class e-books.'}
            {mode === 'reset' && 'Enter your email address and we will send you a reset link.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Girma Haile"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode('reset')}
                className="text-xs text-amber-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>
              {loading && 'Please wait...'}
              {!loading && mode === 'login' && 'Sign In'}
              {!loading && mode === 'signup' && 'Create Account'}
              {!loading && mode === 'reset' && 'Send Reset Link'}
            </span>
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-500">OR</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all border border-slate-700 flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.3C.6 9.3 0 11.6 0 14s.6 4.7 1.6 6.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="text-center text-xs text-slate-400">
          {mode === 'login' && (
            <p>
              Don&apos;t have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-amber-400 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          )}
          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-amber-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          )}
          {mode === 'reset' && (
            <p>
              Remembered your password?{' '}
              <button onClick={() => setMode('login')} className="text-amber-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
