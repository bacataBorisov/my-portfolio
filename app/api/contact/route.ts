import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const MAX_NAME = 100;
const MAX_MESSAGE = 2000;
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Contact form is not configured yet." }, { status: 503 });
    }

    if (!rateLimit("contact", clientIp(req), RATE_LIMIT, RATE_WINDOW_MS)) {
        return NextResponse.json(
            { error: "Too many messages — try again in a few minutes." },
            { status: 429 }
        );
    }

    let name: string, email: string, message: string, honeypot: string;
    try {
        const body = await req.json();
        honeypot = String(body.company ?? "").trim();
        name = String(body.name ?? "")
            .trim()
            .slice(0, MAX_NAME);
        email = String(body.email ?? "").trim();
        message = String(body.message ?? "")
            .trim()
            .slice(0, MAX_MESSAGE);
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Bots that fill hidden fields get a fake success so they don't retry.
    if (honeypot) {
        return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "Name, email, and message are required." },
            { status: 422 }
        );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
    }

    const resend = new Resend(apiKey);

    try {
        await resend.emails.send({
            from: FROM,
            to: site.email,
            replyTo: email,
            subject: `Portfolio message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                <hr />
                <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[contact] Resend error:", msg);
        return NextResponse.json(
            { error: "Failed to send. Please email me directly instead." },
            { status: 502 }
        );
    }
}
