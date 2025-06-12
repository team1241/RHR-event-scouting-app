import SeasonAndImageSelector from "~/components/admin/manage-seasons/season-and-image-selector";
import { getSeasons } from "~/db/queries/season";

export default async function ManageSeasons() {
  const seasons = await getSeasons();

  return <SeasonAndImageSelector seasons={seasons} />;
}
