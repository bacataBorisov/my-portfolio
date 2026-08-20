"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import DeviceFrame, { type DeviceKind } from "./DeviceFrame";

type Props = {
    title: string;
    shots: string[];
    device: DeviceKind;
};

const SWIPE_HINT_KEY = "gallery-swipe-hint-seen";

export default function ScreenshotGallery({ title, shots, device }: Props) {
    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState<number | null>(null);
    const [showSwipeHint, setShowSwipeHint] = useState(false);

    useEffect(() => {
        try {
            setShowSwipeHint(localStorage.getItem(SWIPE_HINT_KEY) !== "1");
        } catch {
            setShowSwipeHint(true);
        }
    }, []);

    const dismissSwipeHint = useCallback(() => {
        setShowSwipeHint((visible) => {
            if (!visible) return false;
            try {
                localStorage.setItem(SWIPE_HINT_KEY, "1");
            } catch {
                /* ignore quota / private mode */
            }
            return false;
        });
    }, []);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: false,
            rubberband: true,
            slides: { perView: 1 },
            slideChanged(s) {
                const rel = s.track.details.rel;
                setCurrent(rel);
                if (rel !== 0) dismissSwipeHint();
            },
        },
        [
            (slider) => {
                const refresh = () => slider.update();
                slider.on("created", () => {
                    slider.container.querySelectorAll("img").forEach((img) => {
                        if (img.complete) refresh();
                        else img.addEventListener("load", refresh, { once: true });
                    });
                });
            },
        ]
    );

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
                        <div
                            key={src + i}
                            className="keen-slider__slide cursor-zoom-in px-1"
                            onClick={() => setOpen(i)}
                        >
                            <DeviceFrame
                                src={src}
                                alt={`${title} screenshot ${i + 1}`}
                                device={device}
                                title={title}
                                priority={i === 0}
                            />
                        </div>
                    ))}
                </div>
                <NavButton
                    className="absolute left-3 top-1/2 -translate-y-1/2 max-md:hidden md:opacity-0 md:group-hover:opacity-100"
                    label="Previous"
                    onClick={() => go(-1)}
                />
                <NavButton
                    className="absolute right-3 top-1/2 -translate-y-1/2 max-md:hidden md:opacity-0 md:group-hover:opacity-100"
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
                                <Image
                                    src={src.replace(/(\.[a-z]+)$/, "-thumb$1")}
                                    alt=""
                                    fill
                                    sizes="112px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                    {(showSwipeHint || device === "macos") && (
                        <p className="mt-2 text-center text-xs text-slate-400 dark:text-white/40">
                            {showSwipeHint ? (
                                <span className="md:hidden">Swipe for more · tap to enlarge</span>
                            ) : null}
                            {device === "macos" ? (
                                <span className={showSwipeHint ? "hidden md:inline" : undefined}>
                                    Tap to enlarge
                                </span>
                            ) : null}
                        </p>
                    )}
                </>
            )}

            <Lightbox title={title} shots={shots} open={open} setOpen={setOpen} />
        </div>
    );
}

function getTouchDistance(a: Touch, b: Touch) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
}

