'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader2 } from 'lucide-react';

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  checkIn: z.string().min(1, 'Select check-in date'),
  checkOut: z.string().min(1, 'Select check-out date'),
  roomType: z.string().min(1, 'Select a room type'),
  guests: z.string().min(1, 'Select number of guests'),
  specialRequests: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

const roomTypes = [
  { value: 'AC Single Room', label: 'AC Single Room - ₹1,200/night' },
  { value: 'AC Double Room', label: 'AC Double Room - ₹1,500/night' },
  { value: 'AC Suite Room', label: 'AC Suite Room - ₹2,500/night' },
  { value: 'Non-AC Single Room', label: 'Non-AC Single Room - ₹800/night' },
  { value: 'Non-AC Double Room', label: 'Non-AC Double Room - ₹1,000/night' },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    const room = searchParams.get('room');
    if (room) setValue('roomType', room);
  }, [searchParams, setValue]);

  const onSubmit = async (data: BookingForm) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          window.open(result.whatsappUrl, '_blank');
        }, 1500);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-[#5F8C3F]" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B1B1B] mb-4">Booking Received!</h2>
        <p className="text-gray-500 mb-2">Your booking has been saved successfully.</p>
        <p className="text-gray-500">Redirecting you to WhatsApp for confirmation...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            {...register('fullName')}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="10-digit mobile number"
            {...register('phone')}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="roomType">Room Type *</Label>
          <Select
            onValueChange={(val) => setValue('roomType', val)}
            defaultValue={searchParams.get('room') || ''}
          >
            <SelectTrigger className={errors.roomType ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((room) => (
                <SelectItem key={room.value} value={room.value}>
                  {room.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.roomType && <p className="text-red-500 text-xs">{errors.roomType.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkIn">Check-In Date *</Label>
          <Input
            id="checkIn"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            {...register('checkIn')}
            className={errors.checkIn ? 'border-red-500' : ''}
          />
          {errors.checkIn && <p className="text-red-500 text-xs">{errors.checkIn.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkOut">Check-Out Date *</Label>
          <Input
            id="checkOut"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            {...register('checkOut')}
            className={errors.checkOut ? 'border-red-500' : ''}
          />
          {errors.checkOut && <p className="text-red-500 text-xs">{errors.checkOut.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests *</Label>
          <Select onValueChange={(val) => setValue('guests', val)}>
            <SelectTrigger className={errors.guests ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.guests && <p className="text-red-500 text-xs">{errors.guests.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requests or requirements..."
          rows={3}
          {...register('specialRequests')}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white py-6 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Confirm Booking via WhatsApp'
        )}
      </Button>

      <p className="text-center text-xs text-gray-400">
        Your booking is saved instantly. You will be redirected to WhatsApp to confirm with the hotel.
      </p>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B1B1B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#5F8C3F] text-white mb-4">Book Your Stay</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reserve Your Room
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Fill in the form below and confirm your booking instantly via WhatsApp.
            No account needed.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#1B1B1B] mb-6">Booking Details</h2>
                  <Suspense fallback={<div>Loading...</div>}>
                    <BookingForm />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#1B1B1B] mb-4">Room Pricing</h3>
                  <ul className="space-y-3">
                    {[
                      { name: 'AC Single', price: '₹1,200' },
                      { name: 'AC Double', price: '₹1,500' },
                      { name: 'AC Suite', price: '₹2,500' },
                      { name: 'Non-AC Single', price: '₹800' },
                      { name: 'Non-AC Double', price: '₹1,000' },
                      { name: 'Extra Person', price: '₹200' },
                    ].map((item) => (
                      <li key={item.name} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-semibold text-[#5F8C3F]">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#1B1B1B] mb-4">How It Works</h3>
                  <ol className="space-y-3">
                    {[
                      'Fill in your details',
                      'Submit the booking form',
                      'Get redirected to WhatsApp',
                      'Confirm with the hotel',
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="shrink-0 w-6 h-6 bg-[#5F8C3F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-[#1B1B1B]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-white mb-2">Need Help?</h3>
                  <p className="text-gray-400 text-sm mb-4">Call us directly to make a reservation.</p>
                  <a href="tel:+918787430576">
                    <Button className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white">
                      Call Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}