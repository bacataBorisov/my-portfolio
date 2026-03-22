// app/page.tsx
import Section from "@/components/Section";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/lib/projects";
import { site, cardGradients } from "@/lib/site";

export default function Page() {
    const featured = projects.slice(0, 3);

    return (
        <div>
            {/* HERO */}
            <header className="relative mx-auto max-w-5xl px-4 pb-12 pt-16">
                <FadeIn>
                <div className="rounded-3xl border border-black/10 bg-white/50 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        {site.tagline}
                    </h1>

                    <p className="mt-2 max-w-2xl text-slate-600 dark:text-white/70">
                        iOS/macOS, Python & C. Building navigation tools, simulators, and
                        connectivity apps for maritime and research environments.
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                        Currently pursuing an MSc in Simulator Engineering (maritime, transport, aviation).
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {site.heroSkills.map((t) => (
                            <Badge key={t}>{t}</Badge>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button href="/projects">View Work →</Button>
                        <Button href="/about" variant="secondary">About Me</Button>
                    </div>
                </div>
                </FadeIn>
            </header>

            <main className="mx-auto max-w-5xl space-y-16 px-4 pb-24">
                {/* FEATURED WORK */}
                <FadeIn>
                <Section id="projects" title="Featured Work">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-stretch">
                        {featured.map((p, i) => (
                            <Card
                                key={p.slug}
                                icon={p.icon}
                                title={p.title}
                                subtitle={p.summary}
                                tags={p.tags}
                                href={`/projects/${p.slug}`}
                                className={`h-full rounded-2xl bg-gradient-to-br ${cardGradients[i % cardGradients.length]}`}
                            />
                        ))}
                    </div>
                </Section>
                </FadeIn>

                {/* CONTACT CTA */}
                <FadeIn delay={0.1}>
                <Section id="contact" title="Let&apos;s collaborate">
                    <div className="rounded-2xl border border-black/10 bg-white/40 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <p className="text-slate-600 dark:text-white/70">
                            Have a cool idea or project? I&apos;d love to help turn it into something real. Let&apos;s connect and make it happen.
                        </p>
                        <div className="mt-4">
                            <Button href="/contact">Get in touch →</Button>
                        </div>
                    </div>
                </Section>
                </FadeIn>
            </main>
        </div>
    );
}
