import { auth } from "@clerk/nextjs/server";
import CompleteProfileModal from "~/components/modals/complete-signup-modal";
import { getUserByClerkId } from "~/db/queries/user";

export default async function Dashboard() {
  const { userId }: { userId: string | null } = auth();

  let user;
  if (userId) {
    user = await getUserByClerkId(userId);
  }

  return (
    <div>
      This is the dashboard page
      {user && !user.isSignupComplete && (
        <CompleteProfileModal clerkId={user.clerkId} />
      )}
    </div>
  );
}
