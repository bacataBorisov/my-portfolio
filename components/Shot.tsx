// components/Shot.tsx
"use client";

import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    /** real aspect of the screenshot (width/height). e.g. 863/1722 */
    aspect?: number;
    /** max width of the framed phone */
    maxW?: number; // px
};

export default function Shot({
    src,
    alt,
    aspect = 9 / 19,
    maxW = 420,
}: Props) {
    const padTop = `${100 / aspect}%`;

    return (
        <div className="mx-auto">
            <div
                className="relative mx-auto rounded-[28px] border border-black/10 bg-gradient-to-br from-black/5 to-black/10 p-2 shadow-2xl backdrop-blur dark:border-white/12 dark:from-white/10 dark:to-white/5"
                style={{ maxWidth: maxW }}
            >
                {/* screen area */}
                <div
                    className="relative w-full rounded-[22px] overflow-hidden bg-slate-100 dark:bg-black/80"
                    style={{ paddingTop: padTop }}
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 95vw, 420px"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
