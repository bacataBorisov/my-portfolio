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

    if (device === "macos" && shots.length <= 2) {
        return (
            <>
                <div className="grid gap-4 sm:grid-cols-2">
                    {shots.map((src, i) => (
                        <DeviceFrame
                            key={src}
                            src={src}
                            alt={`${title} screenshot ${i + 1}`}
                            device="macos"
                            title={title}
                            priority={i === 0}
                            onClick={() => setOpen(i)}
                        />
                    ))}
                </div>
                <Lightbox title={title} shots={shots} open={open} setOpen={setOpen} />
            </>
        );
    }

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
        <div className="relative">
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

            {shots.length > 1 && (
                <>
                    <NavButton
                        className="absolute left-1 top-1/2 -translate-y-1/2"
                        label="Previous"
                        onClick={() => go(-1)}
                    />
                    <NavButton
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        label="Next"
                        onClick={() => go(1)}
                    />
                    <div className="mt-3 flex items-center justify-center gap-2">
                        {shots.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => instanceRef.current?.moveToIdx(i)}
                                className={`h-1.5 w-4 rounded-full transition ${
                                    current === i
                                        ? "bg-hummingbird-teal dark:bg-hummingbird-aqua"
                                        : "bg-black/20 hover:bg-black/30 dark:bg-white/25 dark:hover:bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
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
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setOpen(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        className="relative w-full max-w-5xl"
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
                            className="max-h-[80vh] w-full rounded-lg object-contain"
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
                            Click outside to close · ← → to browse
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
    return (
        <button
            aria-label={label}
            onClick={onClick}
            className={`grid h-9 w-9 place-items-center rounded-full border border-black/20 bg-white/80 text-slate-800 hover:bg-white dark:border-white/20 dark:bg-black/50 dark:text-white dark:hover:bg-black/70 ${className}`}
        >
            <span className="text-lg leading-none">{label === "Previous" ? "‹" : "›"}</span>
        </button>
    );
}
