'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Plus, Pencil, Trash2, CheckCircle } from 'lucide-react';

interface Room {
  _id: string;
  name: string;
  type: string;
  price: number;
  extraPersonCharge: number;
  description: string;
  features: string[];
  isAvailable: boolean;
}

const roomTypes = [
  { value: 'ac-single', label: 'AC Single Room' },
  { value: 'ac-double', label: 'AC Double Room' },
  { value: 'ac-suite', label: 'AC Suite Room' },
  { value: 'non-ac-single', label: 'Non-AC Single Room' },
  { value: 'non-ac-double', label: 'Non-AC Double Room' },
];

const emptyForm = {
  name: '',
  type: '',
  price: '',
  extraPersonCharge: '0',
  description: '',
  features: '',
  isAvailable: true,
};

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    const res = await fetch('/api/rooms');
    const data = await res.json();
    if (data.success) setRooms(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (room: Room) => {
    setEditing(room);
    setForm({
      name: room.name,
      type: room.type,
      price: String(room.price),
      extraPersonCharge: String(room.extraPersonCharge),
      description: room.description,
      features: room.features.join(', '),
      isAvailable: room.isAvailable,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      extraPersonCharge: Number(form.extraPersonCharge),
      features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
    };

    if (editing) {
      await fetch(`/api/rooms/${editing._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    await fetchRooms();
    setOpen(false);
    setSaving(false);
  };

  const deleteRoom = async (id: string) => {
    if (!confirm('Delete this room?')) return;
    await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
    await fetchRooms();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1B1B]">Rooms</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your room inventory and pricing</p>
        </div>
        <Button onClick={openAdd} className="bg-[#5F8C3F] hover:bg-[#4a6e30] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#5F8C3F]" />
        </div>
      ) : rooms.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-400 mb-4">No rooms added yet.</p>
            <Button onClick={openAdd} className="bg-[#5F8C3F] hover:bg-[#4a6e30] text-white">
              Add Your First Room
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[#1B1B1B]">{room.name}</h3>
                    <p className="text-[#5F8C3F] font-bold text-xl mt-1">
                      ₹{room.price.toLocaleString('en-IN')}
                      <span className="text-gray-400 text-sm font-normal">/night</span>
                    </p>
                  </div>
                  <Badge className={room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {room.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{room.description}</p>
                {room.features.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {room.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle className="h-3 w-3 text-[#5F8C3F]" />
                        {f}
                      </li>
                    ))}
                    {room.features.length > 3 && (
                      <li className="text-xs text-gray-400">+{room.features.length - 3} more</li>
                    )}
                  </ul>
                )}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(room)}
                    className="flex-1"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteRoom(room._id)}
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Room' : 'Add New Room'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Room Name</Label>
              <Input
                placeholder="e.g. AC Single Room 101"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Room Type</Label>
              <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price per Night (₹)</Label>
                <Input
                  type="number"
                  placeholder="1200"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Extra Person Charge (₹)</Label>
                <Input
                  type="number"
                  placeholder="200"
                  value={form.extraPersonCharge}
                  onChange={(e) => setForm({ ...form, extraPersonCharge: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the room..."
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Input
                placeholder="AC, Double Bed, Hot Water, TV"
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <Select
                value={form.isAvailable ? 'true' : 'false'}
                onValueChange={(val) => setForm({ ...form, isAvailable: val === 'true' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#5F8C3F] hover:bg-[#4a6e30] text-white"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Room'}
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}