'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        alert("Xabaringiz qabul qilindi! Tez orada bog'lanamiz. ✅");
      } else {
        alert("Xatolik: " + (data.error || "Xabarni yuborib bo'lmadi"));
      }
    } catch (err) {
      alert("Server bilan aloqa o'rnatib bo'lmadi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-accent-500 font-bold uppercase tracking-wider text-xs">
          Biz bilan aloqa
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Savollaringiz bormi?
        </h1>
        <p className="text-slate-400 text-sm">
          Mutaxassislarimiz har qanday savolingizga javob berishga va eng maqbul mashinani tanlashga yordam berishga tayyor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Kontakt ma'lumotlar */}
        <div className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-3xl space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Bog&apos;lanish ma&apos;lumotlari</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sizga qulay usulda biz bilan bog&apos;laning. Markaziy ofisimiz har kuni 09:00 dan 21:00 gacha faoliyat yuritadi.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Manzil</h4>
                  <p className="text-slate-400">Xorazm viloyati, Shovot tumani, Markaziy ko&apos;cha</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Telefon</h4>
                  <a href="tel:+998505719163" className="text-slate-400 hover:text-white">+998 50 571 91 63</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Elektron pochta</h4>
                  <a href="mailto:info@avtorental.uz" className="text-slate-400 hover:text-white">info@avtorental.uz</a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-between">
            <span className="text-xs text-slate-300">Tezkor konsultatsiya (Telegram):</span>
            <a
              href="https://t.me/zohid_box1ng"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@zohid_box1ng</span>
            </a>
          </div>
        </div>

        {/* Xabar yuborish formasi */}
        <div className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6">Xabar qoldirish</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">To&apos;liq ismingiz</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email manzilingiz</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@example.com"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Telefon raqamingiz</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Xabaringiz</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Savolingiz yoki fikringizni yozing..."
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Yuborish</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
