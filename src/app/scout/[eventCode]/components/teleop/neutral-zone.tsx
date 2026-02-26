"use client";

import { useContext } from "react";
import FeedingButton from "~/app/scout/[eventCode]/components/common/feeding-button";
import FieldImage from "~/app/scout/[eventCode]/components/common/field-image";
import ScoutActionButton from "~/app/scout/[eventCode]/components/common/scout-action-button";
import ZoneCrossingButtons from "~/app/scout/[eventCode]/components/common/zone-crossing-buttons";
import {
  ACTION_NAMES,
  GAME_PIECE,
  LOCATIONS,
} from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { getFlexDirection } from "~/app/scout/[eventCode]/utils";
import { cn } from "~/lib/utils";

export default function NeutralZoneTeleop() {
  const context = useContext(ScoutDataContext);
  const { row } = getFlexDirection(
    context.uiOrientation,
    context.allianceColour,
  );
  return (
    <FieldImage imageSize="100%" fieldSize="half">
      <div
        className={cn(
          "flex w-full h-full justify-end",
          row,
          row === "flex-row" ? "pr-1" : "pl-1",
        )}
      >
        <ZoneCrossingButtons type="alliance" />
        <div
          className={cn(
            "h-full flex flex-col justify-center w-[420px] py-5 px-4 gap-4",
            row === "flex-row" ? "pr-1" : "pl-1",
          )}
        >
          <FeedingButton
            label="FEED"
            location={LOCATIONS.NEUTRAL_ZONE}
            feedingEndZone={LOCATIONS.DEPOT}
            disabled={context.isDefending}
            className="w-full h-72 text-2xl dark:bg-yellow-500/80"
          />
          <ScoutActionButton
            actionName={ACTION_NAMES.HERD_FUEL}
            gamePiece={GAME_PIECE.FUEL}
            location={LOCATIONS.NEUTRAL_ZONE}
            label="HERD FUEL"
            className="h-16 w-full"
            disabled={context.isFeeding}
          />
        </div>
        <ZoneCrossingButtons type="opponent" />
      </div>
    </FieldImage>
  );
}
