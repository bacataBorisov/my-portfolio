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
                className={`overflow-hidden rounded-xl border border-black/15 bg-black/5 dark:border-white/15 dark:bg-black/40 ${onClick ? "cursor-zoom-in" : ""}`}
                onClick={onClick}
            >
                <div className="overflow-x-auto md:overflow-visible">
                    <div
                        className="relative min-w-[40rem] md:min-w-0"
                        style={{ aspectRatio: aspect.macos }}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            priority={priority}
                            sizes="(max-width: 768px) 640px, 1100px"
                            className="object-contain"
                        />
                    </div>
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
