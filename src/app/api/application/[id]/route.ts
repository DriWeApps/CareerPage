export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const app = await prisma.careerapplication.findUnique({ where: { id } });
    if (!app) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(app);
  } catch (error) {
    console.error("GET /api/application/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.careerapplication.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/application/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
