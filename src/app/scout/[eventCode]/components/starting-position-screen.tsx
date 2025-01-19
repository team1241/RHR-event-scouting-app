"use client";

import { Save } from "lucide-react";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import BackButton from "./common/back-button";
import ContinueButton from "./common/continue-button";
import { Checkbox } from "~/components/ui/checkbox";
import FieldImage from "./field-image";
import { useContext, useState } from "react";
import { ScoutDataContext } from "../context";
import { FIELD_ORIENTATIONS, STARTING_POSITIONS } from "../constants";
import { cn } from "~/lib/utils";
import { getFlexDirection } from "../utils";

export default function StartingPositionScreen() {
  const context = useContext(ScoutDataContext);
  const toggleFieldOrientation = () => {
    if (context.uiOrientation === FIELD_ORIENTATIONS.DEFAULT) {
      context.setUiOrientation(FIELD_ORIENTATIONS.FLIPPED);
    } else {
      context.setUiOrientation(FIELD_ORIENTATIONS.DEFAULT);
    }
  };

  const updatePreload = (selected: boolean) => {
    context.setStartingPosition({
      ...context.startingPosition,
      hasPreload: selected,
    });
  };
  const updateShowedUp = (selected: boolean) => {
    context.setStartingPosition({
      ...context.startingPosition,
      showedUp: !selected,
    });
  };

  const setPosition = (position: string) => {
    context.setStartingPosition({ ...context.startingPosition, position });
  };

  const [isSaved, setSaved] = useState(false);

  return (
    <div>
      <PageHeading>Starting Position</PageHeading>
      <div className="flex flex-row justify-between mt-2">
        <Button
          className="font-bold text-2xl tracking-wide w-64 h-20"
          onClick={toggleFieldOrientation}
        >
          FLIP FIELD
        </Button>

        <Button
          className="font-bold text-2xl tracking-wide w-64 h-20 dark:bg-sky-400 dark:text-white"
          onClick={() => {
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
            "flex h-full w-full",
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
                  updateShowedUp;
                }}
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
                  updatePreload;
                }}
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
              "flex justify-stretch w-28 my-10 mx-16",
              getFlexDirection(context.uiOrientation, context.allianceColour)
                .col
            )}
          >
            <Button
              className={cn("h-full dark:bg-red-500/50 font-bold text-lg dark:text-white dark:hover:bg-red-500/70",
                context.startingPosition.position === STARTING_POSITIONS.ZONE_1 && "dark:ring-2 ring-white"
              )}
              onClick={() => {
                setSaved(false);
                setPosition(STARTING_POSITIONS.ZONE_1);
              }}
            >
              Zone 1
            </Button>
            <Button
              className={cn("h-full dark:bg-green-500/50 font-bold text-lg dark:text-white dark:hover:bg-green-500/70",
                context.startingPosition.position === STARTING_POSITIONS.ZONE_2 && "dark:ring-2 ring-white"
              )}
              onClick={() => {
                setSaved(false);
                setPosition(STARTING_POSITIONS.ZONE_2);
              }}
            >
              Zone 2
            </Button>
            <Button
              className={cn("h-full dark:bg-blue-500/50 font-bold text-lg dark:text-white dark:hover:bg-blue-500/70",
                context.startingPosition.position === STARTING_POSITIONS.ZONE_3 && "dark:ring-2 ring-white"
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
          <BackButton />
          <ContinueButton disabled={isSaved === false} />
        </div>
      </div>
    </div>
  );
}
