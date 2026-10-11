'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, Phone, CheckCircle, Shield, Camera, ArrowRight, UserCheck, Loader2 } from 'lucide-react';

function RentalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carName = searchParams.get('car') || 'Chevrolet Malibu 2 Premier';

  const [userName, setUserName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [phone, setPhone] = useState<string>('+998 ');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);

  // Face ID holatlari
  const [faceVerified, setFaceVerified] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const user = localStorage.getItem('userName');
    if (!user) {
      alert("Avval tizimga kiring!");
      router.push('/login');
      return;
    }
    setUserName(user);

    // Boshlang'ich sana - bugun
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
  }, [router]);

  // Telefon OTP yuborish
  const handleSendOtp = () => {
    if (phone.length < 13) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting!");
      return;
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    alert(`Tasdiqlash kodi: ${code}`);
  };

  const handleVerifyOtp = () => {
    if (otpCode === generatedOtp) {
      setPhoneVerified(true);
      alert("Telefon raqamingiz muvaffaqiyatli tasdiqlandi! ✅");
    } else {
      alert("Kod noto'g'ri, iltimos qaytadan tekshiring!");
    }
  };

  // Face ID boshqarish
  const startCamera = async () => {
    setCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setTimeout(() => {
          setFaceVerified(true);
          setCameraActive(false);
          if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
          }
        }, 3000);
      } else {
        throw new Error("Kamera topilmadi");
      }
    } catch (err) {
      const confirmDemo = confirm("Kameraga ulanib bo'lmadi. Shaxsni demo tarzda tasdiqlaysizmi?");
      if (confirmDemo) {
        setFaceVerified(true);
        setCameraActive(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Iltimos, ijara muddatini to'liq belgilang!");
      return;
    }
    if (!phoneVerified) {
      alert("Iltimos, telefon raqamingizni tasdiqlang!");
      return;
    }
    if (!faceVerified) {
      alert("Iltimos, Face ID shaxs tekshiruvidan o'ting!");
      return;
    }

    // Kunlar soni hisobi
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    router.push(
      `/payment?car=${encodeURIComponent(carName)}&startDate=${startDate}&endDate=${endDate}&days=${days}&phone=${encodeURIComponent(phone)}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-slate-800/90 border border-slate-700 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        {/* Sarlavha */}
        <div className="text-center space-y-2 border-b border-slate-700/80 pb-6">
          <span className="text-xs uppercase tracking-widest text-brand-400 font-bold">
            Tezkor & Xavfsiz Rasmiylashtirish
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Avtomobilni Ijaraga Olish
          </h1>
          <p className="text-sm text-slate-300">
            Tanlangan model: <span className="font-bold text-accent-500">{carName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Sanalar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Olish sanasi
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Qaytarish sanasi
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Telefon tasdiqlash */}
          <div className="bg-slate-900/70 border border-slate-700/80 p-5 rounded-2xl space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Bog&apos;lanish uchun telefon raqami
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                disabled={phoneVerified}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-grow bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
              />
              {!phoneVerified ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-colors"
                >
                  Kod yuborish
                </button>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-3">
                  <CheckCircle className="w-4 h-4" /> Tasdiqlangan
                </span>
              )}
            </div>

            {otpSent && !phoneVerified && (
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="4 xonali kodni kiriting"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="flex-grow bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl whitespace-nowrap"
                >
                  Tasdiqlash
                </button>
              </div>
            )}
          </div>

          {/* 3. Face ID / Shaxs tekshiruvi */}
          <div className="bg-slate-900/70 border border-slate-700/80 p-5 rounded-2xl text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-200">
              <Shield className="w-5 h-5 text-brand-400" />
              <span>Face ID & Shaxsni tasdiqlash</span>
            </div>

            {cameraActive && (
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-brand-500 shadow-xl">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-full animate-spin" />
              </div>
            )}

            {!faceVerified ? (
              <button
                type="button"
                onClick={startCamera}
                disabled={cameraActive}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-600 transition-colors"
              >
                <Camera className="w-4 h-4 text-brand-400" />
                <span>{cameraActive ? "Skanerlanmoqda..." : "Kamerani yoqish (Face ID)"}</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-950/60 border border-emerald-800 px-4 py-2 rounded-xl">
                <UserCheck className="w-5 h-5" />
                <span>Shaxs muvaffaqiyatli tasdiqlandi!</span>
              </div>
            )}
          </div>

          {/* Davom etish tugmasi */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-accent-600 hover:from-red-500 hover:to-accent-500 text-white font-extrabold text-base shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <span>To&apos;lovga o&apos;tish</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RentalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-400" />
        <span>Yuklanmoqda...</span>
      </div>
    }>
      <RentalContent />
    </Suspense>
  );
}
