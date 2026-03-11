import { BellPlus, CircleCheckBig, Info } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const title = "Coming soon";
const description =
  "We are building something simple to help campus communities stay organized. Join the waitlist to be notified when we launch.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function LandingPage() {
  return (
    <section className="flex flex-1">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full max-w-xs space-y-4 md:max-w-sm">
          <h2 className="font-black font-sans text-6xl uppercase">{title}</h2>
          <div className="">
            <p className="font-semibold">{description}</p>
          </div>
          <EmailSubscription subscribed={false} verify={false} />
        </div>
      </div>
    </section>
  );
}

function EmailSubscription({
  subscribed = false,
  verify = false,
}: {
  subscribed: boolean;
  verify: boolean;
}) {
  return (
    <form className="flex w-full flex-col gap-2">
      <div className="relative">
        <Input type="email" placeholder="Email address" />
      </div>

      <Button type="submit" className="w-full">
        {subscribed ? (
          <span className="inline-flex items-center gap-2">
            Subscribed <CircleCheckBig className="size-4" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            Subscribe <BellPlus className="size-4" />
          </span>
        )}
      </Button>

      {subscribed && (
        <div
          className={cn(
            "flex items-center space-x-1",
            verify ? "text-muted-foreground" : "text-destructive",
          )}
        >
          <Info className="size-3 stroke-current" />
          <p className="font-medium text-sm">
            {verify
              ? "You're already subscribed to our email."
              : "Verify email to receive notifications."}
          </p>
        </div>
      )}
    </form>
  );
}
