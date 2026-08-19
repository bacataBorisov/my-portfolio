// lib/site.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all personal / brand content.
// Import from here in layout, pages, OG image, and the chat API.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
    name: "Vasil Borisov",
    nickname: "Baca",
    professionalTitle: "Electro-Technical Officer | Industrial Systems & Software Developer",
    tagline:
        "Marine electrical and automation engineer building software for real-world systems — from vessel instrumentation and navigation to production web and mobile platforms.",
    heroDescription:
        "Industrial systems, marine engineering and software — from sensors and protocols to production applications.",
    description:
        "Electro-Technical Officer and software developer building marine navigation, industrial communication, simulation, web and mobile systems. Creator of Extasy Complete Navigation, MarineSimulator, Sowify and MLM No Limit.",
    ogDescription:
        "Electro-Technical Officer and software developer building marine navigation, industrial communication, simulation, web and mobile systems.",
    ogSubtitle: "Marine Systems · Swift · Next.js · NMEA 0183 · Industrial Communications",
    role: "Electro-Technical Officer aboard R/V Falkor (too) at Schmidt Ocean Institute",
    url: "https://bacataborisov-dev.pro",

    email: "vasil.borisovv@gmail.com",
    social: {
        github: "https://github.com/bacataBorisov",
        linkedin: "https://www.linkedin.com/in/vasil-borisov-b55b8b10b",
        instagram: "https://www.instagram.com/bacata.borisov/",
    },

    about: [
        "I am an Electro-Technical Officer and software developer with more than 14 years of experience in marine electrical engineering, automation, control systems and technical troubleshooting.",
        "I currently serve as the Electro-Technical Officer aboard Schmidt Ocean Institute's research vessel R/V Falkor (too), where I am responsible for the vessel's electrical power, propulsion control, automation, instrumentation, machinery electrical systems and bridge/navigation electronics. My work ranges from 24 VDC instrumentation to 690 VAC power systems and includes PLCs, industrial communications, propulsion systems, generators, drives, UPS systems and complex fault diagnosis.",
        "Alongside my marine engineering career, I design and build software. My projects range from real-time marine telemetry, navigation and diagnostic systems to simulation tools and full-stack production web/mobile platforms. I am particularly interested in the boundary between physical systems and software: how data moves from sensors and equipment through communication protocols, processing and diagnostics to the applications people actually use.",
    ] as const,

    beyondEngineering:
        "Sailing is both a major interest and an extension of my engineering work. I race and cruise yachts and use that experience directly when developing Extasy Complete Navigation and related marine software. Outside engineering and software, my interests include fitness and playing guitar.",

    skills: [
        "Marine electrical systems",
        "PLCs & automation",
        "Industrial instrumentation",
        "RS-232 / RS-422 / RS-485",
        "Modbus",
        "CAN / CANopen",
        "MQTT",
        "NMEA 0183",
        "TCP / UDP",
        "Swift",
        "SwiftUI",
        "TypeScript",
        "React",
        "Next.js",
        "React Native",
        "Expo",
        "Python",
        "C",
        "Supabase",
        "PostgreSQL",
        "Raspberry Pi",
    ] as const,

    languages: [
        { name: "Bulgarian", level: "Native" },
        { name: "English", level: "Fluent" },
    ] as const,

    contentUpdated: "2026-08-19",

    education: [
        {
            degree: "MSc — Simulator Engineering in Maritime, Transport and Aviation",
            school: "Nikola Vaptsarov Naval Academy",
            status: "in progress" as const,
            years: "In progress",
        },
        {
            degree: "BSc — Ship Electrical Engineering",
            school: "Nikola Vaptsarov Naval Academy",
            status: "completed" as const,
            years: "Sep 2007 – Oct 2012",
        },
        {
            degree: "Advanced Mathematics Program",
            school: "High School of Mathematics, Varna",
            status: "completed" as const,
            years: "Sep 2002 – Jun 2007",
        },
    ],

    currently: {
        working:
            "Extasy Complete Navigation — real-time navigation, racing performance and onboard instrument integration · MLM No Limit — production development across web, iOS and Android",
        learning: "Simulator Engineering — MSc studies at Nikola Vaptsarov Naval Academy",
        location: "At sea aboard R/V Falkor (too) / Bulgaria",
        ship: "R/V Falkor (too)",
    },

    colors: {
        teal: "#3E8C86",
        aqua: "#8FD9DB",
        sage: "#6E9273",
        purple: "#3D2A7A",
        indigo: "#131247",
        blobTeal: "#3E8C86",
        blobAqua: "#8FD9DB",
        blobIndigo: "#3D2A7A",
    },
} as const;

/** Skills shown on the homepage tile */
export const heroSkills = [
    "Swift / SwiftUI",
    "TypeScript / React / Next.js",
    "React Native / Expo",
    "Python",
    "Industrial Communications",
    "NMEA 0183",
    "Serial / MQTT",
    "UDP / TCP",
    "Raspberry Pi",
    "Marine Automation",
] as const;

/** Skills shown on the about page */
export const aboutSkills = [
    "Marine electrical systems",
    "PLCs & automation",
    "Power management",
    "Industrial instrumentation",
    "Modbus",
    "CAN / CANopen",
    "MQTT",
    "NMEA 0183",
    "Swift / SwiftUI",
    "TypeScript / React / Next.js",
    "React Native / Expo",
    "Python",
    "Supabase / PostgreSQL",
    "Raspberry Pi",
] as const;

export const cardGradients = [
    "from-hummingbird-purple/20 to-hummingbird-aqua/10 dark:from-hummingbird-purple/50 dark:to-hummingbird-aqua/20",
    "from-hummingbird-teal/20 to-hummingbird-purple/10 dark:from-hummingbird-teal/50 dark:to-hummingbird-purple/20",
    "from-hummingbird-sage/20 to-hummingbird-aqua/10 dark:from-hummingbird-sage/50 dark:to-hummingbird-aqua/20",
    "from-hummingbird-indigo/10 to-hummingbird-sage/10 dark:from-hummingbird-indigo/50 dark:to-hummingbird-sage/20",
] as const;
