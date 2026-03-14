export default function Footer() {
  const commitHash = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev";

  return (
    <footer className="py-6">
      <div className="w-full h-px bg-border mb-6" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/pattynextdoor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/patricktumbucon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="mailto:patricktumbucon@gmail.com"
            className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4"
          >
            Email
          </a>
        </div>
        <span className="text-xs text-tertiary tabular-nums">
          {commitHash}
        </span>
      </div>
    </footer>
  );
}
