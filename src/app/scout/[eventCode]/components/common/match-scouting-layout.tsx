"use client";

import { useContext } from "react";
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
import { toast } from "sonner";

export const MatchScoutingLayout = ({
  isDisabled,
}: {
  isDisabled: boolean;
}) => {
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
        {getHasCoralOrAlgae(hasCoral, hasAlgae, context.isDefending)}
      </p>
      <div>
        <FieldImage imageSize="100%" fieldSize="half">
          <div
            className={cn(
              "flex w-full h-full justify-between",
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
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="flex flex-col mt-3 gap-3">
                <ScoutActionButton
                  actionName={ACTION_NAMES.DISLODGE}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.REEF.BASE}
                  className="dark:bg-teal-400 text-xl font-bold h-16 w-40 text-black"
                  label="Algae Dislodge"
                  isAuto={context.matchState === MATCH_STATES.AUTO}
                  disabled={checkIsDisabled(isDisabled) || hasAlgae}
                  onClick={() => {
                    toast.info("Algae dislodged from reef!");
                  }}
                />
                <ScoutActionButton
                  actionName={ACTION_NAMES.INTAKE}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.REEF.BASE}
                  className="dark:bg-teal-400 text-xl font-bold h-16 w-40 text-black text-wrap"
                  label="Intake Algae From Reef"
                  isAuto={context.matchState === MATCH_STATES.AUTO}
                  onClick={() => {
                    setHasAlgae(true);
                  }}
                  disabled={checkIsDisabled(isDisabled) || hasAlgae}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <ScoutActionButton
                actionName={ACTION_NAMES.SCORE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.REEF.L4}
                className="font-bold text-xl dark:bg-yellow-500 w-40 h-16 text-black"
                label="L4 Score"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                onClick={() => {
                  setHasCoral(false);
                }}
                disabled={checkIsDisabled(isDisabled) || !hasCoral}
              />
              <ScoutActionButton
                actionName={ACTION_NAMES.SCORE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.REEF.L3}
                className="font-bold text-xl dark:bg-yellow-500 w-40 h-16 text-black"
                label="L3 Score"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                onClick={() => {
                  setHasCoral(false);
                }}
                disabled={checkIsDisabled(isDisabled) || !hasCoral}
              />
              <ScoutActionButton
                actionName={ACTION_NAMES.SCORE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.REEF.L2}
                className="font-bold text-xl dark:bg-yellow-500 w-40 h-16 text-black"
                label="L2 Score"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                onClick={() => {
                  setHasCoral(false);
                }}
                disabled={checkIsDisabled(isDisabled) || !hasCoral}
              />
              <ScoutActionButton
                actionName={ACTION_NAMES.SCORE}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.REEF.L1}
                className="font-bold text-xl dark:bg-yellow-500 w-40 h-16 text-black"
                label="L1 Score"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                onClick={() => {
                  setHasCoral(false);
                }}
                disabled={checkIsDisabled(isDisabled) || !hasCoral}
              />
              <ScoutActionButton
                actionName={ACTION_NAMES.MISS}
                gamePiece={GAME_PIECES.CORAL}
                location={LOCATIONS.REEF.BASE}
                className="dark:bg-red-500 text-xl text-black font-bold w-40 h-16"
                label="Miss"
                isAuto={context.matchState === MATCH_STATES.AUTO}
                onClick={() => {
                  setHasCoral(false);
                }}
                disabled={checkIsDisabled(isDisabled) || !hasCoral}
              />
            </div>
            <div
              className={cn(
                "flex flex-col h-full items-center mx-2",
                getFlexDirection(context.uiOrientation, context.allianceColour)
                  .col
              )}
            >
              <div
                className={cn(
                  "h-full flex flex-col mt-12 gap-12",
                  getFlexDirection(
                    context.uiOrientation,
                    context.allianceColour
                  ).col
                )}
              >
                <div
                  className={cn(
                    "flex flex-col gap-4",
                    getFlexDirection(
                      context.uiOrientation,
                      context.allianceColour
                    ).col
                  )}
                >
                  <ScoutActionButton
                    className="text-xl font-bold w-40 h-16 dark:bg-teal-400 text-black"
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
                    className="text-xl font-bold w-40 h-16 bg-red-500 text-black"
                    actionName={ACTION_NAMES.MISS}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.NET}
                    isAuto={context.matchState === MATCH_STATES.AUTO}
                    label="Net Miss"
                    disabled={checkIsDisabled(isDisabled) || hasAlgae === false}
                    onClick={() => {
                      setHasAlgae(false);
                    }}
                  />
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-4",
                    getFlexDirection(
                      context.uiOrientation,
                      context.allianceColour
                    ).col
                  )}
                >
                  <ScoutActionButton
                    className="text-xl font-bold w-44 h-16 bg-amber-400 text-black text-wrap"
                    actionName={ACTION_NAMES.OUTTAKE}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.GROUND}
                    label="Algae Outtake"
                    isAuto={context.matchState === MATCH_STATES.AUTO}
                    disabled={checkIsDisabled(isDisabled) || hasAlgae === false}
                    onClick={() => {
                      setHasAlgae(false);
                    }}
                  />
                  <ScoutActionButton
                    className="dark:bg-teal-400 text-xl font-bold w-44 h-16 text-black"
                    actionName={ACTION_NAMES.SCORE}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.PROCESSOR}
                    label="Processor Score"
                    isAuto={context.matchState === MATCH_STATES.AUTO}
                    disabled={checkIsDisabled(isDisabled) || hasAlgae === false}
                    onClick={() => {
                      setHasAlgae(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </FieldImage>
      </div>
    </div>
  );
};
export default MatchScoutingLayout;
