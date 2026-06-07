import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  url: string;
  publicId: string;
  caption?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String, trim: true },
    category: { type: String, default: 'general', trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);