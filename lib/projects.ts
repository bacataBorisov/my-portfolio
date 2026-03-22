// lib/projects.ts
export type Project = {
    slug: string;
    icon?: string;
    title: string;
    summary: string;
    tags: string[];
    covers?: string[];
    /** Aspect ratio (width/height) used when there is exactly one cover image */
    coverAspect?: number;
    readme?: string;
    highlights?: string[];
    repoUrl?: string;
    demoLinks?: { label: string; href: string }[];
};

export const projects: Project[] = [
    {
        slug: "extasy-navigation",
        icon: "/icons/extasy_sail_free_icon.png",
        title: "Extasy Complete Navigation",
        summary:
            "iOS/macOS sailing navigation app built with SwiftUI, NMEA integration, and modular architecture.",
        tags: ["iOS", "SwiftUI", "NMEA-0183", "UDP", "RPi", "C"],
        covers: [
            "/images/map_vmg_light_dark.png",
            "/images/map_vmg_light.png",
            "/images/starting_view_dark.png",
            "/images/starting_view_light.png",
            "/images/vmg_ultimate_dark.png",
            "/images/vmg_ultimate_light.png",
        ],
        highlights: [
            "📡 Real-time NMEA data: speed, wind, depth, compass, GPS",
            "⛵ Polar diagram integration for optimal sailing",
            "📊 Customizable multi-display layouts (tap-to-swap)",
            "🗺️ Waypoint management with ETA/VMG",
            "🚨 Depth alarms; configurable alerts planned",
            "🌙 Light/Dark modes for day & night sailing",
        ],
        repoUrl: "https://github.com/bacataBorisov/ExtasyCompleteNavigation",
        demoLinks: [
            {
                label: "📱 iPhone demo video",
                href: "https://drive.google.com/file/d/1rVJDbGBMlsVFmgOLY960FpXGMJToISZk/view?usp=sharing",
            },
            {
                label: "🖥️ iPad demo video",
                href: "https://drive.google.com/file/d/1omNMziGSfN7exxU7LXaitJ29QClQm2Oh/view?usp=sharing",
            },
        ],
    },

    {
        slug: "nmeasimulator",
        title: "MarineSimulator",
        icon: "/icons/simulator_icon.png",
        summary:
            "A macOS app (SwiftUI + MapKit) for simulating and visualizing marine navigation data without needing onboard instruments. Ideal for prototyping, testing, and demos of NMEA-style (not-only) workflows.",
        tags: ["macOS", "SwiftUI", "Serial", "UDP", "Random Generators"],
        covers: [
            "/images/dashboard.png",
            "/images/configuration_page.png",
        ],
        highlights: [
            "🧭 Real-time simulation of vessel data (GPS, Compass, Wind, Speed & Depth)",
            "🗺️ Interactive MapKit view with a custom boat marker and smooth heading animation",
            "🖐️ Manual pan/zoom with a one-tap “Center on Boat” control (no forced follow)",
            "🎚️ Compact control panels (left) for quick tuning via sliders",
            "📊 Inspector panel (right) for live readouts and instrument widgets",
            "📡 UDP broadcast of NMEA-like sentences for external consumers",
            "🧱 SwiftUI-first architecture with clean, extendable components"
        ],
        repoUrl: "https://github.com/bacataBorisov/MarineSimulator.git",
    },

    {
        slug: "sowify",
        title: "Sowify",
        icon: "/icons/sowify_icon.png",
        summary:
            "Reads serial signals and publishes them to phones/tablets in real time.",
        tags: ["C", "Python", "Sockets", "iOS client", "Swift", "RPi", "MQTT", "Serial Comm"],
        covers: ["/images/iphone_sowify.png"],
        coverAspect: 863 / 1722,
        highlights: [
            "⚙️ Serial communication bridge — reads and writes data between RS232/422/485 devices and iOS over Wi-Fi",
            "🧠 Raspberry Pi integration — MOXA uPort1150 for serial conversion, battery-powered portability",
            "📡 Wireless data link — iOS app connects automatically via MQTT on the same LAN",
            "🧾 Operator panel — choose interface, start/stop streaming, monitor live serial output",
            "🔁 Device control — send commands, reboot or power-off the Raspberry Pi remotely",
            "💬 Status & alerts — top-bar warnings for connectivity/config issues",
            "🐍 Python backend scripts — serial I/O + MQTT publishing on the RPi",
            "🧩 Future expansion — MODBUS, auto-startup scripts planned",
        ],
        repoUrl: "https://github.com/bacataBorisov/Sowify",
        demoLinks: [
            {
                label: "Python Backend Scripts →",
                href: "https://github.com/bacataBorisov/Sowify_RPi", // ← update if different
            },
        ],
    },
];

export function getBySlug(slug: string) {
    return projects.find((p) => p.slug === slug);
}