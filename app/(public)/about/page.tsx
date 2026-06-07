import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export const revalidate = 60; // revalidate every 60 seconds

async function getSettings() {
  await connectDB();
  let settings = await Settings.findOne({});
  if (!settings) settings = await Settings.create({});
  return JSON.parse(JSON.stringify(settings));
}

const values = [
  { title: 'Cleanliness', description: 'Every room is thoroughly cleaned and inspected before each guest checks in.' },
  { title: 'Affordability', description: 'We believe quality accommodation should be accessible to everyone.' },
  { title: 'Warm Service', description: 'Our staff treats every guest like family, available 24/7 for your needs.' },
  { title: 'Great Food', description: 'Our in-house restaurant serves fresh local and Indian cuisine daily.' },
];

const team = [
  { name: 'Hotel Management', role: 'Operations & Guest Relations' },
  { name: 'Kitchen Staff', role: 'In-house Restaurant' },
  { name: 'Housekeeping', role: 'Room Maintenance & Cleanliness' },
  { name: 'Security', role: '24/7 Premises Security' },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div>
      <section className="bg-[#1B1B1B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#5F8C3F] text-white mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to {settings.hotelName}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            {settings.tagline} — Serving travelers and guests in Dimapur, Nagaland with comfort, warmth, and affordability.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#A8C65B] text-[#1B1B1B] mb-4">Our Story</Badge>
              <h2 className="text-3xl font-bold text-[#1B1B1B] mb-6">
                A Home Away From Home in Dimapur
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {settings.description || 'Hotel Star City was established with a simple vision — to provide clean, comfortable, and affordable accommodation to every traveler passing through Dimapur, Nagaland.'}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Located conveniently on {settings.address}, we are easily accessible from the city center, railway station, and bus terminals.
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '5+', label: 'Years of Service' },
                { number: '1000+', label: 'Happy Guests' },
                { number: '20+', label: 'Rooms Available' },
                { number: '4.5★', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#F8F8F8] rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-[#5F8C3F]">{stat.number}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#A8C65B] text-[#1B1B1B] mb-4">Our Values</Badge>
            <h2 className="text-3xl font-bold text-[#1B1B1B]">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-[#5F8C3F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#1B1B1B] mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#A8C65B] text-[#1B1B1B] mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold text-[#1B1B1B]">The People Behind the Service</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-linear-to-br from-[#5F8C3F] to-[#A8C65B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-[#1B1B1B] mb-1">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-[#1B1B1B] text-xl mb-6">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-[#5F8C3F] shrink-0 mt-0.5" />
                    {settings.address}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Phone className="h-5 w-5 text-[#5F8C3F] shrink-0" />
                    <a href={`tel:${settings.phone}`} className="hover:text-[#5F8C3F]">{settings.phone}</a>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Mail className="h-5 w-5 text-[#5F8C3F] shrink-0" />
                    <a href={`mailto:${settings.email}`} className="hover:text-[#5F8C3F]">{settings.email}</a>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-5 w-5 text-[#5F8C3F] shrink-0" />
                    Open 24 hours, 7 days a week
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1B1B1B]">
              <CardContent className="p-8">
                <h3 className="font-bold text-white text-xl mb-4">Ready to Stay With Us?</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Book your room today and experience the warmth and comfort of {settings.hotelName}. Best rates guaranteed when you book directly with us.
                </p>
                <div className="space-y-3">
                  <Link href="/booking">
                    <Button className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white">Book Now</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">Contact Us</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}