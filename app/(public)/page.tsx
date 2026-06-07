import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Wifi, Car, Utensils, Shield, Star, MapPin, Phone, ArrowRight, CheckCircle
} from 'lucide-react';

const rooms = [
  {
    name: 'AC Single Room',
    price: '₹1,200',
    description: 'Comfortable single room with air conditioning, perfect for solo travelers.',
    features: ['Air Conditioning', 'Single Bed', 'Private Bathroom', 'TV'],
    badge: 'Popular',
  },
  {
    name: 'AC Double Room',
    price: '₹1,500',
    description: 'Spacious double room ideal for couples or business travelers.',
    features: ['Air Conditioning', 'Double Bed', 'Private Bathroom', 'TV'],
    badge: 'Best Value',
  },
  {
    name: 'AC Suite Room',
    price: '₹2,500',
    description: 'Premium suite with extra space and premium amenities.',
    features: ['Air Conditioning', 'King Bed', 'Private Bathroom', 'TV', 'Sitting Area'],
    badge: 'Premium',
  },
];

const amenities = [
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Utensils, label: 'Restaurant' },
  { icon: Car, label: 'Parking' },
  { icon: Shield, label: '24/7 Security' },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Guwahati',
    text: 'Very clean rooms and excellent service. The staff was friendly and helpful. Will definitely visit again.',
    rating: 5,
  },
  {
    name: 'Priya Singh',
    location: 'Kolkata',
    text: 'Great location and affordable pricing. The food was delicious. Highly recommended for budget travelers.',
    rating: 5,
  },
  {
    name: 'Michael Ao',
    location: 'Kohima',
    text: 'Comfortable stay with all basic amenities. The AC rooms are well maintained and clean.',
    rating: 4,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#1B1B1B] min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#1B1B1B] via-[#2a2a2a] to-[#1B1B1B]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, #5F8C3F 0%, transparent 50%),
                             radial-gradient(circle at 75% 50%, #E53950 0%, transparent 50%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <Badge className="bg-[#5F8C3F] text-white mb-6 text-sm px-4 py-1">
              Dimapur, Nagaland
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Hotel Star City
            </h1>
            <p className="text-[#A8C65B] text-xl mb-4 font-medium">Lodging & Fooding</p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Experience comfortable and affordable hospitality in the heart of Dimapur.
              Clean rooms, great food, and warm service — everything you need for a perfect stay.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking">
                <Button size="lg" className="bg-[#E53950] hover:bg-[#c42d42] text-white px-8">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/rooms">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1B1B1B] px-8">
                  View Rooms
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-8 text-gray-400 text-sm">
              <MapPin className="h-4 w-4 text-[#5F8C3F]" />
              M.P. Road, Murgi Patti, Dimapur - 797112
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Bar */}
      <section className="bg-[#5F8C3F] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-white">
                <item.icon className="h-6 w-6 text-[#A8C65B]" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#A8C65B] text-[#1B1B1B] mb-4">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-6">
                Your Home Away From Home in Dimapur
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Hotel Star City has been serving travelers and guests in Dimapur with
                clean, comfortable, and affordable accommodation. Located conveniently
                on M.P. Road, we are easily accessible from the city center.
              </p>
              <ul className="space-y-3">
                {[
                  'AC and Non-AC rooms available',
                  'In-house restaurant with local and Indian cuisine',
                  'Safe and secure premises with 24/7 staff',
                  'Easy booking with instant WhatsApp confirmation',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#5F8C3F] shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="inline-block mt-8">
                <Button variant="outline" className="border-[#5F8C3F] text-[#5F8C3F] hover:bg-[#5F8C3F] hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-[#F8F8F8] rounded-2xl p-8 grid grid-cols-2 gap-4">
              {[
                { number: '5+', label: 'Years of Service' },
                { number: '1000+', label: 'Happy Guests' },
                { number: '20+', label: 'Rooms Available' },
                { number: '4.5★', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-3xl font-bold text-[#5F8C3F]">{stat.number}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#A8C65B] text-[#1B1B1B] mb-4">Our Rooms</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B1B1B]">
              Comfortable Rooms for Every Budget
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-linear-to-br from-[#5F8C3F] to-[#A8C65B] h-40 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold opacity-30">★</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[#1B1B1B] text-lg">{room.name}</h3>
                    <Badge className="bg-[#E53950] text-white text-xs">{room.badge}</Badge>
                  </div>
                  <p className="text-[#5F8C3F] font-bold text-2xl mb-3">{room.price}<span className="text-gray-400 text-sm font-normal">/night</span></p>
                  <p className="text-gray-500 text-sm mb-4">{room.description}</p>
                  <ul className="space-y-1 mb-6">
                    {room.features.map((f) => (
                      <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5F8C3F]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/booking">
                    <Button className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white">
                      Book This Room
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/rooms">
              <Button variant="outline" className="border-[#5F8C3F] text-[#5F8C3F] hover:bg-[#5F8C3F] hover:text-white">
                View All Rooms <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#A8C65B] text-[#1B1B1B] mb-4">Guest Reviews</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B1B1B]">
              What Our Guests Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <CardContent className="p-0">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#E53950] text-[#E53950]" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-[#1B1B1B]">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1B1B1B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Book directly with us for the best rates. No hidden charges.
            Instant WhatsApp confirmation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-[#E53950] hover:bg-[#c42d42] text-white px-8">
                Book Now
              </Button>
            </Link>
            <a href="tel:+918787430576">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1B1B1B] px-8">
                <Phone className="mr-2 h-4 w-4" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}