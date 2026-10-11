'use client';

import React, { useState, useEffect } from 'react';
import { Users, Key, MessageSquare, Activity, Car, RefreshCw, Clock } from 'lucide-react';

interface StatsData {
  users: number;
  orders: number;
  messages: number;
  active: number;
  cars: number;
  recentOrders?: any[];
  recentMessages?: any[];
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData>({
    users: 0,
    orders: 0,
    messages: 0,
    active: 0,
    cars: 125,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Stats olishda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    { title: 'Jami Mijozlar', value: stats.users, icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10' },
    { title: 'Muvaffaqiyatli Ijaralar', value: stats.orders, icon: Key, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Kelgan Xabarlar', value: stats.messages, icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Hozirda Faollar', value: stats.active, icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { title: 'Mavjud Avtopark', value: stats.cars, icon: Car, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span className="text-xs uppercase font-bold text-accent-500 tracking-wider">Jonli Monitoring</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Platforma Statistikasi</h1>
          <p className="text-xs text-slate-400">Ma&apos;lumotlar MongoDB bulutli bazasidan real vaqtda yangilanadi</p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-400' : ''}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {/* Kartalar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl flex items-center justify-between shadow-lg"
          >
            <div>
              <span className="text-xs text-slate-400 block mb-1">{c.title}</span>
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {loading ? '...' : c.value}
              </span>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.color} flex items-center justify-center`}>
              <c.icon className="w-7 h-7" />
            </div>
          </div>
        ))}
      </div>

      {/* So'nggi buyurtmalar */}
      {stats.recentOrders && stats.recentOrders.length > 0 && (
        <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-400" />
            <span>So&apos;nggi Ijaralar Tarixi</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-3">Mijoz</th>
                  <th className="pb-3">Avtomobil</th>
                  <th className="pb-3">To&apos;lov</th>
                  <th className="pb-3">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {stats.recentOrders.map((o: any) => (
                  <tr key={o._id}>
                    <td className="py-3 font-semibold text-white">{o.userName}</td>
                    <td className="py-3">{o.carName}</td>
                    <td className="py-3">{o.paymentMethod}</td>
                    <td className="py-3 text-slate-400">{new Date(o.date).toLocaleDateString('uz-UZ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
