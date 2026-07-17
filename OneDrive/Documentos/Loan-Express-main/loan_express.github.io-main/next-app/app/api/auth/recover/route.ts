import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

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
