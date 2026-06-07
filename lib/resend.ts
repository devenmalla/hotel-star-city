import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(booking: {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
  specialRequests?: string;
}) {
  try {
    await resend.emails.send({
      from: 'Hotel Star City <onboarding@resend.dev>',
      to: booking.email,
      subject: 'Booking Confirmation - Hotel Star City',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #5F8C3F; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Hotel Star City</h1>
            <p style="color: #A8C65B; margin: 5px 0;">Lodging & Fooding</p>
          </div>
          <div style="padding: 30px; background: #f8f8f8;">
            <h2 style="color: #1B1B1B;">Booking Request Received!</h2>
            <p>Dear ${booking.fullName},</p>
            <p>Thank you for choosing Hotel Star City. We have received your booking request and will confirm shortly.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #5F8C3F; margin-top: 0;">Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666;">Room Type</td><td style="padding: 8px 0; font-weight: bold;">${booking.roomType}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Check-In</td><td style="padding: 8px 0; font-weight: bold;">${new Date(booking.checkIn).toDateString()}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Check-Out</td><td style="padding: 8px 0; font-weight: bold;">${new Date(booking.checkOut).toDateString()}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Guests</td><td style="padding: 8px 0; font-weight: bold;">${booking.guests}</td></tr>
                ${booking.specialRequests ? `<tr><td style="padding: 8px 0; color: #666;">Special Requests</td><td style="padding: 8px 0; font-weight: bold;">${booking.specialRequests}</td></tr>` : ''}
              </table>
            </div>

            <p>For any queries, contact us:</p>
            <p>📞 +91 8787430576</p>
            <p>📍 M.P. Road, Murgi Patti, Dimapur - 797112, Nagaland</p>
          </div>
          <div style="background: #1B1B1B; padding: 20px; text-align: center;">
            <p style="color: #666; margin: 0;">© 2024 Hotel Star City. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    // Also notify hotel
    await resend.emails.send({
      from: 'Hotel Star City <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'hotelstarcity@gmail.com',
      subject: `New Booking Request from ${booking.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #5F8C3F; padding: 20px;">
            <h2 style="color: white; margin: 0;">New Booking Request</h2>
          </div>
          <div style="padding: 20px;">
            <p><strong>Name:</strong> ${booking.fullName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Room:</strong> ${booking.roomType}</p>
            <p><strong>Check-In:</strong> ${new Date(booking.checkIn).toDateString()}</p>
            <p><strong>Check-Out:</strong> ${new Date(booking.checkOut).toDateString()}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}