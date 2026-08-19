"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

/**
 * Loads the chat widget after the browser is idle so the first paint
 * does not pay for the panel JS.
 */
export default function ChatWidgetLazy() {
    const [Widget, setWidget] = useState<ComponentType | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            import("./ChatWidget").then((mod) => {
                if (!cancelled) setWidget(() => mod.default);
            });
        };

        if (typeof requestIdleCallback === "function") {
            const id = requestIdleCallback(load);
            return () => {
                cancelled = true;
                cancelIdleCallback(id);
            };
        }

        const t = setTimeout(load, 1);
        return () => {
            cancelled = true;
            clearTimeout(t);
        };
    }, []);

    if (!Widget) return null;
    return <Widget />;
}
