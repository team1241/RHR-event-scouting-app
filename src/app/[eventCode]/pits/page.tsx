import React from "react";
import RobotImageGrid from "~/app/[eventCode]/pits/components/robot-image-grid";
import PageHeading from "~/components/common/page-heading";
import { getRobotImagesForActiveSeason } from "~/db/queries/robot-images";
import {
  fetchTeamsForEvent,
  TeamTypeWithImages,
} from "~/server/http/frc-events";

const PitScoutingLanding = async ({
  params,
}: {
  params: { eventCode: string };
}) => {
  const { eventCode } = params;
  const eventYear = eventCode.substring(0, 4);
  const eventName = eventCode.substring(4);

  const robotImages = await getRobotImagesForActiveSeason();
  const teamsAtEvent = await fetchTeamsForEvent(eventYear, eventName);

  const teams: TeamTypeWithImages[] = teamsAtEvent.map((team) => {
    return { ...team };
  });

  for (const robotImage of robotImages) {
    const index = teams.findIndex(
      (team) => team.teamNumber === robotImage.teamNumber
    );
    teams[index] = { ...teams[index], fieldImages: robotImage.imageUrls };
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      <PageHeading>
        Pit Scouting - {`${eventYear}${eventName.toUpperCase()}`}
      </PageHeading>
      <RobotImageGrid teams={teams} eventCode={eventCode} />
    </div>
  );
};

export default PitScoutingLanding;
