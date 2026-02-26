"use client";

import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useContext, useMemo } from "react";
import { formatISO } from "date-fns";
import ScoutActionButton from "~/app/scout/[eventCode]/components/common/scout-action-button";
import {
  ACTION_NAMES,
  LOCATION_STATES,
  LOCATIONS,
  LOCAL_STORAGE_KEYS,
  ZONE_CROSSING_ARROW_DIRECTION,
  GAME_PIECE,
} from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { ScoutAction } from "~/app/scout/[eventCode]/context/data-context";
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
  disabled = false,
  onCrossingClick,
}: {
  type: ZoneCrossingType;
  isAuto?: boolean;
  disabled?: boolean;
  onCrossingClick?: () => void;
}) {
  const isAllianceCrossing = type === "alliance";
  const {
    locationState,
    setLocationState,
    uiOrientation,
    allianceColour,
    setActions,
    scouterDetails,
    matchNumber,
    teamToScout,
    undoOccurred,
    setUndoOccurred,
    wasDefended,
    isFeeding,
    setIsFeeding,
    feedingElapsedSeconds,
    setFeedingElapsedSeconds,
  } = useContext(ScoutDataContext);

  const { row, col: flexCol } = getFlexDirection(uiOrientation, allianceColour);

  const arrowDirection = useMemo(
    () =>
      getZoneCrossingArrowDirection(
        uiOrientation,
        allianceColour,
        locationState,
        !isAllianceCrossing,
      ),
    [allianceColour, isAllianceCrossing, locationState, uiOrientation],
  );

  const arrow =
    arrowDirection === ZONE_CROSSING_ARROW_DIRECTION.RIGHT ? (
      <RightArrow />
    ) : (
      <LeftArrow />
    );

  const logFeedingEndIfNeeded = () => {
    if (!isFeeding) return;

    const timestamp = formatISO(new Date());
    setActions((prevActions) => {
      const updatedActionsList = [
        ...prevActions,
        {
          scoutId: scouterDetails.id.toString(),
          matchNumber,
          teamNumber: teamToScout!,
          eventCode: matchNumber,
          hasUndo: undoOccurred,
          wasDefended,
          actionName: ACTION_NAMES.FEEDING_END,
          gamePiece: GAME_PIECE.FUEL,
          location: LOCATIONS.NEUTRAL_ZONE,
          isAuto,
          timestamp,
          metadata: { durationSeconds: feedingElapsedSeconds },
        } as ScoutAction,
      ];
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACTIONS,
        JSON.stringify(updatedActionsList),
      );
      return updatedActionsList;
    });
    setUndoOccurred(false);
    setIsFeeding(false);
    setFeedingElapsedSeconds(0);
  };

  const handleLocationUpdate = () => {
    onCrossingClick?.();
    logFeedingEndIfNeeded();

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
        className="h-16 w-20 bg-pink-800/90"
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.TRENCH.DEPOT}
        actionName={
          isAllianceCrossing
            ? ACTION_NAMES.ZONE_TRANSITION
            : ACTION_NAMES.OPPONENT_ZONE_TRANSITION
        }
        gamePiece={GAME_PIECE.NONE}
        label={arrow}
        isAuto={isAuto}
        disabled={disabled}
      />
      <ScoutActionButton
        className={cn(
          "h-[90px] w-20 bg-pink-800/90",
          flexCol === "flex-col" ? "mb-[22px]" : "mt-[22px]",
        )}
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.BUMP.DEPOT}
        actionName={
          isAllianceCrossing
            ? ACTION_NAMES.ZONE_TRANSITION
            : ACTION_NAMES.OPPONENT_ZONE_TRANSITION
        }
        gamePiece={GAME_PIECE.NONE}
        label={arrow}
        isAuto={isAuto}
        disabled={disabled}
      />

      <ScoutActionButton
        className={cn(
          "h-[90px] w-20 bg-pink-800/90",
          flexCol === "flex-col" ? "mt-[22px]" : "mb-[22px]",
        )}
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.BUMP.OUTPOST}
        actionName={
          isAllianceCrossing
            ? ACTION_NAMES.ZONE_TRANSITION
            : ACTION_NAMES.OPPONENT_ZONE_TRANSITION
        }
        gamePiece={GAME_PIECE.NONE}
        label={arrow}
        isAuto={isAuto}
        disabled={disabled}
      />
      <ScoutActionButton
        className="h-16 w-20 bg-pink-800/90"
        onClick={() => handleLocationUpdate()}
        location={LOCATIONS.TRENCH.OUTPOST}
        actionName={
          isAllianceCrossing
            ? ACTION_NAMES.ZONE_TRANSITION
            : ACTION_NAMES.OPPONENT_ZONE_TRANSITION
        }
        gamePiece={GAME_PIECE.NONE}
        label={arrow}
        isAuto={isAuto}
        disabled={disabled}
      />
    </div>
  );
}
