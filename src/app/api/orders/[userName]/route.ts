import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(
  req: Request,
  { params }: { params: { userName: string } }
) {
  try {
    await connectToDatabase();
    const rawName = params.userName;
    const nameParam = decodeURIComponent(rawName).trim();

    // Ism yoki email bo'yicha qidiruv
    const orders = await Order.find({
      $or: [
        { userName: { $regex: new RegExp(`^${nameParam}$`, 'i') } },
        { userEmail: nameParam.toLowerCase() }
      ]
    }).sort({ date: -1 });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("User orders olish xatosi:", error);
    return NextResponse.json(
      { error: "Buyurtmalarni yuklab bo'lmadi" },
      { status: 500 }
    );
  }
}
