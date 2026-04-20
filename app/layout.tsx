import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import RouteTransition from "@/components/RouteTransition";
import NavLinks from "@/components/NavLinks";
import Image from "next/image";
import HummingbirdAura from "@/components/HummingbirdAura";
import { Analytics } from "@vercel/analytics/next";
import ChatWidget from "@/components/ChatWidget";
import ThemeProvider from "@/components/ThemeProvider";
import { site } from "@/lib/site";

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "Electro-Technical Officer / Software Engineer",
    sameAs: [
        site.social.github,
        site.social.linkedin,
        site.social.instagram,
    ],
};

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — Portfolio`,
    description: site.ogDescription,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portfolio`,
    description: site.ogDescription,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen relative antialiased text-slate-900 dark:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

          {/* Static gradient background — light & dark variants */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-hummingbird-aqua/30 via-white to-hummingbird-sage/20 blur-3xl dark:from-hummingbird-teal dark:via-hummingbird-aqua/30 dark:to-hummingbird-indigo/80" />

          {/* Hummingbird animated aura — only on homepage */}
          <HummingbirdAura />

          {/* Top navigation bar */}
          <div className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/icons/brand-bb.png"
                  alt="Home"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
              <NavLinks />
            </nav>
          </div>

          {/* Main content area */}
          <main className="flex-grow mx-auto w-full max-w-5xl px-4 py-10">
            <RouteTransition>{children}</RouteTransition>
          </main>

          {/* Footer */}
          <footer className="border-t border-hummingbird-aqua/20 text-center text-xs text-hummingbird-teal/70 py-3 dark:border-hummingbird-aqua/15 dark:text-hummingbird-aqua/60">
            Color palette inspired by the hummingbird.
          </footer>

          <Analytics />
          <ChatWidget />

        </ThemeProvider>
      </body>
    </html>
  );
}
