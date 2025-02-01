import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import CompleteProfileModal from "~/components/modals/complete-signup-modal";
import { Button } from "~/components/ui/button";
import { getUserByClerkId } from "~/db/queries/user";

import theoryLogo from "~/public/theory-no-words.png";
import birdsLogo from "~/public/birds-no-words.png";

export default async function Landing() {
  const { userId }: { userId: string | null } = auth();

  let user;
  if (userId) {
    user = await getUserByClerkId(userId);
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex h-[30rem] flex-col items-center justify-center gap-4 text-center mt-10">
        <div className="flex flex-row gap-8">
          <Image src={theoryLogo} width={300} height={300} alt="Logo" />
          <Image src={birdsLogo} width={300} height={300} alt="Logo" />
        </div>
        <h1 className="text-4xl font-bold">Welcome to the RHR Scouting App!</h1>
        <h2 className="text-2xl font-bold">
          Click the button below to get started.
        </h2>
        <SignInButton forceRedirectUrl={`/dashboard`}>
          <Button className="w-1/4 text-lg font-semibold" size={"lg"}>
            Get Started!
          </Button>
        </SignInButton>
      </div>
      {user && !user.isSignupComplete && (
        <CompleteProfileModal clerkId={user.clerkId} />
      )}
    </div>
  );
}
