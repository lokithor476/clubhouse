import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";

export default async function OrganizationPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/login?next=/organizations/${slug}`);
  }

  const [organizationRecord] = await auth.api.listOrganizations({
    headers: await headers(),
  });

  if (!organizationRecord) {
    notFound();
  }

  return (
    <section className="flex flex-1 bg-linear-to-b from-background via-background to-muted/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.24em]">
            Organization
          </p>
          <h1 className="font-semibold text-4xl tracking-tight sm:text-5xl">
            {organizationRecord.name}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            /organizations/{organizationRecord.slug}
          </p>
        </div>

        <Card className="border-border/70 bg-card/95 shadow-black/5 shadow-xl">
          <CardHeader className="gap-3">
            <CardTitle>Profile overview</CardTitle>
            <CardDescription className="leading-6">
              Your organization was created successfully and is currently{" "}
              {organizationRecord.metadata.verified
                ? "verified."
                : "pending review."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-muted/40 p-4">
                <p className="font-medium text-sm">Logo</p>
                <p className="mt-2 break-all text-muted-foreground text-sm">
                  {organizationRecord.logo ?? "No logo added yet."}
                </p>
              </div>
              <div className="rounded-xl border bg-muted/40 p-4">
                <p className="font-medium text-sm">Verification</p>
                <p className="mt-2 text-muted-foreground text-sm">
                  {organizationRecord.metadata.verified
                    ? "Verified"
                    : "Unverified by default"}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <h2 className="font-medium text-lg">Description</h2>
              <p className="text-muted-foreground leading-7">
                {organizationRecord.metadata.description ??
                  "No description has been added yet."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
