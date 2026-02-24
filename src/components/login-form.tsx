"use client";

import { UserRoundKey } from "lucide-react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Providers {
  icons: typeof Icons.google;
  label: string;
}

const providers: Providers[] = [
  { icons: Icons.google, label: "Google" },
  { icons: Icons.apple, label: "Apple" },
  { icons: Icons.github, label: "GitHub" },
];

export function LoginForm() {
  return (
    <div className="">
      <div className="flex flex-col space-y-2 w-2xs">
        <Input type="email" placeholder="Email address" />
        <Button className="cursor-pointer">Sign in with Email</Button>
        <div className="w-full max-w-sm">
          <div className="relative flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
              OR
            </span>
            <Separator className="flex-1" />
          </div>
        </div>
        {providers.map((providers) => (
          <Button
            className="cursor-pointer"
            variant="secondary"
            key={providers.label}
          >
            <providers.icons className="size-4" />
            <span>Sign in with {providers.label}</span>
          </Button>
        ))}
        <Button className="cursor-pointer" variant="secondary">
          <UserRoundKey className="size-4" />
          <span>Sign in with Passkey</span>
        </Button>
      </div>
    </div>
  );
}
