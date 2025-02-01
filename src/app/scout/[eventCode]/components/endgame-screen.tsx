"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import FieldImage from "./common/field-image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useContext } from "react";
import { ScoutDataContext } from "../context";

export default function EndgameScreen() {
  const context = useContext(ScoutDataContext);
  console.log(context);
  return (
    <>
      <div>
        <PageHeading>Endgame</PageHeading>
      </div>

      <FieldImage imageSize="100%" fieldSize="half">
        <div className="flex flex-row h-full w-10 ">
          <div className="flex flex-col justify-stretch h-full w-full">
            \
            <Button className="ml-16 mb-1 h-16 w-40  font-bold text-xl">
              Shallow Hang
            </Button>
            <Button className="ml-16 mb-1 h-16 w-40 font-bold text-xl">
              Deep Hang
            </Button>
            <Button className="ml-16 mb-1 h-16 w-40 font-bold text-xl">
              Park
            </Button>
            <Button className="ml-16 mb-1 h-16 w-40 font-bold text-xl">
              Failed Attempt
            </Button>
            <Button className="ml-16 mb-1 h-16 w-40 font-bold text-xl">
              Not Attempted
            </Button>
          </div>

          <div className="flex flex-col justify-stretch h-full w-full">
            <Button className="ml-[41rem] mt-16 mb-1 h-16 w-40  font-bold text-xl">
              1
            </Button>
            <Button className="ml-[41rem] mt-4 mb-1 h-16 w-40  font-bold text-xl">
              2
            </Button>
            <Button className="ml-[41rem] mt-4 mb-1 h-16 w-40  font-bold text-xl">
              3
            </Button>
          </div>
        </div>
      </FieldImage>
      <div className="flex flex-row justify-items-center my-52">
        <Button>Back</Button>
        <Button>Continue</Button>
      </div>
    </>
  );
}
