"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="flex flex-1 items-center justify-center bg-background px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="font-medium text-3xl tracking-tight">Coming Soon</h1>
        <p className="text-muted-foreground text-sm">
          We&apos;re building something simple to help campus communities stay
          organized. Join the waitlist to be notified when we launch.
        </p>
        {submitted ? (
          <div role="status" aria-live="polite" className="text-sm font-medium text-green-600">
            You&apos;re on the list! We&apos;ll notify you when we launch.
          </div>
        ) : (
          <form
            className="flex flex-col gap-2 pt-2 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <Input
              className="text-center sm:text-left"
              type="email"
              name="email"
              required
              aria-label="Email address"
              placeholder="Enter your email"
            />
            <Button type="submit">Notify Me</Button>
          </form>
        )}
        <p className="text-muted-foreground text-xs">
          Currently in development.
        </p>
      </div>
    </section>
  );
}
