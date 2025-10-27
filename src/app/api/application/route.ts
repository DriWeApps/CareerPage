import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const jobTitle = formData.get("jobTitle")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const dob = formData.get("dob")?.toString() || "";
    const mobileNumber = formData.get("mobileNumber")?.toString() || "";
    const education = formData.get("education")?.toString() || "";
    const experience = formData.get("experience")?.toString() || "";
    const address = formData.get("address")?.toString() || "";

    let resumeUrl = "";
    const file = formData.get("resume") as File | null;

    if (file && typeof file !== "string") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, file.name);

      await writeFile(filePath, buffer);
      resumeUrl = `/uploads/${file.name}`;
    }

    await prisma.careerapplication.create({
      data: {
        jobTitle,
        name,
        email,
        dob,
        mobileNumber,
        education,
        experience,
        address,
        resumeUrl,
      },
    });

    return NextResponse.json({ success: true, message: "Application Submitted" }, { status: 200 });

  } catch (error) {
    console.error("💥 APPLICATION ERROR:", error);
    return NextResponse.json({ success: false, error: "Application failed" }, { status: 500 });
  }
}

// ✅ ADD THIS (GET ALL APPLICATIONS)
export async function GET() {
  try {
    const applications = await prisma.careerapplication.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("💥 FETCH ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}
