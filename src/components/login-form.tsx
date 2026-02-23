"use client";

import { useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginWithOAuth } from "@/modules/user/actions";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await loginWithOAuth("google");
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login in your account</CardTitle>
        <CardDescription>Continue to your account with Google</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handleLogin}
          disabled={isLoading}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          <p>{isLoading ? "Signing in..." : "Sign in with Google"}</p>
        </Button>
      </CardContent>
    </Card>
  );
}
