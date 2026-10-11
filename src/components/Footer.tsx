import React from 'react';
import Link from 'next/link';
import { Car, MapPin, Phone, Mail, Send, ShieldCheck, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent-600 flex items-center justify-center text-white">
                <Car className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-wider">
                RENTCAR<span className="text-red-500">.UZ</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              O&apos;zbekistonda eng qulay va ishonchli premium avtomobil ijarasi xizmati. Biz bilan yo&apos;llaringiz doimo qulay va xavfsiz bo&apos;lsin.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/zohid_box1ng"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-600 flex items-center justify-center text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base tracking-wide">Tezkor havolalar</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-white transition-colors">Mashinalar parki</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Biz haqimizda</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Ijara shartlari</Link>
              </li>
              <li>
                <Link href="/stats" className="hover:text-white transition-colors">Platforma statistikasi</Link>
              </li>
            </ul>
          </div>

          {/* Afzalliklar */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base tracking-wide">Kafolatlar</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Sug&apos;urtalangan avtomobillar</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                <span>24/7 Texnik ko&apos;mak xizmati</span>
              </li>
              <li className="flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Texnik soz va toza holat</span>
              </li>
            </ul>
          </div>

          {/* Aloqa */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base tracking-wide">Bog&apos;lanish</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Xorazm viloyati, Shovot tumani</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a href="tel:+998505719163" className="hover:text-white">+998 50 571 91 63</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <a href="mailto:info@avtorental.uz" className="hover:text-white">info@avtorental.uz</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AvtoRental.uz (RentCar). Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-slate-400">Maxfiylik siyosati</Link>
            <Link href="/terms" className="hover:text-slate-400">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
