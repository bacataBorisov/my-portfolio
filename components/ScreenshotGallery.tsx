"use client";

import { useCallback, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
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

    const go = useCallback(
        (d: number) => instanceRef.current?.moveToIdx(current + d, true),
        [current, instanceRef]
    );

    const lightbox = (
        <Lightbox
            open={open !== null}
            close={() => setOpen(null)}
            index={open ?? 0}
            slides={shots.map((src, i) => ({
                src,
                alt: `${title} screenshot ${i + 1}`,
            }))}
            plugins={[Zoom]}
            zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
            carousel={{ finite: true }}
            controller={{ closeOnBackdropClick: true }}
            animation={{ fade: 180, swipe: 280 }}
            styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.92)" } }}
            on={{
                view: ({ index }) => {
                    if (open !== null && index !== open) setOpen(index);
                },
            }}
        />
    );

    if (shots.length === 1) {
        return (
            <>
                <DeviceFrame
                    src={shots[0]}
                    alt={`${title} screenshot`}
                    device={device}
                    title={title}
                    priority
                    onClick={() => setOpen(0)}
                />
                {lightbox}
            </>
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

            {lightbox}
        </div>
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
