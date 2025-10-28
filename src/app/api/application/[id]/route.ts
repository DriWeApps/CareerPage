export const dynamic = 'force-dynamic';
import prisma from '../../../../lib/prisma';

// Helper for consistent JSON responses
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ✅ Fetch a single application by ID
export async function GET(_: Request, { params }: any) {
  try {
    const id = Number(params.id);
    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) return jsonResponse({ error: 'Not found' }, 404);
    return jsonResponse(app);
  } catch (err) {
    console.error('GET error:', err);
    return jsonResponse({ error: 'Failed to fetch application' }, 500);
  }
}

// ✅ Delete application (no local file deletion — safe for Vercel)
export async function DELETE(_: Request, { params }: any) {
  try {
    const id = Number(params.id);
    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) return jsonResponse({ error: 'Not found' }, 404);

    // Only delete from DB, not filesystem
    await prisma.careerapplication.delete({ where: { id } });

    return jsonResponse({ message: 'Deleted successfully (file deletion skipped for Vercel)' });
  } catch (err) {
    console.error('DELETE error:', err);
    return jsonResponse({ error: 'Failed to delete application' }, 500);
  }
}
