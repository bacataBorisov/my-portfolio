// app/projects/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import CarouselGallery from "@/components/CarouselGallery";
import Shot from "@/components/Shot";

import { projects } from "@/lib/projects";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

// ✅ On your Next.js version, params is async-like: await it.
export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const project = projects.find((p) => p.slug === slug);
    if (!project) return notFound();

    const { title, summary, tags, highlights, repoUrl, demoLinks, icon } = project;

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
            {/* Header */}
            <header>
                <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                    {icon && (
                        <Image
                            src={icon}
                            alt={`${title} icon`}
                            width={48}
                            height={48}
                            className="rounded-lg border border-white/20"
                        />
                    )}
                    {title}
                </h1>
                {summary && <p className="mt-2 text-white/70">{summary}</p>}

                {tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((t) => (
                            <Badge key={t}>{t}</Badge>
                        ))}
                    </div>
                ) : null}
            </header>

            {/* Screenshots (carousel) */}
            {project.covers && project.covers.length > 0 && (
                <div className="mt-6">
                    {project.covers.length === 1 ? (

                        <Shot
                            src="/images/iphone_sowify.png"
                            alt="Sowify iPhone screenshot"
                            aspect={863 / 1722}   // exact aspect of your PNG
                            maxW={380}          // tweak (320–420 looks great)
                        />
                    ) : (
                        // keep your CarouselGallery for multi-shot projects
                        <CarouselGallery
                            title={project.title}
                            shots={project.covers}
                            aspect={4 / 3}
                            maxVH={{ base: 70, md: 70, lg: 80 }}
                        />
                    )}
                </div>
            )}

            {/* Highlights */}
            {highlights?.length ? (
                <Section title="Highlights">
                    <ul className="list-disc space-y-2 pl-6 text-white/80">
                        {highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                        ))}
                    </ul>
                </Section>
            ) : null}

            {/* Demo / Docs buttons */}
            {(demoLinks?.length || repoUrl) ? (
                <div className="flex flex-wrap items-center gap-3">
                    {demoLinks?.map((d, i) => (
                        <Link
                            key={i}
                            href={d.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                        >
                            {d.label}
                        </Link>
                    ))}
                    {repoUrl && (
                        <Link
                            href={repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-lg bg-hummingbird-teal px-4 py-2 text-sm font-medium text-white transition hover:bg-hummingbird-sage"
                        >
                            View Full Documentation →
                        </Link>
                    )}
                </div>
            ) : null}
        </main>
    );
}