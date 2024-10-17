import { Info } from "lucide-react";
import { Metadata } from "next";
import EventSelector from "~/components/admin/event-selector";
import SeasonSelector from "~/components/admin/season-selector";
import PageHeading from "~/components/common/page-heading";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { getSeasons, SeasonWithEvents } from "~/db/queries/season";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const seasons = await getSeasons();
  const activeSeason: SeasonWithEvents | undefined = seasons.find(
    (season) => season.isActive
  );

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
      <SeasonSelector seasons={seasons} />
      <EventSelector activeSeason={activeSeason} />
    </div>
  );
}
