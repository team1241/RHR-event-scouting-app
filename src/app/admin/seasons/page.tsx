import { Suspense } from "react";
import ManageSeasonsLoading from "~/components/admin/manage-seasons/loading";
import SeasonAndImageSelector from "~/components/admin/manage-seasons/season-and-image-selector";
import { getSeasons } from "~/db/queries/season";

export default async function AdminSeasonsPage() {
  const seasons = getSeasons();

  return (
    <Suspense fallback={<ManageSeasonsLoading />}>
      <SeasonAndImageSelector seasonsPromise={seasons} />
    </Suspense>
  );
}
