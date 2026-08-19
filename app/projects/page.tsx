import type { Metadata } from "next";
import Card from "@/components/Card";
import Section from "@/components/Section";
import { projects } from "@/lib/projects";
import { cardGradients, site } from "@/lib/site";

export const metadata: Metadata = {
    title: "Work",
    description: `Projects by ${site.name} — navigation tools, simulators, and connectivity apps.`,
};

export default function ProjectsPage() {
    return (
        <Section title="Projects">
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {projects.map((p, i) => (
                    <Card
                        key={p.slug}
                        title={p.title}
                        subtitle={p.summary}
                        tags={p.tags}
                        href={`/projects/${p.slug}`}
                        icon={p.icon}
                        iconClassName={p.iconClassName}
                        className={`h-full rounded-2xl bg-gradient-to-br ${cardGradients[i % cardGradients.length]}`}
                    />
                ))}
            </div>
        </Section>
    );
}
