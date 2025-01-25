"use client";

import { MoveRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function ContinueButton({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      className="!w-64"
      variant={"proceed"}
      size={"proceed"}
      disabled={disabled}
      onClick={onClick}
    >
      Continue
      <MoveRightIcon className="!size-6"></MoveRightIcon>
    </Button>
  );
}
