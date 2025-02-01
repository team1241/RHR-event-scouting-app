"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import BackButton from "~/app/scout/[eventCode]/components/common/back-button";
import ContinueButton from "~/app/scout/[eventCode]/components/common/continue-button";
import { ACTION_NAMES, SCREEN_NAMES } from "~/app/scout/[eventCode]/constants";
import {
  ScoutDataContext,
  ScoutScreenContext,
} from "~/app/scout/[eventCode]/context";
import { ScoutAction } from "~/app/scout/[eventCode]/context/data-context";
import PageHeading from "~/components/common/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { submitScoutDataForTeamAtEvent } from "~/db/queries/actions";
import { cn } from "~/lib/utils";

const FinalizationScreen = () => {
  const router = useRouter();
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);

  const [isFogHornedSelected, setIsFogHornedSelected] = useState(false);

  const getMatchInfoTitleText = () => {
    let text = "";
    if (context.matchNumber.includes("R")) {
      text += "Replay of ";
    }
    if (context.matchNumber.includes("P")) {
      text += "Practice ";
    } else {
      text += "Qualification ";
    }

    text += context.matchNumber.match(/\d+/g)![0];
    return text;
  };

  const teleopActions: ScoutAction[] = [];
  const autoActions: ScoutAction[] = [];

  context.actions.forEach((action) => {
    if (!action.isAuto) {
      teleopActions.push(action);
    } else {
      autoActions.push(action);
    }
  });

  const endgameActions: ScoutAction[] = [];
  teleopActions.forEach((action) => {
    if (
      action.actionName === ACTION_NAMES.CLIMB.SUCCESS ||
      action.actionName === ACTION_NAMES.CLIMB.ATTEMPT ||
      action.actionName === ACTION_NAMES.CLIMB.FAIL
    ) {
      endgameActions.push(action);
    }
  });

  const saveDataMutation = useMutation({
    mutationKey: [
      "submit-match-data",
      context.eventCode,
      context.matchNumber,
      context.teamToScout,
    ],
    mutationFn: async () => {
      await submitScoutDataForTeamAtEvent(
        context.eventCode,
        context.actions,
        isFogHornedSelected
      );
    },
  });

  return (
    <>
      <PageHeading>Match Finalization</PageHeading>
      <div className="w-full flex justify-around gap-8 mt-4 h-[32rem]">
        <div className="w-full flex flex-col gap-2 items-start">
          <h2 className="text-2xl font-semibold">Actions:</h2>
          <Tabs defaultValue="teleop" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-2">
              <TabsTrigger value="auto" disabled={context.isAlternateScout}>
                Auto
              </TabsTrigger>
              <TabsTrigger value="teleop">Teleop</TabsTrigger>
              <TabsTrigger value="endgame" disabled={context.isAlternateScout}>
                Endgame
              </TabsTrigger>
            </TabsList>
            <Card>
              <CardContent>
                <TabsContent value="auto">
                  {autoActions.length === 0 ? <p>No actions logged</p> : <></>}
                  {/* This content is disabled if the user is an alternate scout */}
                </TabsContent>
                <TabsContent value="teleop">
                  {teleopActions.length === 0 && !context.isAlternateScout && (
                    <p>No actions logged</p>
                  )}
                  {context.isAlternateScout ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-xl flex flex-col gap-2">
                        <p className="font-semibold text-2xl">RED:</p>
                        <p>
                          Makes:{" "}
                          <span>{`${context.alternateScoutData?.scoring.redScore}`}</span>
                        </p>
                        <p>
                          Misses:{" "}
                          <span>{`${context.alternateScoutData?.scoring.redMiss}`}</span>
                        </p>
                        <p className="font-semibold">
                          Total shots:{" "}
                          <span>{`${
                            context.alternateScoutData!.scoring.redMiss +
                            context.alternateScoutData!.scoring.redScore
                          }`}</span>
                        </p>
                        <p className="font-semibold">
                          Accuracy:{" "}
                          <span>{`${(
                            (parseFloat(
                              context.alternateScoutData!.scoring.redScore.toFixed(
                                2
                              )
                            ) /
                              (context.alternateScoutData!.scoring.redMiss +
                                context.alternateScoutData!.scoring.redScore)) *
                            100
                          ).toFixed(1)}%`}</span>
                        </p>
                      </div>
                      <div className="text-xl flex flex-col gap-2">
                        <p className="font-semibold text-2xl">BLUE:</p>
                        <p>
                          Makes:{" "}
                          <span>{`${context.alternateScoutData?.scoring.blueScore}`}</span>
                        </p>
                        <p>
                          Misses:{" "}
                          <span>{`${context.alternateScoutData?.scoring.blueMiss}`}</span>
                        </p>
                        <p className="font-semibold">
                          Total shots:{" "}
                          <span>{`${
                            context.alternateScoutData!.scoring.blueMiss +
                            context.alternateScoutData!.scoring.blueScore
                          }`}</span>
                        </p>
                        <p className="font-semibold">
                          Accuracy:{" "}
                          <span>{`${(
                            (parseFloat(
                              context.alternateScoutData!.scoring.blueScore.toFixed(
                                2
                              )
                            ) /
                              (context.alternateScoutData!.scoring.blueMiss +
                                context.alternateScoutData!.scoring
                                  .blueScore)) *
                            100
                          ).toFixed(1)}%`}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </TabsContent>
                <TabsContent value="endgame">
                  {endgameActions.length === 0 ? (
                    <p>No actions logged</p>
                  ) : (
                    <></>
                  )}
                  {/* This content is disabled if the user is an alternate scout */}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
          <ScrollArea className="h-full w-full">
            {context.actions.map((action, index) => (
              <p key={`action-${index}`}>{action.actionName}</p>
            ))}
          </ScrollArea>
        </div>
        <div className="w-full flex flex-col gap-2 items-start">
          <h2 className="text-2xl font-semibold">Other info:</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div>
                  <p className="text-2xl">{getMatchInfoTitleText()}</p>
                  <CardDescription>{context.eventCode}</CardDescription>
                </div>
                {!context.isAlternateScout && (
                  <p
                    className={cn(
                      "rounded-sm px-2 pt-0.5 font-bold text-center text-white w-24 !text-lg max-h-8",
                      context.allianceColour === "red"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    )}
                  >
                    {context.teamToScout}
                  </p>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {context.isAlternateScout ? (
                <>
                  <p className="text-xl font-semibold flex justify-between">
                    Red Human Player:{" "}
                    <span className="font-semibold bg-red-500 rounded-sm px-2 w-24 text-center">
                      {`${context.alternateScoutData?.setup?.redTeamNumber}`}
                    </span>
                  </p>
                  <p className="text-xl font-semibold flex justify-between mt-2">
                    Blue Human Player:{" "}
                    <span className="font-semibold bg-blue-500 rounded-sm px-2 w-24 text-center">
                      {`${context.alternateScoutData?.setup?.blueTeamNumber}`}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  {context.startingPosition.showedUp && (
                    <p className="text-xl font-semibold flex justify-between">
                      Starting position:{" "}
                      <span className="font-normal">
                        {context.startingPosition.position === ""
                          ? "N/A"
                          : context.startingPosition.position}
                      </span>
                    </p>
                  )}
                  <p className="text-xl font-semibold flex justify-between">
                    Showed up to match?{" "}
                    <span className="font-normal">
                      {context.startingPosition.showedUp ? "YES" : "NO"}
                    </span>
                  </p>
                  {context.startingPosition.showedUp && (
                    <p className="text-xl font-semibold flex justify-between">
                      Had preload?{" "}
                      <span className="font-normal">
                        {context.startingPosition.hasPreload ? "YES" : "NO"}
                      </span>
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          <div className="flex flex-row gap-4 items-center mt-4">
            <Checkbox
              id="wasFogHorned"
              className="size-7"
              checked={isFogHornedSelected}
              onCheckedChange={() =>
                setIsFogHornedSelected(!isFogHornedSelected)
              }
            />
            <Label htmlFor="wasFogHorned" className="text-xl font-semibold">
              Was match fog horned?
            </Label>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <BackButton
          onClick={() => {
            if (context.isAlternateScout) {
              screenContext.goToScreen(SCREEN_NAMES.ALTERNATE_SCOUT.SCORING);
            } else {
              screenContext.prevScreen();
            }
          }}
        />
        <ContinueButton
          label="SUBMIT MATCH"
          onClick={async () => {
            if (typeof window !== "undefined") {
              localStorage.removeItem("rhr_scouting:current_screen");
              localStorage.removeItem("rhr_scouting:starting_position");
            }

            try {
              // const saveResult = await saveDataMutation.mutateAsync();
            } catch (e) {
              console.error(e);
            }
            router.refresh();
          }}
        />
      </div>
    </>
  );
};

export default FinalizationScreen;
