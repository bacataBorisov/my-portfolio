import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import RouteTransition from "@/components/RouteTransition";
import NavLinks from "@/components/NavLinks";
import Image from "next/image";
import HummingbirdAura from "@/components/HummingbirdAura";
import { Analytics } from "@vercel/analytics/next";
import ChatWidgetLazy from "@/components/ChatWidgetLazy";
import ThemeProvider from "@/components/ThemeProvider";
import { site } from "@/lib/site";

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: site.professionalTitle,
    sameAs: [site.social.github, site.social.linkedin, site.social.instagram],
};

export const metadata: Metadata = {
    title: {
        default: `${site.name} — Marine Systems & Software Engineer`,
        template: `%s — ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(site.url),
    openGraph: {
        type: "website",
        url: site.url,
        title: `${site.name} — Marine Systems & Software Engineer`,
        description: site.ogDescription,
        siteName: site.name,
    },
    twitter: {
        card: "summary_large_image",
        title: `${site.name} — Marine Systems & Software Engineer`,
        description: site.ogDescription,
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const year = new Date().getFullYear();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="flex flex-col min-h-screen relative antialiased text-slate-900 dark:text-white">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-slate-900 dark:focus:bg-black dark:focus:text-white"
                    >
                        Skip to content
                    </a>

                    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-hummingbird-aqua/30 via-white to-hummingbird-sage/20 blur-3xl dark:from-hummingbird-teal dark:via-hummingbird-aqua/30 dark:to-hummingbird-indigo/80" />

                    <HummingbirdAura />

                    <div className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
                        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    src="/icons/brand-bb.png"
                                    alt="Home"
                                    width={50}
                                    height={50}
                                    sizes="50px"
                                    unoptimized
                                    className="rounded-full"
                                />
                            </Link>
                            <NavLinks />
                        </nav>
                    </div>

                    <main
                        id="main-content"
                        className="mx-auto w-full max-w-5xl flex-grow px-4 py-10"
                    >
                        <RouteTransition>{children}</RouteTransition>
                    </main>

                    <footer className="border-t border-hummingbird-aqua/20 py-4 text-xs text-hummingbird-teal/70 dark:border-hummingbird-aqua/15 dark:text-hummingbird-aqua/60">
                        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
                            <p>
                                © {year} {site.name}
                            </p>
                            <p>Color palette inspired by the hummingbird.</p>
                            <p className="flex gap-3">
                                <a
                                    href={`mailto:${site.email}`}
                                    className="hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua"
                                >
                                    Email
                                </a>
                                <a
                                    href={site.social.github}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua"
                                >
                                    GitHub
                                </a>
                            </p>
                        </div>
                    </footer>

                    <Analytics />
                    <ChatWidgetLazy />
                </ThemeProvider>
            </body>
        </html>
    );
}
