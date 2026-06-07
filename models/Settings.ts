import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  hotelName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  whatsappNumber: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  roomPricing: {
    acSingle: number;
    acDouble: number;
    acSuite: number;
    nonAcSingle: number;
    nonAcDouble: number;
    extraPerson: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    hotelName: { type: String, default: 'Hotel Star City' },
    tagline: { type: String, default: 'Lodging & Fooding' },
    description: { type: String, default: '' },
    email: { type: String, default: 'hotelstarcityofficial@gmail.com' },
    phone: { type: String, default: '+91 8787430576' },
    address: { type: String, default: 'M.P. Road, Murgi Patti, Dimapur - 797112, Nagaland' },
    whatsappNumber: { type: String, default: '8787430576' },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    roomPricing: {
      acSingle: { type: Number, default: 1200 },
      acDouble: { type: Number, default: 1500 },
      acSuite: { type: Number, default: 2500 },
      nonAcSingle: { type: Number, default: 800 },
      nonAcDouble: { type: Number, default: 1000 },
      extraPerson: { type: Number, default: 200 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);