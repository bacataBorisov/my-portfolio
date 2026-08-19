export type Project = {
    slug: string;
    icon?: string;
    title: string;
    summary: string;
    tags: string[];
    status?: string;
    covers?: string[];
    coverAspect?: number;
    highlights?: string[];
    repoUrl?: string;
    demoLinks?: { label: string; href: string; icon?: DemoLinkIcon }[];
};

export type DemoLinkIcon = "website" | "appstore" | "play" | "github" | "video";

export const projects: Project[] = [
    {
        slug: "extasy-complete-navigation",
        icon: "/icons/extasy_sail_free_icon.png",
        title: "Extasy Complete Navigation",
        summary:
            "Real-time iOS/iPadOS sailing navigation and racing system integrating yacht instrumentation through NMEA 0183 over UDP/TCP, with navigation, tactical racing, performance and diagnostic tools.",
        status: "In development / on-water testing · target v1.0 early 2027",
        tags: ["iOS", "iPadOS", "SwiftUI", "NMEA 0183", "UDP", "TCP", "watchOS"],
        covers: [
            "/images/map_vmg_light_dark.png",
            "/images/map_vmg_light.png",
            "/images/starting_view_dark.png",
            "/images/starting_view_light.png",
            "/images/vmg_ultimate_dark.png",
            "/images/vmg_ultimate_light.png",
        ],
        highlights: [
            "Real-time yacht instrument ingestion over UDP and TCP with checksum validation",
            "AIS decoding, polar-based VMG/VMC, laylines and start-line geometry",
            "Live NMEA terminal, sensor health monitoring and transport recovery",
            "MapKit plus S-57 ENC integration and rule-based racing coach",
            "Apple Watch companion with 600+ automated XCTest methods",
            "On-water validation — not yet on the App Store",
        ],
        demoLinks: [
            {
                label: "iPhone demo video",
                href: "https://drive.google.com/file/d/1rVJDbGBMlsVFmgOLY960FpXGMJToISZk/view?usp=sharing",
                icon: "video",
            },
            {
                label: "iPad demo video",
                href: "https://drive.google.com/file/d/1omNMziGSfN7exxU7LXaitJ29QClQm2Oh/view?usp=sharing",
                icon: "video",
            },
        ],
    },

    {
        slug: "mlm-no-limit",
        icon: "/icons/mlm_no_limit_icon.png",
        title: "MLM No Limit",
        summary:
            "A production education platform designed, developed and operated as sole software developer — Next.js web application plus published iOS and Android apps.",
        tags: [
            "TypeScript",
            "Next.js",
            "React Native",
            "Expo",
            "tRPC",
            "Supabase",
            "iOS",
            "Android",
        ],
        highlights: [
            "Sole developer for web, backend, iOS and Android",
            "Shared TypeScript / tRPC architecture across web and mobile",
            "Supabase Auth with magic-link / OTP and role-based access",
            "Video learning, surveys, schedules, reminders and daily checklists",
            "Admin interface for users, content, GDPR and system logs",
            "Bulgarian and English localization · staging and production environments",
            "GitHub Actions CI and EAS mobile builds with OTA updates",
        ],
        demoLinks: [
            { label: "Website", href: "https://mlmnolimit.com/", icon: "website" },
            {
                label: "App Store",
                href: "https://apps.apple.com/ca/app/mlm-no-limit/id6759079526",
                icon: "appstore",
            },
            {
                label: "Google Play",
                href: "https://play.google.com/store/apps/details?id=com.mlmnolimit.mobile",
                icon: "play",
            },
        ],
    },

    {
        slug: "marine-simulator",
        title: "MarineSimulator",
        icon: "/icons/simulator_icon.png",
        summary:
            "A macOS NMEA 0183 instrument simulator and test bench that generates coherent vessel/sensor data and streams it over UDP/TCP to navigation applications.",
        status: "Working development / test tool",
        tags: ["macOS", "SwiftUI", "NMEA 0183", "UDP", "TCP", "MapKit"],
        covers: ["/images/dashboard.png", "/images/configuration_page.png"],
        highlights: [
            "Generates coherent vessel state — not unrelated random sensor values",
            "21 NMEA 0183 sentence types with realistic instrument update rates",
            "Multi-endpoint UDP and TCP output with fault injection modes",
            "Wind-triangle calculations and polar-interpolated boat speed",
            "Live NMEA and transport history console",
            "Built to test navigation software such as Extasy without a live vessel",
        ],
        repoUrl: "https://github.com/bacataBorisov/MarineSimulator.git",
    },

    {
        slug: "sowify",
        title: "Sowify — Serial Over Wi-Fi",
        icon: "/icons/sowify_icon.png",
        summary:
            "Portable field diagnostic system connecting industrial serial equipment to iPhone/iPad through a Raspberry Pi and MQTT — live monitoring, commands and remote configuration.",
        status: "Working field prototype / sideloaded development tool",
        tags: ["Swift", "UIKit", "Python", "MQTT", "Raspberry Pi", "RS-232/422/485"],
        covers: ["/images/iphone_sowify.png"],
        coverAspect: 863 / 1722,
        highlights: [
            "Replaces laptop + serial adapter workflow in difficult-access locations",
            "Bidirectional serial over RS-232/422/485 via MOXA uPort 1150",
            "Configurable baud rate, parity, stop bits and data bits",
            "MQTT topics for data, commands, configuration and device control",
            "Remote Raspberry Pi reboot/shutdown and serial fault classification",
            "First serious iOS project — foundation for hardware/software integration work",
        ],
        repoUrl: "https://github.com/bacataBorisov/Sowify",
        demoLinks: [
            {
                label: "Raspberry Pi backend",
                href: "https://github.com/bacataBorisov/Sowify_RPi",
                icon: "github",
            },
        ],
    },
];
