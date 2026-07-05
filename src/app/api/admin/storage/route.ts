import { NextResponse } from "next/server";
import { getStorageMode } from "@/lib/db/store";

export async function GET() {
  const mode = getStorageMode();
  const onVercel = Boolean(process.env.VERCEL);
  const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const persistent = mode === "redis";

  return NextResponse.json({
    mode,
    onVercel,
    persistent,
    uploads: hasBlob ? "blob" : "local",
    ready: !onVercel || (persistent && hasBlob),
    message:
      onVercel && !persistent
        ? "Add Upstash Redis (or Vercel KV) env vars — file storage does not persist on Vercel."
        : onVercel && !hasBlob
          ? "Add Vercel Blob store for image uploads."
          : "Storage OK",
  });
}
