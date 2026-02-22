import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  return <div>Hello {user?.name}</div>;
}
