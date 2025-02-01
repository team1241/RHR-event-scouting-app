"use client";

import { cn } from "~/lib/utils";
import ContinueButton from "./common/continue-button";
import FieldImage from "./common/field-image";
import { useContext } from "react";
import { ScoutDataContext } from "../context/data-context";
import { Button } from "~/components/ui/button";
import PageHeading from "~/components/common/page-heading";
import { PlusIcon, MinusIcon } from "lucide-react";
import FlipFieldButton from "~/app/scout/[eventCode]/components/common/flip-field-button";
import {
  FIELD_ORIENTATIONS,
  SCREEN_NAMES,
} from "~/app/scout/[eventCode]/constants";
import { ScoutScreenContext } from "~/app/scout/[eventCode]/context";

export default function BallScoringScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  return (
    <>
      <PageHeading>Human Player Balls Scored</PageHeading>
      <div className="flex flex-row justify-between mt-2">
        <FlipFieldButton />
      </div>
      <FieldImage imageSize="100%" fieldSize="full">
        <div className={cn("flex h-full w-full justify-center")}>
          <div
            className={cn(
              "flex pt-4 justify-center mr-5",
              context.uiOrientation === FIELD_ORIENTATIONS.DEFAULT
                ? "flex-col"
                : "flex-col-reverse"
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
            <div className="flex flex-col pb-2">
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
              "flex flex-col pt-4 justify-center ml-5",
              context.uiOrientation === FIELD_ORIENTATIONS.DEFAULT
                ? "flex-col"
                : "flex-col-reverse"
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
            <div className="flex flex-col pb-2">
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
                Red Score<br></br>
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
      <div className="flex flex-row justify-end">
        <ContinueButton
          onClick={() => screenContext.goToScreen(SCREEN_NAMES.FINALIZE)}
        />
      </div>
    </>
  );
}
