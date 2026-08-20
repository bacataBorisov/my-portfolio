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

const aspect: Record<Exclude<DeviceKind, "macos">, string> = {
    iphone: "9 / 19.5",
    ipad: "2360 / 1640",
};

export default function DeviceFrame({ src, alt, device, priority, onClick }: Props) {
    if (device === "macos") {
        return (
            <figure className={onClick ? "cursor-zoom-in" : ""} onClick={onClick}>
                <Image
                    src={src}
                    alt={alt}
                    width={1920}
                    height={1133}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, 1100px"
                    className="h-auto w-full bg-transparent"
                />
            </figure>
        );
    }

    if (device === "ipad") {
        return (
            <figure className={onClick ? "cursor-zoom-in" : ""} onClick={onClick}>
                <Image
                    src={src}
                    alt={alt}
                    width={1920}
                    height={1334}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="h-auto w-full rounded-2xl"
                />
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
