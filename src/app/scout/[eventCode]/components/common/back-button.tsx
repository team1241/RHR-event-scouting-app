"use client";

import { MoveLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function BackButton() {
  return (
    <Button className="!w-64" variant={"goBack"} size={"proceed"}>
      <MoveLeftIcon className="!size-6"></MoveLeftIcon>
      GO BACK
    </Button>
  );
}
