// components/RouteTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function RouteTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    useEffect(() => {
        console.log("RouteTransition mounted for:", pathname);
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.47, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}