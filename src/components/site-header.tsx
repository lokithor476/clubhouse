import Image from "next/image";
import Link from "next/link";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SettingsDialog } from "@/components/settings-dialog";
import { GitHubStars } from "./github-stars";

interface SiteHeaderProps {
  isLoggedIn: boolean;
}

export function SiteHeader({ isLoggedIn }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="inline-flex items-center space-x-2">
          <Image
            className="rounded-md"
            src="https://placehold.co/800?text=CH&font=roboto"
            alt="Logo"
            width={32}
            height={32}
            unoptimized
          />
          <h1 className="hidden font-bold text-lg md:block">gh/clubhouse</h1>
        </Link>
        <div className="flex items-center space-x-2">
          <GitHubStars repo="lokithor476/clubhouse" />
          {isLoggedIn ? <SettingsDialog /> : <ModeSwitcher />}
        </div>
      </div>
    </header>
  );
}