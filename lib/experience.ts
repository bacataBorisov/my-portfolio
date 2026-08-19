// lib/experience.ts
// ─────────────────────────────────────────────────────────────────────────────
// Career timeline data. Update dates when you refine your history — bars are
// positioned from start/end month strings (YYYY-MM). end: null = present.
// ─────────────────────────────────────────────────────────────────────────────

export type Track = "sea" | "business" | "education" | "software";

export type ExperienceItem = {
    id: string;
    title: string;
    org: string;
    track: Track;
    /** ISO month, e.g. "2022-09" */
    start: string;
    /** ISO month or null for ongoing */
    end: string | null;
    summary: string;
};

export const trackLabels: Record<Track, string> = {
    sea: "At sea",
    business: "Business & leadership",
    education: "Education",
    software: "Software projects",
};

export const trackOrder: Track[] = ["sea", "business", "education", "software"];

/**
 * Approximate ranges derived from public profile + education status.
 * Refine when you paste exact dates.
 */
export const experience: ExperienceItem[] = [
    {
        id: "soi-eto",
        title: "Electro-Technical Officer",
        org: "Schmidt Ocean Institute · R/V Falkor (too)",
        track: "sea",
        start: "2020-06",
        end: null,
        summary:
            "Maintaining research vessel electrical systems during global science expeditions.",
    },
    {
        id: "oriflame-manager",
        title: "Team Manager",
        org: "Oriflame (Health & Beauty)",
        track: "business",
        start: "2017-01",
        end: null,
        summary: "Leading a distributor team — coaching, communication, and business development.",
    },
    {
        id: "edu-msc",
        title: "MSc Simulator Engineering",
        org: "Nikola Vaptsarov Naval Academy",
        track: "education",
        start: "2022-09",
        end: null,
        summary: "Maritime, transport, and aviation simulator engineering (in progress).",
    },
    {
        id: "edu-bsc",
        title: "BSc Electro-Technical Engineering",
        org: "Nikola Vaptsarov Naval Academy",
        track: "education",
        start: "2015-09",
        end: "2019-06",
        summary: "Electro-technical engineering foundation for shipboard systems.",
    },
    {
        id: "edu-hs",
        title: "Advanced Mathematics",
        org: "High School of Mathematics, Varna",
        track: "education",
        start: "2010-09",
        end: "2015-06",
        summary: "Specialized mathematics program.",
    },
    {
        id: "proj-mlm",
        title: "MLM No Limit",
        org: "iOS & Android app",
        track: "software",
        start: "2025-01",
        end: null,
        summary: "Educational platform with training modules, surveys, and progress tracking.",
    },
    {
        id: "proj-extasy",
        title: "Extasy Complete Navigation",
        org: "iOS / macOS",
        track: "software",
        start: "2021-03",
        end: null,
        summary: "SwiftUI sailing navigation with NMEA integration and polar diagrams.",
    },
    {
        id: "proj-simulator",
        title: "MarineSimulator",
        org: "macOS",
        track: "software",
        start: "2022-06",
        end: null,
        summary: "Marine data simulator with MapKit visualization and UDP broadcast.",
    },
    {
        id: "proj-sowify",
        title: "Sowify",
        org: "RPi · iOS · MQTT",
        track: "software",
        start: "2022-01",
        end: null,
        summary: "Serial-to-wireless bridge for industrial and marine instruments.",
    },
];

/** Parse YYYY-MM to a month index (year * 12 + month). */
export function parseMonth(iso: string): number {
    const [y, m] = iso.split("-").map(Number);
    return y * 12 + (m - 1);
}

export function currentMonthIndex(): number {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
}

export function formatMonth(iso: string): string {
    const [y, m] = iso.split("-").map(Number);
    const date = new Date(y, m - 1, 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatRange(start: string, end: string | null): string {
    if (!end) return `${formatMonth(start)} – Present`;
    return `${formatMonth(start)} – ${formatMonth(end)}`;
}

export type PlacedItem = ExperienceItem & {
    sublane: number;
    leftPct: number;
    widthPct: number;
};

export type TrackRow = {
    track: Track;
    sublaneCount: number;
    items: PlacedItem[];
};

/** Assign sublanes within each track and compute bar positions. */
export function buildTimelineRows(items: ExperienceItem[]): {
    rows: TrackRow[];
    minMonth: number;
    maxMonth: number;
    years: number[];
} {
    const endMonth = currentMonthIndex();
    const minMonth = Math.min(...items.map((i) => parseMonth(i.start)));
    const maxMonth = Math.max(
        ...items.map((i) => (i.end ? parseMonth(i.end) : endMonth)),
        endMonth
    );
    const span = Math.max(maxMonth - minMonth, 1);

    const rows: TrackRow[] = trackOrder.map((track) => {
        const trackItems = items
            .filter((i) => i.track === track)
            .sort((a, b) => parseMonth(a.start) - parseMonth(b.start));

        const sublaneEnds: number[] = [];
        const placed: PlacedItem[] = [];

        for (const item of trackItems) {
            const start = parseMonth(item.start);
            const end = item.end ? parseMonth(item.end) : endMonth;

            let sublane = sublaneEnds.findIndex((laneEnd) => laneEnd <= start);
            if (sublane === -1) {
                sublane = sublaneEnds.length;
                sublaneEnds.push(end);
            } else {
                sublaneEnds[sublane] = end;
            }

            placed.push({
                ...item,
                sublane,
                leftPct: ((start - minMonth) / span) * 100,
                widthPct: (Math.max(end - start, 1) / span) * 100,
            });
        }

        return {
            track,
            sublaneCount: Math.max(sublaneEnds.length, 1),
            items: placed,
        };
    });

    const minYear = Math.floor(minMonth / 12);
    const maxYear = Math.floor(maxMonth / 12);
    const years: number[] = [];
    for (let y = minYear; y <= maxYear; y++) years.push(y);

    return { rows, minMonth, maxMonth, years };
}
