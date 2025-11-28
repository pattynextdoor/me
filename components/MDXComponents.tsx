import Link from "next/link";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Callout({ type = "info", children }: { type?: "info"|"warn"|"tip"; children: ReactNode }) {
  const color = type === "warn" ? "#f59e0b" : type === "tip" ? "#10b981" : "#3b82f6";
  return (
    <div
      style={{ borderLeft: `4px solid ${color}`, background: "rgba(255,255,255,0.04)" }}
      className="rounded-md px-4 py-3 my-6 border border-border/40"
    >
      <div className="text-sm leading-6 text-text/90">{children}</div>
    </div>
  );
}

export const MDXComponents = {
  h1: ({ className, ...props }: ComponentProps<"h1">) => (
    <h1
      {...props}
      className={cx(
        "text-3xl md:text-4xl font-display font-bold text-text tracking-tight mb-6",
        className,
      )}
    />
  ),
  h2: ({ className, ...props }: ComponentProps<"h2">) => (
    <h2
      {...props}
      className={cx(
        "text-2xl md:text-3xl font-display font-semibold text-text mt-10 mb-4",
        className,
      )}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3
      {...props}
      className={cx(
        "text-xl md:text-2xl font-semibold text-text mt-8 mb-3",
        className,
      )}
    />
  ),
  p: ({ className, ...props }: ComponentProps<"p">) => (
    <p
      {...props}
      className={cx(
        "text-lg md:text-xl leading-relaxed text-text/80",
        className,
      )}
    />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul
      {...props}
      className={cx(
        "list-disc list-outside ml-6 space-y-1 text-lg md:text-xl leading-relaxed text-text/80",
        className,
      )}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol
      {...props}
      className={cx(
        "list-decimal list-outside ml-6 space-y-1 text-lg md:text-xl leading-relaxed text-text/80",
        className,
      )}
    />
  ),
  li: ({ className, ...props }: ComponentProps<"li">) => (
    <li
      {...props}
      className={cx("leading-relaxed", className)}
    />
  ),
  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className={cx(
        "border-l-4 border-border/60 pl-4 text-text/80 italic",
        className,
      )}
    />
  ),
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code
      {...props}
      className={cx(
        "font-mono text-sm bg-dark/60 border border-border/60 rounded px-1.5 py-0.5",
        className,
      )}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <pre
      {...props}
      className={cx(
        "font-mono text-sm bg-dark/80 border border-border/60 rounded-lg p-4 overflow-auto",
        className,
      )}
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr
      {...props}
      className="my-10 border-t border-border/60"
    />
  ),
  a: ({ className, ...props }: ComponentProps<"a">) => {
    const isHeadingAnchor = props.href?.startsWith("#");
    return (
      <Link
        href={props.href ?? "#"}
        className={cx(
          isHeadingAnchor
            ? "text-text no-underline hover:text-accent"
            : "text-accent underline underline-offset-2 decoration-accent/60 hover:decoration-accent",
          className,
        )}
      >
        {props.children}
      </Link>
    );
  },
  img: ({ className, ...props }: ComponentProps<"img">) => {
    const src = typeof props.src === "string" ? props.src : "";
    const alt = typeof props.alt === "string" ? props.alt : "";

    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        className={cx("rounded-lg border border-border/40", className)}
      />
    );
  },
  Callout,
};
