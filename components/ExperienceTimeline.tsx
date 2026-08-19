import {
    buildTimelineRows,
    experience,
    formatRange,
    trackLabels,
    type Track,
} from "@/lib/experience";

const BAR_HEIGHT = 48;
const SUBLANE_GAP = 10;
const TRACK_GAP = 32;
const LABEL_WIDTH = 132;
const YEAR_WIDTH = 168;

const trackBarClass: Record<Track, string> = {
    sea: "bg-hummingbird-teal text-white dark:bg-hummingbird-teal",
    business: "bg-hummingbird-purple text-white dark:bg-hummingbird-purple",
    education: "bg-amber-600 text-white dark:bg-amber-500",
    software: "bg-sky-700 text-white dark:bg-sky-600",
};

const trackLegendClass: Record<Track, string> = {
    sea: "bg-hummingbird-teal",
    business: "bg-hummingbird-purple",
    education: "bg-amber-600 dark:bg-amber-500",
    software: "bg-sky-700 dark:bg-sky-600",
};

export default function ExperienceTimeline() {
    const { rows, minMonth, maxMonth, years } = buildTimelineRows(experience);
    const span = Math.max(maxMonth - minMonth, 1);
    const chartMinWidth = Math.max(years.length * YEAR_WIDTH, 960);

    return (
        <div className="rounded-2xl border border-black/10 bg-white/40 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-6">
            <p className="mb-4 text-xs text-slate-500 dark:text-white/50">
                Parallel tracks show overlapping roles — sea duty, business, education, and software
                — at the same time. Scroll horizontally to read every company name.
            </p>

            <div className="overflow-x-auto pb-2">
                <div style={{ minWidth: chartMinWidth + LABEL_WIDTH }}>
                    <div
                        className="relative mb-3 border-b border-black/10 dark:border-white/10"
                        style={{ marginLeft: LABEL_WIDTH, height: 28 }}
                    >
                        {years.map((year) => {
                            const monthIdx = year * 12;
                            const leftPct = ((monthIdx - minMonth) / span) * 100;
                            if (leftPct < 0 || leftPct > 100) return null;
                            return (
                                <span
                                    key={year}
                                    className="absolute top-0 -translate-x-1/2 text-[11px] tabular-nums text-slate-400 dark:text-white/40"
                                    style={{ left: `${leftPct}%` }}
                                >
                                    {year}
                                </span>
                            );
                        })}
                    </div>

                    <div className="flex flex-col" style={{ gap: TRACK_GAP }}>
                        {rows.map(({ track, sublaneCount, items }) => {
                            const rowHeight =
                                sublaneCount * BAR_HEIGHT +
                                Math.max(0, sublaneCount - 1) * SUBLANE_GAP;

                            return (
                                <div key={track} className="flex items-stretch gap-3">
                                    <div
                                        className="shrink-0 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50"
                                        style={{ width: LABEL_WIDTH }}
                                    >
                                        {trackLabels[track]}
                                    </div>

                                    <div
                                        className="relative flex-1"
                                        style={{ height: rowHeight, minWidth: chartMinWidth }}
                                    >
                                        {years.map((year) => {
                                            const monthIdx = year * 12;
                                            const leftPct = ((monthIdx - minMonth) / span) * 100;
                                            if (leftPct <= 0 || leftPct >= 100) return null;
                                            return (
                                                <div
                                                    key={year}
                                                    className="pointer-events-none absolute top-0 bottom-0 w-px bg-black/5 dark:bg-white/5"
                                                    style={{ left: `${leftPct}%` }}
                                                />
                                            );
                                        })}

                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="group absolute focus-within:z-20"
                                                style={{
                                                    top: item.sublane * (BAR_HEIGHT + SUBLANE_GAP),
                                                    left: `${item.leftPct}%`,
                                                    width: `${Math.max(item.widthPct, 2)}%`,
                                                    height: BAR_HEIGHT,
                                                }}
                                            >
                                                <div
                                                    tabIndex={0}
                                                    role="img"
                                                    aria-label={`${item.title} at ${item.org}, ${formatRange(item.start, item.end)}`}
                                                    className={`flex h-full cursor-default flex-col justify-center overflow-visible rounded-md px-2.5 outline-none ring-hummingbird-aqua/60 transition hover:brightness-110 focus-visible:ring-2 ${trackBarClass[track]}`}
                                                >
                                                    <span className="truncate text-[12px] font-semibold leading-tight">
                                                        {item.barLabel}
                                                    </span>
                                                    <span className="truncate text-[10px] leading-tight opacity-80">
                                                        {item.title}
                                                    </span>
                                                </div>

                                                <div
                                                    className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-64 rounded-lg border border-black/10 bg-white p-3 text-xs shadow-lg group-focus-within:block group-hover:block dark:border-white/10 dark:bg-slate-900"
                                                    role="tooltip"
                                                >
                                                    <p className="font-semibold text-slate-900 dark:text-white">
                                                        {item.title}
                                                    </p>
                                                    <p className="mt-0.5 text-slate-600 dark:text-white/70">
                                                        {item.org}
                                                    </p>
                                                    <p className="mt-1 text-slate-400 dark:text-white/50">
                                                        {formatRange(item.start, item.end)}
                                                    </p>
                                                    <p className="mt-2 leading-relaxed text-slate-600 dark:text-white/70">
                                                        {item.summary}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 border-t border-black/10 pt-4 dark:border-white/10">
                {(Object.keys(trackLabels) as Track[]).map((track) => (
                    <div
                        key={track}
                        className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/70"
                    >
                        <span
                            className={`inline-block h-2.5 w-2.5 rounded-sm ${trackLegendClass[track]}`}
                        />
                        {trackLabels[track]}
                    </div>
                ))}
            </div>
        </div>
    );
}
