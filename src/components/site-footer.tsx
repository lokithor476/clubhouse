import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex h-14 items-center justify-center border-t bg-background">
      <span className="inline-flex items-center space-x-1 text-muted-foreground text-sm">
        <p>
          Open Source Software (OSS) under the{" "}
          <Link
            href="https://opensource.org/license/mit"
            className="cursor-pointer font-semibold hover:underline"
          >
            MIT License
          </Link>
        </p>
        {/* <Link
          className="inline-flex cursor-pointer items-center hover:underline"
          href="https://github.com/lokithor476/clubhouse"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>GitHub</p>
          <ExternalLink className="size-4" />
        </Link> */}
      </span>
    </footer>
  );
}
