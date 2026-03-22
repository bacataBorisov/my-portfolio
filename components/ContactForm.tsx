"use client";

import { useState } from "react";
import Button from "./Button";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrorMsg(data.error ?? "Something went wrong.");
                setStatus("error");
            } else {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
            }
        } catch {
            setErrorMsg("Network error — please try again.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="rounded-2xl border border-hummingbird-teal/30 bg-hummingbird-teal/5 px-6 py-8 text-center dark:border-hummingbird-aqua/30 dark:bg-hummingbird-aqua/5">
                <p className="text-2xl">✅</p>
                <p className="mt-2 font-medium text-slate-900 dark:text-white">Message sent!</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                    Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm text-hummingbird-teal underline hover:no-underline dark:text-hummingbird-aqua"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="contact-name" className="text-sm font-medium text-slate-700 dark:text-white/80">
                        Name
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-hummingbird-teal dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30 dark:focus:ring-hummingbird-aqua"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="contact-email" className="text-sm font-medium text-slate-700 dark:text-white/80">
                        Email
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-hummingbird-teal dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30 dark:focus:ring-hummingbird-aqua"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="contact-message" className="text-sm font-medium text-slate-700 dark:text-white/80">
                    Message
                </label>
                <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    className="rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-hummingbird-teal dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30 dark:focus:ring-hummingbird-aqua resize-none"
                />
            </div>

            {status === "error" && (
                <p role="alert" className="text-sm text-red-500 dark:text-red-400">
                    {errorMsg}
                </p>
            )}

            <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send message →"}
            </Button>
        </form>
    );
}