function LightboxImage({
    src,
    alt,
    onSwipePrev,
    onSwipeNext,
}: {
    src: string;
    alt: string;
    onSwipePrev?: () => void;
    onSwipeNext?: () => void;
}) {
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const scaleRef = useRef(1);
    const offsetRef = useRef({ x: 0, y: 0 });
    const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
    const panStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
    const swipeStart = useRef<number | null>(null);
    const lastTap = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    scaleRef.current = scale;
    offsetRef.current = offset;

    useEffect(() => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
    }, [src]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                swipeStart.current = null;
                panStart.current = null;
                pinchStart.current = {
                    distance: getTouchDistance(e.touches[0], e.touches[1]),
                    scale: scaleRef.current,
                };
            } else if (e.touches.length === 1) {
                pinchStart.current = null;
                if (scaleRef.current > 1) {
                    panStart.current = {
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY,
                        ox: offsetRef.current.x,
                        oy: offsetRef.current.y,
                    };
                } else {
                    swipeStart.current = e.touches[0].clientX;
                }
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2 && pinchStart.current) {
                e.preventDefault();
                const distance = getTouchDistance(e.touches[0], e.touches[1]);
                const next =
                    pinchStart.current.scale * (distance / pinchStart.current.distance);
                setScale(Math.min(4, Math.max(1, next)));
                return;
            }

            if (e.touches.length === 1 && scaleRef.current > 1 && panStart.current) {
                e.preventDefault();
                const dx = e.touches[0].clientX - panStart.current.x;
                const dy = e.touches[0].clientY - panStart.current.y;
                setOffset({
                    x: panStart.current.ox + dx,
                    y: panStart.current.oy + dy,
                });
            }
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (scaleRef.current <= 1.02) {
                setScale(1);
                setOffset({ x: 0, y: 0 });
            }

            pinchStart.current = null;
            panStart.current = null;

            if (swipeStart.current !== null && scaleRef.current <= 1) {
                const touch = e.changedTouches[0];
                if (touch) {
                    const dx = touch.clientX - swipeStart.current;
                    if (Math.abs(dx) >= 40) {
                        if (dx > 0) onSwipePrev?.();
                        else onSwipeNext?.();
                        swipeStart.current = null;
                        lastTap.current = 0;
                        return;
                    }
                }
            }
            swipeStart.current = null;

            if (e.changedTouches.length !== 1) return;
            const now = Date.now();
            if (now - lastTap.current < 300) {
                if (scaleRef.current > 1) {
                    setScale(1);
                    setOffset({ x: 0, y: 0 });
                } else {
                    setScale(2.5);
                }
                lastTap.current = 0;
            } else {
                lastTap.current = now;
            }
        };

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        el.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, [onSwipePrev, onSwipeNext, src]);

    const resetTransform = scale === 1 && offset.x === 0 && offset.y === 0;

    return (
        <div
            ref={containerRef}
            className="flex max-h-[90vh] w-full max-w-[96vw] touch-none items-center justify-center overflow-hidden"
        >
            {/* eslint-disable-next-line @next/next/no-img-element -- pinch-zoom in lightbox */}
            <img
                src={src}
                alt={alt}
                draggable={false}
                className="max-h-[90vh] w-auto max-w-full select-none"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: "center center",
                    transition: resetTransform ? "transform 0.2s ease-out" : "none",
                }}
            />
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
    useEffect(() => {
        if (open === null) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const viewport = document.querySelector('meta[name="viewport"]');
        const prevViewport = viewport?.getAttribute("content") ?? null;
        if (viewport) {
            viewport.setAttribute(
                "content",
                "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
            );
        }

        return () => {
            document.body.style.overflow = prevOverflow;
            if (viewport && prevViewport) viewport.setAttribute("content", prevViewport);
        };
    }, [open]);

    const swipePrev =
        open !== null && open > 0 ? () => setOpen(open - 1) : undefined;
    const swipeNext =
        open !== null && open < shots.length - 1 ? () => setOpen(open + 1) : undefined;

    return (
        <AnimatePresence>
            {open !== null && (
                <motion.div
                    className="fixed inset-0 z-[999] touch-none overscroll-none bg-black/90 p-2 sm:p-4"
                    onClick={() => setOpen(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        className="relative flex h-full w-full max-h-[94vh] flex-col items-center justify-center"
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <LightboxImage
                            src={shots[open]}
                            alt={`${title} enlarged ${open + 1}`}
                            onSwipePrev={swipePrev}
                            onSwipeNext={swipeNext}
                        />
                        {shots.length > 1 && (
                            <>
                                <NavButton
                                    className="absolute left-2 top-1/2 -translate-y-1/2 max-md:hidden"
                                    label="Previous"
                                    onClick={() => setOpen(Math.max(0, open - 1))}
                                />
                                <NavButton
                                    className="absolute right-2 top-1/2 -translate-y-1/2 max-md:hidden"
                                    label="Next"
                                    onClick={() => setOpen(Math.min(shots.length - 1, open + 1))}
                                />
                            </>
                        )}
                        <p className="mt-2 text-center text-xs text-white/60">
                            <span className="md:hidden">
                                Tap outside to close · pinch or double-tap to zoom · swipe to browse
                            </span>
                            <span className="hidden md:inline">
                                Tap outside to close · swipe or ← → to browse
                            </span>
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
