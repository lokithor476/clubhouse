import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/config";

async function getStarCount() {
  try {
    const res = await fetch(siteConfig.links.github);
    const data = await res.json();
    return data.stargazers_count;
  } catch {
    return 0;
  }
}

export async function SiteFooter() {
  const starCount = await getStarCount();

  return (
    <footer className="bg-background z-50 w-full border-t">
      <div className="container h-14 mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://mit-license.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-4" />
              <p>MIT License</p>
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="size-4" />
              <Separator orientation="vertical" />
              <p className="font-semibold mx-0.5">{starCount}</p>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
