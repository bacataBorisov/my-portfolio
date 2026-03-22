// lib/site.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all personal / brand content.
// Import from here in layout, pages, OG image, and the chat API.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
    name: "Vasil Borisov",
    nickname: "Baca",
    tagline: "Electro-Technical Officer → Software Engineer",
    description:
        "Portfolio of Vasil Borisov. Electro-Technical Officer turned Software Engineer — iOS/macOS, Python, C, and Navigation Technology.",
    ogDescription:
        "Electro-Technical Officer turned Software Engineer — iOS/macOS, Python, C, and Navigation Technology.",
    /** Short subtitle shown on the OG image */
    ogSubtitle: "iOS · macOS · Python · C · Navigation Technology",
    role: "Electro-Technical Officer aboard Falkor (too) at Schmidt Ocean Institute",
    url: "https://bacataborisov-dev.pro",

    email: "vasil.borisovv@gmail.com",
    social: {
        github: "https://github.com/bacataBorisov",
        linkedin: "https://www.linkedin.com/in/vasil-borisov-b55b8b10b",
        instagram: "https://www.instagram.com/bacata.borisov/",
    },

    /** Tags shown on the hero + about page */
    skills: [
        "Swift",
        "SwiftUI",
        "iOS",
        "macOS",
        "Python",
        "C",
        "Sockets",
        "UDP/NMEA",
        "RPi",
        "Embedded",
        "Serial/UDP",
        "NMEA-0183",
    ] as string[],

    /** Skills shown in the hero (subset of skills) */
    heroSkills: [
        "Swift",
        "SwiftUI",
        "iOS",
        "macOS",
        "Python",
        "C",
        "Serial/UDP",
        "NMEA-0183",
    ] as string[],

    /** Skills shown on the about page */
    aboutSkills: [
        "Swift",
        "SwiftUI",
        "iOS",
        "macOS",
        "Python",
        "C",
        "Sockets",
        "UDP/NMEA",
        "RPi",
        "Embedded",
    ] as string[],

    education: [
        {
            degree: "MSc in Simulator Engineering in Maritime, Transport, and Aviation",
            school: "Nikola Vaptsarov Naval Academy",
            status: "in progress" as const,
        },
        {
            degree: "BSc in Electro-Technical Engineering",
            school: "Nikola Vaptsarov Naval Academy",
            status: "completed" as const,
        },
        {
            degree: "High School of Mathematics, Varna",
            school: "Advanced Mathematics Program",
            status: "completed" as const,
        },
    ],

    /**
     * "Currently" card — update whenever your situation changes.
     * Shown on the homepage bento grid.
     */
    currently: {
        working: "Extasy Complete Navigation — polar diagram & waypoint enhancements",
        learning: "React Server Components & Next.js App Router deep-dives",
        location: "Pacific Ocean aboard R/V Falkor (too)",
        ship: "R/V Falkor (too)",
    },

    /** Hummingbird palette hex values — keeps globals.css in sync with Tailwind config */
    colors: {
        teal: "#3E8C86",
        aqua: "#8FD9DB",
        sage: "#6E9273",
        purple: "#3D2A7A",
        indigo: "#131247",
        /** Blob animation colors — slightly more vivid than palette for glow effect */
        blobTeal: "#3E8C86",
        blobAqua: "#8FD9DB",
        blobIndigo: "#3D2A7A",
    },
} as const;

/** Gradient classes cycled on project cards — single source used by all pages */
export const cardGradients = [
    "from-hummingbird-purple/20 to-hummingbird-aqua/10 dark:from-hummingbird-purple/50 dark:to-hummingbird-aqua/20",
    "from-hummingbird-teal/20 to-hummingbird-purple/10 dark:from-hummingbird-teal/50 dark:to-hummingbird-purple/20",
    "from-hummingbird-sage/20 to-hummingbird-aqua/10 dark:from-hummingbird-sage/50 dark:to-hummingbird-aqua/20",
    "from-hummingbird-indigo/10 to-hummingbird-sage/10 dark:from-hummingbird-indigo/50 dark:to-hummingbird-sage/20",
] as const;
