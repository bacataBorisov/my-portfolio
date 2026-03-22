// app/page.tsx
import Section from "@/components/Section";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { projects } from "@/lib/projects";
import Link from "next/link";

export default function Page() {
    const featured = projects.slice(0, 3);

    return (
        <div>
            {/* HERO */}
            <header className="relative mx-auto max-w-5xl px-4 pb-12 pt-16">
                <div className="rounded-3xl border border-black/10 bg-white/50 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        Electro-Technical Officer → Software Engineer
                    </h1>

                    <p className="mt-2 max-w-2xl text-slate-600 dark:text-white/70">
                        iOS/macOS, Python & C. Building navigation tools, simulators, and
                        connectivity apps for maritime and research environments.
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                        Currently pursuing an MSc in Simulator Engineering (maritime, transport, aviation).
                    </p>

                    {/* Skills */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[
                            "Swift",
                            "SwiftUI",
                            "iOS",
                            "macOS",
                            "Python",
                            "C",
                            "Serial/UDP",
                            "NMEA-0183",
                        ].map((t) => (
                            <Badge key={t}>{t}</Badge>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center rounded-lg bg-hummingbird-teal px-4 py-2 text-sm font-medium text-white transition hover:bg-hummingbird-sage"
                        >
                            View Work →
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-black/5 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                        >
                            About Me
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl space-y-16 px-4 pb-24">
                {/* FEATURED WORK */}
                <Section id="projects" title="Featured Work">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-stretch">
                        {featured.map((p, i) => {
                            const colors = [
                                "from-hummingbird-purple/20 to-hummingbird-aqua/10 dark:from-hummingbird-purple/50 dark:to-hummingbird-aqua/20",
                                "from-hummingbird-teal/20 to-hummingbird-purple/10 dark:from-hummingbird-teal/50 dark:to-hummingbird-purple/20",
                                "from-hummingbird-sage/20 to-hummingbird-aqua/10 dark:from-hummingbird-sage/50 dark:to-hummingbird-aqua/20",
                            ];
                            const bg = colors[i % colors.length];

                            return (
                                <Card
                                    key={p.slug}
                                    icon={p.icon}
                                    title={p.title}
                                    subtitle={p.summary}
                                    tags={p.tags}
                                    href={`/projects/${p.slug}`}
                                    className={`h-full rounded-2xl bg-gradient-to-br ${bg}`}
                                />
                            );
                        })}
                    </div>
                </Section>

                {/* CONTACT CTA */}
                <Section id="contact" title="Let's collaborate">
                    <div className="rounded-2xl border border-black/10 bg-white/40 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <p className="text-slate-600 dark:text-white/70">
                            Have a cool idea or project? I&apos;d love to help turn it into something real. Let&apos;s connect and make it happen.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex rounded-lg bg-hummingbird-teal px-4 py-2 text-sm font-medium text-white transition hover:bg-hummingbird-sage"
                        >
                            Get in touch →
                        </Link>
                    </div>
                </Section>
            </main>
        </div>
    );
}
