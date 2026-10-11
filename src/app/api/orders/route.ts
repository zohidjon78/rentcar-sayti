import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { userName, userEmail, userPhone, carName, startDate, endDate, pricePerDay, totalPrice, paymentMethod } = body;

    if (!userName || !carName) {
      return NextResponse.json(
        { error: "Mijoz ismi va mashina tanlanishi shart!" },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      userName: userName.trim(),
      userEmail: userEmail ? userEmail.trim().toLowerCase() : undefined,
      userPhone: userPhone ? userPhone.trim() : undefined,
      carName: carName.trim(),
      startDate,
      endDate,
      pricePerDay,
      totalPrice,
      paymentMethod: paymentMethod || "Sayt orqali (Premium)",
      status: 'kutilmoqda',
      date: new Date()
    });

    return NextResponse.json(
      { 
        message: "Buyurtma bazaga saqlandi! ✅", 
        order: newOrder 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order saqlash xatosi:", error);
    return NextResponse.json(
      { error: "Buyurtmani saqlab bo'lmadi: " + (error?.message || error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find().sort({ date: -1 }).limit(100);
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Orders olish xatosi:", error);
    return NextResponse.json(
      { error: "Buyurtmalarni olib bo'lmadi" },
      { status: 500 }
    );
  }
}
