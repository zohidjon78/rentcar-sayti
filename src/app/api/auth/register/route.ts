import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Barcha majburiy maydonlarni to'ldiring!" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Email formati noto'g'ri!" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email bilan ro'yxatdan o'tilgan!" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      phone: phone ? phone.trim() : undefined,
      lastSeen: new Date()
    });

    return NextResponse.json(
      { 
        message: "Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅",
        userId: newUser._id 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register xatosi:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + (error?.message || error) },
      { status: 500 }
    );
  }
}
