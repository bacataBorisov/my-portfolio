// components/Badge.tsx
export default function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-black/15 bg-black/5 px-3 py-1 text-xs text-slate-700 backdrop-blur-sm dark:border-white/15 dark:bg-white/5 dark:text-white/80">
            {children}
        </span>
    );
}
