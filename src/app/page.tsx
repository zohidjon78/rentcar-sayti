import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Zap, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';
import { CARS_DATA } from '@/data/cars';
import CarCard from '@/components/CarCard';

export default function HomePage() {
  const featuredCars = CARS_DATA.slice(0, 6);

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-brand-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>O&apos;zbekiston bo&apos;ylab 1-raqamli avtoijara xizmati</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Yo&apos;llaringizni biz bilan <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              yanada qulay qiling
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed font-light">
            Malibu, Tracker, Kia K5 va boshqa o&apos;nlab toza, yangi avtomobillar bir necha daqiqada onlayn bron qilinadi. Yashirin to&apos;lovlarsiz, 100% ishonchli!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/cars"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-accent-600 hover:from-red-500 hover:to-accent-500 text-white font-bold text-lg shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <span>Mashinalarni ko&apos;rish</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-lg border border-slate-700 backdrop-blur-md transition-all"
            >
              Biz haqimizda
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-accent-500 font-bold uppercase tracking-wider text-xs block mb-2">
              Eng sara takliflar
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ommabop Avtomobillar
            </h2>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold text-sm group"
          >
            <span>Barcha mashinalarni ko&apos;rish (125+)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* 3. AFZALLIKLAR */}
      <section className="bg-slate-950/60 border-y border-slate-800/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-accent-500 font-bold uppercase tracking-wider text-xs">
              Nega aynan biz?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Bizning ustunliklarimiz
            </h2>
            <p className="text-slate-400 text-sm">
              Mijozlarimiz xavfsizligi va qulayligi biz uchun birinchi o&apos;rinda turadi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-4">
              <div className="w-14 h-14 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">24/7 Yordam Xizmati</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Istalgan vaqtda yo&apos;lda muammoga duch kelsangiz, professional jamoamiz zudlik bilan yordamga yetib boradi.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-4">
              <div className="w-14 h-14 rounded-xl bg-accent-600/20 text-accent-500 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">100% Toza & Xavfsiz</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Barcha avtomobillarimiz har bir ijaradan so&apos;ng to&apos;liq dezinfeksiya qilinadi va texnik ko&apos;rikdan o&apos;tkaziladi.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Tezkor Hujjatlashtirish</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ortiqcha qog&apos;ozbozliksiz, bor-yo&apos;g&apos;i pasport va guvohnoma bilan 5 daqiqada kalitni topshiramiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QADAMLAR (QANDAY ISHLAYDI) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand-400 font-bold uppercase tracking-wider text-xs">
            Oddiy va oson
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Qanday qilib ijara olasiz?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 text-brand-400 font-extrabold text-2xl flex items-center justify-center mx-auto border border-slate-700">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Avtomobilni tanlang</h3>
            <p className="text-sm text-slate-400">
              Katalogimizdan didingiz va byudjetingizga mos mashinani saralab oling.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 text-accent-500 font-extrabold text-2xl flex items-center justify-center mx-auto border border-slate-700">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Onlayn buyurtma bering</h3>
            <p className="text-sm text-slate-400">
              Sanani belgilang, telefoningizni tasdiqlang va to&apos;lov turini tanlang.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 text-emerald-400 font-extrabold text-2xl flex items-center justify-center mx-auto border border-slate-700">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Kalitni qabul qiling</h3>
            <p className="text-sm text-slate-400">
              Avtomobil manzilingizga yetkaziladi yoki ofisimizdan olib keting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
