// app/projects/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import CarouselGallery from "@/components/CarouselGallery";
import Shot from "@/components/Shot";
import { projects } from "@/lib/projects";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return notFound();

    const { title, summary, tags, highlights, repoUrl, demoLinks, icon, coverAspect } = project;

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
            {/* Header */}
            <header>
                <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {icon && (
                        <Image
                            src={icon}
                            alt={`${title} icon`}
                            width={48}
                            height={48}
                            className="rounded-lg border border-black/10 dark:border-white/20"
                        />
                    )}
                    {title}
                </h1>
                {summary && <p className="mt-2 text-slate-600 dark:text-white/70">{summary}</p>}

                {tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((t) => (
                            <Badge key={t}>{t}</Badge>
                        ))}
                    </div>
                ) : null}
            </header>

            {/* Screenshots */}
            {project.covers && project.covers.length > 0 && (
                <div className="mt-6">
                    {project.covers.length === 1 ? (
                        <Shot
                            src={project.covers[0]}
                            alt={`${title} screenshot`}
                            aspect={coverAspect}
                            maxW={380}
                        />
                    ) : (
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
                    <ul className="list-disc space-y-2 pl-6 text-slate-600 dark:text-white/80">
                        {highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                        ))}
                    </ul>
                </Section>
            ) : null}

            {/* Links */}
            {(demoLinks?.length || repoUrl) ? (
                <div className="flex flex-wrap items-center gap-3">
                    {demoLinks?.map((d, i) => (
                        <Button key={i} href={d.href} variant="secondary" external>
                            {d.label}
                        </Button>
                    ))}
                    {repoUrl && (
                        <Button href={repoUrl} external>
                            View Full Documentation →
                        </Button>
                    )}
                </div>
            ) : null}
        </main>
    );
}
