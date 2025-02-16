"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useState, useContext } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  ACTION_NAMES,
  GAME_PIECES,
  LOCATIONS,
  MATCH_STATES,
} from "../../constants";
import { ScoutDataContext } from "../../context";
import { getFlexDirection, getHasCoralOrAlgae } from "../../utils";
import FieldImage from "./field-image";
import ScoutActionButton from "./scout-action-button";

export const MatchScoutingLayout = ({
  isDisabled,
}: {
  isDisabled: boolean;
}) => {
  const [isCoralScoreSelectionOpen, setIsCoralScoreSelectionOpen] =
    useState(false);
  const [isCoralScoreSelected, setCoralScoreSelected] = useState(false);
  const [isCoralMissSelected, setCoralMissSelected] = useState(false);
  const [isCoralMissSelectionOpen, setIsCoralMissSelectionOpen] =
    useState(false);
  const [isDislodgeSelectionOpen, setIsDislodgeSelectionOpen] = useState(false);
  const [isReefIntakeSelectionOpen, setIsReefIntakeSelectionOpen] =
    useState(false);

  const context = useContext(ScoutDataContext);
  const hasCoral = context.gamePieceState[0].count > 0;
  const hasAlgae = context.gamePieceState[1].count > 0;

  const setHasCoral = (hasCoral: boolean) => {
    if (hasCoral) {
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

  const setHasAlgae = (hasAlgae: boolean) => {
    if (hasAlgae) {
      context.setGamePieceState([
        context.gamePieceState[0],
        { type: GAME_PIECES.ALGAE, count: 1 },
      ]);
    } else {
      context.setGamePieceState([
        context.gamePieceState[0],
        { type: GAME_PIECES.ALGAE, count: 0 },
      ]);
    }
  };

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

  const checkIsDisabled = (isDisabled: boolean) => {
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
      <p className="text-3xl font-bold my-1">
        {getHasCoralOrAlgae(hasCoral, hasAlgae)}
      </p>
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
                isAuto={context.matchState === MATCH_STATES.AUTO}
                disabled={checkIsDisabled(isDisabled) || hasCoral == true}
                onClick={() => {
                  setHasCoral(true);
                }}
              />
              <ScoutActionButton
                className="text-xl font-bold w-52 h-16 bg-white text-black"
                actionName={ACTION_NAMES.INTAKE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.GROUND}
                label="Ground Intake Coral"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                disabled={checkIsDisabled(isDisabled) || hasCoral == true}
                onClick={() => {
                  setHasCoral(true);
                }}
              />
              <ScoutActionButton
                className="dark:bg-teal-400 text-xl font-bold w-52 h-16 text-black"
                actionName={ACTION_NAMES.INTAKE}
                gamePiece={GAME_PIECES.ALGAE}
                location={LOCATIONS.GROUND}
                label="Ground Intake Algae"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                disabled={checkIsDisabled(isDisabled) || hasAlgae == true}
                onClick={() => {
                  setHasAlgae(true);
                }}
              />
              <ScoutActionButton
                className="text-xl font-bold w-52 h-16 bg-white text-black"
                actionName={ACTION_NAMES.INTAKE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.CORAL_STATION.RIGHT}
                label="Coral Pickup"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                disabled={checkIsDisabled(isDisabled) || hasCoral == true}
                onClick={() => {
                  setHasCoral(true);
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-between h-full w-full gap-3">
              <div className="flex flex-col mt-3 gap-3">
                <Popover
                  open={isDislodgeSelectionOpen}
                  onOpenChange={setIsDislodgeSelectionOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      className="dark:bg-teal-400 text-xl font-bold w-44 h-16 "
                      disabled={checkIsDisabled(isDisabled) || hasAlgae}
                    >
                      Algae Dislodge
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col w-auto gap-4 bg-black p-4 rounded-lg z-10"
                    side="right"
                  >
                    <ScoutActionButton
                      actionName={ACTION_NAMES.INTAKE}
                      gamePiece={GAME_PIECES.ALGAE}
                      location={LOCATIONS.REEF.L2}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L2"
                      isAuto={context.matchState === MATCH_STATES.AUTO}
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
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsDislodgeSelectionOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <Popover
                  open={isReefIntakeSelectionOpen}
                  onOpenChange={setIsReefIntakeSelectionOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      className="dark:bg-teal-400 text-xl font-bold w-44 h-16 text-wrap"
                      disabled={isDisabled || hasAlgae == true}
                    >
                      Intake Algae From Reef
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col w-auto gap-4 bg-black p-4 rounded-lg z-10"
                    side="right"
                  >
                    <ScoutActionButton
                      actionName={ACTION_NAMES.INTAKE}
                      gamePiece={GAME_PIECES.ALGAE}
                      location={LOCATIONS.REEF.L2}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L2"
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsReefIntakeSelectionOpen(false);
                        setHasAlgae(true);
                      }}
                    />
                    <ScoutActionButton
                      actionName={ACTION_NAMES.INTAKE}
                      gamePiece={GAME_PIECES.ALGAE}
                      location={LOCATIONS.REEF.L3}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L3"
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsReefIntakeSelectionOpen(false);
                        setHasAlgae(true);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col items-center justify-between">
                <Popover
                  open={isCoralScoreSelectionOpen || isCoralMissSelectionOpen}
                  onOpenChange={
                    setIsCoralMissSelectionOpen || setIsCoralScoreSelectionOpen
                  }
                >
                  <PopoverTrigger
                    asChild
                    disabled={checkIsDisabled(isDisabled || hasCoral == false)}
                  >
                    <div className="flex flex-col ">
                      <Button
                        className="text-xl font-bold w-44 h-16"
                        onClick={() => {
                          setCoralScoreSelected(true);
                        }}
                        disabled={
                          checkIsDisabled(isDisabled) || hasCoral == false
                        }
                      >
                        Coral Score
                      </Button>
                      <Button
                        className=" dark:bg-red-500 text-xl font-bold w-44 h-16 my-3"
                        onClick={() => {
                          setCoralMissSelected(true);
                        }}
                        disabled={
                          checkIsDisabled(isDisabled) || hasCoral == false
                        }
                      >
                        Coral Miss
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col gap-3 w-auto bg-black p-4 rounded-lg z-10"
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
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                        setHasCoral(false);
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
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                        setHasCoral(false);
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
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                        setHasCoral(false);
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
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                        setHasCoral(false);
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
                      isAuto={context.matchState === MATCH_STATES.AUTO}
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                        setCoralScoreSelected(false);
                        setCoralMissSelected(false);
                        setHasCoral(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div
              className={cn(
                "flex flex-col h-full items-center",
                getFlexDirection(context.uiOrientation, context.allianceColour)
                  .col
              )}
            >
              <div className="flex flex-col my-20 gap-3">
                <ScoutActionButton
                  className="text-xl font-bold w-36 h-16 dark:bg-teal-400 text-black"
                  actionName={ACTION_NAMES.SCORE}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.NET}
                  isAuto={context.matchState === MATCH_STATES.AUTO}
                  label="Net Scored"
                  disabled={checkIsDisabled(isDisabled) || hasAlgae === false}
                  onClick={() => {
                    setHasAlgae(false);
                  }}
                />
                <ScoutActionButton
                  className="text-xl font-bold w-36 h-16 bg-red-500 text-black"
                  actionName={ACTION_NAMES.MISS}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.NET}
                  isAuto={context.matchState === MATCH_STATES.AUTO}
                  label="Net Miss"
                  disabled={checkIsDisabled(isDisabled) || hasAlgae == false}
                  onClick={() => {
                    setHasAlgae(false);
                  }}
                />
              </div>
              <ScoutActionButton
                className="dark:bg-teal-400 text-xl font-bold w-44 h-16 text-black"
                actionName={ACTION_NAMES.SCORE}
                gamePiece={GAME_PIECES.ALGAE}
                location={LOCATIONS.PROCESSOR}
                label="Processor Score"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                disabled={checkIsDisabled(isDisabled) || hasAlgae == false}
                onClick={() => {
                  setHasAlgae(false);
                }}
              />
            </div>
            <div className="flex flex-col mx-3 justify-between items-center my-4">
              <div className="flex flex-col gap-5 justify-center">
                <ScoutActionButton
                  className="text-xl font-bold w-44 h-16 bg-white text-black text-wrap"
                  actionName={ACTION_NAMES.INTAKE}
                  gamePiece={GAME_PIECES.CORAL}
                  location={LOCATIONS.OPPONENT_HALF}
                  label="Opponent Side Coral Intake"
                  isAuto={context.matchState === MATCH_STATES.AUTO}
                  disabled={checkIsDisabled(isDisabled) || hasCoral == true}
                  onClick={() => {
                    setHasCoral(true);
                  }}
                />
                <ScoutActionButton
                  className="text-xl font-bold w-44 h-16 bg-teal-400 text-black text-wrap"
                  actionName={ACTION_NAMES.INTAKE}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.OPPONENT_HALF}
                  label="Opponent Side Algae Intake"
                  isAuto={context.matchState === MATCH_STATES.AUTO}
                  disabled={checkIsDisabled(isDisabled) || hasAlgae == true}
                  onClick={() => {
                    setHasAlgae(true);
                  }}
                />
              </div>
              <ScoutActionButton
                className="text-xl font-bold w-44 h-16 bg-teal-400 text-black text-wrap"
                actionName={ACTION_NAMES.OUTTAKE}
                gamePiece={GAME_PIECES.ALGAE}
                location={LOCATIONS.GROUND}
                label="Algae Outtake"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                disabled={checkIsDisabled(isDisabled) || hasAlgae == false}
                onClick={() => {
                  setHasAlgae(false);
                }}
              />
            </div>
          </div>
        </FieldImage>
      </div>
    </div>
  );
};
export default MatchScoutingLayout;
