'use client';

import { usePathname } from 'next/navigation';

export default function HummingbirdAura() {
    // Render ONLY on the homepage
    const pathname = usePathname();
    if (pathname !== '/') return null;

    return (
        <div aria-hidden className="hb-aura">
            <span className="hb-blob teal" />
            <span className="hb-blob aqua" />
            <span className="hb-blob indigo" />
        </div>
    );
}