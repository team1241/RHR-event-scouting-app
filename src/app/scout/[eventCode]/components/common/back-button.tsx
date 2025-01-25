"use client";

import { MoveLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
export default function BackButton({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      className="!w-64"
      variant={"goBack"}
      size={"proceed"}
      onClick={onClick}
    >
      <MoveLeftIcon className="!size-6"></MoveLeftIcon>
      GO BACK
    </Button>
  );
}
