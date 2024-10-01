import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  // sure
  return (
    <div className="flex flex-row justify-center items-center h-full">
      <SignUp />
    </div>
  );
}
