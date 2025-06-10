import { Suspense } from "react";
import ManageEventsLoading from "~/components/admin/manage-events/loading";
import ManageEvents from "~/components/admin/manage-events/manage-events";
import { getSeasons } from "~/db/queries/season";

export default async function AdminEventsPage() {
  const seasonsPromise = getSeasons();

  return (
    <Suspense fallback={<ManageEventsLoading />}>
      <ManageEvents seasonsPromise={seasonsPromise} />
    </Suspense>
  );
}
