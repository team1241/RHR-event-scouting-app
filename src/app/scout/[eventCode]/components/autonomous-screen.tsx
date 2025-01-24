"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import FieldImage from "./common/field-image";
import ContinueButton from "./common/continue-button";
import UndoActionButton from "./common/undo-action-button";

export default function AutonomousScreen() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
        <PageHeading>Autonomous</PageHeading>
        <UndoActionButton className="text-2xl font-bold w-36 h-16 dark:bg-red-600" />
        {/* <Button className="text-2xl font-bold w-36 h-16 dark:bg-red-600">UNDO</Button> */}
        </div>
        <div className="flex items-center space-x-4 bg-black/90 font-bold p-3 rounded-lg">
          <Checkbox id="leaves" className="size-7" />
          <label
            htmlFor="leaves"
            className="text-4xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Left starting line?
          </label>
        </div>
      </div>
      <div>
        <FieldImage imageSize="100%" fieldSize="half">
            <div className="w-full h-full">

            </div>
        </FieldImage>
      </div>
      <div className="flex flex-row justify-end">
        <ContinueButton></ContinueButton>
      </div>
    </div>
  );
}
