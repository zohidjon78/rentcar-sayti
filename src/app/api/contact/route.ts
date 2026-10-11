import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from '@/models/Message';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldiring!" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      message: message.trim(),
      date: new Date()
    });

    return NextResponse.json(
      { 
        message: "Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz. ✅",
        id: newMessage._id
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Xabar saqlash xatosi:", error);
    return NextResponse.json(
      { error: "Xabarni yuborib bo'lmadi: " + (error?.message || error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const messages = await Message.find().sort({ date: -1 }).limit(100);
    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("Xabarlarni olish xatosi:", error);
    return NextResponse.json(
      { error: "Xabarlarni olib bo'lmadi" },
      { status: 500 }
    );
  }
}
