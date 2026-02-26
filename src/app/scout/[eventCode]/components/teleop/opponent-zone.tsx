"use client";

import { useContext, useState } from "react";
import FeedingButton from "~/app/scout/[eventCode]/components/common/feeding-button";
import FieldImage from "~/app/scout/[eventCode]/components/common/field-image";
import TimerButton from "~/app/scout/[eventCode]/components/common/timer-button";
import ZoneCrossingButtons from "~/app/scout/[eventCode]/components/common/zone-crossing-buttons";
import {
  ACTION_NAMES,
  ALLIANCE_COLOURS,
  GAME_PIECE,
  LOCATIONS,
} from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { getFlexDirection } from "~/app/scout/[eventCode]/utils";
import { cn } from "~/lib/utils";

export default function OpponentZoneTeleop() {
  const context = useContext(ScoutDataContext);
  const [activeDefender, setActiveDefender] = useState<number | null>(null);
  const [activeFeedingEndZone, setActiveFeedingEndZone] = useState<
    string | null
  >(null);
  const { row } = getFlexDirection(
    context.uiOrientation,
    context.allianceColour,
  );

  const currentMatch = context.currentMatch;
  const opposingTeams = currentMatch?.teams?.filter((team) =>
    team.station
      .toLowerCase()
      .includes(
        context.allianceColour === ALLIANCE_COLOURS.RED ? "blue" : "red",
      ),
  );

  return (
    <FieldImage imageSize="100%" fieldSize="full">
      <div className={cn("flex w-full h-full px-14 gap-4", row)}>
        <div
          className={cn(
            "h-full w-1/3 py-4 flex flex-col justify-center",
            row === "flex-row" ? "pr-20" : "pl-20",
          )}
        >
          <FeedingButton
            label="Feed to Alliance Zone"
            location={LOCATIONS.OPPONENT_ZONE}
            feedingEndZone={LOCATIONS.ALLIANCE_ZONE}
            disabled={
              context.isDefending ||
              (context.isFeeding &&
                activeFeedingEndZone !== LOCATIONS.ALLIANCE_ZONE)
            }
            onFeedingStateChange={(isFeeding) => {
              setActiveFeedingEndZone(
                isFeeding ? LOCATIONS.ALLIANCE_ZONE : null,
              );
            }}
            className={cn(
              "text-xl text-wrap h-64 w-full",
              context.allianceColour === ALLIANCE_COLOURS.RED
                ? "dark:bg-red-500/80"
                : "dark:bg-blue-500/80",
            )}
          />
        </div>
        <div className="h-full w-1/3 py-4 flex flex-col justify-center">
          <FeedingButton
            label="Feed to Neutral Zone"
            location={LOCATIONS.OPPONENT_ZONE}
            feedingEndZone={LOCATIONS.NEUTRAL_ZONE}
            disabled={
              context.isDefending ||
              (context.isFeeding &&
                activeFeedingEndZone !== LOCATIONS.NEUTRAL_ZONE)
            }
            onFeedingStateChange={(isFeeding) => {
              setActiveFeedingEndZone(
                isFeeding ? LOCATIONS.NEUTRAL_ZONE : null,
              );
            }}
            className="text-xl min-w-full text-wrap h-64 dark:bg-yellow-500/80"
            triggerClassName="w-full"
          />
        </div>
        <ZoneCrossingButtons
          type="opponent"
          onCrossingClick={() => {
            if (context.isDefending) {
              context.setIsDefending(false);
              setActiveDefender(null);
            }
            if (context.isFeeding) {
              setActiveFeedingEndZone(null);
            }
          }}
        />
        <div
          className={cn(
            "h-full max-w-fit flex flex-col justify-evenly items-center py-4",
          )}
        >
          {opposingTeams?.map((team) => (
            <TimerButton
              key={team.teamNumber}
              actionName={ACTION_NAMES.DEFENDING}
              endActionName={ACTION_NAMES.DEFENDING_END}
              gamePiece={GAME_PIECE.NONE}
              location={LOCATIONS.OPPONENT_ZONE}
              label={`Defend ${team.teamNumber}`}
              timerLabel={`Defending ${team.teamNumber}...`}
              allowStopOnClick
              logOnForceStop
              shouldForceStop={
                !context.isDefending || activeDefender !== team.teamNumber
              }
              getShouldLogAction={(isRunning) => isRunning}
              getActionExtras={() => ({
                metadata: {
                  defendedTeamNumber: team.teamNumber,
                },
              })}
              disabled={
                context.isFeeding ||
                (context.isDefending && activeDefender !== team.teamNumber)
              }
              onClick={() => {
                if (context.isDefending && activeDefender === team.teamNumber) {
                  context.setIsDefending(false);
                  setActiveDefender(null);
                  return;
                }

                context.setIsDefending(true);
                setActiveDefender(team.teamNumber);
              }}
              className={cn(
                "h-16 text-xl w-44 text-wrap",
                context.allianceColour === ALLIANCE_COLOURS.RED
                  ? "dark:bg-blue-500/70"
                  : "dark:bg-red-500/70",
              )}
            />
          ))}
        </div>
      </div>
    </FieldImage>
  );
}
