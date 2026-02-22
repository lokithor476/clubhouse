import { GalleryVertical, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function SiteHeader() {
  const starCount = "0";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="inline-flex items-center space-x-2">
          <GalleryVertical className="mr-2" />
          <h1 className="font-bold text-lg">clubhouse</h1>
        </Link>
        <Link href="#" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <Github className="size-4" />
            <Separator className="mx-0.5" orientation="vertical" />
            <span className="font-semibold">{starCount}</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
