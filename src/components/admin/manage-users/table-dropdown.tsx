"use client";

import { useUser } from "@clerk/nextjs";
import { Users } from "@prisma/client";
import { Ellipsis, FilePenLine, Shield, Trash } from "lucide-react";
import { useState } from "react";
import EditRoleModal from "~/components/modals/edit-role-modal";
import EditUserDataModal from "~/components/modals/edit-user-data-modal";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

export default function UsersTableDropdownMenu({ user }: { user: Users }) {
  const { user: clerkUser } = useUser();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      modal={false}
    >
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="size-8">
          <Ellipsis
            className={cn(
              "size-5 transition-all",
              isDropdownOpen ? "rotate-90" : ""
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditUserDataModal
          id={user.id}
          firstName={user.firstName}
          grade={user.grade}
          team={user.team}
          isActive={user.isActive}
          triggerComponent={
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <FilePenLine className="size-5" />
              Edit details
            </DropdownMenuItem>
          }
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <EditRoleModal
          id={user.id}
          firstName={user.firstName}
          isAdmin={user.isAdmin}
          triggerComponent={
            <DropdownMenuItem
              onClick={(e) => e.preventDefault()}
              disabled={clerkUser?.id === user.clerkId}
            >
              <Shield className="size-5" />
              Update role
            </DropdownMenuItem>
          }
          disabled={clerkUser?.id === user.clerkId}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <DropdownMenuItem disabled>
          <Trash className="size-5 text-red-600" />
          Delete user
          <Badge variant="secondary" className="ml-2">
            Coming Soon
          </Badge>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
