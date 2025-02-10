"use client";

import { useContext } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import PageHeading from "~/components/common/page-heading";
import MatchScoutingLayout from "./common/match-scouting-layout";
import UndoActionButton from "./common/undo-action-button";
import ContinueButton from "./common/continue-button";
import ScoutActionButton from "./common/scout-action-button";
import { ACTION_NAMES, GAME_PIECES, LOCATIONS } from "../constants";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const TeleopScoringScreen = () => {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  console.log(context.actions);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <PageHeading>Teleop</PageHeading>
          <UndoActionButton
            className="text-2xl font-bold w-36 h-16 dark:bg-red-600"
            onClick={() => {
              if (context.isDefending) {
                context.setIsDefending(false);
              }
            }}
          />
        </div>
      </div>
      <MatchScoutingLayout isDisabled={false} />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3 justify-end">
          <Button
            className={cn(
              "dark:bg-orange-400 w-40 h-14 dark:text-white font-bold text-xl",
              context.wasDefended && "dark:ring-yellow-400 ring-2 ring-offset-4"
            )}
            disabled={context.isDefending}
            onClick={() => {
              if (!context.wasDefended) {
                context.setWasDefended(true);
              } else {
                context.setWasDefended(false);
              }
            }}
          >
            Was Defended
          </Button>

          <ScoutActionButton
            actionName={ACTION_NAMES.DEFENDING}
            gamePiece={GAME_PIECES.NOGAMEPIECE}
            location={LOCATIONS.OPPONENT_HALF}
            className="font-bold text-xl dark:bg-orange-400 w-40 h-14"
            label="Is Defending"
            onClick={() => {
              if (context.isDefending) {
                context.setIsDefending(false);
              } else {
                context.setIsDefending(true);
              }
            }}
          />
        </div>
        <ContinueButton
          onClick={() => {
            context.setIsDefending(false);
            context.setWasDefended(false);
            screenContext.nextScreen();
          }}
        />
      </div>
    </>
  );
};

export default TeleopScoringScreen;
