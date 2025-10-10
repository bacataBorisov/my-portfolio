// components/PhoneFrame.tsx
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

export default function PhoneFrame({
    src,
    alt,
    aspect = 9 / 19,
    maxW = 420,
}: Props) {
    // reserve the screen area with the correct aspect
    const padTop = `${100 / aspect}%`;

    return (
        <div className="mx-auto">
            <div
                className="
          relative mx-auto rounded-[28px] border border-white/12
          bg-gradient-to-br from-white/10 to-white/5
          shadow-2xl backdrop-blur
          p-2
        "
                style={{ maxWidth: maxW }}
            >
                {/* screen area */}
                <div
                    className="relative w-full rounded-[22px] overflow-hidden bg-black/80"
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