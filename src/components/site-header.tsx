import { GitBranchPlus, Inbox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SettingsDialog } from "@/components/settings-dialog";
import { Button } from "@/components/ui/button";
import { Github } from "./icons";
import { Separator } from "./ui/separator";

export function SiteHeader() {
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
        <div className="space-x-2">
          <ChangeSetDialog />
          <InboxDialog />
          <GitHubStars
            href="https://github.com/lokithor476/clubhouse"
            starCount={0}
          />
          <ModeSwitcher />
          <SettingsDialog />
        </div>
      </div>
    </header>
  );
}

async function GitHubStars({
  starCount,
  href,
}: {
  starCount?: number;
  href: string;
}) {
  let stars = starCount;
  
  try {
    const response = await fetch(
      "https://api.github.com/repos/lokithor476/clubhouse",
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    stars = data.stargazers_count;
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error);
  }

  return (
    <Button asChild variant="outline" size="sm" className="gap-1">
      <Link href={href}>
        <Github className="size-4" />
        <Separator orientation="vertical" className="mx-1" />
        <span className="px-1">{stars}</span>
      </Link>
    </Button>
  );
}

function InboxDialog() {
  return (
    <Button variant="outline" size="icon-sm">
      <Inbox className="size-4" />
    </Button>
  );
}

function ChangeSetDialog() {
  return (
    <Button variant="outline" size="icon-sm">
      <GitBranchPlus className="size-4" />
    </Button>
  );
}
