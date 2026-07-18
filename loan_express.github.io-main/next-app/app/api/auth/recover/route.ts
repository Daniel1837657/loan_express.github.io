import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  // Rate limiting: 3 password recovery attempts per hour per email
  const identifier = getRateLimitIdentifier(request, email);
  const rateLimitResult = rateLimit(identifier, 3, 60 * 60 * 1000);
  
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: rateLimitResult.error }, { status: 429 });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
