import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { experience, formatRange } from "@/lib/experience";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const MAX_MESSAGES = 20;
const MAX_CONTENT = 500;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };

function buildSystemPrompt() {
    const educationLines = site.education
        .map(
            (e) =>
                `- ${e.degree}${e.status === "in progress" ? " (in progress)" : ""} — ${e.school}`
        )
        .join("\n");

    const projectLines = projects.map((p, i) => `${i + 1}. ${p.title} — ${p.summary}`).join("\n");

    const experienceLines = experience
        .map((e) => `- ${e.title} @ ${e.org} (${formatRange(e.start, e.end)})`)
        .join("\n");

    const skillLines = site.skills.join(", ");

    return `You are a friendly assistant on ${site.name}'s personal portfolio website.
Your job is to answer questions about ${site.name} in a concise, warm, and professional way.

Here is everything you know about ${site.name}:

TITLE: ${site.professionalTitle}

ABOUT:
${site.about.map((p) => `- ${p}`).join("\n")}

SKILLS:
${skillLines}

TRAINING:
${site.certifications.join(" · ")}

EDUCATION:
${educationLines}

PROJECTS:
${projectLines}

EXPERIENCE (parallel roles — see /experience for timeline):
${experienceLines}

CONTACT:
- Email: ${site.email}
- CV: ${site.url}${site.cvUrl}
- LinkedIn: ${site.social.linkedin}
- GitHub: ${site.social.github}
- Website: ${site.url}

PERSONAL:
- Passionate sailor — much of his software is inspired by his sailing experience
- Plays guitar in his free time
- Independent Partner / Manager at Oriflame Cosmetics Bulgaria

INSTRUCTIONS:
- Keep responses concise (2–4 sentences max) unless asked to elaborate
- Be warm and friendly, like a proud colleague introducing ${site.name}
- Present marine engineering and software as parallel strengths — never as a hobby or a career transition
- If asked something you don't know, say so honestly — don't make things up
- Direct visitors to the relevant pages (/projects, /experience, /about, /contact) or contact email for deeper questions
- Don't pretend to be ${site.name} himself — you're an assistant on his behalf`;
}

function sanitizeMessages(raw: unknown): ChatMessage[] | null {
    if (!Array.isArray(raw) || raw.length === 0) return null;

    const out: ChatMessage[] = [];
    for (const item of raw.slice(-MAX_MESSAGES)) {
        if (!item || typeof item !== "object") continue;
        const role = (item as { role?: unknown }).role;
        const content = (item as { content?: unknown }).content;
        if (role !== "user" && role !== "assistant") continue;
        if (typeof content !== "string") continue;
        const trimmed = content.trim().slice(0, MAX_CONTENT);
        if (!trimmed) continue;
        out.push({ role, content: trimmed });
    }

    return out.length ? out : null;
}

export async function POST(req: NextRequest) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Chat is not configured yet." }, { status: 503 });
    }

    if (!rateLimit("chat", clientIp(req), RATE_LIMIT, RATE_WINDOW_MS)) {
        return NextResponse.json(
            { error: "Too many messages — try again in a few minutes." },
            { status: 429 }
        );
    }

    let messages: ChatMessage[];
    try {
        const body = await req.json();
        const sanitized = sanitizeMessages(body.messages);
        if (!sanitized) {
            return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
        }
        messages = sanitized;
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey });

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
            max_tokens: 300,
            temperature: 0.7,
        });

        const reply =
            completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
        return NextResponse.json({ reply });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[chat] OpenAI error:", message);
        return NextResponse.json(
            { error: "The assistant is unavailable right now. Please try again." },
            { status: 502 }
        );
    }
}
