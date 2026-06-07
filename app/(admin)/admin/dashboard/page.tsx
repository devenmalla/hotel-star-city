import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

async function getStats() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [total, todayCount, pending, recent] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
    Booking.countDocuments({ status: 'pending' }),
    Booking.find().sort({ createdAt: -1 }).limit(5),
  ]);

  return { total, todayCount, pending, recent };
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  'checked-in': 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/admin');

  const { total, todayCount, pending, recent } = await getStats();

  const stats = [
    {
      label: 'Total Bookings',
      value: total,
      icon: CalendarDays,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: "Today's Bookings",
      value: todayCount,
      icon: Clock,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Pending',
      value: pending,
      icon: CheckCircle,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Completed',
      value: total - pending,
      icon: XCircle,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B1B1B]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1B1B1B]">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-bold text-[#1B1B1B] text-lg mb-6">Recent Bookings</h2>
          {recent.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {recent.map((booking: any) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-lg"
                >
                  <div>
                    <p className="font-medium text-[#1B1B1B] text-sm">{booking.fullName}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {booking.roomType} · {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-400">{booking.phone}</p>
                    <Badge className={`text-xs ${statusColors[booking.status]}`}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}