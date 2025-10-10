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
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Electro-Technical Officer → Software Engineer
                    </h1>

                    <p className="mt-2 max-w-2xl text-white/70">
                        iOS/macOS, Python & C. Building navigation tools, simulators, and
                        connectivity apps for maritime and research environments.
                    </p>

                    <p className="mt-1 text-sm text-white/60">
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
                            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
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
                            // pick a color from hummingbird palette
                            const colors = [
                                "from-hummingbird-purple/50 to-hummingbird-aqua/20",
                                "from-hummingbird-teal/50 to-hummingbird-purple/20",
                                "from-hummingbird-sage/50 to-hummingbird-aqua/20",
                            ];
                            const bg = colors[i % colors.length]; // cycle through colors

                            return (
                                <Card
                                    key={p.slug}
                                    icon={p.icon}
                                    title={p.title}
                                    subtitle={p.summary}
                                    tags={p.tags}
                                    href={`/projects/${p.slug}`}
                                    className={`h-full rounded-2xl border border-white/10 bg-gradient-to-br ${bg} backdrop-blur-sm`}
                                />
                            );
                        })}
                    </div>
                </Section>

                {/* CONTACT CTA */}

                <Section id="contact" title="Let’s collaborate">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                        <p className="text-white/70">
                            Have a cool idea or project? I’d love to help turn it into something real. Let’s connect and make it happen.
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