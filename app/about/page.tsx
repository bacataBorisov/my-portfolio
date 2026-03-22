// app/about/page.tsx
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import Image from "next/image";
import { site } from "@/lib/site";

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">About</h1>

            <div className="mt-6 flex flex-col items-center gap-6 md:flex-row md:items-start">
                <Image
                    src="/me.jpeg"
                    alt={`Photo of ${site.name}`}
                    width={360}
                    height={360}
                    className="h-40 w-40 rounded-4xl object-cover border border-black/10 dark:border-white/20"
                />

                <div className="flex flex-col gap-4">
                    <p className="text-slate-600 dark:text-white/70">
                        Hello I am {site.name} but friends call me {site.nickname},{" "}
                        an {site.role}.
                        In my free time I build navigation tools, simulators, and data plumbing between sensors and UI.
                        Comfortable with Swift/SwiftUI for iOS/macOS, Python/C for tooling and connectivity.
                    </p>

                    <p className="text-slate-500 italic dark:text-white/70">
                        Programming started as a hobby, but has grown into a passion I&apos;m committed to turning into a professional path.
                    </p>
                </div>
            </div>

            <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                    {site.aboutSkills.map((t) => (
                        <Badge key={t}>{t}</Badge>
                    ))}
                </div>
            </Section>

            <div className="mt-4">
                <Section title="Education">
                    <ul className="list-disc pl-5 text-slate-600 space-y-2 dark:text-white/70">
                        {site.education.map((e) => (
                            <li key={e.degree}>
                                <strong className="text-slate-800 dark:text-white/90">{e.degree}</strong>
                                {e.status === "in progress" && " (in progress)"},{" "}
                                {e.school}
                            </li>
                        ))}
                    </ul>
                </Section>
            </div>

            <div className="mt-4">
                <Section title="Beyond Engineering">
                    <p className="text-slate-600 dark:text-white/70">
                        In addition to my technical work, I manage a team at{" "}
                        <strong className="text-slate-800 dark:text-white/90">Oriflame (Health & Beauty)</strong>,
                        developing leadership and communication skills. I&apos;m also a passionate{" "}
                        <strong className="text-slate-800 dark:text-white/90">sailor</strong>,
                        which inspires much of my navigation software, and I enjoy playing the{" "}
                        <strong className="text-slate-800 dark:text-white/90">guitar</strong> in my free time.
                    </p>
                </Section>
            </div>

            <p className="mt-12 text-sm text-slate-500 dark:text-white/60">
                Want to chat or collaborate?{" "}
                <a className="underline hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua" href="/contact">
                    Get in touch →
                </a>
            </p>
        </main>
    );
}
