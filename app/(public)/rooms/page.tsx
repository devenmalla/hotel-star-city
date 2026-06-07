import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Wind, Snowflake } from 'lucide-react';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';

export const revalidate = 60; // revalidate every 60 seconds

async function getRooms() {
  await connectDB();
  const rooms = await Room.find({ isAvailable: true }).sort({ createdAt: 1 });
  return JSON.parse(JSON.stringify(rooms));
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  const acRooms = rooms.filter((r: any) => r.type.startsWith('ac'));
  const nonAcRooms = rooms.filter((r: any) => r.type.startsWith('non-ac'));

  const categories = [
    { type: 'AC Rooms', icon: Snowflake, color: 'bg-blue-50 text-blue-600', rooms: acRooms },
    { type: 'Non-AC Rooms', icon: Wind, color: 'bg-green-50 text-green-600', rooms: nonAcRooms },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B1B1B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#5F8C3F] text-white mb-4">Our Rooms</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comfortable Rooms for Every Budget
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Choose from our range of AC and Non-AC rooms. All rooms include clean linen,
            hot water, and 24/7 service.
          </p>
        </div>
      </section>

      {/* Extra Person Note */}
      <div className="bg-[#5F8C3F] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-sm">
            Extra person charge: <strong>₹200 per night</strong> — applicable for all room types
          </p>
        </div>
      </div>

      {/* Rooms */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {rooms.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No rooms available at the moment. Please check back soon.</p>
            </div>
          ) : (
            categories.map((category) => (
              category.rooms.length > 0 && (
                <div key={category.type}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1B1B1B]">{category.type}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.rooms.map((room: any) => (
                      <Card key={room._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="bg-linear-to-br from-[#5F8C3F] to-[#A8C65B] h-48 flex items-center justify-center relative">
                          <span className="text-white text-6xl font-bold opacity-20">★</span>
                          <div className="absolute bottom-4 left-4">
                            <p className="text-white font-bold text-2xl">₹{room.price.toLocaleString('en-IN')}</p>
                            <p className="text-white/70 text-xs">per night</p>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-[#1B1B1B] text-xl mb-2">{room.name}</h3>
                          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{room.description}</p>
                          {room.features.length > 0 && (
                            <ul className="space-y-2 mb-6">
                              {room.features.map((feature: string) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle className="h-4 w-4 text-[#5F8C3F] shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                          <Link href={`/booking?room=${encodeURIComponent(room.name)}`}>
                            <Button className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white">
                              Book This Room
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1B1B1B] mb-4">Not sure which room to pick?</h2>
          <p className="text-gray-500 mb-8">Call us and we will help you choose the best option for your stay.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+918787430576">
              <Button size="lg" className="bg-[#5F8C3F] hover:bg-[#4a6e30] text-white px-8">
                Call Us Now
              </Button>
            </a>
            <Link href="/booking">
              <Button size="lg" variant="outline" className="border-[#5F8C3F] text-[#5F8C3F] hover:bg-[#5F8C3F] hover:text-white px-8">
                Book Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}