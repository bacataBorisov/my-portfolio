// app/projects/page.tsx
import Card from "@/components/Card";
import Section from "@/components/Section";
import { projects } from "@/lib/projects";
import { cardGradients } from "@/lib/site";

export default function ProjectsPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <Section title="Projects">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-stretch">
                    {projects.map((p, i) => (
                        <Card
                            key={p.slug}
                            title={p.title}
                            subtitle={p.summary}
                            tags={p.tags}
                            href={`/projects/${p.slug}`}
                            icon={p.icon}
                            className={`h-full rounded-2xl bg-gradient-to-br ${cardGradients[i % cardGradients.length]}`}
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
}
