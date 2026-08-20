"use client";

import { useState } from "react";

type Props = {
    src: string;
    title: string;
};

function isCloudflareStream(src: string) {
    try {
        const url = new URL(src);
        return url.hostname.endsWith(".cloudflarestream.com") && url.pathname.includes("/iframe");
    } catch {
        return false;
    }
}

function posterFromSrc(src: string) {
    try {
        const poster = new URL(src).searchParams.get("poster");
        return poster ? decodeURIComponent(poster) : null;
    } catch {
        return null;
    }
}

export default function StreamEmbed({ src, title }: Props) {
    const [ready, setReady] = useState(false);
    if (!isCloudflareStream(src)) return null;

    const poster = posterFromSrc(src);

    return (
        <div className="relative aspect-[2360/1640] overflow-hidden rounded-2xl bg-slate-950">
            {poster && (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element -- external Stream thumbnail */}
                    <img
                        src={poster}
                        alt=""
                        aria-hidden
                        className={`absolute inset-0 h-full w-full scale-110 object-cover blur-2xl transition-opacity duration-700 ${
                            ready ? "opacity-0" : "opacity-100"
                        }`}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element -- external Stream thumbnail */}
                    <img
                        src={poster}
                        alt=""
                        aria-hidden
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                            ready ? "opacity-0" : "opacity-100"
                        }`}
                    />
                    <div
                        className={`absolute inset-0 bg-slate-950/50 transition-opacity duration-700 ${
                            ready ? "opacity-0" : "opacity-100"
                        }`}
                        aria-hidden
                    />
                </>
            )}

            <iframe
                src={src}
                title={title}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                onLoad={() => setReady(true)}
                className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
                    ready ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
}
