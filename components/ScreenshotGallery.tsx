"use client";

import { useCallback, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { AnimatePresence, motion } from "framer-motion";
import DeviceFrame, { type DeviceKind } from "./DeviceFrame";

type Props = {
    title: string;
    shots: string[];
    device: DeviceKind;
};

export default function ScreenshotGallery({ title, shots, device }: Props) {
    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState<number | null>(null);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: shots.length > 1,
        rubberband: true,
        slides: { perView: 1 },
        slideChanged(s) {
            setCurrent(s.track.details.rel);
        },
    });

    useEffect(() => {
        if (open === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(null);
            if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : Math.max(0, i - 1)));
            if (e.key === "ArrowRight")
                setOpen((i) => (i === null ? null : Math.min(shots.length - 1, i + 1)));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, shots.length]);

    const go = useCallback(
        (d: number) => instanceRef.current?.moveToIdx(current + d, true),
        [current, instanceRef]
    );

    if (shots.length === 1) {
        return (
            <DeviceFrame
                src={shots[0]}
                alt={`${title} screenshot`}
                device={device}
                title={title}
                priority
                onClick={() => setOpen(0)}
            />
        );
    }

    return (
        <div>
            <div className="group relative">
                <div ref={sliderRef} className="keen-slider">
                    {shots.map((src, i) => (
                        <div key={src + i} className="keen-slider__slide px-1">
                            <DeviceFrame
                                src={src}
                                alt={`${title} screenshot ${i + 1}`}
                                device={device}
                                title={title}
                                priority={i === 0}
                                onClick={() => setOpen(i)}
                            />
                        </div>
                    ))}
                </div>
                <NavButton
                    className="absolute left-3 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100"
                    label="Previous"
                    onClick={() => go(-1)}
                />
                <NavButton
                    className="absolute right-3 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100"
                    label="Next"
                    onClick={() => go(1)}
                />
            </div>

            {shots.length > 1 && (
                <>
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                        {shots.map((src, i) => (
                            <button
                                key={src}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={current === i}
                                onClick={() => instanceRef.current?.moveToIdx(i)}
                                className={`relative h-14 w-[5.5rem] shrink-0 overflow-hidden rounded-lg border transition sm:h-16 sm:w-28 ${
                                    current === i
                                        ? "border-hummingbird-teal ring-2 ring-hummingbird-teal/40 dark:border-hummingbird-aqua dark:ring-hummingbird-aqua/40"
                                        : "border-black/15 opacity-70 hover:opacity-100 dark:border-white/15"
                                }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                    {device === "macos" && (
                        <p className="mt-2 text-center text-xs text-slate-400 dark:text-white/40">
                            Tap a screenshot to view it full screen
                        </p>
                    )}
                </>
            )}

            <Lightbox title={title} shots={shots} open={open} setOpen={setOpen} />
        </div>
    );
}

function Lightbox({
    title,
    shots,
    open,
    setOpen,
}: {
    title: string;
    shots: string[];
    open: number | null;
    setOpen: (i: number | null) => void;
}) {
    return (
        <AnimatePresence>
            {open !== null && (
                <motion.div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-2 sm:p-4"
                    onClick={() => setOpen(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        className="relative flex max-h-[94vh] w-full max-w-[96vw] flex-col items-center"
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element -- native img for lightbox pinch-zoom */}
                        <img
                            src={shots[open]}
                            alt={`${title} enlarged ${open + 1}`}
                            className="max-h-[90vh] w-auto max-w-full rounded-lg object-contain"
                        />
                        {shots.length > 1 && (
                            <>
                                <NavButton
                                    className="absolute left-2 top-1/2 -translate-y-1/2"
                                    label="Previous"
                                    onClick={() => setOpen(Math.max(0, open - 1))}
                                />
                                <NavButton
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    label="Next"
                                    onClick={() => setOpen(Math.min(shots.length - 1, open + 1))}
                                />
                            </>
                        )}
                        <p className="mt-2 text-center text-xs text-white/60">
                            Tap outside to close · swipe or ← → to browse
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function NavButton({
    className = "",
    label,
    onClick,
}: {
    className?: string;
    label: string;
    onClick: () => void;
}) {
    const prev = label === "Previous";
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={`grid h-11 w-11 place-items-center rounded-full bg-white/70 text-slate-800 shadow-lg shadow-black/10 backdrop-blur-md transition hover:scale-105 hover:bg-white/90 dark:bg-black/45 dark:text-white dark:shadow-black/40 dark:hover:bg-black/60 ${className}`}
        >
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
            >
                {prev ? <path d="M15 5 8 12l7 7" /> : <path d="m9 5 7 7-7 7" />}
            </svg>
        </button>
    );
}
