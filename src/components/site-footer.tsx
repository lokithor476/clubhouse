import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex h-14 items-center justify-center border-t bg-background">
      <span className="inline-flex items-center space-x-1 text-foreground text-sm">
        <p>Open source on</p>
        <Link
          className="inline-flex cursor-pointer items-center hover:underline"
          href="/"
        >
          <p>Github</p>
          <ExternalLink className="size-4" />
        </Link>
      </span>
    </footer>
  );
}
