"use client";

import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    className?: string;
    /** Delay in seconds before the animation starts */
    delay?: number;
    /** Direction the element slides in from */
    from?: "bottom" | "left" | "right" | "none";
};

export default function FadeIn({
    children,
    className,
    delay = 0,
    from = "bottom",
}: Props) {
    const offsets = {
        bottom: { y: 20, x: 0 },
        left:   { y: 0,  x: -20 },
        right:  { y: 0,  x: 20 },
        none:   { y: 0,  x: 0 },
    };

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...offsets[from] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}
