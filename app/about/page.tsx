import type { Metadata } from "next";
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import Link from "next/link";
import { site, aboutSkills } from "@/lib/site";

export const metadata: Metadata = {
    title: "About",
    description: site.about.join(" "),
};

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                About
            </h1>
            <p className="mt-1 text-sm text-hummingbird-teal dark:text-hummingbird-aqua">
                {site.professionalTitle}
            </p>

            <FadeIn>
                <div className="mt-6 flex flex-col items-center gap-6 md:flex-row md:items-start">
                    <Image
                        src="/me.jpeg"
                        alt={`Photo of ${site.name}`}
                        width={160}
                        height={160}
                        sizes="160px"
                        unoptimized
                        className="h-40 w-40 rounded-4xl object-cover border border-black/10 dark:border-white/20"
                    />

                    <div className="flex flex-col gap-4">
                        {site.about.map((paragraph) => (
                            <p key={paragraph} className="text-slate-600 dark:text-white/70">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </FadeIn>

            <FadeIn delay={0.05}>
                <Section title="Skills">
                    <div className="flex flex-wrap gap-2">
                        {aboutSkills.map((t) => (
                            <Badge key={t}>{t}</Badge>
                        ))}
                    </div>
                </Section>
            </FadeIn>

            <FadeIn delay={0.05}>
                <div className="mt-4">
                    <Section title="Education">
                        <ul className="list-disc pl-5 text-slate-600 space-y-2 dark:text-white/70">
                            {site.education.map((e) => (
                                <li key={e.degree}>
                                    <strong className="text-slate-800 dark:text-white/90">
                                        {e.degree}
                                    </strong>
                                    {e.status === "in progress" && " (in progress)"}, {e.school}
                                    {"years" in e && e.years && e.status !== "in progress"
                                        ? ` · ${e.years}`
                                        : ""}
                                </li>
                            ))}
                        </ul>
                    </Section>
                </div>
            </FadeIn>

            <FadeIn delay={0.05}>
                <div className="mt-4">
                    <Section title="Languages">
                        <ul className="list-disc pl-5 text-slate-600 space-y-1 dark:text-white/70">
                            {site.languages.map((l) => (
                                <li key={l.name}>
                                    {l.name} — {l.level}
                                </li>
                            ))}
                        </ul>
                    </Section>
                </div>
            </FadeIn>

            <FadeIn delay={0.05}>
                <div className="mt-4">
                    <Section title="Beyond Engineering">
                        <p className="text-slate-600 dark:text-white/70">
                            {site.beyondEngineering}
                        </p>
                    </Section>
                </div>
            </FadeIn>

            <p className="mt-12 text-sm text-slate-500 dark:text-white/60">
                <Link
                    className="underline hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua"
                    href="/experience"
                >
                    See the full timeline →
                </Link>
                {" · "}
                Want to chat or collaborate?{" "}
                <Link
                    className="underline hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua"
                    href="/contact"
                >
                    Get in touch →
                </Link>
            </p>
        </div>
    );
}
