import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <Link href="https://github.com/lokithor476/clubhouse">
        <div className="flex items-center gap-2 text-2xl font-bold group cursor-pointer">
          <div className="transition-colors">
            <span>github/</span>
            <span className="group-hover:text-blue-500 group-hover:underline">
              clubhouse
            </span>
          </div>
          <ExternalLink className="group-hover:scale-110 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
