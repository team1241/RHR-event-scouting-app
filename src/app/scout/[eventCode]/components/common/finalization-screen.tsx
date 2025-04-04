/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDebounceValue } from "usehooks-ts";
import { useMutation } from "@tanstack/react-query";
import { differenceInSeconds } from "date-fns";
import { Loader2Icon, ShieldIcon, UndoIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import BackButton from "~/app/scout/[eventCode]/components/common/back-button";
import ContinueButton from "~/app/scout/[eventCode]/components/common/continue-button";
import { SCREEN_NAMES } from "~/app/scout/[eventCode]/constants";
import {
  ScoutDataContext,
  ScoutScreenContext,
} from "~/app/scout/[eventCode]/context";
import { ScoutAction } from "~/app/scout/[eventCode]/context/data-context";
import { capitalize } from "~/app/scout/[eventCode]/utils";
import PageHeading from "~/components/common/page-heading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
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
import { submitAlternateScoutDataForMatch } from "~/db/queries/alternate-scout";
import { cn } from "~/lib/utils";
import { Textarea } from "~/components/ui/text-area";
import { saveMatchCommentsForTeam } from "~/db/queries/match-comments";

const FinalizationScreen = () => {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);

  const [isFogHornedSelected, setIsFogHornedSelected] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [debouncedValue, setValue] = useDebounceValue(context.comment, 500);

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
  let totalAlgaeScored: number = 0;
  let totalAlgaeMissed: number = 0;
  let totalCoralScored: number = 0;
  let totalCoralMissed: number = 0;
  context.actions.forEach((action) => {
    if (!action.isAuto) {
      teleopActions.push(action);
    } else {
      autoActions.push(action);
    }
    if (action.gamePiece === "algae" && action.actionName === "score") {
      totalAlgaeScored++;
    }

    if (action.gamePiece === "algae" && action.actionName === "miss") {
      totalAlgaeMissed++;
    }
    if (action.gamePiece === "coral" && action.actionName === "score") {
      totalCoralScored++;
    }

    if (action.gamePiece === "coral" && action.actionName === "miss") {
      totalCoralMissed++;
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
        context.eventCode.substring(4),
        context.actions
      );
    },
  });

  const alternateScoutDateMutation = useMutation({
    mutationKey: [
      "submit-alternate-scout-data",
      context.eventCode,
      context.matchNumber,
    ],
    mutationFn: async () => {
      await submitAlternateScoutDataForMatch(context.eventCode.substring(4), {
        scoutId: context.scouterDetails.id,
        matchNumber: context.matchNumber,
        data: JSON.stringify(context.alternateScoutData),
      });
    },
  });

  const saveCommentsMutation = useMutation({
    mutationKey: [
      "submit-match-comments",
      context.eventCode,
      context.matchNumber,
      context.teamToScout,
    ],
    mutationFn: async () => {
      if (!context.teamToScout) return;
      await saveMatchCommentsForTeam(context.eventCode.substring(4), {
        scoutId: context.scouterDetails.id,
        matchNumber: context.matchNumber,
        teamNumber:
          typeof context.teamToScout === "string"
            ? parseInt(context!.teamToScout)
            : context!.teamToScout,
        comments: context.comment,
      });
    },
  });

  const renderActionList = (actions: ScoutAction[]) => {
    if (actions.length === 0) return [];
    let timeRemaining = actions[0].isAuto ? 15 : 135;

    return actions.map((action, index) => {
      if (index > 0) {
        timeRemaining -= differenceInSeconds(
          actions[index].timestamp,
          actions[index - 1].timestamp
        );
      }

      return (
        <div
          key={`action-${index}`}
          className="flex flex-row gap-2 items-center"
        >
          <p className="font-semibold text-xl">{index + 1}</p>
          <p>{capitalize(action.gamePiece)}</p>
          <p>{capitalize(action.actionName)}</p>
          <p>{capitalize(action.location)}</p>
          {action.wasDefended && <ShieldIcon />}
          {action.hasUndo && <UndoIcon />}
          <p className="grow text-right">{`T = ${timeRemaining}`}</p>
        </div>
      );
    });
  };

  useEffect(() => {
    context.setComment(debouncedValue);
  }, [debouncedValue]);

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
              <TabsTrigger value="total" disabled={context.isAlternateScout}>
                Total
              </TabsTrigger>
            </TabsList>
            <Card>
              <CardContent>
                <TabsContent value="auto" className="h-[300px] w-full">
                  <ScrollArea className="h-[300px]">
                    {renderActionList(autoActions)}
                    <p className="text-center text-xl font-semibold">
                      {"---- End of list ----"}
                    </p>
                  </ScrollArea>
                  {/* This content is disabled if the user is an alternate scout */}
                </TabsContent>
                <TabsContent value="teleop" className="h-[300px] w-full">
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
                          <span>{`${
                            context.alternateScoutData!.scoring.redMiss +
                              context.alternateScoutData!.scoring.redScore !==
                            0
                              ? (
                                  (parseFloat(
                                    context.alternateScoutData!.scoring.redScore.toFixed(
                                      2
                                    )
                                  ) /
                                    (context.alternateScoutData!.scoring
                                      .redMiss +
                                      context.alternateScoutData!.scoring
                                        .redScore)) *
                                  100
                                ).toFixed(1)
                              : 0
                          }%`}</span>
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
                          <span>{`${
                            context.alternateScoutData!.scoring.blueMiss +
                              context.alternateScoutData!.scoring.blueScore !==
                            0
                              ? (
                                  (parseFloat(
                                    context.alternateScoutData!.scoring.blueScore.toFixed(
                                      2
                                    )
                                  ) /
                                    (context.alternateScoutData!.scoring
                                      .blueMiss +
                                      context.alternateScoutData!.scoring
                                        .blueScore)) *
                                  100
                                ).toFixed(1)
                              : 0
                          }%`}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ScrollArea className="h-[300px]">
                      {renderActionList(teleopActions)}
                      <p className="text-center text-xl font-semibold">
                        {"---- End of list ----"}
                      </p>
                    </ScrollArea>
                  )}
                </TabsContent>

                <TabsContent value="total" className="h-[300px] w-full">
                  <div className="flex flex-col">
                    <div className="flex flex-row text-xl font-bold h-12 w-full justify-between">
                      <p className="align-start">Total Coral Scored:</p>
                      <p className="text-3xl">{totalCoralScored}</p>
                    </div>
                    <div className="flex flex-row text-xl font-bold h-12 w-full justify-between">
                      <p className="align-start">Total Coral Missed:</p>
                      <p className="text-3xl">{totalCoralMissed}</p>
                    </div>
                    <div className="flex flex-row text-xl font-bold h-12 w-full justify-between">
                      <p className="align-start">Total Algae Scored:</p>
                      <p className="text-3xl">{totalAlgaeScored}</p>
                    </div>
                    <div className="flex flex-row text-xl font-bold h-12 w-full justify-between">
                      <p className="align-start">Total Algae Missed:</p>
                      <p className="text-3xl">{totalAlgaeMissed}</p>
                    </div>
                    <div className="flex flex-row text-xl font-bold h-12 w-full justify-between">
                      <p className="align-start">Endgame Status: </p>
                      <p className="text-xl">
                        {context.previousEndgameAction.actionMessage}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          <div className="flex flex-col gap-2 items-start">
            <div className="flex flex-row gap-2 items-center">
              <UndoIcon />
              <span>{"= undo action occurred"}</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <ShieldIcon />
              <span>{"= robot was defended during action"}</span>
            </div>
          </div>
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
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xl">
              <span className="font-semibold">Comments</span> (Optional)
            </p>
            <Textarea
              defaultValue={debouncedValue}
              placeholder="Type comments here"
              className="resize-none w-full h-28"
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
          </div>
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
            } else if (!context.startingPosition.showedUp) {
              screenContext.goToScreen(SCREEN_NAMES.STARTING_POSITIONS);
            } else {
              screenContext.prevScreen();
            }
          }}
        />
        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <ContinueButton label="SUBMIT MATCH" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isFogHornedSelected
                  ? "Are you sure the match was fog horned?"
                  : "Confirm Match Submission"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isFogHornedSelected
                  ? "A fog horned match WILL NOT be submitted and will DELETE all data for this match."
                  : "This action cannot be undone. This data cannot be updated once it is submitted."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    if (!isFogHornedSelected) {
                      if (context.comment) {
                        await saveCommentsMutation.mutateAsync();
                      }
                      if (context.isAlternateScout) {
                        await alternateScoutDateMutation.mutateAsync();
                      } else {
                        await saveDataMutation.mutateAsync();
                      }
                      toast.success("Match data submitted!");
                    }
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("rhr_scouting:scouted_actions");
                      localStorage.removeItem("rhr_scouting:starting_position");
                    }
                    window.location.reload();
                  } catch (e) {
                    console.log(e);
                    toast.error("Error submitting match data");
                  }
                  setIsConfirmDialogOpen(false);
                }}
              >
                Confirm
                {(saveDataMutation.isPending ||
                  alternateScoutDateMutation.isPending) && (
                  <Loader2Icon className="animate-spin size-5" />
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default FinalizationScreen;
