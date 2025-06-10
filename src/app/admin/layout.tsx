import { Info } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import PageHeading from "~/components/common/page-heading";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";

export const metadata: Metadata = {
  title: "Admin",
};

const mapPathName = (pathname: string) => {
  switch (pathname) {
    case "users":
      return "User Settings";
    case "seasons":
      return "Season Settings";
    case "events":
      return "Event Settings";
    default:
      return "Admin";
  }
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();

  const url = headersList.get("x-url")!;

  const splitUrl = url?.split("/");
  const pathName = splitUrl[splitUrl?.length - 1];

  return (
    <div className="flex flex-col gap-4">
      <PageHeading>{mapPathName(pathName.toLowerCase())}</PageHeading>
      <Alert variant="info">
        <Info className="size-6" />
        <AlertTitle className="font-semibold">Heads up!</AlertTitle>
        <AlertDescription>
          These settings should only be modified at the beginning of a new
          competition season.
        </AlertDescription>
      </Alert>
      {children}
    </div>
  );
}
