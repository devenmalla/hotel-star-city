import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: rooms });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const room = await Room.create(body);
    return NextResponse.json({ success: true, data: room });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create room' }, { status: 500 });
  }
}