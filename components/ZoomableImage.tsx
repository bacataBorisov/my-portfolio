// components/ZoomableImage.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
    src: string;
    alt?: string;
    // For the thumbnail in-page:
    aspect?: number;      // e.g. 4/3
    maxHeightVH?: number; // e.g. 50 (mobile), override with container if you want
    className?: string;
};

export default function ZoomableImage({
    src,
    alt = "",
    aspect = 4 / 3,
    maxHeightVH = 50,
    className = "",
}: Props) {
    const [open, setOpen] = useState(false);

    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <>
            {/* Thumbnail */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`group w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow hover:bg-white/10 transition ${className}`}
                style={{ aspectRatio: `${aspect}` }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                />
            </button>

            {/* Lightbox (fullscreen, native pinch-zoom via <img>) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm cursor-zoom-out flex items-center justify-center p-4"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Using plain <img> for native pinch-zoom; prevent closing when clicking the image */}
                    <div
                        className="max-h-[90vh] max-w-[95vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={src}
                            alt={alt}
                            className="h-full w-full object-contain select-none"
                            draggable={false}
                        />
                    </div>

                    {/* Close button (top-right) */}
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute right-4 top-4 rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/20"
                    >
                        ESC / Close
                    </button>
                </div>
            )}
        </>
    );
}