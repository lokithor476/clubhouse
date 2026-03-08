"use client";

import { type LucideIcon, UserRoundKey } from "lucide-react";

import { AppleIcon, GithubIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginWithOAuth } from "@/modules/user/actions";

interface Providers {
  icons: LucideIcon;
  label: string;
  login: () => void;
}

const providers: Providers[] = [
  {
    icons: GoogleIcon,
    label: "Google",
    login: () => loginWithOAuth("google"),
  },
  {
    icons: GithubIcon,
    label: "GitHub",
    login: () => loginWithOAuth("github"),
  },
  {
    icons: AppleIcon,
    label: "Apple",
    login: () => loginWithOAuth("apple"),
  },
];

export function LoginForm() {
  return (
    <div className="">
      <div className="flex w-2xs flex-col space-y-2">
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
            onClick={providers.login}
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
