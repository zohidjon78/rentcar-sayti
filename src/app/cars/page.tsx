'use client';

import React, { useState, useMemo } from 'react';
import { CARS_DATA, Car } from '@/data/cars';
import CarCard from '@/components/CarCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function CarsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = [
    { id: 'all', name: 'Barchasi' },
    { id: 'ekonom', name: 'Ekonom' },
    { id: 'komfort', name: 'Komfort' },
    { id: 'biznes', name: 'Biznes' },
    { id: 'suv', name: 'SUV & Krossover' },
    { id: 'sport', name: 'Sport & Premium' },
  ];

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Sarlavha */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-accent-500 font-bold uppercase tracking-wider text-xs">
          Bizning avtopark
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Avtomobillar Katalogi
        </h1>
        <p className="text-slate-400 text-sm">
          Har qanday safaringiz uchun ideal mashinani tanlang va qulay narxda ijaraga oling.
        </p>
      </div>

      {/* Filter va Qidiruv boshqaruvi */}
      <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Qidiruv input */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Mashina nomini izlash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white pl-11 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Kategoriyalar tugmalari */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Saralash (Sort) */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs py-2.5 px-3 rounded-xl focus:outline-none focus:border-brand-500"
          >
            <option value="default">Odatiy tartib</option>
            <option value="price-asc">Narx: Arzondan qimmatga</option>
            <option value="price-desc">Narx: Qimmatdan arzonga</option>
          </select>
        </div>
      </div>

      {/* Mashinalar ro'yxati */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/60 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-base">So&apos;rovingiz bo&apos;yicha hech qanday avtomobil topilmadi.</p>
        </div>
      )}
    </div>
  );
}
