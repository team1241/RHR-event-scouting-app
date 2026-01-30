"use client";

import { formatISO } from "date-fns";
import { CheckIcon } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import FieldImage from "~/app/scout/[eventCode]/components/common/field-image";
import LocationState from "~/app/scout/[eventCode]/components/common/location-state";
import TimerButton, {
  TimerButtonType,
} from "~/app/scout/[eventCode]/components/common/timer-button";
import ZoneCrossingButtons from "~/app/scout/[eventCode]/components/common/zone-crossing-buttons";
import { getFlexDirection } from "~/app/scout/[eventCode]/utils";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  ACTION_NAMES,
  LOCATION_STATES,
  LOCATIONS,
  MATCH_STATES,
} from "../constants";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import ContinueButton from "./common/continue-button";
import ScoutActionButton from "./common/scout-action-button";
import UndoActionButton from "./common/undo-action-button";

export default function AutonomousScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  const [hasClimbed, setHasClimbed] = useState(false);

  const { row, col } = getFlexDirection(
    context.uiOrientation,
    context.allianceColour,
  );

  const isInNeutralZone =
    context.locationState === LOCATION_STATES.NEUTRAL_ZONE;

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row items-center gap-4 w-full">
          <PageHeading>Autonomous</PageHeading>
          <UndoActionButton className="text-2xl font-bold w-36 h-16 dark:bg-red-600" />
        </div>
        <LocationState />
      </div>
      <FieldImage imageSize="100%" fieldSize="half">
        <div className={cn("flex w-full h-full", row)}>
          <div
            className={cn(
              "flex h-full justify-between py-4 data-[invisible=true]:invisible",
              col,
            )}
            data-invisible={isInNeutralZone}
          >
            <ScoutActionButton
              className={cn(
                "w-32 h-20 text-wrap text-lg",
                row === "flex-row" ? "mt-12" : "mb-12",
              )}
              label="Depot Intake"
              actionName={ACTION_NAMES.INTAKE}
              location={LOCATIONS.DEPOT}
              isAuto
              onClick={() => {
                toast.info("Logged intake from depot!");
              }}
            />
            <Button
              className={cn(
                "w-32 h-20 text-wrap text-lg opacity-80 text-white font-bold transition-transform duration-100 ease-out active:scale-95",
                context.allianceColour === "blue"
                  ? "bg-blue-500/80"
                  : "bg-red-500/80",
              )}
              onClick={() => {
                const newClimbValue = !hasClimbed;
                toast.info(
                  newClimbValue
                    ? "Toggled L1 climb ON"
                    : "Toggled L1 climb OFF",
                );
                setHasClimbed(newClimbValue);
              }}
            >
              {hasClimbed ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <span>CLIMBED</span>
                  <span className="flex gap-2 items-center">
                    L1
                    <CheckIcon className="!size-6" />
                  </span>
                </div>
              ) : (
                "Climb L1"
              )}
            </Button>
            <ScoutActionButton
              className="w-32 h-20 text-wrap text-lg"
              label="Outpost Intake"
              isAuto
              actionName={ACTION_NAMES.INTAKE}
              location={LOCATIONS.OUTPOST}
              onClick={() => {
                toast.info("Logged intake from outpost!");
              }}
            />
          </div>
          <div
            className={cn(
              "flex h-full justify-between gap-2 py-4 data-[invisible=true]:invisible",
              col,
              row === "flex-row" ? "ml-4" : "mr-4",
            )}
            data-invisible={isInNeutralZone}
          >
            <ScoutActionButton
              className="w-48 h-full text-wrap text-lg dark:bg-yellow-500/80"
              label="Shoot Zone 1"
              isAuto
              actionName={
                context.isShooting
                  ? ACTION_NAMES.SHOOTING_END
                  : ACTION_NAMES.SHOOTING
              }
              location={LOCATIONS.SHOOTING.AUTO.DEPOT_ZONE}
            />
            <ScoutActionButton
              className="w-48 h-full text-wrap text-lg dark:bg-yellow-500/80"
              label="Shoot Zone 2"
              isAuto
              actionName={
                context.isShooting
                  ? ACTION_NAMES.SHOOTING_END
                  : ACTION_NAMES.SHOOTING
              }
              location={LOCATIONS.SHOOTING.AUTO.TOWER_ZONE}
            />
            <ScoutActionButton
              className="w-48 h-full text-wrap text-lg dark:bg-yellow-500/80"
              label="Shoot Zone 3"
              isAuto
              actionName={
                context.isShooting
                  ? ACTION_NAMES.SHOOTING_END
                  : ACTION_NAMES.SHOOTING
              }
              location={LOCATIONS.SHOOTING.AUTO.OUTPOST_ZONE}
            />
          </div>
          <ZoneCrossingButtons type="alliance" isAuto />
          <div
            className={cn(
              "flex h-full justify-between py-16 gap-2 data-[invisible=true]:invisible",
              col,
              row === "flex-row" ? "ml-16" : "mr-16",
            )}
            data-invisible={!isInNeutralZone}
          >
            <ScoutActionButton
              className="w-36 h-full text-wrap text-lg dark:bg-yellow-500/80"
              label="Zone 1"
              isAuto
              actionName={ACTION_NAMES.INTAKE}
              location={LOCATIONS.INTAKING.AUTO.NEUTRAL_ZONE.ZONE_1}
            />
            <ScoutActionButton
              className="w-36 h-full text-wrap text-lg dark:bg-yellow-500/80"
              label="Zone 2"
              isAuto
              actionName={ACTION_NAMES.INTAKE}
              location={LOCATIONS.INTAKING.AUTO.NEUTRAL_ZONE.ZONE_2}
            />
            <ScoutActionButton
              className="w-36 h-full text-wrap text-lg dark:bg-yellow-500/80"
              label="Zone 3"
              isAuto
              actionName={ACTION_NAMES.INTAKE}
              location={LOCATIONS.INTAKING.AUTO.NEUTRAL_ZONE.ZONE_3}
            />
          </div>
          <div
            className={cn(
              "flex h-full w-full items-end justify-between py-4 gap-8 data-[invisible=true]:invisible",
              col,
              row === "flex-row" ? "mr-16" : "ml-16",
            )}
            data-invisible={!isInNeutralZone}
          >
            <ScoutActionButton
              className="w-36 h-24 text-wrap text-lg bg-teal-500 text-black"
              label="Crossed Mid Line"
              isAuto
              actionName={ACTION_NAMES.CROSS_MID_LINE}
              location={LOCATIONS.MID_LINE}
              onClick={() => {
                toast.info("Robot crossed mid line in auto!");
              }}
            />
            <TimerButton
              type={TimerButtonType.Feeding}
              label="FEED"
              isAuto
              actionName={
                context.isFeeding
                  ? ACTION_NAMES.FEEDING_END
                  : ACTION_NAMES.FEEDING
              }
              location={LOCATIONS.NEUTRAL_ZONE}
              className="w-36 h-24 text-wrap text-lg dark:bg-yellow-500/80"
              onClick={() => {
                context.setIsFeeding(!context.isFeeding);
              }}
            />
          </div>
        </div>
      </FieldImage>
      <div className="flex flex-row justify-between">
        <ScoutActionButton
          disabled={context.isAutoStopped}
          className="bg-red-500 flex items-center justify-center text-black font-bold text-xl h-20 w-64 px-4 py-2"
          actionName={ACTION_NAMES.A_STOP}
          gamePiece="null"
          location="null"
          label="A-STOP"
          isAuto
          onClick={() => {
            context.setIsAutoStopped(true);
          }}
        />
        <ContinueButton
          onClick={() => {
            const timestamp = new Date();
            context.actions.push(
              {
                scoutId: context.scouterDetails.id.toString(),
                matchNumber: context.matchNumber,
                teamNumber: Number(context.teamToScout!),
                eventCode: context.matchNumber,
                hasUndo: false,
                wasDefended: false,
                actionName: ACTION_NAMES.CLIMB.SUCCESS,
                gamePiece: "None",
                location: LOCATIONS.TOWER.L1,
                isAuto: true,
                timestamp: formatISO(timestamp),
              },
              {
                scoutId: context.scouterDetails.id.toString(),
                matchNumber: context.matchNumber,
                teamNumber: Number(context.teamToScout!),
                eventCode: context.matchNumber,
                hasUndo: false,
                wasDefended: false,
                actionName: ACTION_NAMES.AUTO_COMPLETE,
                gamePiece: "None",
                location: "None",
                isAuto: true,
                timestamp: formatISO(timestamp),
              },
              {
                scoutId: context.scouterDetails.id.toString(),
                matchNumber: context.matchNumber,
                teamNumber: Number(context.teamToScout!),
                eventCode: context.matchNumber,
                hasUndo: false,
                wasDefended: false,
                actionName: ACTION_NAMES.TELEOP_START,
                gamePiece: "None",
                location: "None",
                isAuto: false,
                timestamp: formatISO(timestamp),
              },
            );
            context.setMatchState(MATCH_STATES.TELEOP);
            screenContext.nextScreen();
            context.setIsAutoStopped(false);
          }}
          disabled={context.isTimerRunning}
          shouldShowIcon
        />
      </div>
    </>
  );
}
