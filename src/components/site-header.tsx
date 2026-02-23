import { GalleryVertical, Github } from "lucide-react";
import Link from "next/link";
import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function SiteHeader() {
  const starCount = "0";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="inline-flex items-center space-x-2">
          <GalleryVertical className="mr-2" />
          <h1 className="font-bold text-lg">github/clubhouse</h1>
        </Link>
        <div className="inline-flex items-center space-x-2">
          <Link href="https://github.com/lokithor476/clubhouse" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" aria-label="View repository on GitHub">
              <Github className="size-4" />
              <Separator className="mx-0.5" orientation="vertical" />
              <span className="mx-0.5 font-semibold">{starCount}</span>
            </Button>
          </Link>
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
