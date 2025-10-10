// app/about/page.tsx
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-2xl font-semibold tracking-tight">About</h1>

            <div className="mt-6 flex flex-col items-center gap-6 md:flex-row md:items-start">
                <Image
                    src="/me.jpeg"
                    alt="Baca"
                    width={360}
                    height={360}
                    className="h-40 w-40 rounded-4xl object-cover border border-white/20"
                />

                {/* Text stack aligned with the photo */}
                <div className="flex flex-col gap-4">
                    <p className="text-white/70">
                        Hello I am Vasil but friends call me Baca, an Electro-Technical Officer on <em>Falkor (too)</em> at Schmidt Ocean Institute.
                        In my free time I build navigation tools, simulators, and data plumbing between sensors and UI.
                        Comfortable with Swift/SwiftUI for iOS/macOS, Python/C for tooling and connectivity.
                    </p>

                    <p className="text-white/70 italic">
                        Programming started as a hobby, but has grown into a passion I’m committed to turning into a professional path.
                    </p>
                </div>
            </div>

            <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                    {["Swift", "SwiftUI", "iOS", "macOS", "Python", "C", "Sockets", "UDP/NMEA", "RPi", "Embedded"].map((t) => (
                        <Badge key={t}>{t}</Badge>
                    ))}
                </div>
            </Section>

            <div className="mt-4">
                <Section title="Education">
                    <ul className="list-disc pl-5 text-white/70 space-y-2">
                        <li>
                            <strong>MSc in Simulator Engineering in Maritime, Transport, and Aviation</strong> (in progress),
                            Nikola Vaptsarov Naval Academy
                        </li>
                        <li>
                            <strong>BSc in Electro-Technical Engineering</strong>, Nikola Vaptsarov Naval Academy
                        </li>
                        <li>
                            <strong>High School of Mathematics, Varna</strong> — Advanced Mathematics Program
                        </li>
                    </ul>
                </Section>
            </div>

            {/* Extra spacing before Beyond Engineering */}
            <div className="mt-4">
                <Section title="Beyond Engineering">
                    <p className="text-white/70">
                        In addition to my technical work, I manage a team at <strong>Oriflame (Health & Beauty)</strong>,
                        developing leadership and communication skills. I’m also a passionate <strong>sailor</strong>,
                        which inspires much of my navigation software, and I enjoy playing the <strong>guitar</strong> in my free time.
                    </p>
                </Section>
            </div>

            {/* Optional small CTA */}
            <p className="mt-12 text-sm text-white/60">
                Want to chat or collaborate?{" "}
                <a className="underline hover:text-hummingbird-aqua" href="/contact">Get in touch →</a>
            </p>
        </main>
    );
}