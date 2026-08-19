"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { site } from "@/lib/site";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const WELCOME: Message = {
    role: "assistant",
    content: `Hi! I'm ${site.name.split(" ")[0]}'s AI assistant. Ask me anything about his work, skills, or projects.`,
};

const SUGGESTED_QUESTIONS = [
    `What does ${site.name.split(" ")[0]} work on?`,
    "What are his main skills?",
    "How can I contact him?",
];

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const panelRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [open, messages]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
                return;
            }
            if (e.key === "Tab" && panelRef.current) {
                const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                    'button, input, [tabindex]:not([tabindex="-1"])'
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        },
        [open]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    async function send(text?: string) {
        const userText = (text ?? input).trim();
        if (!userText || loading) return;
        setInput("");

        const newMessages: Message[] = [...messages, { role: "user", content: userText }];
        setMessages(newMessages);
        setLoading(true);

        const payload = newMessages.filter(
            (_, i) => !(i === 0 && newMessages[0].role === "assistant")
        );

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: payload }),
            });
            const data = await res.json();
            const content = data.reply ?? data.error ?? "Something went wrong.";
            setMessages((prev) => [...prev, { role: "assistant", content }]);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Network error — please try again.";
            setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                ref={toggleRef}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close chat assistant" : "Open chat assistant"}
                aria-expanded={open}
                aria-controls="chat-panel"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hummingbird-teal shadow-lg transition hover:bg-hummingbird-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hummingbird-aqua focus-visible:ring-offset-2"
            >
                {open ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                        />
                    </svg>
                )}
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 sm:bg-black/20"
                    onClick={() => setOpen(false)}
                    aria-hidden
                />
            )}

            {open && (
                <div
                    id="chat-panel"
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Chat with ${site.name.split(" ")[0]}'s AI assistant`}
                    className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(70vh,32rem)] w-auto flex-col rounded-2xl border border-black/10 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/70 sm:inset-x-auto sm:right-6 sm:w-[380px]"
                >
                    <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3 dark:border-white/10">
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-hummingbird-teal text-xs font-bold text-white"
                            aria-hidden
                        >
                            VB
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Ask about {site.name.split(" ")[0]}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-white/50">
                                AI-powered · usually instant
                            </p>
                        </div>
                    </div>

                    <div
                        role="log"
                        aria-live="polite"
                        aria-atomic="false"
                        aria-label="Conversation"
                        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
                    >
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
                            <div className="flex justify-start" aria-label="Assistant is typing">
                                <div className="rounded-xl bg-black/5 px-3 py-2 text-sm text-slate-400 dark:bg-white/10 dark:text-white/50">
                                    Thinking…
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {messages.length === 1 && (
                        <div
                            className="flex flex-wrap gap-2 border-t border-black/10 px-4 py-2 dark:border-white/10"
                            aria-label="Suggested questions"
                        >
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

                    <div className="flex items-center gap-2 border-t border-black/10 px-3 py-3 dark:border-white/10">
                        <label htmlFor="chat-input" className="sr-only">
                            Message
                        </label>
                        <input
                            id="chat-input"
                            ref={inputRef}
                            type="text"
                            maxLength={500}
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden
                            >
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
