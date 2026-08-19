import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { site } from "@/lib/site";

export const metadata: Metadata = {
    title: "Experience",
    description: `Career timeline of ${site.name} — sea duty aboard Falkor (too), Oriflame leadership, education, and software projects.`,
};

export default function ExperiencePage() {
    return (
        <div className="mx-auto max-w-5xl">
            <FadeIn>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    Experience
                </h1>
                <p className="mt-2 max-w-2xl text-slate-600 dark:text-white/70">
                    A horizontal view of what ran in parallel — research vessel duty at Schmidt
                    Ocean Institute, team leadership at Oriflame, naval academy studies, and the
                    navigation apps I build alongside it all.
                </p>
            </FadeIn>

            <FadeIn delay={0.05}>
                <div className="mt-8">
                    <ExperienceTimeline />
                </div>
            </FadeIn>

            <FadeIn delay={0.1}>
                <p className="mt-10 text-sm text-slate-500 dark:text-white/60">
                    Want the project deep-dives?{" "}
                    <Link
                        href="/projects"
                        className="underline hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua"
                    >
                        Browse work →
                    </Link>
                    {" · "}
                    <Link
                        href="/contact"
                        className="underline hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua"
                    >
                        Get in touch →
                    </Link>
                </p>
            </FadeIn>
        </div>
    );
}
