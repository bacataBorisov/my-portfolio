"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
    { href: "/projects", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-1 text-sm">
            {links.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`rounded-md px-3 py-1.5 transition ${
                            active
                                ? "text-hummingbird-teal font-medium dark:text-hummingbird-aqua"
                                : "text-slate-600 hover:text-hummingbird-teal dark:text-white/70 dark:hover:text-hummingbird-aqua"
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
            <div className="ml-2 border-l border-black/10 pl-2 dark:border-white/10">
                <ThemeToggle />
            </div>
        </div>
    );
}
