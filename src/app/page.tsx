import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <Link
        href="https://github.com/lokithor476/clubhouse"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit clubhouse repository on GitHub (opens in new tab)"
      >
        <div className="flex items-center gap-2 text-2xl font-bold group">
          <span>github/</span>
          <span className="group-hover:text-blue-500 group-hover:underline">
            clubhouse
          </span>
          <ExternalLink className="group-hover:scale-110 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
