"use client";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyEmailOtp } from "@/modules/user/actions";
import type { VerifyEmailOTPFormState } from "@/modules/user/types";

interface OtpFormProps {
  email: string;
  onBack: () => void;
}

export function OtpForm({ email, onBack }: OtpFormProps) {
  const defaultState: VerifyEmailOTPFormState = {
    inputs: { email, otp: "" },
    errors: {},
    success: false,
  };

  const [state, action, isPending] = useActionState<
    VerifyEmailOTPFormState,
    FormData
  >(verifyEmailOtp, defaultState);

  const [otp, setOtp] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    setIsOtpInvalid(state.errors?.otp?.[0] ? true : undefined);
  }, [state.errors]);

  return (
    <div className="flex w-2xs flex-col space-y-4">
      <div className="flex flex-col items-center gap-1">
        <p className="font-medium text-sm">Check your email</p>
        <p className="text-muted-foreground text-sm">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
      </div>

      <Form action={action} className="flex flex-col items-center gap-4">
        {/* Pass email as hidden field */}
        <input type="hidden" name="email" value={email} />
        {/* Pass otp value as hidden field — InputOTP is uncontrolled re: FormData */}
        <input type="hidden" name="otp" value={otp} />

        <div className="flex flex-col gap-2" data-invalid={isOtpInvalid}>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(val) => {
              setOtp(val);
              setIsOtpInvalid(undefined);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldError
            hidden={!isOtpInvalid}
            errors={state.errors?.otp?.map((err) => ({ message: err }))}
          />
        </div>

        <Button
          type="submit"
          disabled={isPending || otp.length < 6}
          className="w-full"
        >
          {isPending ? "Verifying..." : "Continue"}
        </Button>
      </Form>

      <button
        type="button"
        onClick={onBack}
        className="text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        ← Use a different email
      </button>
    </div>
  );
}
