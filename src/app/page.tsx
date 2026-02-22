import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-medium tracking-tight">Coming Soon</h1>
        <p className="text-sm text-muted-foreground">
          We’re building something simple to help campus communities stay
          organized. Join the waitlist to be notified when we launch.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 pt-2">
          <Input
            className="text-center sm:text-left"
            type="email"
            placeholder="Enter your email"
          />
          <Button>Notify Me</Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Currently in development.
        </p>
      </div>
    </section>
  );
}
