// app/projects/page.tsx
import Card from "@/components/Card";
import Section from "@/components/Section";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
    // same palette cycle you used on the homepage (add/adjust as you like)
    const colors = [
        "from-hummingbird-purple/50 to-hummingbird-aqua/20",
        "from-hummingbird-teal/50 to-hummingbird-purple/20",
        "from-hummingbird-sage/50 to-hummingbird-aqua/20",
        "from-hummingbird-indigo/50 to-hummingbird-sage/20",
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
                            // if you added icons in lib/projects.ts, pass them through:
                            icon={p.icon}
                            className={`h-full rounded-2xl border border-white/10 bg-gradient-to-br ${colors[i % colors.length]} backdrop-blur-sm`}
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
}