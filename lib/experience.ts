// lib/experience.ts
// Career timeline — YYYY-MM dates.
// Sea months from public LinkedIn where the CV only has years.
// ICS start year from CV (2009); month not specified.
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

export const trackOrder: Track[] = ["sea", "software", "business", "education"];

export const experience: ExperienceItem[] = [
    {
        id: "soi-falkor-too",
        title: "Electro-Technical Officer",
        org: "Schmidt Ocean Institute — R/V Falkor (too)",
        barLabel: "Schmidt Ocean",
        track: "sea",
        start: "2022-01",
        end: null,
        summary:
            "Sole ETO for electrical power, automation, propulsion control, bridge/navigation and machinery systems — including generation and distribution up to 690 VAC, Voith Schneider propulsion, thrusters, cranes, and PLC/industrial communications (Modbus, CAN, serial, Ethernet, NMEA).",
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
            "HV/LV power, 11 kV ABB Azipod propulsion, generators and automation. Promoted from 3rd EE; led electrical work on the 2021 Cádiz bow-thruster retrofit and wrote a Python tool for insulation-resistance fault calculations.",
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
        barLabel: "Saga",
        track: "sea",
        start: "2017-09",
        end: "2017-11",
        summary: "Communication, navigation, IT and electronic systems.",
    },
    {
        id: "atlantic-container-line",
        title: "Electro-Technical Officer",
        org: "Atlantic Container Line — Atlantic Star",
        barLabel: "ACL",
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
            "Electrical power, automation, motors and navigation systems aboard product carriers, including dry docks, retrofit projects and inspections.",
    },
    {
        id: "ics",
        title: "Partner / Technical Projects",
        org: "ICS — Integrated Computer Systems",
        barLabel: "ICS",
        track: "business",
        start: "2009-01",
        end: null,
        summary:
            "Ongoing computer systems, software and engineering projects alongside the maritime career — from sales and Linux support into hardware/software work including instrumentation, embedded systems, C and Raspberry Pi.",
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
            "Manage and support a network of customers and consultants through communication, product training, sales support and development.",
    },
    {
        id: "naval-academy-bsc",
        title: "BSc — Ship Electrical Engineering",
        org: "Nikola Vaptsarov Naval Academy, Varna",
        barLabel: "Naval Academy · BSc",
        track: "education",
        start: "2007-09",
        end: "2012-10",
        summary: "Marine electrical engineering, automation, electronics and control systems.",
    },
    {
        id: "high-school-math",
        title: "Secondary Education — English & Mathematics",
        org: "High School of Mathematics “Dr Petar Beron”, Varna",
        barLabel: "Math High School",
        track: "education",
        start: "2002-09",
        end: "2007-06",
        summary: "English and mathematics programme.",
    },
    {
        id: "naval-academy-msc",
        title: "MSc — Simulator Engineering in Maritime, Transport and Aviation",
        org: "Nikola Vaptsarov Naval Academy, Varna",
        barLabel: "Naval Academy · MSc",
        track: "education",
        start: "2023-01",
        end: null,
        summary: "In progress — postgraduate study in maritime, transport and aviation simulation engineering.",
    },
    {
        id: "extasy",
        title: "Extasy Complete Navigation",
        org: "Independent Project",
        barLabel: "Extasy",
        track: "software",
        start: "2023-01",
        end: null,
        summary:
            "Real-time iOS/iPadOS sailing navigation and racing system — NMEA 0183 over UDP/TCP, AIS, polar VMG/VMC and an Apple Watch companion.",
    },
    {
        id: "mlm-no-limit",
        title: "MLM No Limit",
        org: "Independent Product",
        barLabel: "MLM No Limit",
        track: "software",
        start: "2025-01",
        end: null,
        summary: "Production education platform — Next.js web app plus published iOS and Android apps.",
    },
    {
        id: "marine-simulator",
        title: "MarineSimulator",
        org: "Independent Project",
        barLabel: "MarineSimulator",
        track: "software",
        start: "2025-06",
        end: null,
        summary:
            "macOS NMEA 0183 simulation and test bench — 21 sentence types, fault injection and UDP/TCP output for testing navigation software.",
    },
    {
        id: "sowify",
        title: "Sowify — Serial Over Wi-Fi",
        org: "Independent Project",
        barLabel: "Sowify",
        track: "software",
        start: "2022-01",
        end: "2023-12",
        summary:
            "Portable field diagnostic system — bidirectional industrial serial access from iOS through a Raspberry Pi and MQTT.",
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
