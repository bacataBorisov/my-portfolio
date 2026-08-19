// lib/experience.ts
// Career timeline — YYYY-MM dates.
// Sea / business months from public LinkedIn (Aug 2026).
// Saga: one 3-month contract immediately after ACL (confirmed).
// Education: BSc and high school months confirmed; MSc in progress.

export type Track = "sea" | "business" | "education" | "software";

export type ExperienceItem = {
    id: string;
    title: string;
    org: string;
    /** Short company/project name shown on the bar */
    barLabel: string;
    track: Track;
    start: string;
    end: string | null;
    summary: string;
};

export const trackLabels: Record<Track, string> = {
    sea: "At sea",
    business: "Business",
    education: "Education",
    software: "Software projects",
};

export const trackOrder: Track[] = ["sea", "business", "education", "software"];

export const experience: ExperienceItem[] = [
    {
        id: "soi-falkor-too",
        title: "Electro-Technical Officer",
        org: "Schmidt Ocean Institute — R/V Falkor (too)",
        barLabel: "Schmidt Ocean Institute",
        track: "sea",
        start: "2022-01",
        end: null,
        summary:
            "Sole ETO responsible for vessel electrical power, automation, propulsion control and navigation systems.",
    },
    {
        id: "royal-caribbean-2nd",
        title: "2nd Electrical Engineer",
        org: "Royal Caribbean International — Harmony of the Seas",
        barLabel: "Royal Caribbean",
        track: "sea",
        start: "2019-03",
        end: "2022-01",
        summary:
            "HV power, ABB Azipod propulsion, generators, automation and major electrical systems.",
    },
    {
        id: "royal-caribbean-3rd",
        title: "3rd Electrical Engineer",
        org: "Royal Caribbean International — Harmony of the Seas",
        barLabel: "Royal Caribbean",
        track: "sea",
        start: "2018-06",
        end: "2019-03",
        summary: "Electrical power, propulsion and automation systems aboard Harmony of the Seas.",
    },
    {
        id: "saga-cruises",
        title: "Electronics / AV-IT Engineer",
        org: "Saga Cruises — Saga Pearl II",
        barLabel: "Saga Cruises",
        track: "sea",
        start: "2017-09",
        end: "2017-11",
        summary: "Communication, navigation, IT and electronic systems.",
    },
    {
        id: "atlantic-container-line",
        title: "Electro-Technical Officer",
        org: "Atlantic Container Line — Atlantic Star",
        barLabel: "Atlantic Container Line",
        track: "sea",
        start: "2017-03",
        end: "2017-08",
        summary: "Propulsion, generation, automation, environmental and cargo electrical systems.",
    },
    {
        id: "thenamaris",
        title: "Electrical Engineer",
        org: "Thenamaris",
        barLabel: "Thenamaris",
        track: "sea",
        start: "2012-04",
        end: "2017-01",
        summary:
            "Electrical power, automation, motors and navigation systems aboard product carriers.",
    },
    {
        id: "ics",
        title: "Software Engineer",
        org: "ICS — Integrated Computer Systems",
        barLabel: "ICS — Integrated Computer Systems",
        track: "business",
        start: "2010-06",
        end: null,
        summary:
            "Hardware/software development for computer systems, Linux, and embedded projects.",
    },
    {
        id: "oriflame",
        title: "Independent Partner / Manager",
        org: "Oriflame Cosmetics Bulgaria",
        barLabel: "Oriflame",
        track: "business",
        start: "2020-06",
        end: null,
        summary:
            "Customer and consultant network management, training, communication and sales support.",
    },
    {
        id: "naval-academy-bsc",
        title: "BSc — Ship Electrical Engineering",
        org: "Nikola Vaptsarov Naval Academy",
        barLabel: "Naval Academy — BSc",
        track: "education",
        start: "2007-09",
        end: "2012-10",
        summary: "Marine electrical engineering, automation, electronics and control systems.",
    },
    {
        id: "high-school-math",
        title: "Advanced Mathematics",
        org: "High School of Mathematics, Varna",
        barLabel: "High School of Mathematics",
        track: "education",
        start: "2002-09",
        end: "2007-06",
        summary: "Specialized mathematics program.",
    },
    {
        id: "naval-academy-msc",
        title: "MSc — Simulator Engineering",
        org: "Nikola Vaptsarov Naval Academy",
        barLabel: "Naval Academy — MSc",
        track: "education",
        start: "2023-01",
        end: null,
        summary: "Postgraduate study in maritime, transport and aviation simulation engineering.",
    },
    {
        id: "extasy",
        title: "Extasy Complete Navigation",
        org: "Independent Project",
        barLabel: "Extasy Complete Navigation",
        track: "software",
        start: "2023-01",
        end: null,
        summary: "Real-time iOS/iPadOS yacht navigation, racing and telemetry system.",
    },
    {
        id: "mlm-no-limit",
        title: "MLM No Limit",
        org: "Independent Product",
        barLabel: "MLM No Limit",
        track: "software",
        start: "2024-01",
        end: null,
        summary: "Production full-stack web, iOS and Android education platform.",
    },
    {
        id: "marine-simulator",
        title: "MarineSimulator",
        org: "Independent Project",
        barLabel: "MarineSimulator",
        track: "software",
        start: "2025-06",
        end: null,
        summary: "macOS NMEA 0183 instrument simulator and communication test bench.",
    },
    {
        id: "sowify",
        title: "Sowify — Serial Over Wi-Fi",
        org: "Independent Project",
        barLabel: "Sowify",
        track: "software",
        start: "2022-01",
        end: "2023-12",
        summary: "Raspberry Pi / iOS field diagnostic system for serial equipment over MQTT.",
    },
];

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
