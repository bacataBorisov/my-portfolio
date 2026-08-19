import Image from "next/image";

export type DeviceKind = "iphone" | "ipad" | "macos";

type Props = {
    src: string;
    alt: string;
    device: DeviceKind;
    title?: string;
    priority?: boolean;
    onClick?: () => void;
};

const aspect: Record<DeviceKind, string> = {
    iphone: "9 / 19.5",
    ipad: "4 / 3",
    macos: "16 / 10",
};

export default function DeviceFrame({ src, alt, device, title, priority, onClick }: Props) {
    if (device === "macos") {
        return (
            <figure
                className={`overflow-hidden rounded-xl border border-black/15 bg-slate-200/80 dark:border-white/15 dark:bg-black/50 ${onClick ? "cursor-zoom-in" : ""}`}
                onClick={onClick}
            >
                <div className="flex items-center gap-1.5 border-b border-black/10 bg-slate-100 px-3 py-2 dark:border-white/10 dark:bg-white/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
                    {title && (
                        <figcaption className="ml-2 truncate text-[11px] text-slate-500 dark:text-white/50">
                            {title}
                        </figcaption>
                    )}
                </div>
                <div
                    className="relative w-full bg-black/5 dark:bg-black/30"
                    style={{ aspectRatio: aspect.macos }}
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-contain"
                    />
                </div>
            </figure>
        );
    }

    if (device === "ipad") {
        return (
            <figure
                className={`mx-auto max-w-3xl rounded-[1.75rem] border-[10px] border-slate-800 bg-slate-800 p-1.5 dark:border-slate-700 dark:bg-slate-700 ${onClick ? "cursor-zoom-in" : ""}`}
                onClick={onClick}
            >
                <div
                    className="relative overflow-hidden rounded-[1.1rem] bg-black"
                    style={{ aspectRatio: aspect.ipad }}
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="object-contain"
                    />
                </div>
            </figure>
        );
    }

    return (
        <figure
            className={`mx-auto max-w-[280px] rounded-[2rem] border-[8px] border-slate-800 bg-slate-800 p-1.5 dark:border-slate-700 ${onClick ? "cursor-zoom-in" : ""}`}
            onClick={onClick}
        >
            <div
                className="relative overflow-hidden rounded-[1.4rem] bg-black"
                style={{ aspectRatio: aspect.iphone }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes="280px"
                    className="object-contain"
                />
            </div>
        </figure>
    );
}
