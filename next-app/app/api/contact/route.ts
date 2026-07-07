import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Basic validation
    const { name, email, phone, amount, message } = data;
    if (!name || !email) {
      return NextResponse.json({ error: "name and email required" }, { status: 400 });
    }

    // TODO: persist to DB or send email via provider (Resend, SendGrid, etc.)
    console.log("Contact form submitted:", { name, email, phone, amount, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
}
