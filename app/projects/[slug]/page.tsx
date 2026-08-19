// app/projects/[slug]/page.tsx
import type { ComponentType } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { projects, type DemoLinkIcon } from "@/lib/projects";
import { site } from "@/lib/site";
import { FaApple, FaGithub, FaGlobe, FaGooglePlay, FaPlay } from "react-icons/fa";

const demoIcons: Record<DemoLinkIcon, ComponentType<{ className?: string }>> = {
    website: FaGlobe,
    appstore: FaApple,
    play: FaGooglePlay,
    github: FaGithub,
    video: FaPlay,
};

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};

    const title = project.title;
    const description = project.summary;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${site.url}/projects/${slug}`,
            type: "article",
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return notFound();

    const {
        title,
        summary,
        tags,
        status,
        highlights,
        repoUrl,
        demoLinks,
        icon,
        iconClassName = "",
    } = project;

    return (
        <div className="mx-auto max-w-4xl space-y-10">
            {/* Back link */}
            <Button href="/projects" variant="secondary" size="sm">
                ← All projects
            </Button>

            {/* Header */}
            <header>
                <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {icon &&
                        (icon.endsWith(".svg") ? (
                            // eslint-disable-next-line @next/next/no-img-element -- static SVG icon
                            <img
                                src={icon}
                                alt={`${title} icon`}
                                width={48}
                                height={48}
                                className={`h-12 w-12 rounded-lg border border-black/10 dark:border-white/20 ${iconClassName}`}
                            />
                        ) : (
                            <Image
                                src={icon}
                                alt={`${title} icon`}
                                width={48}
                                height={48}
                                sizes="48px"
                                unoptimized
                                className={`h-12 w-12 rounded-lg border border-black/10 dark:border-white/20 ${iconClassName}`}
                            />
                        ))}
                    {title}
                </h1>
                {summary && <p className="mt-2 text-slate-600 dark:text-white/70">{summary}</p>}
                {status && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-white/50">{status}</p>
                )}

                {tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((t) => (
                            <Badge key={t}>{t}</Badge>
                        ))}
                    </div>
                ) : null}
            </header>

            {project.covers && project.covers.length > 0 && (
                <div className="mt-6">
                    <ScreenshotGallery
                        title={project.title}
                        shots={project.covers}
                        device={project.coverDevice ?? "ipad"}
                    />
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
            {demoLinks?.length || repoUrl ? (
                <div className="flex flex-wrap items-center gap-3">
                    {demoLinks?.map((d, i) => {
                        const Icon = d.icon ? demoIcons[d.icon] : null;
                        return (
                            <Button key={i} href={d.href} variant="secondary" external>
                                {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                                {d.label}
                            </Button>
                        );
                    })}
                    {repoUrl && (
                        <Button href={repoUrl} external>
                            View Full Documentation →
                        </Button>
                    )}
                </div>
            ) : null}
        </div>
    );
}
