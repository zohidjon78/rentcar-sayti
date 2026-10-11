import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import Message from '@/models/Message';

export async function GET() {
  try {
    await connectToDatabase();
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const [totalUsers, totalOrders, totalMessages, activeNow, recentUsers, recentOrders, recentMessages] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Message.countDocuments(),
      User.countDocuments({ lastSeen: { $gte: fiveMinutesAgo } }),
      User.find({}, { name: 1, email: 1, lastSeen: 1 }).sort({ lastSeen: -1 }).limit(10),
      Order.find().sort({ date: -1 }).limit(10),
      Message.find().sort({ date: -1 }).limit(10)
    ]);

    return NextResponse.json({
      users: totalUsers,
      orders: totalOrders,
      messages: totalMessages,
      active: activeNow,
      cars: 125,
      recentUsers,
      recentOrders,
      recentMessages
    });
  } catch (error: any) {
    console.error("Stats olish xatosi:", error);
    return NextResponse.json(
      { error: "Statistikani yuklab bo'lmadi: " + (error?.message || error) },
      { status: 500 }
    );
  }
}
