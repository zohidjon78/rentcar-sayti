import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-accent-500 font-bold uppercase tracking-wider text-xs">
          Xavfsizlik va tartib-qoidalar
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Avtomobil Ijarasi Shartlari
        </h1>
        <p className="text-slate-400 text-sm">
          Platformamizdan foydalanish va avtomobil ijarasi bo&apos;yicha rasmiy talablar.
        </p>
      </div>

      <div className="bg-slate-800/80 border border-slate-700/80 p-8 sm:p-10 rounded-3xl space-y-8 text-slate-300 text-sm leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <span>1. Haydovchiga qo&apos;yiladigan talablar</span>
          </h2>
          <ul className="space-y-2 list-disc list-inside text-slate-300 pl-2">
            <li>Haydovchining yoshi kamida 21 yoshda bo&apos;lishi shart.</li>
            <li>Haydovchilik staji kamida 2 yil bo&apos;lishi lozim.</li>
            <li>Asl pasport (yoki ID-karta) va amaldagi haydovchilik guvohnomasi taqdim etilishi kerak.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>2. Sug&apos;urta va javobgarlik</span>
          </h2>
          <p>
            Barcha avtomobillarimiz OSAGO va KASKO sug&apos;urta polislari bilan to&apos;liq himoyalangan. Haydovchi O&apos;zbekiston Respublikasi yo&apos;l harakati qoidalariga qat&apos;iy rioya qilishi, spirtli ichimlik yoki taqiqlangan moddalar ta&apos;sirida avtomobil boshqarmasligi shart.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>3. To&apos;lov va qaytarish tartibi</span>
          </h2>
          <p>
            Ijara haqi mashina topshirilgunga qadar to&apos;liq to&apos;lanadi. Avtomobil topshirilgan holatda (toza va kelishilgan yoqilg&apos;i darajasida) qaytarilishi kerak. Muddati uzaytirilganda menejerni kamida 3 soat oldin ogohlantirish talab etiladi.
          </p>
        </div>
      </div>
    </div>
  );
}
