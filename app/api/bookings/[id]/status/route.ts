import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const secret = searchParams.get('secret');

    if (secret !== process.env.BOOKING_SECRET) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px">
          <h2 style="color:red">Unauthorized</h2>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'checked-in', 'completed'];
    if (!status || !validStatuses.includes(status)) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px">
          <h2 style="color:red">Invalid Status</h2>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    await connectDB();
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (!booking) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px">
          <h2 style="color:red">Booking Not Found</h2>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    const statusEmoji: Record<string, string> = {
      confirmed: '✅',
      cancelled: '❌',
      pending: '⏳',
      'checked-in': '🏨',
      completed: '🎉',
    };

    const statusColor: Record<string, string> = {
      confirmed: 'green',
      cancelled: 'red',
      pending: 'orange',
      'checked-in': 'blue',
      completed: 'purple',
    };

    const customerMessages: Record<string, string> = {
      confirmed: `Hello ${booking.fullName},\n\nYour booking at Hotel Star City has been *CONFIRMED*.\n\nRoom: ${booking.roomType}\nCheck-In: ${new Date(booking.checkIn).toDateString()}\nCheck-Out: ${new Date(booking.checkOut).toDateString()}\n\nWe look forward to welcoming you!\n\nHotel Star City\n+91 8787430576`,
      cancelled: `Hello ${booking.fullName},\n\nWe regret to inform you that your booking at Hotel Star City has been *CANCELLED*.\n\nRoom: ${booking.roomType}\nCheck-In: ${new Date(booking.checkIn).toDateString()}\n\nPlease contact us for more information.\n\nHotel Star City\n+91 8787430576`,
      pending: `Hello ${booking.fullName},\n\nYour booking at Hotel Star City is currently *PENDING* review.\n\nRoom: ${booking.roomType}\nCheck-In: ${new Date(booking.checkIn).toDateString()}\nCheck-Out: ${new Date(booking.checkOut).toDateString()}\n\nWe will confirm shortly.\n\nHotel Star City\n+91 8787430576`,
    };

    const customerPhone = booking.phone.replace(/\D/g, '');
    const customerMessage = customerMessages[status] || customerMessages['pending'];
    const whatsappUrl = `https://wa.me/${customerPhone}?text=${encodeURIComponent(customerMessage)}`;

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    return new NextResponse(
      `<html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Booking ${status}</title>
        </head>
        <body style="font-family:sans-serif;text-align:center;padding:30px;background:#f8f8f8">
          <div style="background:white;padding:30px;border-radius:12px;max-width:400px;margin:0 auto;box-shadow:0 2px 10px rgba(0,0,0,0.1)">
            <div style="font-size:48px;margin-bottom:10px">${statusEmoji[status] || '📋'}</div>
            <h2 style="color:${statusColor[status] || '#333'};text-transform:capitalize;margin:0 0 10px">
              Booking ${status}
            </h2>
            <p style="color:#666;margin-bottom:5px">
              <strong>${booking.fullName}</strong> has been marked as <strong>${status}</strong>.
            </p>
            <p style="color:#999;font-size:14px">${booking.roomType} · ${new Date(booking.checkIn).toDateString()}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
            <p style="color:#555;font-size:14px;margin-bottom:15px">
              Tap below to notify the customer on WhatsApp:
            </p>
            <a href="${whatsappUrl}" 
               style="display:block;background:#25D366;color:white;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-bottom:12px;font-size:16px">
              📱 Send WhatsApp to Customer
            </a>
            <a href="${baseUrl}/admin/bookings" 
               style="display:block;background:#5F8C3F;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px">
              View All Bookings
            </a>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:50px">
        <h2 style="color:red">Error</h2>
        <p>Something went wrong. Please try again.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}