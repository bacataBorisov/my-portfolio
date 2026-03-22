"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Exact cursor position — dot follows this directly
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // Spring-delayed position for the ring
    const ringX = useSpring(dotX, { damping: 22, stiffness: 280, mass: 0.6 });
    const ringY = useSpring(dotY, { damping: 22, stiffness: 280, mass: 0.6 });

    useEffect(() => {
        // Only activate on pointer:fine devices (mouse, not touch)
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const onMove = (e: MouseEvent) => {
            dotX.set(e.clientX);
            dotY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest(
                "a, button, [role=button], input, textarea, select, label"
            );
            setHovered(!!interactive);
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);
        window.addEventListener("mouseover", onOver);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
            window.removeEventListener("mouseover", onOver);
        };
    }, [dotX, dotY, visible]);

    if (!visible) return null;

    return (
        <>
            {/* Spring-trailing ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-hummingbird-teal/60 transition-[width,height,background-color] duration-150 dark:border-hummingbird-aqua/60"
                style={{
                    x: ringX,
                    y: ringY,
                    width: hovered ? 44 : 28,
                    height: hovered ? 44 : 28,
                    backgroundColor: hovered ? "rgba(62,140,134,0.08)" : "transparent",
                }}
            />

            {/* Exact-position dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hummingbird-teal transition-[width,height,opacity] duration-100 dark:bg-hummingbird-aqua"
                style={{
                    x: dotX,
                    y: dotY,
                    width: hovered ? 6 : 5,
                    height: hovered ? 6 : 5,
                    opacity: hovered ? 0.5 : 1,
                }}
            />
        </>
    );
}
