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

export default function FadeIn({ children, className, delay = 0 }: Props) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.2, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}
