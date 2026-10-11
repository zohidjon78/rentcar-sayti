import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'rentcar_super_secret_jwt_key_2025_secure';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email va parolni kiriting!" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Email yoki parol noto'g'ri!" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Email yoki parol noto'g'ri!" },
        { status: 401 }
      );
    }

    user.lastSeen = new Date();
    await user.save();

    const token = jwt.sign(
      { 
        userId: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role || 'user' 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      message: "Xush kelibsiz!",
      userName: user.name,
      userEmail: user.email,
      phone: user.phone,
      role: user.role,
      token
    });
  } catch (error: any) {
    console.error("Login xatosi:", error);
    return NextResponse.json(
      { error: "Serverda xatolik: " + (error?.message || error) },
      { status: 500 }
    );
  }
}
