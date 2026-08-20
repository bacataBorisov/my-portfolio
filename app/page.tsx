// app/page.tsx
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { site, cardGradients, heroSkills } from "@/lib/site";

// ─── Shared bento tile shell ────────────────────────────────────────────────
function Tile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`rounded-2xl border border-black/10 bg-white/50 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 ${className}`}
        >
            {children}
        </div>
    );
}

// ─── "Currently" bento tile ─────────────────────────────────────────────────
function CurrentlyTile() {
    const { currently } = site;
    const rows = [
        { emoji: "⚙️", label: "Building", value: currently.working },
        { emoji: "📚", label: "Learning", value: currently.learning },
        { emoji: "🚢", label: "Location", value: currently.location },
    ];

    return (
        <Tile className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-hummingbird-teal animate-pulse dark:bg-hummingbird-aqua" />
                <span className="text-xs font-semibold uppercase tracking-widest text-hummingbird-teal dark:text-hummingbird-aqua">
                    Currently
                </span>
            </div>
            <ul className="flex flex-col gap-3">
                {rows.map(({ emoji, label, value }) => (
                    <li key={label}>
                        <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-white/40">
                            {emoji} {label}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-700 dark:text-white/80">{value}</p>
                    </li>
                ))}
            </ul>
        </Tile>
    );
}

// ─── Skills tile ─────────────────────────────────────────────────────────────
function SkillsTile() {
    return (
        <Tile className="flex h-full flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">
                Skills
            </p>
            <div className="flex flex-wrap gap-2">
                {heroSkills.map((t) => (
                    <Badge key={t}>{t}</Badge>
                ))}
            </div>
        </Tile>
    );
}

// ─── Contact CTA tile ────────────────────────────────────────────────────────
function ContactTile() {
    return (
        <Tile className="flex h-full flex-col justify-between gap-4 bg-gradient-to-br from-hummingbird-teal/20 to-hummingbird-aqua/10 dark:from-hummingbird-teal/30 dark:to-hummingbird-aqua/10">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-hummingbird-teal dark:text-hummingbird-aqua">
                    Let&apos;s collaborate
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                    Have a cool idea? I&apos;d love to help turn it into something real.
                </p>
            </div>
            <Button href="/contact" size="sm">
                Get in touch →
            </Button>
        </Tile>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Page() {
    const featured = projects.slice(0, 3);

    return (
        <div className="pb-8">
            {/* ── Bento grid ── */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Row 1: Hero (2 cols) + Currently (1 col) */}
                <FadeIn className="md:col-span-2">
                    <Tile className="flex h-full flex-col justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                {site.tagline}
                            </h1>
                            <p className="mt-3 max-w-lg text-slate-600 dark:text-white/70">
                                {site.heroDescription}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button href="/projects">View Work →</Button>
                            <Button href="/experience" variant="secondary">
                                Experience
                            </Button>
                            <Button href="/about" variant="secondary">
                                About Me
                            </Button>
                            <Button href={site.cvUrl} download={site.cvFilename} variant="secondary">
                                Download CV
                            </Button>
                        </div>
                    </Tile>
                </FadeIn>

                <FadeIn delay={0.05}>
                    <CurrentlyTile />
                </FadeIn>

                {/* Row 2: Project cards */}
                {featured.map((p, i) => (
                    <FadeIn key={p.slug} delay={0.05 * (i + 1)}>
                        <Card
                            icon={p.icon}
                            iconClassName={p.iconClassName}
                            title={p.title}
                            subtitle={p.summary}
                            tags={p.tags}
                            href={`/projects/${p.slug}`}
                            className={`h-full rounded-2xl bg-gradient-to-br ${cardGradients[i % cardGradients.length]}`}
                        />
                    </FadeIn>
                ))}

                {/* Row 3: Skills (2 cols) + Contact CTA (1 col) */}
                <FadeIn className="h-full md:col-span-1 lg:col-span-2" delay={0.05}>
                    <SkillsTile />
                </FadeIn>

                <FadeIn className="h-full" delay={0.1}>
                    <ContactTile />
                </FadeIn>
            </div>

            {/* All projects link */}
            <FadeIn delay={0.1}>
                <div className="mt-6 text-center">
                    <Link
                        href="/projects"
                        className="text-sm text-slate-400 underline-offset-4 hover:text-hummingbird-teal hover:underline dark:text-white/40 dark:hover:text-hummingbird-aqua"
                    >
                        See all projects →
                    </Link>
                    <span className="mx-2 text-slate-300 dark:text-white/20">·</span>
                    <Link
                        href="/experience"
                        className="text-sm text-slate-400 underline-offset-4 hover:text-hummingbird-teal hover:underline dark:text-white/40 dark:hover:text-hummingbird-aqua"
                    >
                        See the timeline →
                    </Link>
                </div>
            </FadeIn>
        </div>
    );
}
