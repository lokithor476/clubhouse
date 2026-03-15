import { AlertCircle, Building2, Globe, Users } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { auth } from "@/lib/auth";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function OrgDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const requestHeaders = await headers();

  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) redirect("/login");

  const org = await auth.api.getFullOrganization({
    query: {
      organizationSlug: slug,
      membersLimit: 100,
    },
    headers: requestHeaders,
  });

  if (!org) notFound();

  const { verified, description } = org as typeof org & {
    verified: boolean;
    description: string | null;
  };

  const currentMember = org.members.find((m) => m.userId === session.user.id);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="size-14 rounded-xl">
          <AvatarImage src={org.logo ?? undefined} />
          <AvatarFallback className="rounded-xl text-base">
            {initials(org.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-xl">{org.name}</h1>
            {verified ? (
              <Badge variant="secondary" className="gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Unverified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <Globe className="size-3.5" />
              clubhouse.app/org/{org.slug}
            </span>
          </div>
        </div>
      </div>

      {/* Unverified callout */}
      {!verified && (
        <Alert>
          <AlertCircle className="size-4" />
          <AlertTitle>Your organization is unverified</AlertTitle>
          <AlertDescription>
            Submit your AICTE ID or institution documents to unlock bulk invites
            and the verified badge.{" "}
            <Link
              href={`/org/${slug}/verify`}
              className="font-medium underline underline-offset-4"
            >
              Start verification →
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* About */}
      {description && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="size-4 text-muted-foreground" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{description}</p>
          </CardContent>
        </Card>
      )}

      {/* Members list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-4 text-muted-foreground" />
            Members
          </CardTitle>
          <CardDescription>{org.members.length} total</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ItemGroup>
            {org.members.map((member) => (
              <Item key={member.id} variant="muted" className="m-4">
                <ItemMedia variant="image">
                  <Avatar>
                    <AvatarImage src={member.user.image ?? undefined} />
                    <AvatarFallback>
                      {initials(member.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{member.user.name}</ItemTitle>
                  <ItemDescription>{member.user.email}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge
                    variant={member.role === "owner" ? "secondary" : "outline"}
                    className="capitalize"
                  >
                    {member.role}
                  </Badge>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>
    </div>
  );
}
