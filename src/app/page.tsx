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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      This is a sample home page
      {user && !user.isSignupComplete && (
        <CompleteProfileModal clerkId={user.clerkId} />
      )}
    </div>
  );
}
