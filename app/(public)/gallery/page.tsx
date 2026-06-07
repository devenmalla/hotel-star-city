'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  _id: string;
  url: string;
  caption?: string;
  category: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setImages(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B1B1B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#5F8C3F] text-white mb-4">Our Gallery</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            A Glimpse of Hotel Star City
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Take a look at our rooms, facilities, and the warm atmosphere that awaits you.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#5F8C3F]" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No images yet. Check back soon.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((image) => (
                <div
                  key={image._id}
                  className="break-inside-avoid cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setSelected(image)}
                >
                  <div className="relative w-full">
                    <Image
                      src={image.url}
                      alt={image.caption || 'Hotel Star City'}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
                        {image.caption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <Image
              src={selected.url}
              alt={selected.caption || 'Hotel Star City'}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            {selected.caption && (
              <p className="text-white text-center mt-4 text-sm">{selected.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}