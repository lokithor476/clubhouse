import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  email: string;
  otp: string;
  expiresInMinutes?: number;
}

export function SignInEmailTemplate({
  email,
  otp,
  expiresInMinutes = 10,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Clubhouse sign-in code: {otp}</Preview>
      <Tailwind>
        <Body className="bg-zinc-950 font-sans">
          <Container className="mx-auto max-w-120 px-6 py-16">
            {/* Brand */}
            <Text className="m-0 mb-10 font-semibold text-xs text-zinc-500 uppercase tracking-widest">
              Clubhouse
            </Text>

            {/* Heading */}
            <Heading className="m-0 mb-3 font-semibold text-2xl text-white tracking-tight">
              Your sign-in code
            </Heading>
            <Text className="m-0 mb-8 text-sm text-zinc-400 leading-relaxed">
              Enter this code to sign in as{" "}
              <span className="font-medium text-white">{email}</span>.
            </Text>

            {/* OTP */}
            <Section className="mb-8 rounded-xl bg-zinc-900 px-8 py-6 text-center">
              <Text className="m-0 font-bold font-mono text-4xl text-white tracking-[0.3em]">
                {otp}
              </Text>
            </Section>

            <Text className="m-0 mb-8 text-xs text-zinc-500 leading-relaxed">
              Expires in{" "}
              <span className="text-zinc-300">{expiresInMinutes} minutes</span>.
              Never share this code with anyone.
            </Text>

            <Hr className="m-0 mb-8 border-zinc-800" />

            <Text className="m-0 text-xs text-zinc-600 leading-relaxed">
              If you didn't request this, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
