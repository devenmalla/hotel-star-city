import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingConfirmation } from '@/lib/resend';
import { generateWhatsAppMessage } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query: any = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const booking = await Booking.create(body);

    sendBookingConfirmation({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      roomType: body.roomType,
      guests: body.guests,
      specialRequests: body.specialRequests,
    }).catch(console.error);

    const whatsappMessage = generateWhatsAppMessage(body, booking._id.toString());
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8787430576';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      data: booking,
      whatsappUrl,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create booking' }, { status: 500 });
  }
}