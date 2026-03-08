"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  signInWIthEmailOTPSchema,
  verifyEmailOTPSchema,
} from "@/modules/user/schema";
import type {
  SignInWithEmailOTPFormState,
  VerifyEmailOTPFormState,
} from "@/modules/user/types";

export async function loginWithOAuth(provider: "apple" | "github" | "google") {
  const { url } = await auth.api.signInSocial({
    body: { provider },
  });
  if (url) {
    redirect(url);
  }
}

export async function signInWithEmailOtp(
  _state: SignInWithEmailOTPFormState,
  formData: FormData,
): Promise<SignInWithEmailOTPFormState> {
  const email = formData.get("email") as string;
  const validatedFields = signInWIthEmailOTPSchema.safeParse({ email });

  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return { inputs: { email }, errors, success: false };
  }

  const { success } = await auth.api.sendVerificationOTP({
    body: {
      email: validatedFields.data.email,
      type: "sign-in",
    },
  });

  return { inputs: { email }, errors: {}, success };
}

export async function verifyEmailOtp(
  _state: VerifyEmailOTPFormState,
  formData: FormData,
): Promise<VerifyEmailOTPFormState> {
  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;

  const validatedFields = verifyEmailOTPSchema.safeParse({ email, otp });

  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return { inputs: { email, otp }, errors, success: false };
  }

  try {
    await auth.api.signInEmailOTP({
      body: {
        email: validatedFields.data.email,
        otp: validatedFields.data.otp,
      },
    });
  } catch {
    return {
      inputs: { email, otp },
      errors: { otp: ["Invalid or expired code. Please try again."] },
      success: false,
    };
  }

  redirect("/");
}
