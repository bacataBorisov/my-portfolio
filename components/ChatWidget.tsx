"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const SUGGESTED_QUESTIONS = [
    "What does Vasil work on?",
    "What are his main skills?",
    "How can I contact him?",
];

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm Vasil's AI assistant. Ask me anything about his work, skills, or projects.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            inputRef.current?.focus();
        }
    }, [open, messages]);

    async function send(text?: string) {
        const userText = (text ?? input).trim();
        if (!userText || loading) return;
        setInput("");

        const newMessages: Message[] = [...messages, { role: "user", content: userText }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply ?? data.error ?? "Something went wrong." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Open chat assistant"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hummingbird-teal shadow-lg transition hover:bg-hummingbird-sage focus:outline-none focus:ring-2 focus:ring-hummingbird-aqua"
            >
                {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
                    </svg>
                )}
            </button>

            {/* Chat panel */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col rounded-2xl border border-black/10 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/70 sm:w-[380px]">
                    {/* Header */}
                    <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3 dark:border-white/10">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hummingbird-teal text-xs font-bold text-white">
                            VB
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Ask about Vasil</p>
                            <p className="text-xs text-slate-400 dark:text-white/50">AI-powered · usually instant</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-3">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                                        m.role === "user"
                                            ? "bg-hummingbird-teal text-white"
                                            : "bg-black/5 text-slate-800 dark:bg-white/10 dark:text-white/90"
                                    }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="rounded-xl bg-black/5 px-3 py-2 text-sm text-slate-400 dark:bg-white/10 dark:text-white/50">
                                    Thinking…
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Suggested questions (only at start) */}
                    {messages.length === 1 && (
                        <div className="flex flex-wrap gap-2 border-t border-black/10 px-4 py-2 dark:border-white/10">
                            {SUGGESTED_QUESTIONS.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => send(q)}
                                    className="rounded-full border border-black/15 bg-black/5 px-3 py-1 text-xs text-slate-600 transition hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="flex items-center gap-2 border-t border-black/10 px-3 py-3 dark:border-white/10">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder="Ask anything…"
                            className="flex-1 rounded-lg bg-black/5 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-1 focus:ring-hummingbird-teal dark:bg-white/10 dark:text-white dark:placeholder-white/40 dark:focus:ring-hummingbird-aqua"
                        />
                        <button
                            onClick={() => send()}
                            disabled={!input.trim() || loading}
                            aria-label="Send message"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-hummingbird-teal text-white transition hover:bg-hummingbird-sage disabled:opacity-40"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
