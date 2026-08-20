// components/Button.tsx
import Link from "next/link";

type BaseProps = {
    variant?: "primary" | "secondary";
    size?: "sm" | "md";
    className?: string;
    children: React.ReactNode;
};

type AsLink = BaseProps & {
    href: string;
    external?: boolean;
    download?: string | boolean;
    onClick?: never;
    disabled?: never;
    type?: never;
};

type AsButton = BaseProps & {
    href?: never;
    external?: never;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit";
};

type Props = AsLink | AsButton;

const variants = {
    primary: "bg-hummingbird-teal text-white hover:bg-hummingbird-sage",
    secondary:
        "border border-black/15 bg-black/5 text-slate-700 hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10",
};

const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
};

function classes(variant: "primary" | "secondary", size: "sm" | "md", extra = "") {
    return [
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition",
        variants[variant],
        sizes[size],
        extra,
    ]
        .filter(Boolean)
        .join(" ");
}

export default function Button({
    variant = "primary",
    size = "md",
    className,
    children,
    href,
    external,
    download,
    onClick,
    disabled,
    type = "button",
}: Props) {
    const cls = classes(variant, size, className);

    if (href) {
        if (download) {
            return (
                <a
                    href={href}
                    download={download === true ? undefined : download}
                    className={cls}
                >
                    {children}
                </a>
            );
        }
        return external ? (
            <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
                {children}
            </a>
        ) : (
            <Link href={href} className={cls}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>
            {children}
        </button>
    );
}
