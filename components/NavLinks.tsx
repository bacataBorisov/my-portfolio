"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
    { href: "/projects", label: "Work" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="flex min-w-0 items-center gap-0.5 overflow-x-auto text-xs sm:gap-1 sm:text-sm">
            {links.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`shrink-0 rounded-md px-2 py-1.5 transition sm:px-3 ${
                            active
                                ? "text-hummingbird-teal font-medium dark:text-hummingbird-aqua"
                                : "text-slate-600 hover:text-hummingbird-teal dark:text-white/70 dark:hover:text-hummingbird-aqua"
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
            <div className="ml-1 shrink-0 border-l border-black/10 pl-1 sm:ml-2 sm:pl-2 dark:border-white/10">
                <ThemeToggle />
            </div>
        </div>
    );
}
