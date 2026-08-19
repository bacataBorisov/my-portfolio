/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ];
    },
    async redirects() {
        return [
            {
                source: "/projects/nmeasimulator",
                destination: "/projects/marine-simulator",
                permanent: true,
            },
        ];
    },
};
export default nextConfig;
