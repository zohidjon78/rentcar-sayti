import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  userName: string;
  userEmail?: string;
  userPhone?: string;
  carName: string;
  startDate?: string;
  endDate?: string;
  pricePerDay?: number;
  totalPrice?: number;
  paymentMethod: string;
  status: 'kutilmoqda' | 'tasdiqlandi' | 'bekor_qilindi';
  date: Date;
}

const OrderSchema = new Schema<IOrder>({
  userName: { type: String, required: true, trim: true },
  userEmail: { type: String, lowercase: true, trim: true },
  userPhone: { type: String, trim: true },
  carName: { type: String, required: true, trim: true },
  startDate: { type: String },
  endDate: { type: String },
  pricePerDay: { type: Number },
  totalPrice: { type: Number },
  paymentMethod: { type: String, default: "Sayt orqali (Premium)" },
  status: { type: String, enum: ['kutilmoqda', 'tasdiqlandi', 'bekor_qilindi'], default: 'kutilmoqda' },
  date: { type: Date, default: Date.now }
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
