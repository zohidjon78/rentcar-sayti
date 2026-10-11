'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Zap, Headphones, Sparkles, CheckCircle2, Star, ChevronDown, ChevronUp, Clock, Car as CarIcon, Award } from 'lucide-react';
import { CARS_DATA } from '@/data/cars';
import CarCard from '@/components/CarCard';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const featuredCars = CARS_DATA.slice(0, 6);

  const faqs = [
    {
      q: "Avtomobilni ijaraga olish uchun qanday hujjatlar kerak?",
      a: "Sizdan faqat amaldagi pasport (yoki ID-karta) va haydovchilik guvohnomasi talab etiladi. Haydovchilik staji kamida 2 yil bo'lishi lozim."
    },
    {
      q: "Garov (depozit) puli qancha va u qachon qaytariladi?",
      a: "Avtomobil toifasiga qarab depozit 1 000 000 dan 3 000 000 so'mgacha bo'lishi mumkin va avtomobil topshirilgach, jarimalar tekshirilib, darhol to'liq qaytariladi."
    },
    {
      q: "Avtomobilni boshqa shaharga yoki viloyatga haydab ketsa bo'ladimi?",
      a: "Ha, albatta! Avtomobillarimiz butun O'zbekiston Respublikasi bo'ylab harakatlanishiga ruxsat etilgan."
    },
    {
      q: "Mashinani aeroport yoki uyimga yetkazib berasizmi?",
      a: "Albatta, 24/7 rejimida avtomobilni siz xohlagan manzilga yoki aeroportga yetkazib berish xizmati mavjud."
    }
  ];

  const testimonials = [
    {
      name: "Javohir Toshmatov",
      role: "Tadbirkor",
      comment: "Malibu 2 ni 3 kunga oldim. Mashina toza, yangi holatda topshirildi. Hech qanday ortiqcha qog'ozbozliksiz 5 daqiqada kalitni oldim. Rahmat!",
      rating: 5
    },
    {
      name: "Dilnoza Rahimova",
      role: "Sayohatchi",
      comment: "Oilamiz bilan sayohat uchun Tracker 2 ijaraga oldik. Narxlar juda hamyonbop, xizmat ko'rsatish darajasi a'lo darajada. Tavsiya qilaman!",
      rating: 5
    },
    {
      name: "Sardor Aliyev",
      role: "Biznes hamkor",
      comment: "Mehmonlarimiz uchun Kia K5 buyurtma qilgandik. To'g'ri aeroportga yetkazib berishdi. Juda qulay va ishonchli xizmat.",
      rating: 5
    }
  ];

  return (
    <div className="space-y-28 pb-16 overflow-hidden">
      {/* 1. HERO SECTION WITH VIDEO BACKGROUND & FLOATING STATS */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4 sm:px-6 lg:px-8">
        {/* Orqa fon: Video yoki yuqori sifatli rasm */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25 scale-105 transition-transform duration-1000"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 py-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-brand-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xl shadow-lg shadow-brand-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>O&apos;zbekiston bo&apos;ylab 1-raqamli premium avtoijara xizmati</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15]">
            Yo&apos;llaringizni biz bilan <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              yanada qulay qiling
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed font-light">
            Malibu, Tracker, Kia K5, Camry va boshqa o&apos;nlab toza, yangi avtomobillar bir necha daqiqada onlayn bron qilinadi. Yashirin to&apos;lovlarsiz, 100% ishonchli!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/cars"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-accent-600 hover:from-red-500 hover:to-accent-500 text-white font-extrabold text-lg shadow-2xl shadow-red-600/40 flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-red-500/50"
            >
              <span>Mashinalarni ko&apos;rish</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-lg border border-slate-700 backdrop-blur-xl transition-all"
            >
              Biz haqimizda
            </Link>
          </div>

          {/* Suzuvchi ko'rsatkichlar (Hero Stats) */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-4 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">125+</span>
              <span className="text-xs text-slate-400">Yangi avtomobillar</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-4 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">5 000+</span>
              <span className="text-xs text-slate-400">Muvaffaqiyatli ijara</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-4 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-400 block">24/7</span>
              <span className="text-xs text-slate-400">Texnik qo&apos;llab-quvvatlash</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-4 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">100%</span>
              <span className="text-xs text-slate-400">KASKO Sug&apos;urta</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OMMABOP AVTOMOBILLAR (FEATURED CARS) */}
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
            <span>Barcha modellarni ko&apos;rish (125+)</span>
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
      <section className="bg-slate-950/70 border-y border-slate-800/80 py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-accent-500 font-bold uppercase tracking-wider text-xs">
              Nega aynan biz?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Bizning Ustunliklarimiz
            </h2>
            <p className="text-slate-400 text-sm">
              Mijozlarimiz xavfsizligi va qulayligi biz uchun birinchi o&apos;rinda turadi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">24/7 Yordam Xizmati</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Istalgan vaqtda yo&apos;lda muammoga duch kelsangiz, professional jamoamiz zudlik bilan yordamga yetib boradi.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-accent-600/20 text-accent-500 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">100% Toza & Xavfsiz</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Barcha avtomobillarimiz har bir ijaradan so&apos;ng to&apos;liq dezinfeksiya qilinadi va texnik ko&apos;rikdan o&apos;tkaziladi.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Tezkor Rasmiylashtirish</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ortiqcha qog&apos;ozbozliksiz, bor-yo&apos;g&apos;i pasport va guvohnoma bilan 5 daqiqada kalitni topshiramiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MIJOZLAR FIKRLARI (TESTIMONIALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand-400 font-bold uppercase tracking-wider text-xs">
            Haqiqiy fikrlar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Mijozlarimiz Biz Haqimizda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700/60">
                <h4 className="font-bold text-sm text-white">{t.name}</h4>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. KO'P SO'RALADIGAN SAVOLLAR (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-accent-500 font-bold uppercase tracking-wider text-xs">
            Tez-tez beriladigan savollar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Savol va Javoblar
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-brand-400"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-700/60 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. TEZKOR BRON QILISH CTA BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-brand-700 p-10 sm:p-14 rounded-3xl shadow-2xl text-center space-y-6 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Sizga mos avtomobilni hoziroq band qiling!
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-light">
              Birinchi buyurtmangiz uchun maxsus chegirmalar va sovg&apos;alar kutmoqda. Qulay safaringizni biz bilan boshlang.
            </p>
            <div className="pt-2">
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-base rounded-2xl shadow-xl transition-all hover:scale-105"
              >
                <span>Avtoparkni Ko&apos;rish</span>
                <ArrowRight className="w-5 h-5 text-red-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
