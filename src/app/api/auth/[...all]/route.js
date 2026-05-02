import { createAuth } from "@/app/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function handler(request) {
  const auth = createAuth();
  return auth.handler(request);
}

export { handler as GET, handler as POST };