// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
    theme: {
        extend: {
            colors: {
                hummingbird: {
                    aqua: "#8FD9DB",
                    sage: "#6E9273",
                    teal: "#3E8C86",
                    purple: "#3D2A7A",
                    indigo: "#131247",
                },
            },
        },
    },
} satisfies Config;