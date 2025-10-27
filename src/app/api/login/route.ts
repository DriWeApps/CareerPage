import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Invalid login' }, { status: 401 });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return NextResponse.json({ error: 'Invalid login' }, { status: 401 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('LOGIN ERROR', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
