"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const reduce = useReducedMotion();

    if (reduce) {
        return <div>{children}</div>;
    }

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
