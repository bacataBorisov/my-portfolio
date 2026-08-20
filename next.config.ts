/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: process.env.NEXT_DIST_DIR || ".next",
    async headers() {
        return [
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=604800, stale-while-revalidate=2592000",
                    },
                ],
            },
            {
                source: "/icons/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=604800, stale-while-revalidate=2592000",
                    },
                ],
            },
            {
                source: "/me.jpeg",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=604800, stale-while-revalidate=2592000",
                    },
                ],
            },
            {
                source: "/cv.pdf",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=86400, stale-while-revalidate=604800",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/projects/nmeasimulator",
                destination: "/projects/marine-simulator",
                permanent: true,
            },
            {
                source: "/projects/extasy-navigation",
                destination: "/projects/extasy-complete-navigation",
                permanent: true,
            },
        ];
    },
};
export default nextConfig;
