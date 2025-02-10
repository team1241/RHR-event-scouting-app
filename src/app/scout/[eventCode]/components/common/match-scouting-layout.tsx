"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useState, useContext } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ACTION_NAMES, GAME_PIECES, LOCATIONS } from "../../constants";
import { ScoutDataContext } from "../../context";
import { getFlexDirection } from "../../utils";
import FieldImage from "./field-image";
import ScoutActionButton from "./scout-action-button";

const MatchScoutingLayout = ({ isDisabled }: { isDisabled: boolean }) => {
  const [isCoralScoreSelectionOpen, setIsCoralScoreSelectionOpen] =
    useState(false);
  const [isCoralScoreSelected, setCoralScoreSelected] = useState(false);
  const [isCoralMissSelected, setCoralMissSelected] = useState(false);
  const [isCoralMissSelectionOpen, setIsCoralMissSelectionOpen] =
    useState(false);
  const [isDislodgeSelectionOpen, setIsDislodgeSelectionOpen] = useState(false);
  const context = useContext(ScoutDataContext);

  const getScoreOrMiss = (
    isCoralMissSelected: boolean,
    isCoralScoreSelected: boolean
  ) => {
    if (isCoralScoreSelected) {
      return ACTION_NAMES.SCORE;
    }
    if (isCoralMissSelected) {
      return ACTION_NAMES.MISS;
    } else {
      return "something wrong here bruh";
    }
  };

  const checkIsDisabled = (isDisabled: boolean, isDefending: boolean) => {
    if (context.isDefending) {
      return true;
    } else if (isDisabled) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div>
        <FieldImage imageSize="100%" fieldSize="half">
          <div
            className={cn(
              "flex w-full h-full",
              getFlexDirection(context.uiOrientation, context.allianceColour)
                .row
            )}
          >
            <div
              className={cn(
                "flex items-center h-full gap-10 mx-2 justify-center",
                getFlexDirection(context.uiOrientation, context.allianceColour)
                  .col
              )}
            >
              <ScoutActionButton
                className="text-xl font-bold w-52 h-16 bg-white text-black"
                actionName={ACTION_NAMES.INTAKE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.CORAL_STATION.LEFT}
                label="Coral Pickup"
                isAuto
                disabled={checkIsDisabled(isDisabled, context.isDefending)}
              />
              <ScoutActionButton
                className="text-xl font-bold w-52 h-16 bg-white text-black"
                actionName={ACTION_NAMES.INTAKE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.GROUND}
                label="Ground Intake Coral"
                isAuto
                disabled={checkIsDisabled(isDisabled, context.isDefending)}
              />
              <ScoutActionButton
                className="dark:bg-teal-400 text-xl font-bold w-52 h-16 text-black"
                actionName={ACTION_NAMES.INTAKE}
                gamePiece={GAME_PIECES.ALGAE}
                location={LOCATIONS.GROUND}
                label="Ground Intake Algae"
                isAuto
                disabled={checkIsDisabled(isDisabled, context.isDefending)}
              />
              <ScoutActionButton
                className="text-xl font-bold w-52 h-16 bg-white text-black"
                actionName={ACTION_NAMES.INTAKE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.CORAL_STATION.RIGHT}
                label="Coral Pickup"
                isAuto
                disabled={checkIsDisabled(isDisabled, context.isDefending)}
              />
            </div>
            <div className="flex flex-col items-center justify-between h-full w-full gap-3 mx-28">
              <Popover
                open={isDislodgeSelectionOpen}
                onOpenChange={setIsDislodgeSelectionOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    className="dark:bg-teal-400 text-xl font-bold w-44 h-16 my-20"
                    disabled={checkIsDisabled(isDisabled, context.isDefending)}
                  >
                    Algae Dislodge
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="flex flex-col w-auto gap-4"
                  side="right"
                >
                  <ScoutActionButton
                    actionName={ACTION_NAMES.DISLODGE}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.REEF.L2}
                    className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                    label="L2"
                    isAuto
                    onClick={() => {
                      setIsDislodgeSelectionOpen(false);
                    }}
                  />
                  <ScoutActionButton
                    actionName={ACTION_NAMES.DISLODGE}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.REEF.L3}
                    className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                    label="L3"
                    isAuto
                    onClick={() => {
                      setIsDislodgeSelectionOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex flex-col items-center justify-between">
                <Popover
                  open={isCoralScoreSelectionOpen || isCoralMissSelectionOpen}
                  onOpenChange={
                    setIsCoralMissSelectionOpen || setIsCoralScoreSelectionOpen
                  }
                >
                  <PopoverTrigger
                    asChild
                    disabled={checkIsDisabled(isDisabled, context.isDefending)}
                  >
                    <div className="flex flex-col ">
                      <Button
                        className="text-xl font-bold w-44 h-16"
                        onClick={() => {
                          setCoralScoreSelected(true);
                        }}
                        disabled={checkIsDisabled(
                          isDisabled,
                          context.isDefending
                        )}
                      >
                        Coral Score
                      </Button>
                      <Button
                        className=" dark:bg-red-500 text-xl font-bold w-44 h-16 my-3"
                        onClick={() => {
                          setCoralMissSelected(true);
                        }}
                        disabled={checkIsDisabled(
                          isDisabled,
                          context.isDefending
                        )}
                      >
                        Coral Miss
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col gap-3 w-auto"
                    side="right"
                    align="end"
                    alignOffset={84}
                  >
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelected,
                          isCoralScoreSelected
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L4}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L4"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelected,
                          isCoralScoreSelected
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L3}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L3"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelected,
                          isCoralScoreSelected
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L2}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L2"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelected,
                          isCoralScoreSelected
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L1}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L1"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelected,
                          isCoralScoreSelected
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={"DON'T KNOW"}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="DON'T KNOW"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col h-full mx-16 items-center">
              <div className="flex flex-col my-20 gap-5">
                <ScoutActionButton
                  className="text-xl font-bold w-36 h-16 dark:bg-teal-400 text-black"
                  actionName={ACTION_NAMES.SCORE}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.NET}
                  isAuto
                  label="Net Scored"
                  disabled={checkIsDisabled(isDisabled, context.isDefending)}
                />
                <ScoutActionButton
                  className="text-xl font-bold w-36 h-16 bg-red-500 text-black"
                  actionName={ACTION_NAMES.MISS}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.NET}
                  isAuto
                  label="Net Miss"
                  disabled={checkIsDisabled(isDisabled, context.isDefending)}
                />
              </div>
              <ScoutActionButton
                className="dark:bg-teal-400 text-xl font-bold w-44 h-16 text-black"
                actionName={ACTION_NAMES.SCORE}
                gamePiece={GAME_PIECES.ALGAE}
                location={LOCATIONS.PROCESSOR}
                label="Processor Score"
                isAuto
                disabled={checkIsDisabled(isDisabled, context.isDefending)}
              />
            </div>
            <div></div>
          </div>
        </FieldImage>
      </div>
    </div>
  );
};

export default MatchScoutingLayout;
