"use client";

import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  GRADE_OPTIONS,
  TEAM_OPTIONS,
} from "~/components/common/dropdown-values";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { updateUser } from "~/db/queries/user";

import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, Team } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export default function EditUserDataModal({
  triggerComponent,
  id,
  firstName,
  grade,
  team,
  isActive,
  setIsDropdownOpen,
}: {
  triggerComponent: ReactNode;
  id: number;
  firstName: string | null;
  grade: string | null;
  team: Team | null;
  isActive: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const editUserDataSchema = z.object({
    team: z
      .enum([
        Team.BIRDS,
        Team.BANG,
        Team.THEORY,
        Team.MERGE,
        Team.KNIGHTS,
        Team.BLACKOUT,
        Team.THUNDERSTAMPS,
        Team.FIREBIRDS,
      ])
      .nullable(),
    grade: z.string().nullable(),
    isActive: z.boolean(),
  });

  const editUserDataForm = useForm<z.infer<typeof editUserDataSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(editUserDataSchema),
    values: {
      grade,
      isActive,
      team: team || null,
    },
  });

  const updateUserData = useMutation({
    mutationFn: async (updateData: Prisma.UsersUpdateInput) =>
      updateUser(id, updateData),
    onSuccess: () => {
      toast.success(
        `${
          firstName ? `${firstName}'s data` : "Data"
        } was successfully updated!`
      );
      setIsDialogOpen(false);
      setIsDropdownOpen(false);
    },
    onError: () => {
      toast.error(
        `${
          firstName ? `${firstName}'s data` : "Data"
        } was not updated. Please try again.`
      );
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Editing ${
            firstName ? `${firstName}'s ` : ""
          }user data`}</DialogTitle>
        </DialogHeader>
        <Form {...editUserDataForm}>
          <form
            onSubmit={editUserDataForm.handleSubmit(async () =>
              updateUserData.mutate({
                team: editUserDataForm.getValues("team"),
                grade: editUserDataForm.getValues("grade"),
                isActive: editUserDataForm.getValues("isActive"),
              })
            )}
          >
            <div className="w-full flex flex-col md:flex-row gap-4">
              {/* GRADE */}
              <FormField
                name="grade"
                control={editUserDataForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Grade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade..." />
                        </SelectTrigger>
                      </FormControl>
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
                    </Select>
                  </FormItem>
                )}
              />
              {/* TEAM */}
              <FormField
                name="team"
                control={editUserDataForm.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Team</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a team..." />
                        </SelectTrigger>
                      </FormControl>
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
                  </FormItem>
                )}
              />
            </div>
            {/* IS ACTIVE */}
            <FormField
              name="isActive"
              control={editUserDataForm.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-row items-center space-y-0 gap-4 mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!text-base">Is user active?</FormLabel>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={updateUserData.isPending}
                className="md:w-36"
              >
                {updateUserData.isPending && (
                  <Loader2 className="animate-spin size-4 mr-2" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
