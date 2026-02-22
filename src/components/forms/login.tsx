"use client";
import { Button } from "@/components/ui/button";
import { loginWithOAuth } from "@/modules/user/actions";

export function LoginForm() {
  return (
    <div>
      <Button onClick={() => loginWithOAuth("google")}>
        Login with Google
      </Button>
    </div>
  );
}
