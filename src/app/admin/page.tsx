import { Info } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import ManageEventsLoading from "~/components/admin/manage-events/loading";
import ManageEvents from "~/components/admin/manage-events/manage-events";
import ManageSeasonsLoading from "~/components/admin/manage-seasons/loading";
import ManageSeasons from "~/components/admin/manage-seasons/manage-seasons";
import ManageUsersLoading from "~/components/admin/manage-users/loading";
import PageHeading from "~/components/common/page-heading";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import ManageUsers from "~/components/admin/manage-users/manage-users";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeading>Settings</PageHeading>
      <Alert variant="info">
        <Info className="size-6" />
        <AlertTitle className="font-semibold">Heads up!</AlertTitle>
        <AlertDescription>
          These settings should only be modified at the beginning of a new
          competition season.
        </AlertDescription>
      </Alert>
      <Suspense fallback={<ManageSeasonsLoading />}>
        <ManageSeasons />
      </Suspense>
      <Suspense fallback={<ManageEventsLoading />}>
        <ManageEvents />
      </Suspense>
      <Suspense fallback={<ManageUsersLoading />}>
        <ManageUsers />
      </Suspense>
    </div>
  );
}
