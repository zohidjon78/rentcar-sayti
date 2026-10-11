'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, User, LogOut, Menu, X, BarChart3, Phone, Info } from 'lucide-react';

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem('userName');
    setUserName(user);

    const handleStorage = () => {
      setUserName(localStorage.getItem('userName'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    if (confirm("Haqiqatan ham tizimdan chiqmoqchimisiz?")) {
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      setUserName(null);
      window.location.href = '/';
    }
  };

  const navLinks = [
    { href: '/', label: 'Bosh sahifa' },
    { href: '/cars', label: 'Mashinalar' },
    { href: '/about', label: 'Biz haqimizda' },
    { href: '/contact', label: 'Aloqa' },
    { href: '/stats', label: 'Statistika' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider text-white">
                RENTCAR<span className="text-red-500">.UZ</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 tracking-widest uppercase">Premium Ijara</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Action */}
          <div className="hidden md:flex items-center gap-3">
            {userName ? (
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-sm font-semibold text-brand-100 hover:text-white transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{userName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Chiqish"
                  className="text-slate-400 hover:text-red-400 p-1.5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Kirish
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-red-600 hover:from-red-600 hover:to-accent-600 rounded-lg shadow-md shadow-red-600/20 transition-all hover:scale-105"
                >
                  Ro&apos;yxatdan o&apos;tish
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                pathname === link.href
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-800">
            {userName ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold text-brand-300 bg-slate-800"
                >
                  <User className="w-5 h-5" />
                  {userName} (Profil)
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:bg-slate-800"
                >
                  <LogOut className="w-5 h-5" />
                  Chiqish
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 rounded-lg text-sm font-medium bg-slate-800 text-white"
                >
                  Kirish
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 rounded-lg text-sm font-semibold bg-accent-600 text-white"
                >
                  Ro&apos;yxatdan o&apos;tish
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
