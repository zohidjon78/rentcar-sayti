'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Fuel, Gauge, ArrowRight } from 'lucide-react';
import { Car } from '@/data/cars';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const router = useRouter();

  const handleRent = (e: React.MouseEvent) => {
    e.preventDefault();
    const user = localStorage.getItem('userName');
    if (!user) {
      alert("Iltimos, avtomobilni ijaraga olish uchun avval tizimga kiring!");
      router.push('/login');
      return;
    }
    router.push(`/rental?car=${encodeURIComponent(car.name)}&id=${car.id}`);
  };

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(car.price);

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden card-hover flex flex-col group">
      {/* Rasm qismi */}
      <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider border border-slate-700">
          {car.category}
        </div>
        <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
          {car.year}-yil
        </div>
      </div>

      {/* Kontent qismi */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-white group-hover:text-brand-400 transition-colors line-clamp-1 mb-2">
          {car.name}
        </h3>

        {/* Xususiyatlar */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-700/60 my-3 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-brand-400" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4 text-emerald-400" />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span>{car.seats} o&apos;rin</span>
          </div>
        </div>

        {/* Narx va tugma */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Kunlik narxi:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-white">{formattedPrice}</span>
              <span className="text-xs text-slate-400">so&apos;m</span>
            </div>
          </div>

          <button
            onClick={handleRent}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-md shadow-brand-600/30 transition-all hover:scale-105"
          >
            <span>Ijara</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
