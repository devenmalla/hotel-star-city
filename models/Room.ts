import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  type: 'ac-single' | 'ac-double' | 'ac-suite' | 'non-ac-single' | 'non-ac-double';
  price: number;
  extraPersonCharge?: number;
  description: string;
  features: string[];
  images: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['ac-single', 'ac-double', 'ac-suite', 'non-ac-single', 'non-ac-double'],
      required: true,
    },
    price: { type: Number, required: true },
    extraPersonCharge: { type: Number, default: 0 },
    description: { type: String, required: true },
    features: [{ type: String }],
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);