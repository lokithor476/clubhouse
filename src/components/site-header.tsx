import { ModeSwitcher } from "@/components/mode-switcher";
import { siteConfig } from "@/lib/config";
import { GalleryVertical, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        <span className="flex items-center space-x-2">
          <GalleryVertical className="size-6" />
          <h2 className="font-bold">{siteConfig.name}</h2>
        </span>
        <div className="items-center flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              Login
              <Separator orientation="vertical" />
              <LogIn className="size-4" />
            </Link>
          </Button>
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
