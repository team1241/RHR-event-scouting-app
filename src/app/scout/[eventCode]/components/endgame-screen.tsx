"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import FieldImage from "./field-image";

export default function EndgameScreen() {
  return (
    <>
      <div>
        <PageHeading>Endgame</PageHeading>
      </div>
      <div>
        <FieldImage imageSize="100%" fieldSize="half"></FieldImage>
      </div>

      <div className="flex flex-row h-full w-10 ">
        <div className="flex flex-col justify-stretch h-full w-full">
          <Button className="mb-1 mt-4 ">Shallow Hang</Button>
          <Button className="mb-1 ">Deep Hang</Button>
          <Button className="mb-1">Park</Button>
          <Button className="mb-1">Failed Attempt</Button>
          <Button>Not Attempted</Button>
        </div>
      </div>
      <div className="flex flex-row justify-items-center my-52">
        <Button>Back</Button>
        <Button>Continue</Button>
      </div>
    </>
  );
}
