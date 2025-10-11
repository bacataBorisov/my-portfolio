// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import RouteTransition from "@/components/RouteTransition";
import Image from "next/image";
import HummingbirdAura from "@/components/HummingbirdAura";

export const metadata: Metadata = {
  title: "Vasil Borisov — Portfolio",
  description:
    "Portfolio of Vasil Borisov. Electro-Technical Officer turned Software Engineer — iOS/macOS, Python, C, and Navigation Technology.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen relative text-white antialiased">

        {/* 🌿 Static gradient background for all pages */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-hummingbird-teal via-hummingbird-aqua/30 to-hummingbird-indigo/80 blur-3xl" />

        {/* 🪶 Hummingbird animated aura — only appears on homepage (handled inside the component) */}
        <HummingbirdAura />

        {/* 🧭 Top navigation bar */}
        <div className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">

            {/* 🏡 Logo/Home link */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/brand-bb.png"
                alt="Home"
                width={50}
                height={50}
                className="rounded-full"
              />
            </Link>


            {/* 🔗 Nav links */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="/projects" className="text-white/70 hover:text-hummingbird-aqua">Work</Link>
              <Link href="/about" className="text-white/70 hover:text-hummingbird-aqua">About</Link>
              <Link href="/contact" className="text-white/70 hover:text-hummingbird-aqua">Contact</Link>
            </div>
          </nav>
        </div>

        {/* 🧭 Main content area */}
        <main className="flex-grow mx-auto w-full max-w-5xl px-4 py-10">
          <RouteTransition>{children}</RouteTransition>
        </main>

        {/* 🪶 Footer */}
        <footer className="border-t border-hummingbird-aqua/15 text-center text-xs text-hummingbird-aqua/60 py-3">
          Color palette inspired by the hummingbird.
        </footer>
      </body>
    </html>
  );
}