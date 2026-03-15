import { z } from "zod";

export const registerOrganizationFormSchema = z.object({
  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or fewer."),
  logo: z
    .string()
    .trim()
    .refine(
      (value) => value.length === 0 || z.url().safeParse(value).success,
      "Enter a valid logo URL.",
    ),
  name: z
    .string()
    .trim()
    .min(2, "Enter your organization name.")
    .max(80, "Name must be 80 characters or fewer."),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Slug must be at least 3 characters.")
    .max(48, "Slug must be 48 characters or fewer.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and single hyphens only.",
    ),
});
