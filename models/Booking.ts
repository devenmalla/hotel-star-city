import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  fullName: string;
  phone: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  roomType: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  totalAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    roomType: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    specialRequests: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'checked-in', 'completed', 'cancelled'],
      default: 'pending',
    },
    totalAmount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);