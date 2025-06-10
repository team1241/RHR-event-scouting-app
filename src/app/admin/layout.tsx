"use client";

import { Info } from "lucide-react";
import { usePathname } from "next/navigation";
import AdminSidebar from "~/components/admin/sidebar";
import PageHeading from "~/components/common/page-heading";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";

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
  const pathName = usePathname();

  const splitPath = pathName.split("/");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8">
        <AdminSidebar />
        <div className="grow flex flex-col gap-4 mb-20">
          <PageHeading>
            {mapPathName(splitPath[splitPath.length - 1].toLowerCase())}
          </PageHeading>
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
      </div>
    </div>
  );
}
