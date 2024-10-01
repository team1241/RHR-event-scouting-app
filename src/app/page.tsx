import { auth } from "@clerk/nextjs/server";
import { permanentRedirect } from "next/navigation";
import { getUserByClerkId } from "~/db/queries/user";

export default async function Landing() {
  const { userId }: { userId: string | null } = auth();

  let user;
  if (userId) {
    user = await getUserByClerkId(userId);
  }

  if (user) permanentRedirect("/dashboard");

  return <div>This is a sample landing page</div>;
}
