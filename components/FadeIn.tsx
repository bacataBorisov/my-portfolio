"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    className?: string;
    /** Delay in seconds before the animation starts */
    delay?: number;
    /** Direction the element slides in from */
    from?: "bottom" | "left" | "right" | "none";
};

export default function FadeIn({ children, className, delay = 0, from = "bottom" }: Props) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <div className={className}>{children}</div>;
    }

    const offsets = {
        bottom: { y: 20, x: 0 },
        left: { y: 0, x: -20 },
        right: { y: 0, x: 20 },
        none: { y: 0, x: 0 },
    };

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...offsets[from] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}
