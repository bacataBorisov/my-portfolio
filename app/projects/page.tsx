// app/projects/page.tsx
import Card from "@/components/Card";
import Section from "@/components/Section";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
    const colors = [
        "from-hummingbird-purple/20 to-hummingbird-aqua/10 dark:from-hummingbird-purple/50 dark:to-hummingbird-aqua/20",
        "from-hummingbird-teal/20 to-hummingbird-purple/10 dark:from-hummingbird-teal/50 dark:to-hummingbird-purple/20",
        "from-hummingbird-sage/20 to-hummingbird-aqua/10 dark:from-hummingbird-sage/50 dark:to-hummingbird-aqua/20",
        "from-hummingbird-indigo/10 to-hummingbird-sage/10 dark:from-hummingbird-indigo/50 dark:to-hummingbird-sage/20",
    ];

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
                            className={`h-full rounded-2xl bg-gradient-to-br ${colors[i % colors.length]}`}
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
}
