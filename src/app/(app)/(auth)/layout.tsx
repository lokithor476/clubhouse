export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex-1 px-4">{children}</div>
    </div>
  );
}
