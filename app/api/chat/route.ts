import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

function buildSystemPrompt() {
    const educationLines = site.education
        .map((e) => `- ${e.degree}${e.status === "in progress" ? " (in progress)" : ""} — ${e.school}`)
        .join("\n");

    const projectLines = projects
        .map((p, i) => `${i + 1}. ${p.title} — ${p.summary}`)
        .join("\n");

    const skillLines = site.skills.join(", ");

    return `You are a friendly assistant on ${site.name}'s personal portfolio website.
Your job is to answer questions about ${site.name} in a concise, warm, and professional way.

Here is everything you know about ${site.name}:

ABOUT:
- Full name: ${site.name}, also goes by "${site.nickname}" with friends
- Current role: ${site.role}
- He is transitioning into software engineering — programming started as a hobby and has grown into a serious passion
- He builds navigation tools, simulators, and data bridges between marine sensors and mobile/desktop UIs

SKILLS:
${skillLines}
- React, Next.js, TypeScript, Tailwind CSS (this portfolio!)

EDUCATION:
${educationLines}

PROJECTS:
${projectLines}

CONTACT:
- Email: ${site.email}
- LinkedIn: ${site.social.linkedin}
- GitHub: ${site.social.github}
- Website: ${site.url}

PERSONAL:
- Passionate sailor — much of his software is inspired by his sailing experience
- Plays guitar in his free time
- Manages a team at Oriflame (Health & Beauty), developing leadership skills

INSTRUCTIONS:
- Keep responses concise (2–4 sentences max) unless asked to elaborate
- Be warm and friendly, like a proud colleague introducing ${site.name}
- If asked something you don't know, say so honestly — don't make things up
- Direct visitors to the relevant pages or contact email for deeper questions
- Don't pretend to be ${site.name} himself — you're an assistant on his behalf`;
}

export async function POST(req: NextRequest) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "Chat is not configured yet." },
            { status: 503 }
        );
    }

    let messages: { role: "user" | "assistant"; content: string }[];
    try {
        const body = await req.json();
        messages = body.messages;
        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
        }
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey });

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: buildSystemPrompt() },
                ...messages,
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
        return NextResponse.json({ reply });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[chat] OpenAI error:", message);
        return NextResponse.json(
            { error: `OpenAI error: ${message}` },
            { status: 502 }
        );
    }
}
