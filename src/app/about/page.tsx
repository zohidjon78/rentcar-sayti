import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Users2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      {/* Sarlavha */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-accent-500 font-bold uppercase tracking-wider text-xs">
          Kompaniyamiz tarixi va maqsadi
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Biz Haqimizda — AvtoRental.uz
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Biz O&apos;zbekistonda zamonaviy, shaffof va yuqori darajadagi avtomobil ijarasi madaniyatini yaratish maqsadida faoliyat boshlaganmiz.
        </p>
      </div>

      {/* Statistika va yutuqlar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
          <span className="text-4xl font-extrabold text-brand-400 block mb-1">125+</span>
          <span className="text-xs text-slate-400 uppercase font-semibold">Yangi Avtopark</span>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
          <span className="text-4xl font-extrabold text-emerald-400 block mb-1">5000+</span>
          <span className="text-xs text-slate-400 uppercase font-semibold">Mamnun Mijozlar</span>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
          <span className="text-4xl font-extrabold text-amber-400 block mb-1">100%</span>
          <span className="text-xs text-slate-400 uppercase font-semibold">Sug&apos;urta Himoyasi</span>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl">
          <span className="text-4xl font-extrabold text-rose-400 block mb-1">24/7</span>
          <span className="text-xs text-slate-400 uppercase font-semibold">Tezkor Yordam</span>
        </div>
      </div>

      {/* Missiyamiz */}
      <div className="bg-slate-800/60 border border-slate-700/80 p-8 sm:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Bizning Asosiy Qadriyatlarimiz</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Biz har bir mijozimizning vaqtini, qulayligini va xavfsizligini qadrlaymiz. Shuning uchun barcha avtomobillarimiz ideal texnik holatda saqlanadi, har bir ijaradan oldin yuviladi va to&apos;liq yoqilg&apos;i baki bilan taqdim etiladi.
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Yashirin to&apos;lovlar yoki jarimalarsiz halol narxlar</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pasport va haydovchilik guvohnomasi bilan 5 daqiqada rasmiylashtirish</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Mijoz xohlagan manzilga avtomobilni yetkazib berish</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-2xl space-y-6 text-center">
          <h3 className="text-xl font-bold text-white">Sayohatga tayyormisiz?</h3>
          <p className="text-slate-400 text-sm">
            Orzuingizdagi avtomobilni hoziroq onlayn band qiling va qulay sayohatdan bahramand bo&apos;ling.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-accent-600 text-white font-bold text-sm shadow-lg shadow-red-600/30"
          >
            <span>Mashinalarni tanlash</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
