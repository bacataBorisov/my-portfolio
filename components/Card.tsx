// components/Card.tsx
import Image from "next/image";
import Badge from "./Badge";

type Props = {
    title: string;
    subtitle: string;
    tags?: string[];
    href: string;
    icon?: string; // ✅ optional icon
    children?: React.ReactNode;
    className?: string;
};

export default function Card({
    title,
    subtitle,
    tags = [],
    href,
    icon,
    className = "",
}: Props) {
    return (
        <a
            href={href}
            className={`flex flex-col rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-hummingbird-aqua/30 transition ${className}`}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <Image
                        src={icon}
                        alt={`${title} icon`}
                        width={38}
                        height={38}
                        className="rounded-md border border-white/10"
                    />
                )}
                <h3 className="text-white text-lg font-semibold tracking-tight">
                    {title}
                </h3>
            </div>

            <p className="mt-2 text-white/70 text-sm leading-relaxed">{subtitle}</p>

            {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                    ))}
                </div>
            )}
        </a>
    );
}