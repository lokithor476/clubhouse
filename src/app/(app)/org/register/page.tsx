import { Building2, CheckCircle2, Sparkles } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { RegisterOrganizationForm } from "@/components/register-organization-form";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Invite students",
    body: "Add students by domain auto-join or manually by email.",
  },
  {
    icon: Sparkles,
    title: "Let students create clubs",
    body: "Grant trusted members permission to create and manage clubs.",
  },
] as const;

export default async function RegisterOrganizationPage() {
  const [organization] = await auth.api.listOrganizations({
    headers: await headers(),
  });

  if (organization) {
    return redirect(`/org/${organization.slug}`);
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 gap-0 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:gap-16 lg:py-20">
        {/* Left — context */}
        <div className="flex flex-col justify-center gap-10 pb-10 lg:pb-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg border bg-primary text-primary-foreground">
                <Building2 className="size-4" />
              </div>
              <span className="font-medium text-muted-foreground text-sm">
                Clubhouse
              </span>
            </div>

            <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
              Register your
              <br />
              <span className="text-muted-foreground">college.</span>
            </h1>

            <p className="max-w-md text-base text-muted-foreground leading-relaxed">
              Create a home for your institution on Clubhouse. Once verified,
              you can invite students, create clubs, and manage everything from
              one place.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border bg-muted">
                  <Icon className="size-3.5 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-medium text-sm leading-snug">{title}</p>
                  <p className="text-muted-foreground text-sm leading-snug">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-col justify-center">
          <Card className="border shadow-sm">
            <CardContent className="p-6 sm:p-7">
              <div className="mb-6 flex flex-col gap-1.5">
                <h2 className="font-semibold text-base">
                  Organization details
                </h2>
                <p className="text-muted-foreground text-sm">
                  Fill in your college info. You can edit this later.
                </p>
              </div>
              <RegisterOrganizationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
