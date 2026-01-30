"use client";

import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useContext, useMemo } from "react";
import ScoutActionButton from "~/app/scout/[eventCode]/components/common/scout-action-button";
import {
  ACTION_NAMES,
  LOCATION_STATES,
  LOCATIONS,
  ZONE_CROSSING_ARROW_DIRECTION,
} from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import {
  getFlexDirection,
  getZoneCrossingArrowDirection,
} from "~/app/scout/[eventCode]/utils";
import { cn } from "~/lib/utils";

export type ZoneCrossingType = "alliance" | "opponent";

function LeftArrow() {
  return <MoveLeftIcon className="dark:size-9" />;
}
function RightArrow() {
  return <MoveRightIcon className="dark:size-9" />;
}

export default function ZoneCrossingButtons({
  type,
  isAuto = false,
}: {
  type: ZoneCrossingType;
  isAuto?: boolean;
}) {
  const isAllianceCrossing = type === "alliance";
  const { locationState, setLocationState, uiOrientation, allianceColour } =
    useContext(ScoutDataContext);

  const { row, col: flexCol } = getFlexDirection(uiOrientation, allianceColour);

  const arrowDirection = useMemo(
    () =>
      getZoneCrossingArrowDirection(
        uiOrientation,
        allianceColour,
        locationState,
      ),
    [allianceColour, locationState, uiOrientation],
  );

  const arrow =
    arrowDirection === ZONE_CROSSING_ARROW_DIRECTION.RIGHT ? (
      <RightArrow />
    ) : (
      <LeftArrow />
    );

  const handleLocationUpdate = () => {
    switch (locationState) {
      case LOCATION_STATES.ALLIANCE_ZONE:
      case LOCATION_STATES.OPPONENT_ZONE:
        setLocationState(LOCATION_STATES.NEUTRAL_ZONE);
        break;
      case LOCATION_STATES.NEUTRAL_ZONE:
        setLocationState(
          isAllianceCrossing
            ? LOCATION_STATES.ALLIANCE_ZONE
            : LOCATION_STATES.OPPONENT_ZONE,
        );
        break;
    }
  };

  return (
    <div
      className={cn(
        "flex h-full justify-between py-4",
        flexCol,
        row === "flex-row" ? "ml-3" : "mr-3",
      )}
    >
      <ScoutActionButton
        className="h-16 w-20 bg-pink-800/90 "
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.TRENCH.DEPOT}
        actionName={ACTION_NAMES.ZONE_TRANSITION}
        label={arrow}
        isAuto={isAuto}
      />
      <ScoutActionButton
        className={cn(
          "h-[90px] w-20 bg-pink-800/90",
          flexCol === "flex-col" ? "mb-[22px]" : "mt-[22px]",
        )}
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.BUMP.DEPOT}
        actionName={ACTION_NAMES.ZONE_TRANSITION}
        label={arrow}
        isAuto={isAuto}
      />

      <ScoutActionButton
        className={cn(
          "h-[90px] w-20 bg-pink-800/90",
          flexCol === "flex-col" ? "mt-[22px]" : "mb-[22px]",
        )}
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.BUMP.OUTPOST}
        actionName={ACTION_NAMES.ZONE_TRANSITION}
        label={arrow}
        isAuto={isAuto}
      />
      <ScoutActionButton
        className="h-16 w-20 bg-pink-800/90"
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.TRENCH.OUTPOST}
        actionName={ACTION_NAMES.ZONE_TRANSITION}
        label={arrow}
        isAuto={isAuto}
      />
    </div>
  );
}
