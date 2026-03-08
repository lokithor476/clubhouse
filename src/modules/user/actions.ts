"use server";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function loginWithOAuth(provider: "apple" | "github" | "google") {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
    },
  });
  if (url) {
    redirect(url);
  }
}
