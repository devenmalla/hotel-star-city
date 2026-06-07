'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react';

interface Settings {
  hotelName: string;
  email: string;
  phone: string;
  address: string;
  whatsappNumber: string;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    hotelName: 'Hotel Star City',
    email: 'hotelstarcity@gmail.com',
    phone: '+91 8787430576',
    address: 'M.P. Road, Murgi Patti, Dimapur - 797112, Nagaland',
    whatsappNumber: '8787430576',
  });
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings(data.data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div>
      <section className="bg-[#1B1B1B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#5F8C3F] text-white mb-4">Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a question or need help with your booking? We are here 24/7.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-5">
                  <h2 className="font-bold text-[#1B1B1B] text-xl">Hotel Information</h2>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#5F8C3F] rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1B1B1B] text-sm">Address</p>
                      <p className="text-gray-500 text-sm mt-1">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#5F8C3F] rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1B1B1B] text-sm">Phone</p>
                      <a href={`tel:${settings.phone}`} className="text-gray-500 text-sm mt-1 hover:text-[#5F8C3F] block">
                        {settings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#5F8C3F] rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1B1B1B] text-sm">Email</p>
                      <a href={`mailto:${settings.email}`} className="text-gray-500 text-sm mt-1 hover:text-[#5F8C3F] block">
                        {settings.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#5F8C3F] rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1B1B1B] text-sm">Hours</p>
                      <p className="text-gray-500 text-sm mt-1">Open 24 hours, 7 days a week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#5F8C3F]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-white mb-2">Quick Booking</h3>
                  <p className="text-green-100 text-sm mb-4">Skip the form and book directly via WhatsApp.</p>
                  <a href={`https://wa.me/91${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-white text-[#5F8C3F] hover:bg-gray-100 font-semibold">
                      Chat on WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  {success ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8 text-[#5F8C3F]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#1B1B1B] mb-2">Message Sent!</h3>
                      <p className="text-gray-500">We will get back to you shortly.</p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-[#1B1B1B] mb-6">Send Us a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              placeholder="Your full name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="10-digit mobile number"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            placeholder="How can we help you?"
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={loading}
                          className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-0 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.123456789!2d93.7362!3d25.9064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDU0JzIzLjAiTiA5M8KwNDQnMTAuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel Star City Location"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}