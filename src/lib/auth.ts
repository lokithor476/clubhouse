import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { organization } from "better-auth/plugins/organization";
import { Resend } from "resend";

import { SignInEmailTemplate } from "@/components/signin-email-template";
import * as schema from "@/db/schema";
import { db } from "@/lib/db/connection";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    apple: {
      clientId: env.APPLE_CLIENT_ID,
      clientSecret: env.APPLE_CLIENT_SECRET,
      appBundleIdentifier: env.APPLE_APP_BUNDLE_IDENTIFIER,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Your Sign-In Code",
            react: SignInEmailTemplate({
              email,
              otp,
              expiresInMinutes: 10,
            }),
          });
          console.log(data, error);
        }
      },
    }),
    organization({
      schema: {
        organization: {
          additionalFields: {
            description: {
              type: "string",
              required: false,
              input: true,
            },
            verfied: {
              type: "boolean",
              required: false,
              defaultValue: false,
            },
          },
        },
      },
    }),
  ],
});
