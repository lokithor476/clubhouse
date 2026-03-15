"use client";

import { Building2, Loader2 } from "lucide-react";
import Form from "next/form";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { registerOrganization } from "@/modules/organization/actions";
import type { RegisterOrganizationFormState } from "@/modules/organization/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
}

export function RegisterOrganizationForm() {
  const initialState: RegisterOrganizationFormState = {
    inputs: { name: "", slug: "", logo: "", description: "" },
    errors: {},
    success: false,
  };

  const [state, action, isPending] = useActionState(
    registerOrganization,
    initialState,
  );

  const [slug, setSlug] = useState(
    state.inputs.slug || slugify(state.inputs.name),
  );
  const [slugLocked, setSlugLocked] = useState(!!state.inputs.slug);

  const handleNameChange = (value: string) => {
    if (!slugLocked) setSlug(slugify(value));
  };

  const handleSlugChange = (value: string) => {
    const sanitized = slugify(value);
    setSlugLocked(!!sanitized);
    setSlug(sanitized);
  };

  if (state.success) {
    return redirect(`/org/${state.inputs.slug}`);
  }

  return (
    <Form action={action} className="flex flex-col gap-5">
      <FieldGroup>
        {/* Name */}
        <Field data-invalid={!!state.errors.name}>
          <FieldLabel htmlFor="name">
            College name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Your college or institution name"
            defaultValue={state.inputs.name}
            onChange={(e) => handleNameChange(e.target.value)}
            aria-invalid={!!state.errors.name}
          />
          {state.errors.name && <FieldError>{state.errors.name[0]}</FieldError>}
        </Field>

        {/* Slug */}
        <Field data-invalid={!!state.errors.slug}>
          <FieldLabel htmlFor="slug">
            Organization URL <span className="text-destructive">*</span>
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="slug"
              name="slug"
              autoComplete="off"
              placeholder="your-college"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              aria-invalid={!!state.errors.slug}
            />
            <InputGroupAddon align="inline-start">
              <InputGroupText>clubhouse.app/org/</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {state.errors.slug && <FieldError>{state.errors.slug[0]}</FieldError>}
        </Field>
      </FieldGroup>

      <Separator />

      <FieldGroup>
        {/* Logo */}
        <Field data-invalid={!!state.errors.logo}>
          <FieldLabel htmlFor="logo">Logo URL</FieldLabel>
          <Input
            id="logo"
            name="logo"
            autoComplete="off"
            type="url"
            placeholder="https://example.com/logo.png"
            defaultValue={state.inputs.logo}
            aria-invalid={!!state.errors.logo}
            className="font-mono"
          />
          {state.errors.logo && <FieldError>{state.errors.logo[0]}</FieldError>}
        </Field>

        {/* Description */}
        <Field data-invalid={!!state.errors.description}>
          <FieldLabel htmlFor="description">About</FieldLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="A short description of your college or institution."
            rows={3}
            defaultValue={state.inputs.description}
            aria-invalid={!!state.errors.description}
            className="resize-none"
          />
          {state.errors.description && (
            <FieldError>{state.errors.description[0]}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending} className="mt-1 w-full">
        {isPending ? (
          <>
            <Loader2 data-icon="inline-start" className="animate-spin" />
            Registering…
          </>
        ) : (
          <>
            <Building2 data-icon="inline-start" />
            Register organization
          </>
        )}
      </Button>

      <p className="text-center text-muted-foreground text-xs">
        New organizations are reviewed before all features are unlocked.
      </p>
    </Form>
  );
}
