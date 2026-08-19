import Button from "@/components/Button";

export default function NotFound() {
    return (
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-24 text-center">
            <p className="select-none text-8xl font-bold text-hummingbird-teal/30 dark:text-hummingbird-aqua/20">
                404
            </p>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Page not found
            </h1>
            <p className="mt-3 max-w-sm text-slate-500 dark:text-white/60">
                This page doesn&apos;t exist — it may have moved or never existed.
            </p>
            <div className="mt-8 flex gap-3">
                <Button href="/">Go home</Button>
                <Button href="/projects" variant="secondary">
                    Browse projects
                </Button>
            </div>
        </div>
    );
}
