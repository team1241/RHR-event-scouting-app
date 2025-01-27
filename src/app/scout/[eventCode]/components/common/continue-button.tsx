"use client";

import { MoveRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function ContinueButton({
  disabled,
  onClick,
  label,
}: {
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <Button
      className="!w-64"
      variant={"proceed"}
      size={"proceed"}
      disabled={disabled}
      onClick={onClick}
    >
      {label ? label : "CONTINUE"}
      <MoveRightIcon className="!size-6" />
    </Button>
  );
}
