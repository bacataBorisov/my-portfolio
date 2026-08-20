"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/projects", label: "Work" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-0.5 text-[13px] sm:gap-1 sm:text-sm">
            {links.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-2.5 py-2 text-center transition sm:min-h-0 sm:px-3 sm:py-1.5 ${
                            active
                                ? "text-hummingbird-teal font-medium dark:text-hummingbird-aqua"
                                : "text-slate-600 hover:text-hummingbird-teal dark:text-white/70 dark:hover:text-hummingbird-aqua"
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
