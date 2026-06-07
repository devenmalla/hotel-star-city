'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Trash2, Upload, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  _id: string;
  url: string;
  publicId: string;
  caption?: string;
  category: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('general');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    const res = await fetch('/api/gallery');
    const data = await res.json();
    if (data.success) setImages(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'hotel_star_city');

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: data.secure_url,
            publicId: data.public_id,
            caption,
            category,
          }),
        });

        setFile(null);
        setPreview(null);
        setCaption('');
        await fetchImages();
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    await fetchImages();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B1B1B]">Gallery</h1>
        <p className="text-gray-500 text-sm mt-1">Upload and manage hotel images</p>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="font-bold text-[#1B1B1B] mb-4">Upload New Image</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Select Image</Label>
              <div
                className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-[#5F8C3F] transition-colors"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                {preview ? (
                  <div className="relative w-full h-40">
                    <Image src={preview} alt="Preview" fill className="object-contain rounded" />
                  </div>
                ) : (
                  <div className="py-4">
                    <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Click to select an image</p>
                    <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP up to 10MB</p>
                  </div>
                )}
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Caption (Optional)</Label>
                <Input
                  placeholder="e.g. Deluxe AC Room"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  placeholder="e.g. rooms, restaurant, exterior"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white mt-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#5F8C3F]" />
        </div>
      ) : images.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No images uploaded yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image._id} className="overflow-hidden group">
              <div className="relative h-48">
                <Image
                  src={image.url}
                  alt={image.caption || 'Gallery image'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteImage(image._id)}
                    className="text-white border-white hover:bg-red-500 hover:border-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {image.caption && (
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500 truncate">{image.caption}</p>
                  <p className="text-xs text-gray-300">{image.category}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}