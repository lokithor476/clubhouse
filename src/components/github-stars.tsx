import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "./icons";
import { Separator } from "./ui/separator";

interface GitHubStarsProps {
  repo: string;
  defaultStarCount?: number;
}

async function getStars(repo: string): Promise<number> {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    next: { revalidate: 3600 },
  });
  const data = await response.json();
  return data.stargazers_count;
}

export async function GitHubStars({ repo, defaultStarCount = 0 }: GitHubStarsProps) {
  let stars = defaultStarCount;

  try {
    stars = await getStars(repo);
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error);
  }

  return (
    <Button asChild variant="outline" size="sm" className="gap-1">
      <Link href={`https://github.com/${repo}`}>
        <Github className="size-4" />
        <Separator orientation="vertical" className="mx-1" />
        <span className="px-1">{stars}</span>
      </Link>
    </Button>
  );
}