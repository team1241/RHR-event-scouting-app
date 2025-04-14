"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { completeUserRegistration } from "~/db/queries/user";
import { cn } from "~/lib/utils";
import {
  GRADE_OPTIONS,
  TEAM_OPTIONS,
} from "~/components/common/dropdown-values";
import { Team } from "@prisma/client";

export default function CompleteProfileModal({ clerkId }: { clerkId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [grade, setGrade] = useState("");
  const [gradeError, setGradeError] = useState(false);
  const [team, setTeam] = useState<Team>();
  const [teamError, setTeamError] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    if (!grade) {
      setGradeError(true);
      setIsSubmitting(false);
      return;
    }
    if (!team) {
      setTeamError(true);
      setIsSubmitting(false);
      return;
    }

    try {
      await completeUserRegistration(clerkId, grade, team);
      toast.success("Your profile is complete!");
      setIsDialogOpen(false);
    } catch {
      toast.error(
        "There was an error updating your profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{`Let's complete your profile!`}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold">Grade</Label>
            <Select
              onValueChange={(value) => {
                setGrade(value);
                setGradeError(false);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your grade..." />
              </SelectTrigger>
              <SelectContent>
                {GRADE_OPTIONS.map((grade) => (
                  <SelectItem
                    key={grade.value}
                    value={grade.value}
                    className="hover:bg-slate-900 cursor-pointer"
                  >
                    {grade.label}
                  </SelectItem>
                ))}
              </SelectContent>
              <p
                className={cn(
                  "hidden text-sm font-medium text-red-500 dark:text-red-700",
                  gradeError && "block"
                )}
              >
                You must select a grade
              </p>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold">Team</Label>
            <Select
              onValueChange={(value) => {
                setTeam(value as Team);
                setTeamError(false);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your team..." />
              </SelectTrigger>
              <SelectContent>
                {TEAM_OPTIONS.map((team) => (
                  <SelectItem
                    key={team.value}
                    value={team.value}
                    className="hover:bg-slate-900 cursor-pointer"
                  >
                    {team.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p
              className={cn(
                "hidden text-sm font-medium text-red-500 dark:text-red-700",
                teamError && "block"
              )}
            >
              You must select a team
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex flex-row gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
            {"Finish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
