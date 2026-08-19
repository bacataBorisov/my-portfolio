"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function HummingbirdAura() {
    const pathname = usePathname();
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const coarse = window.matchMedia("(pointer: coarse)");

        const update = () => setEnabled(!motion.matches && !coarse.matches);
        update();

        motion.addEventListener("change", update);
        coarse.addEventListener("change", update);
        return () => {
            motion.removeEventListener("change", update);
            coarse.removeEventListener("change", update);
        };
    }, []);

    if (pathname !== "/" || !enabled) return null;

    return (
        <div aria-hidden className="hb-aura">
            <span className="hb-blob teal" />
            <span className="hb-blob aqua" />
            <span className="hb-blob indigo" />
        </div>
    );
}
