import { MoveRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="font-semibold text-lg">Return to clubhouse</h2>
        <MoveRight className="size-6" />
      </div>
      <LoginForm />
      <div className="inline-flex items-center gap-1 text-sm">
        <span>Don&apos;t have an account?</span>
        <Link
          className="text-blue-600 hover:underline dark:text-blue-400"
          href="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
