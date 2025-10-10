"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    title: string;
    shots: string[];
    /** Fallback aspect if a shot hasn't reported its size yet */
    aspect?: number;
    /** Cap the viewport height of the carousel */
    maxVH?: { base?: number; md?: number; lg?: number };
};

export default function CarouselGallery({
    title,
    shots,
    aspect = 4 / 3,
    maxVH = { base: 70, md: 70, lg: 80 },
}: Props) {
    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState<number | null>(null);

    // Per-image aspect cache (w/h)
    const [ratios, setRatios] = useState<number[]>(
        () => new Array(shots.length).fill(NaN)
    );

    // Keen slider
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: shots.length > 1,
        rubberband: true,
        slides: { perView: 1 },
        slideChanged(s) {
            setCurrent(s.track.details.rel);
        },
    });

    // Auto-detect aspect per image (first paint + on src change)
    useEffect(() => {
        if (!shots?.length) return;
        let cancelled = false;

        shots.forEach((src, idx) => {
            const img = new window.Image();
            img.onload = () => {
                if (cancelled) return;
                if (img.width && img.height) {
                    setRatios((prev) => {
                        if (Number.isFinite(prev[idx])) return prev; // already set
                        const next = prev.slice();
                        next[idx] = img.width / img.height;
                        return next;
                    });
                }
            };
            img.src = src;
        });

        return () => {
            cancelled = true;
        };
    }, [shots]);

    // Preload neighbors for lightbox snappiness
    useEffect(() => {
        if (open === null) return;
        const preload = (i: number) => {
            if (i < 0 || i >= shots.length) return;
            const img = new window.Image();
            img.src = shots[i];
        };
        preload(open - 1);
        preload(open + 1);
    }, [open, shots]);

    // Keyboard controls in lightbox
    useEffect(() => {
        if (open === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(null);
            if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : Math.max(0, i - 1)));
            if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : Math.min(shots.length - 1, i + 1)));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, shots.length]);

    const go = useCallback(
        (d: number) => instanceRef.current?.moveToIdx(current + d, true),
        [current, instanceRef]
    );

    // Effective aspect for a given slide (falls back to global)
    const getAspect = useCallback(
        (i: number) => (Number.isFinite(ratios[i]) ? ratios[i] : aspect),
        [ratios, aspect]
    );

    // CSS for the responsive max-height
    const maxBase = maxVH.base ?? 70;
    const maxMd = maxVH.md ?? maxBase;
    const maxLg = maxVH.lg ?? maxMd;

    return (
        <div className="relative">
            {/* Track */}
            <div
                ref={sliderRef}
                className="keen-slider overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur"
                style={{ maxHeight: `min(${maxBase}vh, 900px)` }}
            >
                {shots.map((src, i) => (
                    <div key={src + i} className="keen-slider__slide flex items-center justify-center">
                        <div
                            className="relative w-full bg-black/20"
                            style={{ aspectRatio: String(getAspect(i)) }}
                        >
                            <Image
                                src={src}
                                alt={`${title} screenshot ${i + 1}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1100px"
                                className="object-contain"
                                priority={i === 0}
                                onClick={() => setOpen(i)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
            {shots.length > 1 && (
                <>
                    <IconButton
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        label="Previous"
                        onClick={() => go(-1)}
                        icon="‹"
                    />
                    <IconButton
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        label="Next"
                        onClick={() => go(1)}
                        icon="›"
                    />
                </>
            )}

            {/* Dots */}
            {shots.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                    {shots.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => instanceRef.current?.moveToIdx(i)}
                            className={`h-1.5 w-4 rounded-full transition ${current === i ? "bg-hummingbird-aqua" : "bg-white/25 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Lightbox (native pinch-zoom via <img>) */}
            <AnimatePresence>
                {open !== null && (
                    <motion.div
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4"
                        onClick={() => setOpen(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-modal="true"
                        role="dialog"
                    >
                        <motion.div
                            className="relative w-full max-w-6xl"
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-[80vh] rounded-xl border border-white/10 bg-black/60 p-3">
                                <img
                                    src={shots[open]}
                                    alt={`${title} enlarged ${open + 1}`}
                                    className="h-full w-full select-none object-contain"
                                    draggable={false}
                                />

                                {/* Lightbox nav */}
                                {shots.length > 1 && (
                                    <>
                                        <IconButton
                                            className="absolute left-3 top-1/2 -translate-y-1/2"
                                            label="Previous"
                                            onClick={() => setOpen(Math.max(0, open - 1))}
                                            icon="‹"
                                        />
                                        <IconButton
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            label="Next"
                                            onClick={() => setOpen(Math.min(shots.length - 1, open + 1))}
                                            icon="›"
                                        />
                                    </>
                                )}
                            </div>

                            <div className="mt-3 text-center text-xs text-white/60">
                                Click outside the image to close • Use ← / → for previous/next
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Responsive max-height caps */}
            <style jsx global>{`
        @media (min-width: 768px) {
          .keen-slider[style] {
            max-height: min(${maxMd}vh, 900px) !important;
          }
        }
        @media (min-width: 1024px) {
          .keen-slider[style] {
            max-height: min(${maxLg}vh, 900px) !important;
          }
        }
      `}</style>
        </div>
    );
}

/** Small, consistent icon button (used for arrows) */
function IconButton({
    className = "",
    label,
    icon,
    onClick,
}: {
    className?: string;
    label: string;
    icon: string;
    onClick: () => void;
}) {
    return (
        <button
            aria-label={label}
            onClick={onClick}
            className={`grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/70 ${className}`}
        >
            <span className="text-lg leading-none">{icon}</span>
        </button>
    );
}