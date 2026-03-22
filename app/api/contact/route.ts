import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const MAX_NAME = 100;
const MAX_MESSAGE = 2000;

export async function POST(req: NextRequest) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Contact form is not configured yet." }, { status: 503 });
    }

    let name: string, email: string, message: string;
    try {
        const body = await req.json();
        name = String(body.name ?? "").trim().slice(0, MAX_NAME);
        email = String(body.email ?? "").trim();
        message = String(body.message ?? "").trim().slice(0, MAX_MESSAGE);
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Name, email, and message are required." }, { status: 422 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
    }

    const resend = new Resend(apiKey);

    try {
        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: site.email,
            replyTo: email,
            subject: `Portfolio message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <hr />
                <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[contact] Resend error:", msg);
        return NextResponse.json({ error: `Failed to send: ${msg}` }, { status: 502 });
    }
}
