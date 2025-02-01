"use client";

import { MoveRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function ContinueButton({
  disabled,
  onClick,
  label,
  shouldShowIcon,
}: {
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
  shouldShowIcon?: boolean;
}) {
  return (
    <Button
      className="!w-64 whitespace-break-spaces"
      variant={"proceed"}
      size={"proceed"}
      disabled={disabled}
      onClick={onClick}
    >
      {label ? label : "CONTINUE"}
      {shouldShowIcon && <MoveRightIcon className="!size-6" />}
    </Button>
  );
}
