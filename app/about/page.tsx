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

                        <p className="text-slate-500 italic dark:text-white/70">
                            Programming started as a hobby, but has grown into a passion I&apos;m
                            committed to turning into a professional path.
                        </p>
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
                            In addition to my technical work, I manage a team at{" "}
                            <strong className="text-slate-800 dark:text-white/90">
                                Oriflame (Health & Beauty)
                            </strong>
                            , developing leadership and communication skills. I&apos;m also a
                            passionate{" "}
                            <strong className="text-slate-800 dark:text-white/90">sailor</strong>,
                            which inspires much of my navigation software, and I enjoy playing the{" "}
                            <strong className="text-slate-800 dark:text-white/90">guitar</strong> in
                            my free time.
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
