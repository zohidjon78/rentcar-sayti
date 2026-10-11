'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Car, Calendar, CreditCard, LogOut, Search, Clock, CheckCircle } from 'lucide-react';

interface OrderItem {
  _id: string;
  carName: string;
  paymentMethod: string;
  date: string;
  status: string;
  startDate?: string;
  endDate?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (!name) {
      router.push('/login');
      return;
    }

    setUserName(name);
    if (email) setUserEmail(email);

    // Buyurtmalarni yuklash
    fetchOrders(name);
  }, [router]);

  const fetchOrders = async (name: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${encodeURIComponent(name)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Orders yuklashda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Chiqmoqchimisiz?")) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Foydalanuvchi kartasi */}
      <div className="bg-slate-800/90 border border-slate-700 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-brand-600/30">
            <User className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-accent-500 tracking-wider">Premium Mijoz</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{userName}</h1>
            <p className="text-sm text-slate-400">{userEmail || "Email saqlanmagan"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cars"
            className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Mashina band qilish</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-red-950/80 text-red-400 border border-slate-700 hover:border-red-800 text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Chiqish</span>
          </button>
        </div>
      </div>

      {/* Ijaralar tarixi */}
      <div className="bg-slate-800/70 border border-slate-700/80 p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Mening Ijaralarim</h2>
              <p className="text-xs text-slate-400">Jami buyurtmalar: {orders.length} ta</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-400" />
            <p className="text-sm">Buyurtmalar bazadan yuklanmoqda...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-slate-900/90 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">{order.carName}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" />
                      <span>{new Date(order.date).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Faol</span>
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    {order.paymentMethod}
                  </span>
                  <span className="text-slate-500 text-[10px]">ID: {order._id.slice(-6)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
            <Car className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-300">Hozircha ijaralar mavjud emas</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Siz hali birorta ham avtomobil ijaraga olmadingiz. Katalogdan o&apos;zingizga ma&apos;qul mashinani tanlang!
            </p>
            <Link
              href="/cars"
              className="inline-block mt-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl"
            >
              Mashinalarni ko&apos;rish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
