"use client";

import { MoveLeft, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import BackButton from "./common/back-button";
import ContinueButton from "./common/continue-button";
import { Checkbox } from "~/components/ui/checkbox";


export default function StartingPositionScreen() {
  return (
    <div>
      <PageHeading>Starting Position</PageHeading>
      <div className="flex flex-row">
        <div className="flex flex-col w-96">

        </div>
        <div className="flex flex-col space-y-20">
          <div className="flex items-center space-x-4">
            <Checkbox id="noshow" className="size-7"/>
            <label
              htmlFor="noshow"
              className="text-4xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Didn't show up?
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <Checkbox id="preload" className="size-7"/>
            <label
              htmlFor="preload"
              className="text-4xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Has preload?
            </label>
          </div>

        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex justify-between w-full">
          <BackButton />
          <ContinueButton />
        </div>
      </div>
    </div>
  );
}
