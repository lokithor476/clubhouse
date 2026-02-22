import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-background px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="font-medium text-3xl tracking-tight">Coming Soon</h1>
        <p className="text-muted-foreground text-sm">
          We&apos;re building something simple to help campus communities stay
          organized. Join the waitlist to be notified when we launch.
        </p>
        <form className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Input
            className="text-center sm:text-left"
            type="email"
            placeholder="Enter your email"
          />
          <Button>Notify Me</Button>
        </form>
        <p className="text-muted-foreground text-xs">
          Currently in development.
        </p>
      </div>
    </section>
  );
}
