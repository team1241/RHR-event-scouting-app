"use client";

import { Save } from "lucide-react";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import BackButton from "./common/back-button";
import ContinueButton from "./common/continue-button";
import { Checkbox } from "~/components/ui/checkbox";
import FieldImage from "./common/field-image";
import { useContext, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import {
  GAME_PIECES,
  LOCAL_STORAGE_KEYS,
  MATCH_STATES,
  STARTING_POSITIONS,
} from "../constants";
import { cn } from "~/lib/utils";
import { getFlexDirection } from "../utils";
import FlipFieldButton from "~/app/scout/[eventCode]/components/common/flip-field-button";
import { useMutation } from "@tanstack/react-query";
import { saveStartingPositionForTeamAtEvent } from "~/db/queries/starting-positions";
import { toast } from "sonner";

export default function StartingPositionScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);

  const updatePreload = () => {
    context.setStartingPosition({
      ...context.startingPosition,
      hasPreload: !context.startingPosition.hasPreload,
    });
    if (!context.startingPosition.hasPreload) {
      context.setGamePieceState([
        { type: GAME_PIECES.CORAL, count: 1 },
        context.gamePieceState[1],
      ]);
    } else {
      context.setGamePieceState([
        { type: GAME_PIECES.CORAL, count: 0 },
        context.gamePieceState[1],
      ]);
    }
  };
  const updateShowedUp = () => {
    context.setStartingPosition({
      ...context.startingPosition,
      showedUp: !context.startingPosition.showedUp,
    });
  };

  const setPosition = (position: string) => {
    context.setStartingPosition({ ...context.startingPosition, position });
  };

  const [isSaved, setSaved] = useState(false);

  const saveStartingPosition = useMutation({
    mutationKey: [
      "save-starting-position",
      context.eventCode,
      context.teamToScout,
    ],
    mutationFn: async () => {
      await saveStartingPositionForTeamAtEvent(context.eventCode.substring(4), {
        scouterId: context.scouterDetails.id,
        matchNumber: context.matchNumber,
        teamNumber: parseInt(context!.teamToScout as string),
        hasPreload: context.startingPosition.hasPreload,
        showedUp: context.startingPosition.showedUp,
        startingPosition: context.startingPosition.position,
      });
    },
  });

  const isContinueDisabled = () => {
    if (
      isSaved &&
      context.startingPosition.position === "" &&
      !context.startingPosition.showedUp
    )
      return false;

    if (isSaved && context.startingPosition.position !== "") return false;

    return true;
  };

  return (
    <div>
      <PageHeading>Starting Position</PageHeading>
      <div className="flex flex-row justify-between mt-2">
        <FlipFieldButton />

        <Button
          className="font-bold text-2xl tracking-wide w-64 h-20 dark:bg-sky-400 dark:text-white"
          onClick={async () => {
            await saveStartingPosition.mutateAsync();
            toast.success("Starting position saved");
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.STARTING_POSITION,
              JSON.stringify(context.startingPosition)
            );
            setSaved(true);
          }}
        >
          SAVE
          <Save className="!size-5" />
        </Button>
      </div>
      <FieldImage imageSize="100%" fieldSize="half">
        <div
          className={cn(
            "flex h-full w-full justify-between",
            getFlexDirection(context.uiOrientation, context.allianceColour).row
          )}
        >
          <div className="flex flex-col space-y-20 items-start mx-4 justify-center">
            <div className="flex items-center space-x-4 bg-black/90 font-bold p-3 rounded-lg">
              <Checkbox
                id="noshow"
                className="size-7"
                onCheckedChange={() => {
                  setSaved(false);
                  updateShowedUp();
                }}
                checked={!context.startingPosition.showedUp}
              />
              <label
                htmlFor="noshow"
                className="text-4xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {"Didn't show up?"}
              </label>
            </div>

            <div className="flex items-center space-x-4 bg-black/90 font-bold p-3 rounded-lg">
              <Checkbox
                id="preload"
                className="size-7"
                onCheckedChange={() => {
                  setSaved(false);
                  updatePreload();
                }}
                checked={context.startingPosition.hasPreload}
              />
              <label
                htmlFor="preload"
                className="text-4xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Has preload?
              </label>
            </div>
          </div>
          <div
            className={cn(
              // "flex justify-between w-72 my-10 mx-52",
              "flex justify-between my-12 mx-52",
              getFlexDirection(context.uiOrientation, context.allianceColour)
                .col
            )}
          >
            <Button
              className={cn(
                "h-full dark:bg-red-500/50 font-bold text-lg dark:text-white dark:hover:bg-red-500/70 w-28",
                context.startingPosition.position ===
                  STARTING_POSITIONS.ZONE_1 &&
                  "dark:ring-2 dark:bg-red-500/70 ring-white"
              )}
              onClick={() => {
                setSaved(false);
                setPosition(STARTING_POSITIONS.ZONE_1);
              }}
            >
              Zone 1
            </Button>
            <Button
              className={cn(
                "h-full dark:bg-green-500/50 font-bold text-lg dark:text-white dark:hover:bg-green-500/70 w-28",
                context.startingPosition.position ===
                  STARTING_POSITIONS.ZONE_2 &&
                  "dark:ring-2 dark:bg-green-500/70 ring-white"
              )}
              onClick={() => {
                setSaved(false);
                setPosition(STARTING_POSITIONS.ZONE_2);
              }}
            >
              Zone 2
            </Button>
            <Button
              className={cn(
                "h-full dark:bg-blue-500/50 font-bold text-lg dark:text-white dark:hover:bg-blue-500/70 w-28",
                context.startingPosition.position ===
                  STARTING_POSITIONS.ZONE_3 &&
                  "dark:ring-2 dark:bg-blue-500/70 ring-white"
              )}
              onClick={() => {
                setSaved(false);
                setPosition(STARTING_POSITIONS.ZONE_3);
              }}
            >
              Zone 3
            </Button>
          </div>
        </div>
      </FieldImage>
      <div className="flex flex-row">
        <div className="flex justify-between w-full">
          <BackButton onClick={() => screenContext.prevScreen()} />
          <ContinueButton
            onClick={() => {
              screenContext.nextScreen();
              context.setMatchState(MATCH_STATES.AUTO);
            }}
            disabled={isContinueDisabled()}
          />
        </div>
      </div>
    </div>
  );
}
