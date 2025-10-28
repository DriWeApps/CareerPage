export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import prisma from '../../../../lib/prisma';

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(_: Request, { params }: any) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return jsonResponse({ error: 'Invalid ID' }, 400);

    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) return jsonResponse({ error: 'Not found' }, 404);

    return jsonResponse(app);
  } catch (err) {
    console.error('GET /api/application/[id] error:', err);
    return jsonResponse({ error: 'Server error' }, 500);
  }
}

export async function DELETE(_: Request, { params }: any) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return jsonResponse({ error: 'Invalid ID' }, 400);

    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) return jsonResponse({ error: 'Not found' }, 404);

    await prisma.careerapplication.delete({ where: { id } });
    return jsonResponse({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/application/[id] error:', err);
    return jsonResponse({ error: 'Server error' }, 500);
  }
}
