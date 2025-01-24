"use client";

import { cn } from "~/lib/utils";
import ContinueButton from "./common/continue-button";
import FieldImage from "./common/field-image";
import { getFlexDirection } from "../utils";
import { useContext } from "react";
import { ScoutDataContext } from "../context/data-context";
import { Button } from "~/components/ui/button";
import PageHeading from "~/components/common/page-heading";

export default function BallScoringScreen() {
  //   const context = useContext(ScoutDataContext);
  return (
    <>
      <PageHeading>Human Player Balls Scored</PageHeading>
      <FieldImage imageSize="100%" fieldSize="full">
        <div
          className={cn(
            "flex h-full w-full justify-center"
            // getFlexDirection(context.uiOrientation, context.allianceColour).row
          )}
        >
          <div className="flex flex-col space-y-32 m-10 justify-center">
            <Button variant="blueTeam" className="text 2xl h-20 w-40">
              Blue Miss
            </Button>

            <Button variant="redTeam" className="text 2xl h-20 w-40">
              Red Miss
            </Button>
          </div>
          <div className="flex flex-col space-y-32 m-10 justify-center">
            <Button variant="blueTeam" className="text 2xl h-20 w-40">
              Blue Score
            </Button>

            <Button variant="redTeam" className="text 2xl h-20 w-40">
              Red Score
            </Button>
          </div>
        </div>
      </FieldImage>
      <div className="flex flex-row justify-end">
        <ContinueButton />
      </div>
    </>
  );
}
