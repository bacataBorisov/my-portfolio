// app/contact/page.tsx
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

const links = [
    { href: `mailto:${site.email}`, label: site.email, icon: FaEnvelope, external: false },
    { href: site.social.linkedin, label: "LinkedIn", icon: FaLinkedin, external: true },
    { href: site.social.github, label: "GitHub", icon: FaGithub, external: true },
    { href: site.social.instagram, label: "Instagram", icon: FaInstagram, external: true },
];

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-12">
            <FadeIn>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Contact</h1>
                <p className="mt-2 text-slate-500 dark:text-white/60">
                    Send me a message or find me on any of the platforms below.
                </p>
            </FadeIn>

            {/* Contact form */}
            <FadeIn delay={0.05}>
                <div className="rounded-2xl border border-black/10 bg-white/40 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <h2 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">Send a message</h2>
                    <ContactForm />
                </div>
            </FadeIn>

            {/* Social links */}
            <FadeIn delay={0.1}>
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Or find me on</h2>
                    <div className="flex flex-col gap-4 text-slate-600 dark:text-white/70">
                        {links.map(({ href, label, icon: Icon, external }) => (
                            <a
                                key={href}
                                href={href}
                                {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                                className="flex items-center gap-2 hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua transition"
                            >
                                <Icon className="h-5 w-5" aria-hidden />
                                <span>{label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </main>
    );
}
