import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Link
        href="https://github.com/lokithor476/clubhouse"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit clubhouse repository on GitHub (opens in new tab)"
      >
        <div className="group flex items-center gap-2 font-bold text-2xl">
          <span>github/</span>
          <span className="group-hover:text-blue-500 group-hover:underline">
            clubhouse
          </span>
          <ExternalLink className="transition-transform group-hover:scale-110" />
        </div>
      </Link>
    </div>
  );
}
