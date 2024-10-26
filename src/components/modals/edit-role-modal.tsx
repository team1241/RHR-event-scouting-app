"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ROLE_OPTIONS } from "~/components/common/dropdown-values";
import { Button } from "~/components/ui/button";
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

export default function EditRoleModal({
  triggerComponent,
  id,
  firstName,
  isAdmin,
  disabled,
  setIsDropdownOpen,
}: {
  triggerComponent: ReactNode;
  id: number;
  firstName: string | null;
  isAdmin: boolean;
  disabled: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const editRoleSchema = z.object({
    role: z.string(),
  });

  const editRoleForm = useForm<z.infer<typeof editRoleSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(editRoleSchema),
    values: {
      role: isAdmin ? "Admin" : "Scout",
    },
  });

  const updateRole = useMutation({
    mutationFn: async (updateData: Prisma.UsersUpdateInput) =>
      updateUser(id, updateData),
    onSuccess: () => {
      toast.success("Role successfully updated!");
      setIsDialogOpen(false);
      setIsDropdownOpen(false);
    },
    onError: () => {
      toast.error("Role was not updated, please try again.");
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        disabled={disabled}
      >
        {triggerComponent}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {`Editing ${firstName ? `${firstName}'s ` : ""}role`}
          </DialogTitle>
        </DialogHeader>
        <Form {...editRoleForm}>
          <form
            onSubmit={editRoleForm.handleSubmit(async () =>
              updateRole.mutate({
                isAdmin: editRoleForm.getValues("role") === "Admin",
              })
            )}
          >
            <div className="flex flex-col gap-4">
              <FormField
                name="role"
                control={editRoleForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_OPTIONS.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={updateRole.isPending}>
                  {updateRole.isPending && (
                    <Loader2 className="animate-spin size-4 mr-2" />
                  )}
                  Save
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
