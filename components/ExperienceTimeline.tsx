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

function pickAxisYears(years: number[], minGap: number) {
    if (years.length === 0) return [];
    const last = years[years.length - 1];
    const ticks = [years[0]];
    for (const year of years) {
        if (year - ticks[ticks.length - 1] >= minGap) ticks.push(year);
    }
    if (ticks[ticks.length - 1] !== last) {
        if (last - ticks[ticks.length - 1] < minGap) ticks[ticks.length - 1] = last;
        else ticks.push(last);
    }
    return ticks;
}

function itemsFor(track: Track) {
    return experience
        .filter((item) => item.track === track)
        .sort((a, b) => parseMonth(b.start) - parseMonth(a.start));
}

export default function ExperienceTimeline() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const { minMonth, span, years } = timelineSpan();
    const desktopYears = pickAxisYears(years, 2);
    const mobileYears = pickAxisYears(years, 6);

    return (
        <div className="rounded-2xl border border-black/10 bg-white/40 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-6">
            <div className="lg:hidden">
                <YearAxis years={mobileYears} minMonth={minMonth} span={span} />
                <TrackList
                    activeId={activeId}
                    setActiveId={setActiveId}
                    minMonth={minMonth}
                    span={span}
                    axisYears={mobileYears}
                    stacked
                />
            </div>

            <div className="hidden overflow-x-auto lg:block">
                <div className="min-w-[880px]">
                    <YearAxis
                        years={desktopYears}
                        minMonth={minMonth}
                        span={span}
                        offset={LABEL_WIDTH}
                    />
                    <TrackList
                        activeId={activeId}
                        setActiveId={setActiveId}
                        minMonth={minMonth}
                        span={span}
                        axisYears={desktopYears}
                    />
                </div>
            </div>
        </div>
    );
}

function YearAxis({
    years,
    minMonth,
    span,
    offset = 0,
}: {
    years: number[];
    minMonth: number;
    span: number;
    offset?: number;
}) {
    return (
        <div
            className="relative mb-3 h-5 border-b border-black/10 dark:border-white/10"
            style={offset ? { marginLeft: offset } : undefined}
        >
            {years.map((year, i) => {
                const left = ((year * 12 - minMonth) / span) * 100;
                if (left < 0 || left > 100) return null;
                const edge = i === 0 ? "translate-x-0" : i === years.length - 1 ? "-translate-x-full" : "-translate-x-1/2";
                return (
                    <span
                        key={year}
                        className={`absolute top-0 text-[10px] tabular-nums text-slate-400 dark:text-white/40 ${edge}`}
                        style={{ left: `${left}%` }}
                    >
                        {year}
                    </span>
                );
            })}
        </div>
    );
}

function TrackList({
    activeId,
    setActiveId,
    minMonth,
    span,
    axisYears,
    stacked = false,
}: {
    activeId: string | null;
    setActiveId: (id: string | null) => void;
    minMonth: number;
    span: number;
    axisYears: number[];
    stacked?: boolean;
}) {
    return (
        <div className="space-y-6">
            {trackOrder.map((track) => (
                <section key={track}>
                    <h2 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/50">
                        <span className={`h-2.5 w-2.5 rounded-full ${trackDot[track]}`} />
                        {trackLabels[track]}
                    </h2>
                    <ol className="space-y-1.5">
                        {itemsFor(track).map((item) => {
                            const bar = barPosition(item, minMonth, span);
                            const open = activeId === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        aria-expanded={open}
                                        onClick={() => setActiveId(open ? null : item.id)}
                                        className={`w-full rounded-xl px-1 py-1.5 text-left transition ${
                                            open
                                                ? "bg-black/[0.04] dark:bg-white/[0.06]"
                                                : "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                                        }`}
                                    >
                                        <div
                                            className={
                                                stacked
                                                    ? "space-y-2"
                                                    : "flex items-center gap-4"
                                            }
                                        >
                                            <div
                                                className={stacked ? "" : "shrink-0"}
                                                style={stacked ? undefined : { width: LABEL_WIDTH }}
                                            >
                                                <p className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">
                                                    {shortOrg(item)}
                                                </p>
                                                <p className="text-[12px] leading-snug text-slate-500 dark:text-white/50">
                                                    {item.title}
                                                </p>
                                                <p className="mt-0.5 text-[11px] tabular-nums text-slate-400 dark:text-white/40">
                                                    {formatRange(item.start, item.end)}
                                                </p>
                                            </div>
                                            <Bar
                                                track={track}
                                                bar={bar}
                                                axisYears={axisYears}
                                                minMonth={minMonth}
                                                span={span}
                                            />
                                        </div>
                                        {open && (
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
            ))}
        </div>
    );
}

function Bar({
    track,
    bar,
    axisYears,
    minMonth,
    span,
}: {
    track: Track;
    bar: { left: number; width: number };
    axisYears: number[];
    minMonth: number;
    span: number;
}) {
    return (
        <div className="relative h-3 min-w-0 w-full flex-1 rounded-full bg-black/5 dark:bg-white/10">
            {axisYears.map((year) => {
                const left = ((year * 12 - minMonth) / span) * 100;
                if (left <= 0 || left >= 100) return null;
                return (
                    <span
                        key={year}
                        className="absolute top-0 bottom-0 w-px bg-black/10 dark:bg-white/10"
                        style={{ left: `${left}%` }}
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
    );
}
