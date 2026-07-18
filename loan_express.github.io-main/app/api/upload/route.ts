import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth";
import { validateFile, ALLOWED_MIME_TYPES } from "@/lib/utils/file-validation";
import getSupabase from "@/lib/supabase";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SIGNED_URL_EXPIRY = 60 * 60; // 1 hour in seconds

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
    }

    // Validate file type
    const buffer = await file.arrayBuffer();
    const validation = await validateFile(Buffer.from(buffer), file.type, file.size);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Upload to Supabase Storage
    const supabase = getSupabase();
    const bucketName = "documentos";
    const fileName = `${user.id}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    // Create signed URL with expiration instead of public URL
    const { data: { signedUrl } } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, SIGNED_URL_EXPIRY);

    if (!signedUrl) {
      console.error("Failed to create signed URL");
      return NextResponse.json({ error: "Failed to create signed URL" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      url: signedUrl,
      name: file.name,
      size: file.size,
      mime: file.type,
      // Return both signed URL and path for later reference
      path: fileName
    });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("/api/upload error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
