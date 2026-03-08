import { z } from "zod";

export const signInWIthEmailOTPSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export const verifyEmailOTPSchema = z.object({
  email: z.email(),
  otp: z
    .string()
    .length(6, "Code must be 6 digits.")
    .regex(/^\d+$/, "Code must be numeric."),
});
