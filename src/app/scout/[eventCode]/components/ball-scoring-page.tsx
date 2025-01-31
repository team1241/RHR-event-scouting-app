"use client";

import { cn } from "~/lib/utils";
import ContinueButton from "./common/continue-button";
import FieldImage from "./common/field-image";
import { useContext } from "react";
import { ScoutDataContext } from "../context/data-context";
import { Button } from "~/components/ui/button";
import PageHeading from "~/components/common/page-heading";
import { PlusIcon, MinusIcon } from "lucide-react";
import { getFlexDirection } from "../utils";
import { FIELD_ORIENTATIONS, LOCAL_STORAGE_KEYS } from "../constants";
export default function BallScoringScreen() {
  const context = useContext(ScoutDataContext);
  const toggleFieldOrientation = () => {
    const newOrientation =
      context.uiOrientation === FIELD_ORIENTATIONS.DEFAULT
        ? FIELD_ORIENTATIONS.FLIPPED
        : FIELD_ORIENTATIONS.DEFAULT;

    context.setUiOrientation(newOrientation);

    localStorage.setItem(LOCAL_STORAGE_KEYS.UI_ORIENTATION, newOrientation);
  };

  return (
    <>
      <PageHeading>Human Player Balls Scored</PageHeading>
      <FieldImage imageSize="100%" fieldSize="full">
        <div
          className={cn(
            "flex h-full w-full justify-center",
            getFlexDirection(context.uiOrientation, context.allianceColour).row
          )}
        >
          <div
            className={cn(
              "flex pt-4 justify-center mr-5",
              getFlexDirection(context.uiOrientation, "blue").col
            )}
          >
            <div
              className={cn(
                "flex pb-2",
                getFlexDirection(context.uiOrientation, "blue").col
              )}
            >
              <Button
                className="h-14 w-60"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentMisses = Number(
                      context.alternateScoutData?.scoring.blueMiss
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        blueMiss: currentMisses + 1,
                      },
                    });
                  }
                }}
              >
                <PlusIcon className="!size-8"></PlusIcon>
              </Button>
              <p className="dark:bg-blue-600 pt-3 text-center text-white font-bold text-2xl h-24 w-60">
                Blue Miss <br></br>
                <span className="text-4xl">
                  {`${context.alternateScoutData?.scoring.blueMiss}`}
                </span>
              </p>

              <Button
                className="h-14 w-60"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentMisses = Number(
                      context.alternateScoutData?.scoring.blueMiss
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        blueMiss: currentMisses !== 0 ? currentMisses - 1 : 0,
                      },
                    });
                  }
                }}
              >
                <MinusIcon className="!size-8"></MinusIcon>
              </Button>
            </div>
            <div
              className={cn(
                "flex pb-2",
                getFlexDirection(context.uiOrientation, "blue").col
              )}
            >
              <Button
                className="h-14 w-60"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentMisses = Number(
                      context.alternateScoutData?.scoring.redMiss
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        redMiss: currentMisses + 1,
                      },
                    });
                  }
                }}
              >
                <PlusIcon className="!size-8"></PlusIcon>
              </Button>
              <p className="dark:bg-red-600 p-3 text-center text-white font-bold text-2xl h-24 w-60">
                Red Miss <br></br>
                <span className="text-4xl">
                  {`${context.alternateScoutData?.scoring.redMiss}`}
                </span>
              </p>
              <Button
                className="h-14"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentMisses = Number(
                      context.alternateScoutData?.scoring.redMiss
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        redMiss: currentMisses !== 0 ? currentMisses - 1 : 0,
                      },
                    });
                  }
                }}
              >
                <MinusIcon className="!size-8"></MinusIcon>
              </Button>
            </div>
          </div>
          <div
            className={cn(
              "flex pt-4 justify-center mr-5",
              getFlexDirection(context.uiOrientation, "blue").col
            )}
          >
            <div className="flex flex-col pb-2">
              <Button
                className="h-14 w-60"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentScores = Number(
                      context.alternateScoutData?.scoring.blueScore
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        blueScore: currentScores + 1,
                      },
                    });
                  }
                }}
              >
                <PlusIcon className="!size-8"></PlusIcon>
              </Button>

              <p className="dark:bg-blue-600 p-3 text-center text-white font-bold text-2xl h-24 w-60">
                Blue Score <br></br>
                <span className="text-4xl">
                  {`${context.alternateScoutData?.scoring.blueScore}`}
                </span>
              </p>

              <Button
                className="h-14 w-60"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentScores = Number(
                      context.alternateScoutData?.scoring.blueScore
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        blueScore: currentScores !== 0 ? currentScores - 1 : 0,
                      },
                    });
                  }
                }}
              >
                <MinusIcon className="!size-8"></MinusIcon>
              </Button>
            </div>
            <div
              className={cn(
                "flex pb-2",
                getFlexDirection(context.uiOrientation, context.allianceColour)
                  .col
              )}
            >
              <Button
                className="h-14 w-60"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentScores = Number(
                      context.alternateScoutData?.scoring.redScore
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        redScore: currentScores + 1,
                      },
                    });
                  }
                }}
              >
                <PlusIcon className="!size-8"></PlusIcon>
              </Button>
              <p className="dark:bg-red-600 p-3 text-center text-white font-bold text-2xl h-24 w-60">
                Red Score <br></br>
                <span className="text-4xl">
                  {`${context.alternateScoutData?.scoring.redScore}`}
                </span>
              </p>
              <Button
                className="h-14 w-60"
                onClick={() => {
                  if (
                    context.alternateScoutData &&
                    context.setAlternateScoutData
                  ) {
                    const currentScores = Number(
                      context.alternateScoutData?.scoring.redScore
                    );
                    context.setAlternateScoutData({
                      ...context!.alternateScoutData,
                      scoring: {
                        ...context!.alternateScoutData.scoring,
                        redScore: currentScores !== 0 ? currentScores - 1 : 0,
                      },
                    });
                  }
                }}
              >
                <MinusIcon className="!size-8"></MinusIcon>
              </Button>
            </div>
          </div>
        </div>
      </FieldImage>
      <Button
        className="font-bold text-2xl tracking-wide w-64 h-20"
        onClick={toggleFieldOrientation}
      >
        FLIP FIELD
      </Button>
      <div className="flex flex-row justify-end">
        <ContinueButton />
      </div>
    </>
  );
}
