"use client";

import { useContext } from "react";
import { ScoutScreenContext } from "../context";
import PageHeading from "~/components/common/page-heading";
import MatchScoutingLayout from "./common/match-scouting-layout";
import UndoActionButton from "./common/undo-action-button";
import ContinueButton from "./common/continue-button";

const TeleopScoringScreen = () => {
  const screenContext = useContext(ScoutScreenContext);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <PageHeading>Teleop</PageHeading>
          <UndoActionButton className="text-2xl font-bold w-36 h-16 dark:bg-red-600" />
        </div>
      </div>
      <MatchScoutingLayout isDisabled={false} />
      <div className="flex flex-row justify-end">
        <ContinueButton
          onClick={() => {
            screenContext.nextScreen();
          }}
        />
      </div>
    </>
  );
};

export default TeleopScoringScreen;
