import { MoveRight } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">Return to clubhouse</h2>
        <MoveRight className="size-6" />
      </div>
      <LoginForm />
      <div className="inline-flex items-center gap-1 text-sm">
        <span>Don&apos;t have an account?</span>
        <Link
          className="text-blue-600 dark:text-blue-400 hover:underline"
          href="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
