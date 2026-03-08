"use client";
import { type LucideIcon, UserRoundKey } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";

import { AppleIcon, GithubIcon, GoogleIcon } from "@/components/icons";
import { OtpForm } from "@/components/otp-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginWithOAuth, signInWithEmailOtp } from "@/modules/user/actions";
import type { SignInWithEmailOTPFormState } from "@/modules/user/types";

interface Providers {
  icon: LucideIcon;
  label: string;
  login: () => void;
}

const providers: Providers[] = [
  { icon: GoogleIcon, label: "Google", login: () => loginWithOAuth("google") },
  { icon: GithubIcon, label: "GitHub", login: () => loginWithOAuth("github") },
  { icon: AppleIcon, label: "Apple", login: () => loginWithOAuth("apple") },
];

export function LoginForm() {
  const defaultState: SignInWithEmailOTPFormState = {
    inputs: { email: "" },
    errors: {},
    success: false,
  };

  const [state, action, isPending] = useActionState<
    SignInWithEmailOTPFormState,
    FormData
  >(signInWithEmailOtp, defaultState);

  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    setIsEmailInvalid(state.errors?.email?.[0] ? true : undefined);
  }, [state.errors]);

  // Show OTP form once email is submitted successfully
  if (state.success) {
    return (
      <OtpForm
        email={state.inputs.email}
        onBack={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="">
      <div className="flex w-2xs flex-col space-y-2">
        <Form action={action} className="flex flex-col gap-3">
          <Field data-invalid={isEmailInvalid}>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              defaultValue={state.inputs?.email}
              aria-invalid={isEmailInvalid}
              onChange={() => setIsEmailInvalid(undefined)}
            />
            <FieldError
              hidden={!isEmailInvalid}
              errors={state.errors?.email?.map((err) => ({ message: err }))}
            />
          </Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending code..." : "Sign in with Email"}
          </Button>
        </Form>

        <div className="w-full max-w-sm">
          <div className="relative flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
              OR
            </span>
            <Separator className="flex-1" />
          </div>
        </div>

        {providers.map((provider) => (
          <Button
            className="cursor-pointer"
            variant="secondary"
            key={provider.label}
            onClick={provider.login}
          >
            <provider.icon className="size-4" />
            <span>Sign in with {provider.label}</span>
          </Button>
        ))}

        <Button className="cursor-pointer" variant="secondary">
          <UserRoundKey className="size-4" />
          <span>Sign in with Passkey</span>
        </Button>
      </div>
    </div>
  );
}
