'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle } from 'lucide-react';

interface Settings {
  hotelName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  whatsappNumber: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  roomPricing: {
    acSingle: number;
    acDouble: number;
    acSuite: number;
    nonAcSingle: number;
    nonAcDouble: number;
    extraPerson: number;
  };
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    hotelName: '',
    tagline: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    whatsappNumber: '',
    socialLinks: { facebook: '', instagram: '', twitter: '' },
    roomPricing: {
      acSingle: 1200,
      acDouble: 1500,
      acSuite: 2500,
      nonAcSingle: 800,
      nonAcDouble: 1000,
      extraPerson: 200,
    },
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings(data.data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (parent: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [parent]: { ...(prev as any)[parent], [field]: value },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#5F8C3F]" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1B1B]">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage hotel information and pricing</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#5F8C3F] hover:bg-[#4a6e30] text-white"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : saved ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : null}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Hotel Info */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-[#1B1B1B] mb-4">Hotel Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hotel Name</Label>
                <Input
                  value={settings.hotelName}
                  onChange={(e) => update('hotelName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  value={settings.tagline}
                  onChange={(e) => update('tagline', e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={settings.description}
                  onChange={(e) => update('description', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-[#1B1B1B] mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={settings.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => update('whatsappNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={settings.address}
                  onChange={(e) => update('address', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-[#1B1B1B] mb-4">Social Media Links</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Facebook</Label>
                <Input
                  placeholder="https://facebook.com/..."
                  value={settings.socialLinks.facebook}
                  onChange={(e) => updateNested('socialLinks', 'facebook', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input
                  placeholder="https://instagram.com/..."
                  value={settings.socialLinks.instagram}
                  onChange={(e) => updateNested('socialLinks', 'instagram', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Twitter / X</Label>
                <Input
                  placeholder="https://twitter.com/..."
                  value={settings.socialLinks.twitter}
                  onChange={(e) => updateNested('socialLinks', 'twitter', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Pricing */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-[#1B1B1B] mb-4">Room Pricing (₹ per night)</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { key: 'acSingle', label: 'AC Single Room' },
                { key: 'acDouble', label: 'AC Double Room' },
                { key: 'acSuite', label: 'AC Suite Room' },
                { key: 'nonAcSingle', label: 'Non-AC Single Room' },
                { key: 'nonAcDouble', label: 'Non-AC Double Room' },
                { key: 'extraPerson', label: 'Extra Person Charge' },
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label>{item.label}</Label>
                  <Input
                    type="number"
                    value={(settings.roomPricing as any)[item.key]}
                    onChange={(e) =>
                      updateNested('roomPricing', item.key, Number(e.target.value))
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}