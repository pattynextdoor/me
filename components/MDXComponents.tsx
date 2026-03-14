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
      className="rounded-md px-4 py-3 my-6 border border-border"
    >
      <div className="text-sm leading-6 text-secondary">{children}</div>
    </div>
  );
}

export const MDXComponents = {
  h1: ({ className, ...props }: ComponentProps<"h1">) => (
    <h1
      {...props}
      className={cx(
        "text-3xl font-bold text-primary tracking-tight mt-14 mb-6",
        className,
      )}
    />
  ),
  h2: ({ className, ...props }: ComponentProps<"h2">) => (
    <h2
      {...props}
      className={cx(
        "text-2xl font-semibold text-primary mt-14 mb-5",
        className,
      )}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3
      {...props}
      className={cx(
        "text-xl font-semibold text-primary mt-10 mb-4",
        className,
      )}
    />
  ),
  p: ({ className, ...props }: ComponentProps<"p">) => (
    <p
      {...props}
      className={cx(
        "text-base leading-7 text-body my-4",
        className,
      )}
    />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul
      {...props}
      className={cx(
        "list-disc list-outside ml-6 space-y-1.5 text-base leading-7 text-body my-4",
        className,
      )}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol
      {...props}
      className={cx(
        "list-decimal list-outside ml-6 space-y-1.5 text-base leading-7 text-body my-4",
        className,
      )}
    />
  ),
  li: ({ className, ...props }: ComponentProps<"li">) => (
    <li
      {...props}
      className={cx("leading-7", className)}
    />
  ),
  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className={cx(
        "border-l-2 border-border pl-5 text-body italic my-6",
        className,
      )}
    />
  ),
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code
      {...props}
      className={cx(
        "text-sm bg-surface-hover border border-border rounded px-1.5 py-0.5",
        className,
      )}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <pre
      {...props}
      className={cx(
        "text-sm bg-[#151517] border border-border rounded-lg p-5 overflow-auto my-6",
        className,
      )}
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr
      {...props}
      className="my-10 border-t border-border"
    />
  ),
  a: ({ className, ...props }: ComponentProps<"a">) => {
    const isHeadingAnchor = props.href?.startsWith("#");
    return (
      <Link
        href={props.href ?? "#"}
        className={cx(
          isHeadingAnchor
            ? "text-primary no-underline hover:text-secondary"
            : "text-primary underline underline-offset-2 decoration-tertiary hover:decoration-primary",
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
        className={cx("rounded-lg border border-border", className)}
      />
    );
  },
  Callout,
};
