import { auth } from "@clerk/nextjs/server";
import CompleteProfileModal from "~/components/modals/complete-signup-modal";
import { getUserByClerkId } from "~/db/queries/user";

export default async function Landing() {
  const { userId }: { userId: string | null } = auth();

  let user;
  if (userId) {
    user = await getUserByClerkId(userId);
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      This is a sample home page
      {user && !user.isSignupComplete && (
        <CompleteProfileModal clerkId={user.clerkId} />
      )}
    </div>
  );
}
