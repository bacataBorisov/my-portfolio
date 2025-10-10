// app/contact/page.tsx
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>

            <div className="mt-6 flex flex-col gap-4 text-white/70">
                <a
                    href="mailto:vasil.borisovv@gmail.com"
                    className="flex items-center gap-2 hover:text-hummingbird-aqua"
                >
                    <FaEnvelope className="h-5 w-5" />
                    <span>vasil.borisovv@gmail.com</span>
                </a>

                <a
                    href="https://www.linkedin.com/in/vasil-borisov-b55b8b10b"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-hummingbird-aqua"
                >
                    <FaLinkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                </a>

                <a
                    href="https://github.com/bacataBorisov"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-hummingbird-aqua"
                >
                    <FaGithub className="h-5 w-5" />
                    <span>GitHub</span>
                </a>

                <a
                    href="https://www.instagram.com/bacata.borisov/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-hummingbird-aqua"
                >
                    <FaInstagram className="h-5 w-5" />
                    <span>Instagram</span>
                </a>
            </div>
        </main>
    );
}