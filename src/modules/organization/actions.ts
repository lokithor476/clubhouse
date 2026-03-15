"use server";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { registerOrganizationFormSchema } from "@/modules/organization/schema";
import type { RegisterOrganizationFormState } from "@/modules/organization/types";

export async function registerOrganization(
  _state: RegisterOrganizationFormState,
  formData: FormData,
): Promise<RegisterOrganizationFormState> {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const logo = formData.get("logo") as string;
  const description = formData.get("description") as string;

  const validatedFields = registerOrganizationFormSchema.safeParse({
    name,
    slug,
    logo,
    description,
  });

  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      inputs: { name, slug, logo, description },
      errors,
      success: false,
    };
  }

  await auth.api.createOrganization({
    body: {
      name: validatedFields.data.name,
      slug: validatedFields.data.slug,
      logo: validatedFields.data.logo,
      description: validatedFields.data.description,
    },
    headers: await headers(),
  });

  return {
    inputs: { name, slug, logo, description },
    errors: {},
    success: true,
  };
}
