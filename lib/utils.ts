import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateNights(checkIn: Date | string, checkOut: Date | string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function generateWhatsAppMessage(
  booking: {
    fullName: string;
    phone: string;
    email: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    guests: number;
    specialRequests?: string;
  },
  bookingId?: string
) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const secret = process.env.BOOKING_SECRET || '';

  const statusLinks = bookingId
    ? `\n\n✅ Confirm: ${baseUrl}/api/bookings/${bookingId}/status?status=confirmed&secret=${secret}\n❌ Cancel: ${baseUrl}/api/bookings/${bookingId}/status?status=cancelled&secret=${secret}\n⏳ Pending: ${baseUrl}/api/bookings/${bookingId}/status?status=pending&secret=${secret}`
    : '';

  const message = `
*New Booking Request - Hotel Star City*

*Guest Details:*
Name: ${booking.fullName}
Phone: ${booking.phone}
Email: ${booking.email}

*Booking Details:*
Room Type: ${booking.roomType}
Check-In: ${formatDate(booking.checkIn)}
Check-Out: ${formatDate(booking.checkOut)}
Guests: ${booking.guests}
${booking.specialRequests ? `Special Requests: ${booking.specialRequests}` : ''}${statusLinks}

_Booking submitted via website_
  `.trim();

  return encodeURIComponent(message);
}

export const ROOM_TYPES = [
  { value: 'ac-single', label: 'AC Single Room', price: 1200 },
  { value: 'ac-double', label: 'AC Double Room', price: 1500 },
  { value: 'ac-suite', label: 'AC Suite Room', price: 2500 },
  { value: 'non-ac-single', label: 'Non-AC Single Room', price: 800 },
  { value: 'non-ac-double', label: 'Non-AC Double Room', price: 1000 },
];