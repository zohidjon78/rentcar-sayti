# 🚗 AvtoRental.uz — Zamonaviy Avtomobil Ijarasi Platformasi

Premium darajadagi avtomobil ijarasi (RentCar) to'liq fullstack platformasi.  
Texnologiyalar: **Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS + MongoDB Atlas (Mongoose) + JWT & bcrypt**.

---

## 🌟 Asosiy Xususiyatlar

- 🚀 **Fullstack Arxitektura:** React komponentlari va Next.js Serverless API yo'llari yagona loyihada.
- 🗄️ **Real Bulutli Baza (MongoDB Atlas):** Foydalanuvchilar, buyurtmalar, xabarlar va jonli statistika doimiy saqlanadi.
- 🎬 **Zamonaviy Video Hero & Dizayn:** To'liq qorong'u (Dark Mode) premium uslub, neon aksentlar va silliq animatsiyalar.
- 📱 **100% Responsiv:** Mobil telefonlar, planshetlar va kompyuterlar uchun moslashtirilgan.
- 🏎️ **Keng Avtopark:** Malibu 2, Captiva, Kia K5, Camry, Tracker, Gentra, Cobalt, Monjaro va sport avtomobillar.
- ⚡ **Tezkor Onlayn Ijara:** Olish/topshirish sanalari hisoblagichi, SMS tasdiqlash va Face ID tekshiruvi.
- 💳 **Xavfsiz To'lov:** Payme, Click, Uzum, Bank kartasi va Telegram menejer integratsiyasi.
- 👤 **Mijoz Kabineti:** Shaxsiy profil va real vaqtda yangilanuvchi ijaralar tarixi.
- 📊 **Jonli Statistika:** Baza holati, mijozlar va ijaralar sonini ko'rsatuvchi interaktiv panel.

---

## 🛠️ Loyihani Ishga Tushirish (Mahalliy)

1. **Repozitoriyani yuklab oling va papkaga kiring:**
   ```bash
   git clone https://github.com/zohidjon78/rentcar-sayti.git
   cd rentcar-sayti
   ```

2. **Paketlarni o'rnating:**
   ```bash
   npm install
   ```

3. **Muhit parametrlarini (`.env.local`) sozlang:**
   `.env.example` dan nusxa oling yoki quyidagilarni kiriting:
   ```env
   MONGO_URI=mongodb+srv://idasturiy_db_user:zohidjon_6666@cluster0.sfpoqxq.mongodb.net/rentcar_db?retryWrites=true&w=majority
   JWT_SECRET=rentcar_super_secret_jwt_key_2025_secure
   NEXT_PUBLIC_SITE_URL=https://avtorental.uz
   ```

4. **Dasturni ishga tushiring:**
   ```bash
   npm run dev
   ```
   Brauzerda: `http://localhost:3000`

---

## 🌐 Real Domenga Joylash (Vercel & avtorental.uz)

Loyiha Vercel platformasi uchun 100% moslashtirilgan:

1. [Vercel.com](https://vercel.com) ga kiring va GitHub profilingiz orqali kiring.
2. Ushbu repozitoriyani tanlab **Import** tugmasini bosing.
3. **Environment Variables** ga yuqoridagi `MONGO_URI`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL` larni kiriting.
4. **Deploy** tugmasini bosing.
5. Vercel sozlamalaridan **Domains** bo'limiga kirib `avtorental.uz` domenini bog'lang.

---

## 📄 Litsenziya va Mualliflik

© 2026 **AvtoRental.uz (RentCar)**. Barcha huquqlar himoyalangan.
