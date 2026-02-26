"use client";

import { useContext, useMemo } from "react";
import { toast } from "sonner";
import AllianceZoneTeleop from "~/app/scout/[eventCode]/components/teleop/alliance-zone";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ACTION_NAMES, LOCATION_STATES } from "../constants";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import ContinueButton from "./common/continue-button";
import ScoutActionButton from "./common/scout-action-button";
import OpponentZoneTeleop from "~/app/scout/[eventCode]/components/teleop/opponent-zone";
import NeutralZoneTeleop from "~/app/scout/[eventCode]/components/teleop/neutral-zone";
import LocationState from "~/app/scout/[eventCode]/components/common/location-state";

const TeleopScoringScreen = () => {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);

  const zoneScreen = useMemo(() => {
    switch (context.locationState) {
      case LOCATION_STATES.ALLIANCE_ZONE:
        return <AllianceZoneTeleop />;
      case LOCATION_STATES.NEUTRAL_ZONE:
        return <NeutralZoneTeleop />;
      case LOCATION_STATES.OPPONENT_ZONE:
        return <OpponentZoneTeleop />;
    }
  }, [context.locationState]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <PageHeading>Teleop</PageHeading>
        </div>
        <LocationState />
      </div>
      {zoneScreen}
      <div className="flex flex-row gap-3 justify-end w-full">
        <Button
          className={cn(
            "dark:bg-orange-400 w-44 h-20 dark:text-white font-bold text-xl",
            context.wasDefended && "dark:ring-yellow-400 ring-2 ring-offset-4",
          )}
          disabled={context.isDefending}
          onClick={() => {
            if (context.wasDefended) {
              context.setWasDefended(false);
            } else {
              context.setWasDefended(true);
            }
          }}
        >
          Was Defended
        </Button>

        <ScoutActionButton
          className="bg-red-500 flex items-center justify-center text-black font-bold text-xl h-20 w-64 px-4 py-2"
          actionName={
            context.isBrownedOut
              ? ACTION_NAMES.BROWN_OUT_END
              : ACTION_NAMES.BROWN_OUT
          }
          gamePiece="null"
          location="null"
          label={context.isBrownedOut ? "ROBOT RESTARTED" : "BROWNOUT"}
          onClick={() => {
            toast.error(
              context.isBrownedOut
                ? "Robot has restarted. Screen enabled!"
                : "Robot has stopped. Screen disabled!",
            );
            context.setIsBrownedOut(!context.isBrownedOut);
          }}
        />

        <div className="flex grow justify-end">
          <ContinueButton
            onClick={() => {
              context.setIsDefending(false);
              context.setWasDefended(false);
              screenContext.nextScreen();
            }}
            shouldShowIcon
          />
        </div>
      </div>
    </>
  );
};

export default TeleopScoringScreen;
