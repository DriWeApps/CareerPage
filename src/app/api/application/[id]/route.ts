// ✅ Prevent static generation completely
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const preferredRegion = 'auto';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: Request, context: any) {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(app);
  } catch (error) {
    console.error('❌ GET /api/application/[id] error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.careerapplication.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE /api/application/[id] error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
