'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, Trash2, Phone, Mail, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Booking {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
  specialRequests?: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  'checked-in': 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statuses = ['all', 'pending', 'confirmed', 'checked-in', 'completed', 'cancelled'];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter !== 'all') params.set('status', statusFilter);

    const res = await fetch(`/api/bookings?${params}`);
    const data = await res.json();
    if (data.success) setBookings(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await fetchBookings();
    setUpdating(null);
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return;
    await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    await fetchBookings();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B1B1B]">Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all guest bookings</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
              <Input
                placeholder="Search by name, email or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-[#5F8C3F] hover:bg-[#4a6e30] text-white">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#5F8C3F]" />
        </div>
      ) : bookings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-400">No bookings found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-[#1B1B1B]">{booking.fullName}</h3>
                      <Badge className={`text-xs ${statusColors[booking.status]}`}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {booking.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {booking.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </span>
                      <span>{booking.roomType} · {booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                    {booking.specialRequests && (
                      <p className="text-xs text-gray-400 mt-2">Note: {booking.specialRequests}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={booking.status}
                      onValueChange={(val) => updateStatus(booking._id, val)}
                      disabled={updating === booking._id}
                    >
                      <SelectTrigger className="w-36 text-xs">
                        {updating === booking._id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.filter((s) => s !== 'all').map((s) => (
                          <SelectItem key={s} value={s} className="text-xs">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBooking(booking._id)}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}