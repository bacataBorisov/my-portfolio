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

export default function StreamEmbed({ src, title }: Props) {
    if (!isCloudflareStream(src)) return null;

    return (
        <div className="relative aspect-[2360/1640] overflow-hidden rounded-2xl bg-black">
            <iframe
                src={src}
                title={title}
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
            />
        </div>
    );
}
