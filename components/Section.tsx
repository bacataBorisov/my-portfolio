// components/Section.tsx
export default function Section({
    id,
    title,
    children,
}: {
    id?: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24">
            <h2 className="text-slate-900 text-xl font-semibold tracking-tight dark:text-white">
                {title}
            </h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}
