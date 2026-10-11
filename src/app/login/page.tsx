'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, Car } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userEmail', data.userEmail || email);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        alert(`Xush kelibsiz, ${data.userName}!`);
        window.location.href = '/profile';
      } else {
        alert(data.error || "Email yoki parol noto'g'ri!");
      }
    } catch (err) {
      alert("Server bilan aloqa o'rnatib bo'lmadi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center mx-auto mb-3">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Tizimga Kirish</h1>
          <p className="text-xs text-slate-400">Shaxsiy kabinetingizga kirish uchun ma&apos;lumotlarni kiriting</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email manzil</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@example.com"
                className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Parol</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-accent-600 hover:from-red-500 hover:to-accent-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Tekshirilmoqda...</span>
              </>
            ) : (
              <>
                <span>Kirish</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-700/60 text-xs text-slate-400">
          Hisobingiz yo&apos;qmi?{' '}
          <Link href="/register" className="text-brand-400 hover:text-brand-300 font-bold ml-1">
            Ro&apos;yxatdan o&apos;tish
          </Link>
        </div>
      </div>
    </div>
  );
}
