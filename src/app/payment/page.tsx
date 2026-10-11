'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreditCard, CheckCircle2, ShieldAlert, Send, ArrowLeft, Loader2 } from 'lucide-react';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const carName = searchParams.get('car') || "Noma'lum";
  const days = Number(searchParams.get('days')) || 1;
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const phone = searchParams.get('phone') || '';

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('Payme');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    if (!name) {
      alert("Iltimos, avval tizimga kiring!");
      router.push('/login');
      return;
    }
    setUserName(name);
    if (email) setUserEmail(email);
  }, [router]);

  const handlePay = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userEmail,
          userPhone: phone,
          carName,
          startDate,
          endDate,
          paymentMethod: `${paymentMethod} (Onlayn)`,
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Muvaffaqiyatli! ${carName} ijaraga olindi va bazaga saqlandi. ✅`);
        router.push('/profile');
      } else {
        alert("Xatolik: " + (data.error || "Buyurtma qabul qilinmadi"));
      }
    } catch (err) {
      console.error(err);
      alert("Server bilan aloqa o'rnatib bo'lmadi!");
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    { id: 'Payme', name: 'Payme', desc: "Karta orqali 0% komissiya", color: 'border-cyan-500' },
    { id: 'Click', name: 'Click Up', desc: "Click orqali tezkor to'lov", color: 'border-blue-500' },
    { id: 'Uzum', name: 'Uzum Bank', desc: "Uzum orqali to'lov", color: 'border-purple-500' },
    { id: 'Naqd', name: 'Ofisda naqd / Terminal', desc: "Mashinani olayotganda to'lash", color: 'border-emerald-500' },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-slate-800/90 border border-slate-700 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </button>

        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
            Xavfsiz To&apos;lov Tizimi
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ijara Buyurtmasini Tasdiqlash
          </h1>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/80 inline-block font-semibold text-brand-400 text-sm">
            Avtomobil: <span className="text-white">{carName}</span> ({days} kun)
          </div>
        </div>

        {/* To'lov usullari */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300">
            To&apos;lov usulini tanlang:
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {methods.map((m) => (
              <div
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === m.id
                    ? `${m.color} bg-slate-900/90 shadow-md`
                    : 'border-slate-700 bg-slate-900/40 hover:bg-slate-900/70'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{m.name}</h4>
                  <p className="text-xs text-slate-400">{m.desc}</p>
                </div>
                {paymentMethod === m.id && (
                  <CheckCircle2 className="w-5 h-5 text-brand-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* To'lov tugmasi */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-accent-600 hover:from-red-500 hover:to-accent-500 text-white font-extrabold text-base shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Bazaga saqlanmoqda...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>To&apos;lovni amalga oshirish</span>
            </>
          )}
        </button>

        {/* Telegram orqali menejer bilan */}
        <div className="text-center pt-2 border-t border-slate-700/60">
          <p className="text-xs text-slate-400 mb-3">Yoki menejer orqali rasmiylashtirish:</p>
          <a
            href="https://t.me/zohid_box1ng"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-brand-400 hover:text-brand-300 text-xs font-bold transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Telegram orqali bog&apos;lanish</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-400" />
        <span>Yuklanmoqda...</span>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
