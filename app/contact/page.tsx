// app/contact/page.tsx
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { site } from "@/lib/site";

const links = [
    { href: `mailto:${site.email}`, label: site.email, icon: FaEnvelope, external: false },
    { href: site.social.linkedin, label: "LinkedIn", icon: FaLinkedin, external: true },
    { href: site.social.github, label: "GitHub", icon: FaGithub, external: true },
    { href: site.social.instagram, label: "Instagram", icon: FaInstagram, external: true },
];

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Contact</h1>

            <div className="mt-6 flex flex-col gap-4 text-slate-600 dark:text-white/70">
                {links.map(({ href, label, icon: Icon, external }) => (
                    <a
                        key={href}
                        href={href}
                        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                        className="flex items-center gap-2 hover:text-hummingbird-teal dark:hover:text-hummingbird-aqua"
                    >
                        <Icon className="h-5 w-5" aria-hidden />
                        <span>{label}</span>
                    </a>
                ))}
            </div>
        </main>
    );
}
