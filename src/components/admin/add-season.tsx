"use client";

import { useQuery } from "@tanstack/react-query";
import { CirclePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createSeason } from "~/db/queries/season";
import { cn } from "~/lib/utils";
import { fetchSeasonInfoByYear } from "~/server/http/frc-events";

export default function AddSeason() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidYear = (value: string) =>
    value.length === 4 && /^(202\d)$/.test(value);

  const { data: seasonInfo, isLoading } = useQuery({
    queryKey: ["seasonInfo", inputValue],
    queryFn: () => fetchSeasonInfoByYear(inputValue),
    enabled: () => isValidYear(inputValue),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await createSeason(inputValue, seasonInfo.gameName);
      toast.success("Season was successfully created!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`${seasonInfo.gameName} already exists.`);
    }
    setIsSubmitting(false);
  };

  return (
    <Popover
      open={isModalOpen}
      onOpenChange={() => {
        setIsModalOpen(!isModalOpen);
        setInputValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          onClick={() => setIsModalOpen(true)}
          className="self-end"
        >
          Add season <CirclePlus className="size-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="mb-4 flex flex-col gap-1">
          <h2 className="font-semibold leading-none tracking-tight">
            Add new season
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter a year to fetch season info.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Label
            className={cn(
              "font-semibold",
              inputValue && !isValidYear(inputValue)
                ? "text-red-500 dark:text-red-900"
                : ""
            )}
          >
            Year
          </Label>
          <Input
            placeholder="Enter a year..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue && !isValidYear(inputValue) && (
            <p className="text-sm font-medium text-red-500 dark:text-red-900">
              Please enter a valid year
            </p>
          )}
          <Label className="font-semibold">Game name</Label>
          <Input
            readOnly
            value={seasonInfo?.gameName ?? ""}
            placeholder="This field auto populates..."
          />
          <Button
            disabled={!seasonInfo || isLoading || isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting && <Loader2 className="animate-spin size-4 mr-2 " />}
            Add season
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
