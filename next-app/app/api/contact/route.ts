import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email/resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Basic validation
    const { name, email, phone, amount, message } = data;
    if (!name || !email) {
      return NextResponse.json({ error: "name and email required" }, { status: 400 });
    }

    // Send email notification
    const emailResult = await sendContactNotification({ name, email, phone, amount, message });
    
    if (!emailResult.success) {
      console.error('Failed to send contact notification:', emailResult.error);
      // Return ok to user even if email fails, but log the error
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
}
