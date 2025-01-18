"use client";

import { MoveRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function ContinueButton() {
  return (
    <Button className="!w-64" variant={"proceed"} size={"proceed"}>
      Continue
      <MoveRightIcon className="!size-6"></MoveRightIcon>
    </Button>
  );
}
