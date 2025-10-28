export const dynamic = 'force-dynamic';
import prisma from '../../../../lib/prisma';
import fs from 'fs';
import path from 'path';

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(_: Request, { params }: any) {
  const id = Number(params.id);
  const app = await prisma.careerapplication.findUnique({ where: { id } });
  if (!app) return jsonResponse({ error: 'Not found' }, 404);
  return jsonResponse(app);
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const id = Number(params.id);
    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) return jsonResponse({ error: 'Not found' }, 404);
    if (app.resumeUrl) {
      // derive the file path relative to /public from the resume URL
      const resumeRel = app.resumeUrl.replace(/^\//, '');
      const p = path.join(process.cwd(), 'public', resumeRel);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    await prisma.careerapplication.delete({ where: { id } });
    return jsonResponse({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return jsonResponse({ error: 'Failed' }, 500);
  }
}
