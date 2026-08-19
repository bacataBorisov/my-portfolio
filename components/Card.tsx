// components/Card.tsx
import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";

type Props = {
    title: string;
    subtitle: string;
    tags?: string[];
    href: string;
    icon?: string;
    className?: string;
};

export default function Card({ title, subtitle, tags = [], href, icon, className = "" }: Props) {
    return (
        <Link
            href={href}
            className={`flex flex-col rounded-xl border border-black/10 bg-white/40 p-4 backdrop-blur transition hover:border-hummingbird-teal/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-hummingbird-aqua/30 ${className}`}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <Image
                        src={icon}
                        alt={`${title} icon`}
                        width={38}
                        height={38}
                        className="rounded-md border border-black/10 dark:border-white/10"
                    />
                )}
                <h3 className="text-slate-900 text-lg font-semibold tracking-tight dark:text-white">
                    {title}
                </h3>
            </div>

            <p className="mt-2 text-slate-600 text-sm leading-relaxed dark:text-white/70">
                {subtitle}
            </p>

            {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                    ))}
                </div>
            )}
        </Link>
    );
}
