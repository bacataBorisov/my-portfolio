"use client";

import { useState } from "react";
import {
    currentMonthIndex,
    experience,
    formatRange,
    parseMonth,
    trackLabels,
    trackOrder,
    type ExperienceItem,
    type Track,
} from "@/lib/experience";

const LABEL_WIDTH = 320;

const trackBar: Record<Track, string> = {
    sea: "bg-hummingbird-teal",
    business: "bg-hummingbird-purple",
    education: "bg-hummingbird-indigo",
    software: "bg-hummingbird-aqua",
};

const trackDot: Record<Track, string> = {
    sea: "bg-hummingbird-teal",
    business: "bg-hummingbird-purple",
    education: "bg-hummingbird-indigo",
    software: "bg-hummingbird-aqua",
};

function timelineSpan() {
    const now = currentMonthIndex();
    const minMonth = Math.min(...experience.map((i) => parseMonth(i.start)));
    const maxMonth = Math.max(
        ...experience.map((i) => (i.end ? parseMonth(i.end) : now)),
        now
    );
    const span = Math.max(maxMonth - minMonth, 1);
    const minYear = Math.floor(minMonth / 12);
    const maxYear = Math.floor(maxMonth / 12);
    const years: number[] = [];
    for (let y = minYear; y <= maxYear; y++) years.push(y);
    return { minMonth, span, years };
}

function barPosition(item: ExperienceItem, minMonth: number, span: number) {
    const now = currentMonthIndex();
    const start = parseMonth(item.start);
    const end = item.end ? parseMonth(item.end) : now;
    return {
        left: ((start - minMonth) / span) * 100,
        width: (Math.max(end - start, 1) / span) * 100,
    };
}

function shortOrg(item: ExperienceItem) {
    return item.org.split(" — ")[0];
}

export default function ExperienceTimeline() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const { minMonth, span, years } = timelineSpan();
    const axisYears = years.filter((y, i) => i === 0 || i === years.length - 1 || y % 2 === 0);

    return (
        <div className="rounded-2xl border border-black/10 bg-white/40 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-6">
            <div className="overflow-x-auto">
                <div className="min-w-[880px]">
                    <div
                        className="relative mb-3 h-5 border-b border-black/10 dark:border-white/10"
                        style={{ marginLeft: LABEL_WIDTH }}
                    >
                        {axisYears.map((year) => {
                            const left = ((year * 12 - minMonth) / span) * 100;
                            if (left < 0 || left > 100) return null;
                            return (
                                <span
                                    key={year}
                                    className="absolute top-0 -translate-x-1/2 text-[10px] tabular-nums text-slate-400 dark:text-white/40"
                                    style={{ left: `${left}%` }}
                                >
                                    {year}
                                </span>
                            );
                        })}
                    </div>

                    <div className="space-y-6">
                        {trackOrder.map((track) => {
                            const items = experience
                                .filter((item) => item.track === track)
                                .sort((a, b) => parseMonth(b.start) - parseMonth(a.start));

                            return (
                                <section key={track}>
                                    <h2 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/50">
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${trackDot[track]}`}
                                        />
                                        {trackLabels[track]}
                                    </h2>

                                    <ol className="space-y-1.5">
                                        {items.map((item) => {
                                            const bar = barPosition(item, minMonth, span);
                                            return (
                                                <li key={item.id}>
                                                    <button
                                                        type="button"
                                                        aria-expanded={activeId === item.id}
                                                        onClick={() =>
                                                            setActiveId(
                                                                activeId === item.id
                                                                    ? null
                                                                    : item.id
                                                            )
                                                        }
                                                        className={`w-full rounded-xl px-1 py-1.5 text-left transition ${
                                                            activeId === item.id
                                                                ? "bg-black/[0.04] dark:bg-white/[0.06]"
                                                                : "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div
                                                                className="shrink-0"
                                                                style={{ width: LABEL_WIDTH }}
                                                            >
                                                                <p className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">
                                                                    {shortOrg(item)}
                                                                </p>
                                                                <p className="text-[12px] leading-snug text-slate-500 dark:text-white/50">
                                                                    {item.title}
                                                                </p>
                                                                <p className="mt-0.5 text-[11px] tabular-nums text-slate-400 dark:text-white/40">
                                                                    {formatRange(
                                                                        item.start,
                                                                        item.end
                                                                    )}
                                                                </p>
                                                            </div>

                                                            <div className="relative h-3 min-w-0 flex-1 rounded-full bg-black/5 dark:bg-white/10">
                                                                {axisYears.map((year) => {
                                                                    const left =
                                                                        ((year * 12 - minMonth) /
                                                                            span) *
                                                                        100;
                                                                    if (left <= 0 || left >= 100)
                                                                        return null;
                                                                    return (
                                                                        <span
                                                                            key={year}
                                                                            className="absolute top-0 bottom-0 w-px bg-black/10 dark:bg-white/10"
                                                                            style={{
                                                                                left: `${left}%`,
                                                                            }}
                                                                        />
                                                                    );
                                                                })}
                                                                <span
                                                                    className={`absolute top-0 bottom-0 rounded-full ${trackBar[track]}`}
                                                                    style={{
                                                                        left: `${bar.left}%`,
                                                                        width: `${Math.max(bar.width, 1.1)}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {activeId === item.id && (
                                                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                                                                {item.org}
                                                                {" — "}
                                                                {item.summary}
                                                            </p>
                                                        )}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
