import { NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/db/store";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    if (!["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const url = await saveUploadedFile(filename, buffer);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
